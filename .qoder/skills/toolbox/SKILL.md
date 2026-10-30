---
name: toolbox
description: "Dò/cài skill, plugin, MCP từ allowlist bằng Qoder settings; app xác nhận."
---

# /toolbox

1. Đọc `core/toolbox/registry.json`.
2. Inventory bằng `mcp_list`/settings.
3. Thiếu tool → `mcp__qoder-settings__search_extensions` + `install_extension`; MCP dùng `manage_app_mcp`.
4. Chỉ nguồn allowlist; app xác nhận; không nhập token vào config.
5. Healthcheck; ghi log; fallback/BLOCKED.
