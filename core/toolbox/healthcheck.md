# Healthcheck sau cài

| Mục | Cách kiểm | Pass khi |
|---|---|---|
| Browser | Mở `examples/demo-site/index.html` hoặc URL test | Trang render, screenshot được |
| Console | Đọc console sau load | Không có error mới |
| MCP | `list_tools`/settings list | Tool cần dùng xuất hiện |
| Skill | Gọi `/web-kit` hoặc `/audit-web` | Skill được nhận |
| Superpowers | Gọi `using-superpowers` | Skill load, không lỗi |
| OAuth | Trạng thái authorize | Có quyền cần thiết, không lộ token |
| Install log | `agent-state/installed.json` | Có version/ngày/nguồn/verify |

Không pass → gỡ/rollback hoặc fallback/BLOCKED. Không ghi “đã cài” nếu chưa verify.
