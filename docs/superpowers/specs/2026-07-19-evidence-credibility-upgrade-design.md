# Evidence Credibility Upgrade Design

**Date:** 2026-07-19
**Project:** Anker AI Native Product Lab
**Status:** Approved direction; written specification awaiting author review

## 1. Goal

Reduce the central credibility risk: a reviewer should be able to distinguish between evidence that preceded the Aero 10K concept, AI-generated hypotheses, deterministic demo calculations, and decisions that still require author or user validation.

The upgrade must make the project answer four questions without relying on presentation claims:

1. What information entered the AI workflow?
2. What did the AI produce before the final concept was selected?
3. Why were alternatives retained or rejected?
4. Which product assumptions can still be disproved?

## 2. Chosen approach

Three approaches were considered:

1. **Evidence credibility upgrade — selected.** Add committed run artifacts, an offline replay tool, competitor counter-evidence, scoring sensitivity, a concept funnel, and a validation board. This produces the strongest competition evidence without requiring a public API key.
2. **Visual polish only.** Improve typography, navigation, and Council layout. This is faster but does not answer whether the workflow was reconstructed after choosing Aero 10K.
3. **Live model integration.** Call a model from the public website. This introduces key management, network variability, cost, and a misleading impression that real-time generation is more important than traceability.

The selected approach keeps the site static and deployable to GitHub Pages. It demonstrates a real, committed Codex-assisted run and uses a deterministic Python script to replay its normalized artifacts. It does not pretend the replay script is a live model call.

## 3. Truth and provenance contract

Every artifact and UI claim follows these rules:

- The run manifest records the observable model identity as `OpenAI Codex (GPT-5 family; exact server snapshot not exposed to the client)`, the date, input files, prompt files, and output files.
- Raw concept output generated during this Codex collaboration is committed without retroactively rewriting it to match the final concept.
- Normalization, clustering, scoring, and selection are stored separately from raw output.
- The author-review field remains `pending_author_confirmation` until Zhao Zijian explicitly reviews it. The site must not claim completed human approval.
- `python run_pipeline.py --demo` performs an offline deterministic replay from committed JSON. Its output states that it does not call a model and does not regenerate research.
- Public-source evidence includes a URL and access date. Interview hypotheses and synthetic challenges never use fabricated quotes, respondents, sample sizes, or completion claims.
- Current opportunity baselines remain `SYNTHETIC_DEMO`; sensitivity analysis demonstrates ranking behavior, not market truth.

## 4. Information architecture

The existing single-page structure is retained. Two new sections and three expanded sections are added:

1. Hero and SCOPE overview
2. Evidence Lab — expanded evidence categories, explicit severity scores, and counter-evidence
3. Opportunity Map — scoring rubric and sensitivity analysis
4. **Decision Ledger — new** run manifest, artifact links, concept funnel, and accept/reject decisions
5. AI Council — current role plus compact completed-summary presentation
6. Product Concept — official A1638 comparison and explicit differentiation test
7. Evolution timeline
8. **Validation Board — new** falsifiable hypotheses, methods, thresholds, status, and failure decisions
9. Method comparison and resources

The header adds active-section highlighting and a “3-minute reviewer tour.” The tour steps through Evidence, Decision Ledger, AI Council, Product Difference, and Validation without changing the underlying document order.

## 5. AI run and decision ledger

### 5.1 Committed artifacts

The repository adds this structure:

```text
pipeline/
  data/evidence-input.json
  prompts/opportunity-generation.md
  prompts/council-review.md
  runs/2026-07-19/run-manifest.json
  runs/2026-07-19/raw-opportunities.json
  runs/2026-07-19/normalized-opportunities.json
  runs/2026-07-19/decision-ledger.json
  runs/2026-07-19/council-transcript.json
run_pipeline.py
```

The raw run contains 30 concept directions. The normalized output groups them into 10 clusters, promotes 5 comparable candidates, and selects 1 working concept. Each transition stores a reason and linked evidence IDs. Counts shown in the UI are calculated from these committed artifacts rather than written independently into the component.

### 5.2 Offline replay

`python run_pipeline.py --demo` validates the manifest and evidence references, recalculates candidate scores, prints the 30 → 10 → 5 → 1 funnel, and writes four files under `artifacts/demo-run/`:

- `evidence-cards.json`
- `opportunity-ranking.json`
- `council-review.json`
- `decision-log.json`

The generated directory is ignored by Git. A `--output` option may select another directory. Invalid evidence references or malformed scores fail with a non-zero exit code and a clear message.

## 6. Evidence Lab upgrade

One new public counter-evidence card is added for Anker Nano Power Bank A1638. The official source confirms existing 10,000mAh capacity, 45W output, retractable USB-C cable, smart display, and ActiveShield temperature monitoring. This card is categorized as `COUNTER_EVIDENCE` and directly challenges Aero 10K differentiation.

The summary becomes `7 public sources / 3 interview hypotheses / 2 AI synthetic challenges`. Cards additionally expose an evidence role:

- User pain or rule constraint
- Competitor evidence
- Brand capability evidence
- Counter-evidence
- Interview hypothesis
- AI challenge

Severity is displayed numerically as `n/5`. The rubric is visible beside the filters:

- 1 — inconvenience with an easy workaround
- 2 — repeated friction but task remains easy
- 3 — meaningful delay, confusion, or compromise
- 4 — task failure or strong anxiety in an important scene
- 5 — safety, compliance, or inability to complete the task

The UI explains that regulatory and competitor evidence severity measures decision impact, not user-reported emotion.

## 7. Opportunity scoring and sensitivity

The default formula remains:

```text
O = C × (0.25F + 0.25S + 0.15T + 0.15W + 0.20A) - R
```

The page adds metric anchors for 1, 3, and 5 and three clearly labeled scenarios:

- Balanced baseline: current published weights, risk multiplier 1.0
- Safety-first challenge: increases severity and risk influence, reduces willingness influence
- Commercial challenge: increases frequency and willingness influence, reduces severity influence

The sensitivity panel recomputes all five candidates for all three scenarios, shows rank changes, and explicitly calls out whether the winner changes. No scenario is presented as objectively correct. The computation lives in pure TypeScript functions covered by unit tests.

## 8. Competitor difference matrix

The Product Concept section adds a source-linked comparison between official A1638 capabilities and proposed Aero 10K changes:

| Capability | A1638 official capability | Aero 10K proposed difference | Required proof |
| --- | --- | --- | --- |
| Capacity / output | 10,000mAh / 45W | No claimed differentiation | None; treated as parity |
| Retractable cable | Present | No claimed differentiation | None; treated as parity |
| Display | Smart status/power-flow display | Persistent Wh and travel-state legibility | Timed comprehension test |
| Temperature protection | ActiveShield internal monitoring | Passive visible thermochromic cue | Thermal threshold and comprehension test |
| Carry structure | Everyday portable form | Personal bag-strap fixation | Retrieval and snag task test |
| Value proposition | Everyday compact fast charging | Travel-rule judgment and anomaly awareness | Scenario success and willingness test |

The copy states that Aero 10K is not differentiated unless the three proposed task improvements outperform the existing product in real tests.

## 9. Validation board

The board contains falsifiable hypotheses rather than outcome claims:

| Hypothesis | Method | Threshold | Current status | Failure decision |
| --- | --- | --- | --- | --- |
| Users correctly interpret the temperature cue | 10-person blinded concept test | at least 8/10 correct without explanation | Not run | Remove or redesign the cue |
| Persistent Wh improves rule judgment | A/B timed task against a conventional label | at least 20% faster with no accuracy loss | Not run | Return to a conventional label |
| Bag-strap fixation improves access | 10-person seated retrieval task | at least 9/10 complete without snag | Not run | Replace with lanyard or storage structure |
| Users will pay for the travel bundle | Price-ladder concept interview | Predefined target purchase rate set before interviews | Not run | Limit to premium variant or stop concept |

The fourth threshold cannot be assigned a numeric target without pricing and market context, so the board explicitly requires the author to pre-register it before interviews rather than inventing a number.

## 10. Interaction and visual changes

- Reduce desktop hero headline size by approximately 12% and use balanced line breaks so Chinese punctuation does not sit alone.
- Increase secondary-text contrast while preserving the navy, blue, cyan, and white visual system.
- Replace AI Council’s long internal scroll with one current-role card, a short list of completed conclusions, and a disclosure for the full transcript.
- Highlight the active navigation item using `IntersectionObserver`, with an accessible fallback on click.
- Add a reviewer-tour controller that exposes current step, purpose, next/back controls, and `scrollIntoView` navigation.
- On mobile, keep opportunity tabs horizontally scrollable, stack evidence cards into one column, and ensure the hero and comparison matrix do not create page-level horizontal overflow.
- Respect reduced-motion preferences for tour scrolling and Council transitions.

## 11. Component and data boundaries

New focused modules:

- `src/data/runLedger.ts` — browser-safe normalized run metadata
- `src/data/competitors.ts` — source-linked comparison rows
- `src/data/validation.ts` — falsifiable validation hypotheses
- `src/lib/sensitivity.ts` — pure scenario scoring and rank-change functions
- `src/components/DecisionLedger.tsx` — run provenance and funnel UI
- `src/components/SensitivityPanel.tsx` — scenario comparison UI
- `src/components/CompetitorMatrix.tsx` — A1638 comparison UI
- `src/components/ValidationBoard.tsx` — validation status UI
- `src/components/ReviewerTour.tsx` — guided navigation controller

Existing components remain responsible for their current sections. Shared types are extended in `src/types.ts`. Static downloadable copies of pipeline artifacts are published under `public/pipeline/` so GitHub Pages visitors can inspect the same records.

## 12. Testing and acceptance

### Automated tests

- Unit tests verify scenario weights, deterministic rankings, rank changes, and score boundaries.
- Data-integrity tests verify every ledger evidence ID exists, every competitor claim has a source, all validation rows have a failure decision, and public/hypothesis/synthetic counts match the displayed summary.
- Component tests verify the run disclosure, funnel counts, A1638 parity language, explicit `n/5` severity, validation statuses, Council summary behavior, and reviewer-tour navigation.
- Python `unittest` coverage verifies deterministic demo output, invalid evidence references, custom output directories, and no-network behavior.
- Existing 19 tests continue to pass.

### Manual and deployment acceptance

- `npm ci`, `npm test -- --run`, `npm run build`, and `python -m unittest` pass.
- `python run_pipeline.py --demo` produces the four declared artifacts and no model/network call.
- Desktop and mobile layouts have no page-level horizontal overflow or site-origin console errors.
- All run artifacts, official competitor source, prompts, PDF, and research downloads return HTTP 200 after deployment.
- GitHub Actions deploys the exact tested commit to the existing Pages URL.

## 13. Explicit non-goals

- No fabricated interviews, public-review corpus, market size, price elasticity, thermal result, certification, or cost estimate.
- No public API key or live model call from GitHub Pages.
- No claim that the author has reviewed the generated run until that review occurs.
- No claim that Aero 10K is differentiated merely because it adds Wh, a temperature cue, or a clip.
- No unrelated visual redesign or replacement of the existing SCOPE narrative.
