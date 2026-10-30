# NEW_WEB_PLAN.md — Focus Board demo

## Sitemap
Một trang `/index.html`:
1. Hero
2. Cách hoạt động
3. Mẫu một ngày
4. Form nhận kế hoạch (demo)
5. Footer

## Core flow
1. Đọc hero → hiểu sản phẩm.
2. Xem 3 bước → xem mẫu ngày.
3. Điền form → validation → thông báo demo.
4. Không gửi dữ liệu ra ngoài.

## Design direction
- Editorial giấy ấm, chữ serif lớn, accent xanh lá và cam.
- Bố cục 2 cột hero; board nghiêng nhẹ ở desktop.
- Mobile: 1 cột; board không nghiêng.

## Tokens
- Paper `#f6f1e7`, ink `#1f2a24`, accent `#1f7a5a`, warm `#92450f` (đổi từ `#c96f2d` sau khi kiểm contrast axe).
- Radius 18px; shadow mềm; spacing theo cụm.

## Content
- Hero: “3 việc mỗi ngày. Xong là nghỉ.”
- 3 bước: chọn 3 việc, hẹn giờ, nhìn lại.
- Form: tên, email, mục tiêu; chỉ demo, không gửi.

## AC/V
- AC-1: form thiếu/sai hiện lỗi tại field; focus field đầu tiên.
- AC-2: form hợp lệ hiện thông báo; không gửi network.
- AC-3: 360/768/1440 không overflow; nav/CTA dùng được.
- AC-4: keyboard đi hết form; focus visible; label đầy đủ.
- AC-5: reduced-motion tắt transition.

## Release
- Local only; không deploy. Chuyển `audit-fix` sau khi owner review.
