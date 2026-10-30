# Antigravity commands — dùng đúng lệnh gốc

| Lệnh | Dùng khi |
|---|---|
| `/grill-me` | Hỏi owner từng câu để chốt scope (tối đa 5 câu) |
| `/plan` | Lập plan reviewable trước khi sửa/làm |
| `/goal` | Làm đến khi đạt tiêu chí; phải có 5+10 + stop rule |
| `/browser` | Browser Subagent: chụp/kiểm tra web |
| `/teamwork` | Nhiều agent chia việc/review; file ownership rõ |
| `/boost` | Debug cực khó |
| `/plugin` | Cài/quản lý plugin |
| `/mcp` | Quản lý MCP |
| `/agents` | Xem agent |
| `/diff` | Xem thay đổi |
| `/learn` | Lưu bài học thành rule/skill (owner duyệt) |
| `/schedule` | Hẹn giờ chạy lại |

## Cảnh báo
- Lệnh đúng `/teamwork`, không `/teamworld`; `/teamwork-preview` cũ; `/review` không riêng.
- `/goal` không có iteration cap; một goal/conversation; dừng sau 2 fail/30 phút.
- `/teamwork` docs không ghi browser; audit visual dùng `/browser`.
- `/plugin`/`/mcp` vẫn cần app xác nhận.
