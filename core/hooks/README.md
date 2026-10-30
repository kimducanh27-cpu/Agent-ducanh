# Hooks — guardrails tự động

Các hook này **không tự bật**. Chỉ dùng sau khi owner review script và cấu hình app.

## Có gì
- `pre-tool-check.mjs`: chặn Edit/Write khi chưa có `agent-state/HANDOFF.md` hoặc `code_edit: yes`; chặn push/deploy/destructive nếu chưa authorize.
- `post-edit-check.mjs`: chạy `scripts/check-docs.mjs` sau edit.
- `stop-evidence.mjs`: chặn kết thúc nếu HANDOFF thiếu field bắt buộc.

## Claude Code
Copy `core/.claude/settings.json.example` thành `.claude/settings.json` trong project, review rồi mới bật.
Claude hooks dùng exit code 2 để chặn; stderr hiện cho agent/owner.

## Antigravity/Qoder/generic
Nếu app hỗ trợ hooks, dùng script tương đương. Nếu không:
- Dùng `.pre-commit-config.yaml` + CI.
- Dùng rule/checklist trong `core/AGENTS.md`.
- Không giả định hook có ở mọi app.

## An toàn
- Hook chạy shell tùy ý; chỉ dùng script trong repo, review trước.
- Không cấu hình hook tải từ Internet.
- Không đưa secret vào hook/env.
- Nếu hook lỗi, ghi `blocked`; không bỏ qua âm thầm.
