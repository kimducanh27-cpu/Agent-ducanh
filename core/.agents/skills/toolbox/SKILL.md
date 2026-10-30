---
name: toolbox
description: "Dò tool/skill/MCP còn thiếu, cài từ allowlist sau khi owner xác nhận, healthcheck và fallback."
---

# /toolbox

1. Đọc `core/toolbox/registry.json`.
2. Inventory tool đang có: browser/MCP/skill/plugin.
3. So registry; hiển thị bảng: tool | có/thiếu | việc gì | nguồn | rủi ro.
4. Chỉ cài từ allowlist, nguồn chính thức, pin version/commit.
5. App xác nhận là bắt buộc; không bypass.
6. Healthcheck sau cài: browser mở trang/chụp ảnh; MCP list tools; skill gọi được.
7. Ghi `core/toolbox/installed.example.json` → bản thật trong `agent-state/`.
8. Cài lỗi → gỡ/rollback + fallback/BLOCKED.

Không cài tool ngoài allowlist; không lưu secret/token.
