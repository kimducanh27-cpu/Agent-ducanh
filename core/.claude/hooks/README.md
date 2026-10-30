# Claude hooks

Dùng `core/.claude/settings.json.example` sau khi copy core ra root project.

- Path hook: `hooks/pre-tool-check.mjs`, `hooks/post-edit-check.mjs`, `hooks/stop-evidence.mjs`.
- Exit code 2 = chặn.
- Không bật khi chưa review; không dùng hook ngoài repo.
