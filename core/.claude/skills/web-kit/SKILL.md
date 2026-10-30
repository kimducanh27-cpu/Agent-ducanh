---
name: web-kit
description: "Route web tasks to the correct kit and load its prompts/handoff."
---

# /web-kit

1. Read `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`.
2. Read `agent-state/PROJECT.md` and `agent-state/HANDOFF.md` if present.
3. Pick kit: new-web, audit-fix, feature, ui-rework, maintenance.
4. Read `kits/<kit>/AGENTS.md` + prompt.
5. Return kit/mode/files/questions; no code before owner authorizes scope.

Aliases: `/web-kit new|audit|fix|verify|feature|ui|triage|perf|release`.
Choose Lite/Full per `core/prompts/lite.md`; GitHub research when triggered.
Perf: `core/prompts/perf-web.md`; release: `core/prompts/release-web.md` (deploy only with owner permission).
UI: `core/rules/ui-quality.md` + `agent-state/DESIGN.md`; write `UI_REVIEW.md`; `/ui-review`.
Style: `core/rules/ui-style.md` + `docs/style/directions.md`; choose a pack by content; `/style-web`.

Use Playwright/Chrome DevTools MCP for browser evidence. Missing browser = blocked.
