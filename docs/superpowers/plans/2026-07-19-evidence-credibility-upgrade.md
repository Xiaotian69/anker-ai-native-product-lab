# Evidence Credibility Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing showcase into a traceable product-definition system prototype with committed AI-run artifacts, reproducible offline replay, competitor counter-evidence, sensitivity analysis, falsifiable validation, and reviewer-focused navigation.

**Architecture:** Keep the existing React/Vite single page and add focused data, pure calculation, and presentation modules. A standard-library Python CLI validates and replays committed JSON artifacts without network access; browser components consume TypeScript mirrors and publish the same artifact files under `public/pipeline/`.

**Tech Stack:** React 19, TypeScript 7, Vite 8, Vitest, Testing Library, Python 3 standard library, GitHub Actions, GitHub Pages.

---

## File structure

### Create

- `pipeline/data/evidence-input.json` — evidence snapshot used by the recorded run
- `pipeline/prompts/opportunity-generation.md` — recorded opportunity prompt
- `pipeline/prompts/council-review.md` — recorded Council prompt
- `pipeline/runs/2026-07-19/run-manifest.json` — provenance and artifact index
- `pipeline/runs/2026-07-19/raw-opportunities.json` — 30 unselected model directions
- `pipeline/runs/2026-07-19/normalized-opportunities.json` — 10 clusters and 5 finalists
- `pipeline/runs/2026-07-19/decision-ledger.json` — accept/reject trail
- `pipeline/runs/2026-07-19/council-transcript.json` — role outputs and consequences
- `run_pipeline.py` — deterministic, no-network replay CLI
- `tests/test_run_pipeline.py` — CLI and validation tests
- `src/lib/sensitivity.ts` and `src/lib/sensitivity.test.ts` — scenario scoring
- `src/data/runLedger.ts` — browser ledger and funnel metadata
- `src/data/competitors.ts` — official A1638 comparison
- `src/data/validation.ts` — falsifiable validation rows
- `src/components/DecisionLedger.tsx` — provenance and funnel UI
- `src/components/SensitivityPanel.tsx` — rank-change UI
- `src/components/CompetitorMatrix.tsx` — parity/difference UI
- `src/components/ValidationBoard.tsx` — test thresholds and failure decisions
- `src/components/ReviewerTour.tsx` — five-step guided navigation
- `public/pipeline/**` — downloadable copies of committed artifacts

### Modify

- `src/types.ts` — evidence roles, scenario, ledger, competitor, and validation types
- `src/data/evidence.ts` — A1638 counter-evidence and role metadata
- `src/components/EvidenceLab.tsx` — counts, numeric severity, categories, rubric
- `src/components/OpportunityMap.tsx` — metric anchors and sensitivity panel
- `src/components/ProductConcept.tsx` — competitor matrix
- `src/components/AICouncil.tsx` — current card plus completed summaries
- `src/components/Header.tsx` — active section and reviewer tour launch
- `src/components/Hero.tsx` — exact evidence counts and balanced headline
- `src/App.tsx` — section composition and tour controller
- `src/styles.css` — new sections, contrast, responsive behavior, reduced motion
- `src/components/App.test.tsx` — integrated user-facing assertions
- `src/data/dataIntegrity.test.ts` — provenance and count integrity
- `README.md`, `docs/research-notes.md`, `docs/methodology.md` — explain the real run and remaining validation
- `.gitignore` — ignore `artifacts/demo-run/`

## Task 1: Recorded run artifacts and deterministic replay

**Files:**
- Create all files under `pipeline/`
- Create `run_pipeline.py`
- Create `tests/test_run_pipeline.py`
- Modify `.gitignore`

- [ ] **Step 1: Write failing Python tests**

Create tests that import `load_run`, `validate_run`, `calculate_score`, and `run_demo` and assert:

```python
def test_demo_writes_declared_artifacts(tmp_path):
    outputs = run_demo(ROOT / "pipeline/runs/2026-07-19/run-manifest.json", tmp_path)
    assert {path.name for path in outputs} == {
        "evidence-cards.json",
        "opportunity-ranking.json",
        "council-review.json",
        "decision-log.json",
    }
    assert all(path.exists() for path in outputs)

def test_invalid_evidence_reference_is_rejected(tmp_path):
    run = load_run(FIXTURE_MANIFEST)
    run["decisions"][0]["evidence_ids"] = ["E-999"]
    with pytest_raises(ValueError, "E-999"):
        validate_run(run)

def test_score_uses_published_formula():
    assert calculate_score({
        "confidence": 5, "frequency": 5, "severity": 5,
        "trend": 5, "willingness": 5, "capability": 5, "risk": 0,
    }) == 25.0
```

Use a small local `pytest_raises` context manager so the suite remains standard-library only.

- [ ] **Step 2: Verify RED**

Run: `python -m unittest discover -s tests -p "test_*.py" -v`

Expected: import failure because `run_pipeline.py` does not exist.

- [ ] **Step 3: Create the committed run**

Record 30 diverse raw directions spanning power, audio, home energy, and travel; cluster them into 10 named themes; retain the 5 existing opportunity candidates; record Aero 10K as the working selection rather than a validated winner. Include `source_evidence_ids`, `risk`, `selection_status`, and `selection_reason` for every promoted candidate.

Use this manifest truth contract:

```json
{
  "run_id": "scope-2026-07-19-01",
  "run_type": "RECORDED_CODEX_COLLABORATION",
  "model": "OpenAI Codex (GPT-5 family; exact server snapshot not exposed to the client)",
  "run_date": "2026-07-19",
  "author_review": "pending_author_confirmation",
  "replay_mode": "DETERMINISTIC_NO_NETWORK",
  "funnel": {"raw": 30, "clusters": 10, "finalists": 5, "working_concept": 1}
}
```

- [ ] **Step 4: Implement the replay CLI**

Use only `argparse`, `json`, `pathlib`, `shutil`, and `sys`. `run_demo()` loads the manifest’s relative artifacts, validates evidence IDs and 0–5 score inputs, recomputes the published opportunity formula, sorts descending with stable ID tie-breaking, and writes four UTF-8 JSON outputs. CLI behavior:

```text
python run_pipeline.py --demo
python run_pipeline.py --demo --output path/to/output
```

The first printed line must contain `OFFLINE REPLAY — NO MODEL OR NETWORK CALL`.

- [ ] **Step 5: Verify GREEN**

Run: `python -m unittest discover -s tests -p "test_*.py" -v`

Expected: all Python tests pass.

- [ ] **Step 6: Run the CLI and commit**

Run: `python run_pipeline.py --demo`

Expected: four output paths and funnel `30 -> 10 -> 5 -> 1`.

Commit: `feat: add reproducible decision pipeline`

## Task 2: Typed provenance data and integrity rules

**Files:**
- Modify `src/types.ts`
- Modify `src/data/evidence.ts`
- Create `src/data/runLedger.ts`
- Create `src/data/competitors.ts`
- Create `src/data/validation.ts`
- Modify `src/data/dataIntegrity.test.ts`

- [ ] **Step 1: Write failing integrity tests**

Add assertions for these behaviors:

```ts
expect(evidenceItems.filter((item) => item.dataType === 'PUBLIC_SOURCE')).toHaveLength(7)
expect(evidenceItems.filter((item) => item.dataType === 'INTERVIEW_HYPOTHESIS')).toHaveLength(3)
expect(evidenceItems.filter((item) => item.dataType === 'SYNTHETIC_DEMO')).toHaveLength(2)
expect(evidenceItems.find((item) => item.id === 'E-007')?.evidenceRole).toBe('COUNTER_EVIDENCE')
expect(runLedger.authorReview).toBe('pending_author_confirmation')
expect(runLedger.funnel).toEqual({ raw: 30, clusters: 10, finalists: 5, workingConcept: 1 })
expect(competitorRows.every((row) => row.sourceUrl.startsWith('https://www.anker.com/'))).toBe(true)
expect(validationHypotheses.every((item) => item.failureDecision.length > 0)).toBe(true)
```

Also verify all evidence IDs used by the ledger exist.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/data/dataIntegrity.test.ts`

Expected: failures for missing types, E-007, and new datasets.

- [ ] **Step 3: Add the typed datasets**

Add `EvidenceRole`, `RunLedger`, `CompetitorRow`, and `ValidationHypothesis` types. Add E-007 from the official A1638 page with access date `2026-07-19`, severity 5, high confidence, and counter-evidence role. Assign roles to every existing evidence item.

The competitor matrix must mark capacity, output, retractable cable, smart display, and temperature monitoring as existing capabilities. Proposed differences remain `PROPOSED_UNVALIDATED`.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- --run src/data/dataIntegrity.test.ts`

Expected: all integrity tests pass.

Commit: `feat: add provenance competitor and validation data`

## Task 3: Evidence rubric and sensitivity engine

**Files:**
- Create `src/lib/sensitivity.ts`
- Create `src/lib/sensitivity.test.ts`
- Modify `src/components/EvidenceLab.tsx`
- Create `src/components/SensitivityPanel.tsx`
- Modify `src/components/OpportunityMap.tsx`
- Modify `src/components/App.test.tsx`

- [ ] **Step 1: Write failing sensitivity tests**

Define the desired API:

```ts
expect(scoreWithScenario(maxInputs, balancedScenario)).toBe(25)
expect(analyzeSensitivity(opportunityCandidates, scenarios)).toHaveLength(3)
expect(analyzeSensitivity(opportunityCandidates, scenarios)[0].ranking).toHaveLength(5)
expect(rankDelta('travel-safe-power', analysis[0], analysis[1])).toEqual(expect.any(Number))
```

Add component assertions for `7条公开证据 / 3条待验证命题 / 2条AI合成挑战`, `5/5`, `严重度评分标尺`, and `敏感性分析`.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/lib/sensitivity.test.ts src/components/App.test.tsx`

Expected: missing module and missing UI text failures.

- [ ] **Step 3: Implement pure scenario scoring**

Use weights that sum to 1:

```ts
balanced: { frequency: .25, severity: .25, trend: .15, willingness: .15, capability: .20, riskMultiplier: 1 }
safety: { frequency: .15, severity: .35, trend: .15, willingness: .05, capability: .30, riskMultiplier: 1.2 }
commercial: { frequency: .30, severity: .15, trend: .10, willingness: .25, capability: .20, riskMultiplier: .8 }
```

Compute `C × weightedSum - R × riskMultiplier`, sort stably, and expose rank-change helpers.

- [ ] **Step 4: Implement the UI**

Evidence cards display evidence-role badges and numeric severity. A collapsible rubric explains 1–5. SensitivityPanel renders the three rankings, highlights winner changes, and states that every input is a synthetic workshop baseline.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- --run src/lib/sensitivity.test.ts src/components/App.test.tsx`

Expected: all selected tests pass.

Commit: `feat: expose evidence rubric and score sensitivity`

## Task 4: Decision ledger and concept funnel

**Files:**
- Create `src/components/DecisionLedger.tsx`
- Modify `src/App.tsx`
- Modify `src/components/Header.tsx`
- Modify `src/components/App.test.tsx`
- Copy pipeline artifacts to `public/pipeline/`

- [ ] **Step 1: Write failing component tests**

Assert the rendered application includes:

```ts
expect(screen.getByRole('heading', { name: /AI 运行与决策账本/ })).toBeInTheDocument()
expect(screen.getByText(/30 个原始方向/)).toBeInTheDocument()
expect(screen.getByText(/10 个主题聚类/)).toBeInTheDocument()
expect(screen.getByText(/5 个候选/)).toBeInTheDocument()
expect(screen.getByText(/1 个工作概念/)).toBeInTheDocument()
expect(screen.getByText(/待赵子健确认/)).toBeInTheDocument()
expect(screen.getByRole('link', { name: /原始输出 JSON/ })).toHaveAttribute('href', expect.stringContaining('/pipeline/'))
```

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: ledger heading and links are absent.

- [ ] **Step 3: Implement the ledger**

Render manifest identity, model visibility caveat, offline replay disclosure, a four-stage funnel, and the five finalist decisions. Separate AI output, deterministic processing, and pending author review using distinct labels. Link to prompt, raw output, normalized output, Council transcript, and decision ledger downloads using `assetPath()`.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: integration tests pass.

Commit: `feat: show ai run and decision ledger`

## Task 5: Competitor counter-evidence and validation board

**Files:**
- Create `src/components/CompetitorMatrix.tsx`
- Create `src/components/ValidationBoard.tsx`
- Modify `src/components/ProductConcept.tsx`
- Modify `src/App.tsx`
- Modify `src/components/App.test.tsx`

- [ ] **Step 1: Write failing component tests**

Assert official parity and falsifiable status:

```ts
expect(screen.getByRole('heading', { name: /不是 A1638 加一个温感环/ })).toBeInTheDocument()
expect(screen.getAllByText(/已有，不构成差异/).length).toBeGreaterThan(1)
expect(screen.getByRole('link', { name: /A1638 官方页面/ })).toHaveAttribute('href', 'https://www.anker.com/products/a1638-10k-45w-power-bank')
expect(screen.getByRole('heading', { name: /真实验证看板/ })).toBeInTheDocument()
expect(screen.getAllByText('未执行')).toHaveLength(4)
expect(screen.getByText(/删除或重新设计温感提示/)).toBeInTheDocument()
```

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: competitor and validation sections are missing.

- [ ] **Step 3: Implement comparison and validation**

Render comparison rows as an accessible table on desktop and stacked cards on narrow screens. Include source and access date. Validation cards show hypothesis, method, threshold, status, and a visually prominent failure decision. State that no interviews or prototype tests have been completed.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: component tests pass.

Commit: `feat: add differentiation and validation gates`

## Task 6: Reviewer tour, navigation state, and Council compression

**Files:**
- Create `src/components/ReviewerTour.tsx`
- Modify `src/components/Header.tsx`
- Modify `src/components/AICouncil.tsx`
- Modify `src/App.tsx`
- Modify `src/components/App.test.tsx`

- [ ] **Step 1: Write failing interaction tests**

Test these user flows with `userEvent`:

```ts
await user.click(screen.getByRole('button', { name: /评委 3 分钟导览/ }))
expect(screen.getByText('1 / 5')).toBeInTheDocument()
await user.click(screen.getByRole('button', { name: /下一站/ }))
expect(screen.getByText('2 / 5')).toBeInTheDocument()

await user.click(screen.getByRole('button', { name: /开始评审/ }))
await user.click(screen.getByRole('button', { name: /下一位角色/ }))
expect(screen.getByText(/已完成结论/)).toBeInTheDocument()
expect(screen.getAllByRole('article')).toHaveLength(1)
```

Mock `scrollIntoView` and `IntersectionObserver` only at the browser boundary.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: tour button and compressed Council behavior are absent.

- [ ] **Step 3: Implement interactions**

Tour targets are `evidence`, `ledger`, `council`, `product`, and `validation`. Header owns active-section observation and sets `aria-current="location"`. Council renders only the current role card, completed consequences in a compact list, and the complete transcript inside a `<details>` element.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: all interaction tests pass.

Commit: `feat: add reviewer tour and focused council`

## Task 7: Visual polish and responsive behavior

**Files:**
- Modify `src/components/Hero.tsx`
- Modify `src/styles.css`
- Modify `src/components/App.test.tsx`

- [ ] **Step 1: Add behavior-facing accessibility assertions**

Assert the tour dialog has an accessible name, the competitor table has a caption, navigation exposes one current item after observer callback, and all Council controls remain keyboard buttons.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --run src/components/App.test.tsx`

Expected: missing accessible state assertions fail.

- [ ] **Step 3: Apply focused styles**

Reduce the hero clamp maximum and desktop size by about 12%, raise muted text luminance, add active navigation treatment, style the funnel and validation statuses, eliminate Council’s fixed internal scroll, provide mobile table cards, and add `prefers-reduced-motion: reduce` overrides. Preserve existing product visual and palette.

- [ ] **Step 4: Verify GREEN and commit**

Run: `npm test -- --run src/components/App.test.tsx && npm run build`

Expected: tests and build pass.

Commit: `style: focus reviewer experience and mobile layout`

## Task 8: Documentation, full verification, review, and deployment

**Files:**
- Modify `README.md`
- Modify `docs/research-notes.md`
- Modify `docs/methodology.md`
- Update `docs/screenshots/*.png`

- [ ] **Step 1: Update documentation**

Document the exact replay command, artifact directory, no-network boundary, A1638 counter-evidence, author-review status, 7/3/2 evidence split, sensitivity scenarios, and remaining real validation. Replace screenshots for Hero, Evidence, Opportunity, Council, Product, and Mobile.

- [ ] **Step 2: Run complete automated verification**

Run:

```text
npm ci
npm test -- --run
npm run build
python -m unittest discover -s tests -p "test_*.py" -v
python run_pipeline.py --demo
git diff --check
```

Expected: all commands succeed with no test, build, or whitespace errors.

- [ ] **Step 3: Run browser QA**

Verify desktop 1366×900 and mobile 390×844. Exercise search `Wh`, candidate switching, all sensitivity scenarios, full reviewer tour, all eight Council roles, pipeline downloads, competitor source, and PDF. Confirm no page-level horizontal overflow and no site-origin console errors.

- [ ] **Step 4: Request independent code review**

Review the complete diff for provenance honesty, source support, responsive UX, accessibility, Python path safety, and regression risk. Fix all Critical and Important findings using test-first changes.

- [ ] **Step 5: Commit, push, and monitor Pages**

Commit final docs and fixes, push `main`, watch `.github/workflows/deploy.yml` to success, then verify the live HTML, JS, CSS, PDF, and pipeline artifacts return HTTP 200. Confirm the live commit SHA matches local `HEAD`.
