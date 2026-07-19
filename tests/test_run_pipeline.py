import copy
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from run_pipeline import calculate_score, load_run, run_demo, validate_run


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "pipeline" / "runs" / "2026-07-19" / "run-manifest.json"


class RunPipelineTests(unittest.TestCase):
    def test_score_uses_published_formula(self):
        self.assertEqual(
            calculate_score(
                {
                    "confidence": 5,
                    "frequency": 5,
                    "severity": 5,
                    "trend": 5,
                    "willingness": 5,
                    "capability": 5,
                    "risk": 0,
                }
            ),
            25.0,
        )

    def test_demo_writes_declared_artifacts(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            outputs = run_demo(MANIFEST, output)

            self.assertEqual(
                {path.name for path in outputs},
                {
                    "evidence-cards.json",
                    "opportunity-ranking.json",
                    "council-review.json",
                    "decision-log.json",
                },
            )
            self.assertTrue(all(path.exists() for path in outputs))
            ranking = json.loads((output / "opportunity-ranking.json").read_text(encoding="utf-8"))
            self.assertEqual(len(ranking["ranking"]), 5)
            self.assertEqual(ranking["disclosure"], "SYNTHETIC_DEMO")

    def test_invalid_evidence_reference_is_rejected(self):
        run = load_run(MANIFEST)
        invalid = copy.deepcopy(run)
        invalid["decisions"][0]["evidence_ids"] = ["E-999"]

        with self.assertRaisesRegex(ValueError, "E-999"):
            validate_run(invalid)

    def test_cli_discloses_offline_replay_and_custom_output(self):
        with tempfile.TemporaryDirectory() as directory:
            result = subprocess.run(
                [
                    sys.executable,
                    str(ROOT / "run_pipeline.py"),
                    "--demo",
                    "--output",
                    directory,
                ],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
                encoding="utf-8",
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(result.stdout.startswith("OFFLINE REPLAY — NO MODEL OR NETWORK CALL"))
            self.assertIn("30 -> 10 -> 5 -> 1", result.stdout)
            self.assertTrue((Path(directory) / "decision-log.json").exists())


if __name__ == "__main__":
    unittest.main()
