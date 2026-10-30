---
name: web-kit
description: "Chọn đúng kit web (mới, audit/fix, feature, UI rework, maintenance) và nạp prompt/handoff liên quan."
---

# /web-kit

Khi được gọi:

1. Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`.
2. Đọc `agent-state/PROJECT.md` và `agent-state/HANDOFF.md` nếu có.
3. Chọn kit theo router; nếu không chắc, hỏi tối đa 3 câu.
4. Đọc `kits/<kit>/AGENTS.md` + prompt tương ứng.
5. Trả về:
   - Kit + mode
   - File đã đọc
   - Việc tiếp theo / câu hỏi còn thiếu
6. Không sửa code trước khi owner authorize scope.

Alias: `/web-kit new|audit|fix|verify|feature|ui|triage` → kit tương ứng.
Chọn Lite/Full theo `core/prompts/lite.md`; GitHub research khi có trigger (`core/prompts/github-research.md`).

Nếu thiếu browser/tool: chạy `/toolbox` hoặc ghi `blocked`; không suy từ code.

Kit paths:
- `kits/new-web/`
- `kits/audit-fix/`
- `kits/feature/`
- `kits/ui-rework/`
- `kits/maintenance/`

Explicit Antigravity skills:
- `/audit-web` — 10 persona + leader dispatch (batch ≤3) + `bug-skeptic` + `report-editor`; lens-auditor là second opinion.
- `/fix-web` — owner authorize + 5+10 + verifier.
- `/verify-web` — read-only verifier.
- `/perf-web` — 3 run, before/after, regression; skill thứ 6.

Release: đọc `core/prompts/release-web.md`; dùng `/release-web` ở Claude/Qoder. Không phải skill Antigravity để tránh tự kích hoạt deploy.
UI: đọc `core/rules/ui-quality.md` + `agent-state/DESIGN.md`; ghi `UI_REVIEW.md`; `/ui-review` (Claude/Qoder).
Style: đọc `core/rules/ui-style.md` + `docs/style/directions.md`; chọn pack theo nội dung; `/style-web`.
Page: đọc `core/rules/ui-layout.md` + `docs/style/site-goals.md`; mỗi route có `PAGE_SPEC`; `/page-web`.

