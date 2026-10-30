# Changelog

## 0.10.0-layout — 2026-10-30

- Added `core/rules/ui-layout.md`: 10 page questions, menu/navigation, visual hierarchy, palette rules, PAGE_SPEC.
- Added `docs/style/site-goals.md`: learning platform goals first, then e-commerce, SaaS, docs, community, media, portfolio, booking, nonprofit, dashboard; GitHub pattern references.
- Added `docs/style/page-patterns.md`: 9 page patterns with section order, CTA, states, mobile, anti-patterns.
- Added `core/templates/page-spec.md`, `core/prompts/page-web.md`, `/page-web`, and demo/learning PAGE_SPEC examples.
- Added `scripts/check-layout.mjs`; wired into CI/pre-commit/check-docs/eval; manifests 0.10.0.

## 0.9.0-style — 2026-10-30

- Added `core/rules/ui-style.md`: AI chooses a style direction from content, audience, and task; one primary pack plus at most one accent.
- Added `docs/style/directions.md`: Editorial calm, Product precise, Warm expressive with palette, type, UX style, motion, signature, do/don't.
- Extended `DESIGN.md` template with style direction, signature, density, voice, and anti-patterns.
- Added `core/prompts/style-web.md` + read-only planning command `/style-web`; no 7th Antigravity skill.
- Wired style into ui-rework/new-web prompts, docs, checks, CI, and plugin manifests 0.9.0.
- Demo Focus Board: documented Editorial calm, added a three-beat signature, tokenized radii/warm-soft, fixed logo accessible-name mismatch; before/after evidence.

## 0.8.0-ui-quality — 2026-10-30

- Added `core/rules/ui-quality.md`: 10 concrete UI/UX rules with evidence, states, a11y, responsive, tokens, motion, anti-AI-slop, and sign-off.
- Added `core/templates/design-spec.md` for `agent-state/DESIGN.md`.
- Added `core/templates/ui-review.md` for `agent-state/UI_REVIEW.md`.
- Added read-only `/ui-review` command; no 7th Antigravity skill.
- Wired UI rule/templates into ui-rework kit, core AGENTS, kit map, checks, CI, and plugin manifests 0.8.0.

## 0.7.0-perf-release — 2026-10-30

- Added `perf-web` as the 6th Antigravity skill: 3-run baseline, before/after, regression, lab-vs-field.
- Added shared `core/prompts/perf-web.md`, perf report template, Lighthouse CI doc, Claude command.
- Added `release-web` gated prompt + template + Claude command; kept manual to prevent auto-deploy.
- Added Lighthouse CI to the toolbox registry and healthcheck.
- Wired perf/release into router, kit map, web-kit aliases, checks, and plugin manifests 0.7.0.

## 0.6.1-portable — 2026-10-30

- Vendored the self-contained CDP harness at `scripts/lib/cdp-harness.cjs`.
- `verify-demo.cjs` and `audit-demo.cjs` now use relative harness paths; no local drive dependency.
- `check-docs` scans `.cjs` files (excluding known browser-path constants) to prevent regression.
- Verified both deep scripts from a temporary working directory; axe 0 violations.

## 0.6.0-leader — 2026-10-30

- Added `core/prompts/leader-dispatch.md`: recon → mission map → batch ≤3 → validate → spot-check 3 → repair once → merge → verify.
- Added mission/result templates with 17 required fields and status enum.
- Added rule `70-leader-dispatch.md`; workspace safety (share/inherit vs branch, one writer/file).
- Audit-web now maps 10 personas to 4 batches and rejects invalid output before scoring.
- Added `scripts/check-dispatch.mjs`; wired into CI/pre-commit/check-docs/evals.
- Plugin manifest 0.6.0 + leader dispatch suggested prompt.

## 0.5.0-persona — 2026-10-30

- Added 10 persona user-auditor cards P01–P10 (A1–A10).
- Added `user-auditor` (flash) and `bug-skeptic` (pro) subagents.
- Audit flow: personas find bugs → skeptic challenges P0/P1/P2 → report-editor judges.
- Added persona-bug-hunt prompt, bug-report template, rule 60, check-personas.
- Preference cap P3; no P0/P1 without evidence/repro.
- Plugin manifest 0.5.0 + persona suggested prompts.

## 0.4.0-antigravity — 2026-10-30

- Deep Antigravity subagent profile: exact tool whitelist, models, command policy.
- Added verifier, security-reviewer, test-engineer subagents; lens-auditor Flash, report-editor Pro.
- Added audit-web/fix-web/verify-web skills; total 5 skills to avoid context overload.
- Added `50-antigravity-subagents.md` rule and `docs/tools/antigravity-2.md`.
- Added `scripts/check-antigravity.mjs`; wired into CI/pre-commit.
- Plugin manifest version 0.4.0 + subagent suggested prompts.

## 0.3.0-p2 — 2026-10-30

- Added plugin packaging: Antigravity, Claude Code, Qoder manifests + `scripts/package-plugins.mjs`.
- Added cost/model/effort guide and notification/schedule guide.
- Added SessionEnd runlog hook + template.
- Added 5 non-tech cards for each kit.
- `dist/` is generated and gitignored.

## 0.2.0-p1 — 2026-10-30

- Added full A1–A10 lens files.
- Split feature/ui-rework/maintenance into 4 prompts each.
- Added Claude subagents: lens-auditor, verifier, security-reviewer, test-engineer.
- Added Qoder custom agent guide, MCP config example, settings permissions.
- Added demo LESSONS.md; eval expanded to 10 routing cases.

## 0.1.0-p0 — 2026-10-30

- Demo v0.1: core + new-web + audit-fix + stubs + Focus Board demo.
- Added hooks: pre-tool check, post-edit check, stop evidence.
- Added Claude commands for 7 kits.
- Added CI workflow, pre-commit, evals, check-superpowers, checkpoint.
- Added LICENSE, SECURITY, VERSION, templates for skills-used/checkpoint/lessons.
