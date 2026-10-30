# Toolbox — tool gợi ý

| Tool | Việc | Bắt buộc? |
|---|---|---|
| Superpowers | Quy trình: plan, debug, TDD, verify | Tùy chọn |
| Chrome DevTools MCP | Browser, ảnh, console/network, performance | Core |
| Playwright MCP | Cross-browser, nhiều context | Tùy chọn |
| Context7 MCP | Tra docs/API đúng version | Tùy chọn |
| GitHub MCP | Issue/PR/repo context | Tùy chọn |
| Figma MCP | So design | Chỉ khi có design |
| Sentry MCP | Lỗi production | Chỉ khi có Sentry |
| Memory MCP | Ghi nhớ dài hạn | Tùy chọn |
| Impeccable | Design critique/polish | Tùy chọn cho ui-rework/new-web |

- Chỉ cài từ `registry.json` (allowlist).
- App xác nhận cài; không bypass.
- Pin version/commit; không auto-update; không lưu secret.
- Cài lỗi → gỡ/rollback + fallback/BLOCKED.
- Impeccable: optional, full skill pack, không auto `live`/`overdrive`.
