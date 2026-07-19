# Anker AI Native Product Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, publish, and deploy a responsive React product lab that demonstrates the SCOPE method and the Anker Aero 10K candidate concept with honest, traceable evidence.

**Architecture:** A Vite single-page application composes focused feature sections from typed local data. Pure functions handle opportunity scoring, evidence filtering, and base-aware asset paths; Vitest covers those functions before the UI consumes them. GitHub Actions builds and deploys the static `dist` directory to Pages.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS, SVG, GitHub Actions

---

### Task 1: Repository foundation and approved research assets

**Files:**
- Create: `.gitignore`, `.gitattributes`, `LICENSE`, `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Copy: `public/docs/Anker_AI原生产品设计方案_赵子健.pdf`
- Verify: `docs/superpowers/specs/2026-07-19-anker-ai-native-product-lab-design.md`

- [ ] Rename the unborn branch with `git branch -M main` and confirm `git status -sb` reports `main`.
- [ ] Create Vite metadata with scripts `dev`, `build`, `test`, and `test:watch`; configure `base: '/anker-ai-native-product-lab/'`.
- [ ] Copy the provided PDF byte-for-byte from `E:/edge下载/Anker_AI原生产品设计方.pdf` to the public target name and compare SHA-256 hashes.
- [ ] Install dependencies with `npm install` and confirm the lockfile is generated without audit errors that block the build.
- [ ] Commit the verified foundation with `git commit -m "chore: initialize product lab"`.

### Task 2: Pure domain behavior using red-green-refactor

**Files:**
- Create: `src/types.ts`, `src/lib/opportunity.ts`, `src/lib/opportunity.test.ts`, `src/lib/evidence.ts`, `src/lib/evidence.test.ts`, `src/lib/assets.ts`, `src/lib/assets.test.ts`
- Create: `src/data/evidence.ts`, `src/data/opportunities.ts`, `src/data/council.ts`, `src/data/evolution.ts`, `src/data/comparison.ts`

- [ ] Write an opportunity test asserting `calculateOpportunityScore({ confidence: 4, frequency: 3, severity: 5, trend: 4, willingness: 3, capability: 5, risk: 1 })` equals `15.2`.
- [ ] Run `npm test -- src/lib/opportunity.test.ts` and confirm failure because the module is absent.
- [ ] Implement input clamping to 0–5, weighted scoring, one-decimal rounding, and descending comparison sorting; rerun the test until it passes.
- [ ] Write evidence tests for keyword, scene, minimum severity, and confidence filters; verify the missing filter fails, then implement the pure `filterEvidence` function.
- [ ] Write an asset-path test expecting `/anker-ai-native-product-lab/docs/file.pdf`; verify red, implement `assetPath`, and verify green.
- [ ] Add typed local datasets in which every record declares `PUBLIC_SOURCE`, `INTERVIEW_HYPOTHESIS`, or `SYNTHETIC_DEMO`, and every public source includes a URL and access date.
- [ ] Run `npm test -- --run` and commit with `git commit -m "test: define product lab domain behavior"`.

### Task 3: Application shell and evidence-to-opportunity experience

**Files:**
- Create: `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- Create: `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/ScopeFlow.tsx`, `src/components/SectionHeading.tsx`, `src/components/EvidenceLab.tsx`, `src/components/OpportunityMap.tsx`, `src/components/MetricBars.tsx`
- Create: `src/components/App.test.tsx`, `src/test/setup.ts`

- [ ] Write an application test that expects the project question, independent-project disclosure, evidence search control, opportunity score, and AI Council start control.
- [ ] Run `npm test -- src/components/App.test.tsx` and confirm the render test fails because the UI modules do not exist.
- [ ] Implement the semantic shell, skip link, anchor navigation, Hero, SCOPE flow, Evidence Lab controls, empty state, score sliders, metric bars, and five-direction comparison.
- [ ] Use labels, fieldsets, native buttons, visible focus states, and `aria-live` for the changing score.
- [ ] Run the application test and full suite until green, then commit with `git commit -m "feat: build evidence and opportunity labs"`.

### Task 4: Council, product, evolution, comparison, and resources

**Files:**
- Create: `src/components/AICouncil.tsx`, `src/components/ProductConcept.tsx`, `src/components/ProductVisual.tsx`, `src/components/EvolutionTimeline.tsx`, `src/components/MethodComparison.tsx`, `src/components/Resources.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx`, `src/styles.css`, `src/components/App.test.tsx`

- [ ] Extend the render test to start the council, reveal the first role, advance the workflow, and reset it; run the focused test and confirm failure before adding behavior.
- [ ] Implement the eight-role local council demo with progress, conflict labels, sequential controls, a reset control, and a persistent simulation disclosure.
- [ ] Add the original SVG/CSS power-bank visual, proposed specifications, explicit feasibility disclaimers, and carrier-rule notice.
- [ ] Add the evidence-linked V0–V3 evolution timeline and the eight-row traditional-versus-AI comparison.
- [ ] Add local and external resources through base-aware links, plus the final independence/data-integrity statements.
- [ ] Run `npm test -- --run` and commit with `git commit -m "feat: complete product definition narrative"`.

### Task 5: Durable research documentation and role prompts

**Files:**
- Create: `docs/methodology.md`, `docs/research-notes.md`, `docs/interview-guide.md`, `docs/evidence-template.csv`
- Create: `prompts/user-researcher.md`, `prompts/product-manager.md`, `prompts/hardware-engineer.md`, `prompts/compliance-expert.md`, `prompts/red-team.md`
- Copy: matching public downloads under `public/docs/` and `public/prompts/`

- [ ] Write methodology and research notes that cite the four supplied sources, distinguish observations from hypotheses, and state the access date `2026-07-19`.
- [ ] Write a neutral interview guide that asks about recent behavior before concept reactions and never claims that interviews have already occurred.
- [ ] Create a UTF-8 CSV template with evidence provenance, verification status, and confidence fields.
- [ ] Write five reusable prompts that require citations, uncertainty, contradiction reporting, and structured outputs.
- [ ] Copy the download versions into `public`, compare hashes for each source/public pair, and commit with `git commit -m "docs: add research kit and AI prompts"`.

### Task 6: README, screenshots, deployment, and complete verification

**Files:**
- Create: `README.md`, `.github/workflows/deploy.yml`, `docs/screenshots/*.png`
- Modify: `src/styles.css` if visual verification reveals defects

- [ ] Write the README with background, concept, SCOPE, feature tour, technology, commands, live URL, PDF URL, screenshots, integrity disclosure, independent-project disclosure, author, and GitHub account.
- [ ] Configure Actions permissions for Pages and use `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- [ ] Run `npm test -- --run`, `npm run build`, and a production preview; fail the task on any non-zero exit.
- [ ] Use a real browser at desktop and mobile widths to exercise search, filters, sliders, council controls, all resource links, and console output.
- [ ] Capture 3–5 PNG screenshots into `docs/screenshots`, add them to README, and verify each image is non-empty and legible.
- [ ] Scan tracked files for secrets, local absolute paths, unsupported safety claims, and unlabelled synthetic data.
- [ ] Review the full diff against the design specification, fix every critical or important issue, rerun the complete verification suite, and commit with `git commit -m "docs: prepare public showcase and deployment"`.

### Task 7: GitHub publication and live smoke test

**Files:**
- No source changes expected unless deployment verification exposes a reproducible defect.

- [ ] Create the public repository with `gh repo create Xiaotian69/anker-ai-native-product-lab --public --source . --remote origin` because the read-only lookup confirmed it does not exist.
- [ ] Push `main` with `git push -u origin main` and confirm the remote default branch is `main`.
- [ ] Enable Pages with the GitHub Actions build type if repository settings require it, then watch the deployment run to completion.
- [ ] Request the repository URL and `https://xiaotian69.github.io/anker-ai-native-product-lab/`; verify HTTP success, the project question, built asset responses, and the PDF response.
- [ ] Return the repository, live site, test/build evidence, feature summary, and clearly separated real-research follow-ups.
