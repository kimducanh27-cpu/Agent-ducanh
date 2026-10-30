# Bản tóm tắt 1 trang — Focus Board demo

## Kết quả
- Web demo chạy được, không lỗi console.
- 4 kích thước 1440/768/390/320: không overflow.
- Form báo lỗi đúng field; form hợp lệ hiện thông báo demo.
- axe: 0 vi phạm; 1 mục cần kiểm tay.

## 3 việc nên làm trước
1. Thêm `aria-current` cho nav nếu có scroll-spy (U1, P3).
2. Chạy performance trace 3 lần trước khi coi là release.
3. Test screen reader thật + Firefox/WebKit nếu cần.

## 3 việc để sau
1. Backend/form thật (nếu muốn thu email).
2. Thêm OG image/SEO public.
3. Dark mode (nếu cần).

## Bằng chứng
- `../screenshots/desktop.png`, `tablet.png`, `mobile.png`, `narrow.png`.
- `../screenshots/verify.json`, `axe.json`.
- `AUDIT_REPORT.md`, `VERIFICATION_REPORT.md`.

## Cần bạn quyết
> Sửa U1 (aria-current) trước, hay chạy performance trace trước?

## Lưu ý
- Chưa đo performance; chưa test screen reader/browser khác.
- Form chỉ demo, không gửi email/lưu dữ liệu.
