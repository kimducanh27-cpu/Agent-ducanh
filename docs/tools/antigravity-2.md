# Antigravity 2.0 — profile

## File conventions
- Rules: `.agents/rules/*.md`, frontmatter `trigger` + `description`; triggers `always_on`, `model_decision`, `glob`, `manual`; ≤24KB/file.
- Skills: `.agents/skills/<name>/SKILL.md`; frontmatter `name` + `description`; ưu tiên ít skill để tránh overload context.
- Subagents: `.agents/agents/<name>.md`; frontmatter `name`, `description`, `subagent: true`, `model`, `tools`, `commandExecutionPolicy`.
- Plugin: `.antigravity-plugin/plugin.json`; install `agy plugin install <folder>` hoặc đặt dưới `.agents/plugins/`.

## Subagent facts
- Tool hợp lệ đã xác minh: `view_file`, `grep_search`, `run_command`, `replace_file_content`.
- Subagent set: 7 (`user-auditor`, `bug-skeptic`, `lens-auditor`, `report-editor`, `verifier`, `security-reviewer`, `test-engineer`).
- Tool name sai có thể làm subagent treo; whitelist trong `scripts/check-antigravity.mjs`.
- `invoke_subagent`: clean slate, không kế thừa history; workspace `inherit`/`branch`/`share`; chạy song song.
- Nesting tối đa 10; kit thực tế dùng ≤2.
- `model`: `inherit`, `flash`, `pro`.
- `commandExecutionPolicy`: `off`, `auto`, `eager`, `sandbox`; read-only dùng `off`, verifier/test dùng `sandbox`.
- Browser: built-in Browser Subagent chỉ qua `/browser`; custom subagent **không được cấp** browser (docs không xác nhận).

## Leader dispatch
- Leader = main agent; giữ browser, quyền ghi file cuối và merge.
- Vòng lặp: recon → mission map → batch ≤3 → validate → spot-check 3 → repair 1 lần → merge → verify/handoff.
- Mission packet đủ 17 field theo `core/templates/subagent-mission.md`; output theo `core/templates/subagent-result.md`.
- Không gửi chat history, output mission khác, secret/PII; subagent clean slate.
- Read-only dùng `share`/`inherit`; ghi file dùng `branch`; một writer/file; leader merge.
- Output `invalid`/`blocked` không sang skeptic/judge/score; repair lần 2 vẫn lỗi → `blocked`.
- Chi tiết: `core/prompts/leader-dispatch.md`; rule `70-leader-dispatch.md`.

## Kit mapping
- Audit: main `/browser` capture → 10 `user-auditor` persona (flash, view/grep, off), batch ≤3 → `bug-skeptic` P0/P1/P2 → report-editor (pro) → main confirm 3 → verifier.
- Persona cards: `kits/audit-fix/personas/P01–P10`; preference cap P3; no cascade.
- Fix: main/`/teamwork` sửa; `/plan` nếu nhiều bước; `/goal` chỉ có 5+10 + stop rule.
- Verify: `verifier` chạy `run_command` sandbox + main `/browser`.
- Skills: `web-kit`, `toolbox`, `audit-web`, `fix-web`, `verify-web` (5; tránh thêm).

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
- Skill directory quá nhiều → context overload; giữ 5 skill.
- `replace_file_content` chỉ dùng cho test/fixture; fix do main.
