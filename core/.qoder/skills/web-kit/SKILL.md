---
name: web-kit
description: "Chọn đúng kit web và nạp prompt/handoff; dùng Agent tool + browser MCP khi cần."
---

# /web-kit

1. Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`.
2. Đọc `agent-state/PROJECT.md`, `agent-state/HANDOFF.md`.
3. Chọn kit: new-web, audit-fix, feature, ui-rework, maintenance.
4. Đọc `kits/<kit>/AGENTS.md` + prompt.
5. Trả kit/mode/file/câu hỏi; không sửa trước khi owner authorize.

Alias: `/web-kit new|audit|fix|verify|feature|ui|triage|perf|release` → kit/stage tương ứng.
Chọn Lite/Full theo `core/prompts/lite.md`; GitHub research khi có trigger.
Perf: `core/prompts/perf-web.md`; release: `core/prompts/release-web.md` (chỉ deploy khi owner cho phép).
UI: `core/rules/ui-quality.md` + `agent-state/DESIGN.md`; ghi `UI_REVIEW.md`; `/ui-review`.

Browser: Chrome DevTools MCP/browser-use; nếu nhiều agent, serialize MCP hoặc dùng CDP riêng.
Thiếu tool: `/toolbox` hoặc `blocked`.
