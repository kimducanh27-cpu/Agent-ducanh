# feature — thêm tính năng vào web có sẵn

## Khi dùng
Web đã chạy, cần thêm/đổi hành vi nhưng không làm lại web. Nếu chỉ đổi giao diện → `ui-rework`; nếu là bug → `maintenance`.

## Chuẩn bị
1. Copy `core/` vào root project (giữ `core/...`) và đặt `AGENTS.md` / `.agents/` / `.claude/` / `.qoder/` ở root.
2. Copy thư mục này vào `<project>/kits/feature/` (giữ tên `kits`).
3. Đọc `agent-state/PROJECT.md` và `HANDOFF.md`.

## Chạy
- Gõ `/web-kit` và nói “thêm tính năng”, hoặc đọc lần lượt:
  1. `prompts/01-intake.md`
  2. `prompts/02-impact.md`
  3. `prompts/03-implement.md`
  4. `prompts/04-verify.md`
- AI lập impact map + plan; owner duyệt scope; AI implement + regression; ghi handoff.

## Nguyên tắc
- Brownfield: giữ stack/convention; không rewrite.
- 1 tính năng/vòng; không sửa ngoài scope.
- AC/V + regression + rollback.
- Không deploy nếu chưa được phép.
