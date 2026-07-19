"""Deterministic replay for the committed SCOPE product-definition run.

This module intentionally uses only the Python standard library and performs no
network or model calls. It validates and replays artifacts that are already in
the repository.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
PIPELINE_ROOT = ROOT / "pipeline" if (ROOT / "pipeline" / "runs").is_dir() else ROOT
DEFAULT_MANIFEST = PIPELINE_ROOT / "runs" / "2026-07-19" / "run-manifest.json"
DEFAULT_OUTPUT = ROOT / "artifacts" / "demo-run"
OUTPUT_NAMES = (
    "evidence-cards.json",
    "opportunity-ranking.json",
    "council-review.json",
    "decision-log.json",
)


def _read_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as error:
        raise ValueError(f"Missing run artifact: {path}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON artifact {path}: {error}") from error


def _resolve(manifest_path: Path, relative_path: str) -> Path:
    return (manifest_path.parent / relative_path).resolve()


def load_run(manifest_path: Path | str = DEFAULT_MANIFEST) -> dict[str, Any]:
    """Load a manifest and all artifacts it references into one run object."""

    path = Path(manifest_path).resolve()
    manifest = _read_json(path)
    evidence = _read_json(_resolve(path, manifest["evidence_file"]))
    raw = _read_json(_resolve(path, manifest["raw_opportunities_file"]))
    normalized = _read_json(_resolve(path, manifest["normalized_opportunities_file"]))
    ledger = _read_json(_resolve(path, manifest["decision_ledger_file"]))
    council = _read_json(_resolve(path, manifest["council_transcript_file"]))

    return {
        "manifest_path": str(path),
        "manifest": manifest,
        "evidence": evidence["items"],
        "evidence_disclosure": evidence["disclosure"],
        "raw": raw["directions"],
        "clusters": normalized["clusters"],
        "finalists": normalized["finalists"],
        "decisions": ledger["decisions"],
        "council": council["messages"],
        "council_is_research": council["expert_or_user_research"],
    }


def calculate_score(inputs: dict[str, float | int]) -> float:
    """Apply the published balanced opportunity formula."""

    weighted_sum = (
        0.25 * float(inputs["frequency"])
        + 0.25 * float(inputs["severity"])
        + 0.15 * float(inputs["trend"])
        + 0.15 * float(inputs["willingness"])
        + 0.20 * float(inputs["capability"])
    )
    return round(float(inputs["confidence"]) * weighted_sum - float(inputs["risk"]), 1)


def _referenced_evidence_ids(run: dict[str, Any]) -> set[str]:
    references: set[str] = set()
    for collection in ("raw", "finalists", "decisions", "council"):
        for item in run[collection]:
            references.update(item.get("evidence_ids", []))
    return references


def validate_run(run: dict[str, Any]) -> None:
    """Reject broken artifact links, invalid score inputs, and funnel drift."""

    manifest = run["manifest"]
    evidence_ids = {item["id"] for item in run["evidence"]}
    unknown = sorted(_referenced_evidence_ids(run) - evidence_ids)
    if unknown:
        raise ValueError(f"Unknown evidence reference(s): {', '.join(unknown)}")

    funnel = manifest["funnel"]
    actual = {
        "raw": len(run["raw"]),
        "clusters": len(run["clusters"]),
        "finalists": len(run["finalists"]),
        "working_concept": sum(
            decision["decision"] == "WORKING_CONCEPT_NOT_VALIDATED"
            for decision in run["decisions"]
        ),
    }
    if funnel != actual:
        raise ValueError(f"Funnel mismatch: manifest={funnel}, actual={actual}")

    raw_ids = {item["id"] for item in run["raw"]}
    clustered_ids = [member for cluster in run["clusters"] for member in cluster["member_ids"]]
    if len(clustered_ids) != len(set(clustered_ids)) or set(clustered_ids) != raw_ids:
        raise ValueError("Every raw direction must appear in exactly one cluster")

    cluster_ids = {item["id"] for item in run["clusters"]}
    for finalist in run["finalists"]:
        unknown_clusters = set(finalist["source_cluster_ids"]) - cluster_ids
        if unknown_clusters:
            raise ValueError(f"Unknown cluster reference(s): {sorted(unknown_clusters)}")
        for field in (
            "confidence",
            "frequency",
            "severity",
            "trend",
            "willingness",
            "capability",
            "risk",
        ):
            value = float(finalist[field])
            if not 0 <= value <= 5:
                raise ValueError(f"{finalist['id']} has out-of-range {field}: {value}")

    finalist_ids = {item["id"] for item in run["finalists"]}
    decision_ids = {item["candidate_id"] for item in run["decisions"]}
    if finalist_ids != decision_ids:
        raise ValueError("Every finalist must have exactly one decision")
    if run["council_is_research"] is not False:
        raise ValueError("Recorded AI Council output cannot be labeled as research")


def _write_json(path: Path, payload: dict[str, Any] | list[Any]) -> Path:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return path


def run_demo(
    manifest_path: Path | str = DEFAULT_MANIFEST,
    output_directory: Path | str = DEFAULT_OUTPUT,
) -> list[Path]:
    """Validate and replay committed inputs into four inspectable artifacts."""

    run = load_run(manifest_path)
    validate_run(run)
    output = Path(output_directory).resolve()
    output.mkdir(parents=True, exist_ok=True)

    ranking = sorted(
        (
            {
                "id": item["id"],
                "name": item["name"],
                "score": calculate_score(item),
                "baseline_type": item["baseline_type"],
                "evidence_ids": item["evidence_ids"],
            }
            for item in run["finalists"]
        ),
        key=lambda item: (-item["score"], item["id"]),
    )

    payloads: dict[str, dict[str, Any]] = {
        "evidence-cards.json": {
            "run_id": run["manifest"]["run_id"],
            "disclosure": run["evidence_disclosure"],
            "items": run["evidence"],
        },
        "opportunity-ranking.json": {
            "run_id": run["manifest"]["run_id"],
            "disclosure": "SYNTHETIC_DEMO",
            "formula": "O = C × (0.25F + 0.25S + 0.15T + 0.15W + 0.20A) - R",
            "ranking": ranking,
        },
        "council-review.json": {
            "run_id": run["manifest"]["run_id"],
            "disclosure": "RECORDED_AI_REVIEW_NOT_EXPERT_OR_USER_RESEARCH",
            "messages": run["council"],
        },
        "decision-log.json": {
            "run_id": run["manifest"]["run_id"],
            "model": run["manifest"]["model"],
            "author_review": run["manifest"]["author_review"],
            "replay_mode": run["manifest"]["replay_mode"],
            "funnel": run["manifest"]["funnel"],
            "decisions": run["decisions"],
        },
    }

    return [_write_json(output / name, payloads[name]) for name in OUTPUT_NAMES]


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--demo", action="store_true", help="Replay the committed demo run")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args(argv)
    if not args.demo:
        parser.error("--demo is required; this tool does not perform live model runs")
    return args


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8")
    args = _parse_args(sys.argv[1:] if argv is None else argv)
    print("OFFLINE REPLAY — NO MODEL OR NETWORK CALL")
    try:
        outputs = run_demo(args.manifest, args.output)
    except ValueError as error:
        print(f"Replay failed: {error}", file=sys.stderr)
        return 1

    run = load_run(args.manifest)
    funnel = run["manifest"]["funnel"]
    print(
        f"Funnel: {funnel['raw']} -> {funnel['clusters']} -> "
        f"{funnel['finalists']} -> {funnel['working_concept']}"
    )
    for path in outputs:
        print(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
