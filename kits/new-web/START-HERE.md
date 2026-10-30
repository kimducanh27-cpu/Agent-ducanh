# new-web — làm website mới

## Khi dùng
Chưa có web, hoặc làm lại từ đầu. Nếu đã có code, dùng `feature`/`audit-fix` thay vì new-web.

## Chuẩn bị
1. Copy **nội dung** `core/` vào root project.
2. Copy thư mục này vào `<project>/kits/new-web/` (giữ tên `kits`).
3. Điền `agent-state/PROJECT.md` (brief). Nếu chưa có, dùng `core/templates/project-state.md`.

## Chạy
- Mở project bằng Antigravity/Qoder/Claude Code.
- Gõ `/web-kit` và nói “làm web mới”, hoặc đọc lần lượt:
  1. `prompts/01-intake.md`
  2. `prompts/02-plan.md`
  3. `prompts/03-build.md`
  4. `prompts/04-verify.md`

## Nguyên tắc
- Chưa code trước khi plan được owner duyệt.
- Không tự thêm trang/tính năng ngoài brief.
- Làm từng slice; mỗi slice có AC/check + browser verify.
- Chỉ deploy khi owner cho phép.

## Xong khi
- Web chạy local; AC chính pass.
- Responsive/a11y/perf trigger pass hoặc ghi blocked.
- Có owner summary + `agent-state/HANDOFF.md`.
