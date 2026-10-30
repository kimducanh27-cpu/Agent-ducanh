# Antigravity 2.0 — profile

## File conventions
- Rules: `.agents/rules/*.md`, frontmatter `trigger` + `description`; triggers `always_on`, `model_decision`, `glob`, `manual`; ≤24KB/file.
- Skills: `.agents/skills/<name>/SKILL.md`; frontmatter `name` + `description`; ưu tiên ít skill để tránh overload context.
- Subagents: `.agents/agents/<name>.md`; frontmatter `name`, `description`, `subagent: true`, `mainAgent: false`, `model`, `tools`, `commandExecutionPolicy` (đặt `"off"` trong dấu nháy kép để tương thích mọi YAML parser).
- Plugin: `.antigravity-plugin/plugin.json` (tối đa 3 `suggestedPrompts`) + `agents/`, `skills/`, `rules/` ngay dưới thư mục plugin; install `agy plugin install <folder>` hoặc đặt dưới `.agents/plugins/`.

## Subagent facts
- Tool hợp lệ đã xác minh: `view_file`, `grep_search`, `run_command`, `replace_file_content`.
- Subagent set: 11 — gồm **6 Core App/Dev Subagents** (`researcher`, `ui-ux-designer`, `frontend-developer`, `qa-tester`, `security-reviewer`, `verifier`) và **5 Audit/TDD Subagents** (`user-auditor`, `bug-skeptic`, `lens-auditor`, `report-editor`, `test-engineer`).
- Kiến trúc 4 tầng: **Visual Agent Dashboard** (`examples/demo-site/dashboard.html`) → **Main Coordinator** → **Subagents** → **Task & Event Tracker** (`agent-state/TASK_TRACKER.json` + `RUNLOG.md`).
- Tool name sai có thể làm subagent treo; whitelist trong `scripts/check-antigravity.mjs`.
- `invoke_subagent`: clean slate, không kế thừa history; workspace `inherit`/`branch`/`share`; chạy song song.
- Nesting tối đa 10; kit thực tế dùng ≤2.
- `model`: `inherit`, `flash`, `pro`.
- `commandExecutionPolicy`: `off`, `auto`, `eager`, `sandbox`; read-only dùng `off`, verifier/test dùng `sandbox`.
- Browser: built-in Browser Subagent chỉ qua `/browser`; custom subagent **không được cấp** browser (docs không xác nhận).

## Leader dispatch
- Leader = main agent; giữ browser, quyền ghi file cuối và merge.
- Vòng lặp: recon → mission map → batch ≤3 → validate → spot-check 3 → repair 1 lần → merge → verify/handoff.
- Mission packet đủ 18 field theo `core/templates/subagent-mission.md`; output theo `core/templates/subagent-result.md`.
- Transport: `native` (app), `cli` (`agy -p`/`/agents`, read-only batch), `teamwork` (multi-file); browser chỉ main. Xem `docs/tools/antigravity-cli.md`.
- Không gửi chat history, output mission khác, secret/PII; subagent clean slate.
- Read-only dùng `share`/`inherit`; ghi file dùng `branch`; một writer/file; leader merge.
- Output `invalid`/`blocked` không sang skeptic/judge/score; repair lần 2 vẫn lỗi → `blocked`.
- Chi tiết: `core/prompts/leader-dispatch.md`; rule `core/.agents/rules/70-leader-dispatch.md`.

## Kit mapping
- Audit: main `/browser` capture → 10 `user-auditor` persona (flash, view/grep, off), batch ≤3 → `bug-skeptic` P0/P1/P2 → report-editor (pro) → main confirm 3 → verifier.
- Persona cards: `kits/audit-fix/personas/` (P01–P10); preference cap P3; no cascade.
- Fix: main/`/teamwork` sửa; `/plan` nếu nhiều bước; `/goal` chỉ có 5+10 + stop rule.
- Verify: `verifier` chạy `run_command` sandbox + main `/browser`.
- Perf: `/perf-web` 3 run mobile/desktop, before/after; thiếu Lighthouse → blocked.
- Release: `core/prompts/release-web.md` + `/release-web`; không phải skill để tránh tự deploy; chỉ chạy khi owner gọi.
- UI: `ui-rework` + `core/rules/ui-quality.md` + `DESIGN.md`/`UI_REVIEW.md`; `/ui-review`; không thêm skill thứ 7.
- Style: `core/rules/ui-style.md` + `docs/style/directions.md`; `/style-web`; chọn pack theo nội dung.
- Page: `core/rules/ui-layout.md` + `docs/style/site-goals.md`; `/page-web`; mỗi route có `PAGE_SPEC`.
- Skills: `web-kit`, `toolbox`, `audit-web`, `fix-web`, `verify-web`, `perf-web` (6; tránh thêm).

## Native commands
`/browser`, `/plan`, `/goal`, `/teamwork`, `/boost`, `/plugin`, `/mcp`, `/agents`, `/diff`, `/grill-me`, `/schedule`.
- `/teamwork` không thay browser; chỉ khi file ownership rõ.
- `/goal` không iteration cap; một goal/conversation.
- `/schedule` chỉ khi owner muốn; không auto-deploy.

## Budget & failure
- 3 subagent/batch; pause khi budget/quota.
- Output lỗi → repair đúng mission đó; không cascade.
- Không chạy 10 subagent cùng lúc nếu không cần.
- Không đưa secret/PII vào mission/evidence.

## Pitfalls
- Custom subagent browser = không có; dùng `/browser`.
- 0×0 viewport/screenshot path sai: kiểm lại qua `/browser`.
- Skill directory quá nhiều → context overload; giữ 6 skill.
- `replace_file_content` chỉ cấp cho agent có quyền ghi theo scope (`ui-ux-designer` cho spec, `frontend-developer` cho slice UI/code trong `branch`, `qa-tester`/`test-engineer` cho test/fixture) với 1 writer/file.
