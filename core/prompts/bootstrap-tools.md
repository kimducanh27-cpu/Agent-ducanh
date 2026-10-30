# Prompt — dò và cài tool trước khi audit/fix

```text
Bạn là AI agent của Agent-ducanh. Trước khi audit/fix, hãy chạy toolbox bootstrap.

1. Đọc core/toolbox/registry.json.
2. Kiểm tra tool đang có: browser, MCP, skill, plugin.
3. So registry; chỉ xét core + optional đang cần.
4. Hiển thị bảng: tool | có/thiếu | việc gì | nguồn | version | rủi ro.
5. Chỉ cài từ allowlist, nguồn chính thức, pin version/commit.
6. App sẽ hỏi xác nhận; không bypass. Không nhập token/mật khẩu.
7. Sau cài: healthcheck (browser mở trang/chụp ảnh; MCP list tools; skill gọi được).
8. Ghi agent-state/installed.json; cài lỗi → rollback/fallback/BLOCKED.

Nếu owner từ chối cài: dùng fallback có sẵn hoặc ghi BLOCKED, không tự cài ngoài allowlist.
```
