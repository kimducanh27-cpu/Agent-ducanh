# Claude hooks

Dùng `core/.claude/settings.json.example` sau khi copy core ra root project.

- Path hook: `core/hooks/pre-tool-check.mjs`, `core/hooks/post-edit-check.mjs`, `core/hooks/stop-evidence.mjs`, `core/hooks/session-log.mjs`.
- Exit code 2 = chặn.
- Không bật khi chưa review; không dùng hook ngoài repo.
