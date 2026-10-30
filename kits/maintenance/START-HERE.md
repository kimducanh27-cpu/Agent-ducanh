# maintenance — bug/hotfix/bảo trì

## Khi dùng
Có lỗi, hotfix, chậm, bảo mật, hoặc cần sửa nhỏ. Nếu cần hành vi mới → `feature`.

## Chuẩn bị
1. Copy `core/` vào root project (giữ `core/...`) và đặt `AGENTS.md` / `.agents/` / `.claude/` / `.qoder/` ở root.
2. Copy thư mục này vào `<project>/kits/maintenance/` (giữ tên `kits`).
3. Đọc PROJECT/HANDOFF; thu thập symptom/log.

## Chạy
- Gõ `/web-kit` và nói lỗi, hoặc đọc lần lượt:
  1. `prompts/01-triage.md`
  2. `prompts/02-debug.md`
  3. `prompts/03-fix.md`
  4. `prompts/04-regression.md`
- AI triage → reproduce → debug → fix → regression → incident/handoff.

## Nguyên tắc
- Không sửa mò; systematic debugging.
- Sau 2 fix không thành → dừng/checkpoint.
- Fix tối thiểu + regression; không scope creep.
- Không deploy nếu chưa được phép.
