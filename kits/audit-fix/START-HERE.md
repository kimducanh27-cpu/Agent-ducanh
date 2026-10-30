# audit-fix — audit và sửa web đang chạy

## Khi dùng
Web đã có, cần kiểm tra tổng thể hoặc sửa lỗi. Nếu muốn thêm hành vi mới → `feature`; đổi giao diện → `ui-rework`.

## Chuẩn bị
1. Copy **nội dung** `core/` vào root project.
2. Copy thư mục này vào `<project>/kits/audit-fix/` (giữ tên `kits`).
3. Điền `agent-state/PROJECT.md` (URL, scope, test account, non-goals).

## Chạy
- Gõ `/web-kit` và nói “audit web”, hoặc đọc:
  1. `prompts/audit.md` — chỉ audit, không sửa.
  2. Owner chọn việc + authorize scope.
  3. `prompts/fix.md` — sửa một root cause.
  4. `prompts/verify.md` — AI khác kiểm tra.

## Nguyên tắc
- Audit `review_only`; không sửa code.
- 10 góc nhìn A1–A10; mỗi finding có evidence.
- Fix: 2–3 phương án, 5+10 tiêu chí, before/after.
- Verifier độc lập; không fake review.
- Không deploy nếu chưa được phép.
