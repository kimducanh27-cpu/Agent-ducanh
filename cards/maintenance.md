# Thẻ — Bug/hotfix/bảo trì

## Dùng khi
Có lỗi, hotfix, chậm, bảo mật hoặc sửa nhỏ.

## Bạn nói
“Lỗi [..] ở [URL]. Triage, fix tối thiểu, kiểm tra lại.”

## AI làm
1. Triage P0/P1/P2, reproduce.
2. Debug có bằng chứng.
3. Fix tối thiểu + regression.
4. Incident/handoff.

## Bạn nhận
Fix, ảnh trước/sau, mô tả nguyên nhân.

## Bạn kiểm
- Lỗi đã hết.
- Không phát sinh lỗi mới.
- Không sửa ngoài scope.

## Đừng
- Đừng để AI sửa mò quá 2 lần.
- Đừng bỏ qua reproduce.
- Đừng deploy nếu chưa verify.
