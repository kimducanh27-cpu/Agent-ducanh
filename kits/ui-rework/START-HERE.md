# ui-rework — đổi GUI/UI/UX

## Khi dùng
Owner nói “xấu”, “không ưng”, “màu không đều”, “quá AI”, “đổi layout/UX”, “thiếu animation”.
Không cần owner nhớ nhãn; hiểu phản hồi tự nhiên.

## Chuẩn bị
1. Copy **nội dung** `core/` vào root project.
2. Copy thư mục này vào `<project>/kits/ui-rework/` (giữ tên `kits`).
3. Đọc PROJECT/HANDOFF; chụp before nếu có.

## Chạy
- Gõ `/web-kit` và nói phản hồi, hoặc đọc lần lượt:
  1. `prompts/01-ui-audit.md`
  2. `prompts/02-directions.md`
  3. `prompts/03-implement.md`
  4. `prompts/04-verify.md`
- AI audit hiện trạng → 2 hướng nếu mơ hồ → implement → before/after → owner review.

## Nguyên tắc
- Giữ phần đã được chấp nhận; không redesign toàn app nếu feedback local.
- Token/component-first; không thêm UI kit nặng.
- Before/after cùng route/viewport/fixture.
- Không loop vô hạn; chờ feedback mới.
