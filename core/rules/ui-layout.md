# UI layout — thiết kế từng trang

Áp dụng cho `new-web`, `ui-rework`. Đọc kèm `core/rules/ui-quality.md`, `core/rules/ui-style.md`, `docs/style/site-goals.md`, `docs/style/page-patterns.md`.

## 1. 10 câu hỏi mỗi trang
1. Trang này để làm gì?
2. Ai dùng, họ đến từ đâu?
3. Một hành động chính là gì?
4. Trong 5 giây đầu họ phải hiểu gì?
5. Nội dung nào bắt buộc, nội dung nào bỏ?
6. Trang cần state gì: empty/loading/error/success/disabled?
7. Trang nằm ở đâu trong menu/IA?
8. Mobile ưu tiên gì?
9. Thành công đo bằng gì?
10. Non-goals là gì?

Không trả lời được 1–3 → chưa thiết kế, chỉ đang trang trí.

## 2. Mục tiêu theo loại web
- Đọc `docs/style/site-goals.md`; chọn đúng loại web/trang.
- **Learning platform** ưu tiên 5 mục tiêu: tập trung, tìm bài, theo dõi tiến độ/level/XP, làm bài tập/quiz, quay lại học.
- Loại khác (e-commerce, SaaS, docs, community, media, portfolio, booking, nonprofit, dashboard) dùng bảng mục tiêu trong cùng file.
- Thiết kế theo job của người dùng, không theo số hiệu ứng.

## 3. Menu/navigation
- Desktop 5–7 item; mobile 3–5; label 1–2 từ.
- Logo về trang chủ; CTA chính tách khỏi menu.
- Active state `aria-current="page"`; skip link; keyboard đủ.
- Mobile menu: nút có label, focus trap, Esc đóng, focus quay lại nút.
- Breadcrumb khi sâu >2 cấp; không dùng hover-only.
- Sticky chỉ khi có lợi; không che nội dung.

## 4. Phân cấp thị giác
- 1 H1; 1 CTA chính; tối đa 3 mức nhấn.
- Type scale 1.2–1.333; spacing theo token; contrast AA.
- Above-the-fold trả lời: đây là gì, cho ai, làm gì tiếp.
- Dùng vị trí, khoảng trắng, màu accent; không chỉ phóng to chữ.
- Không làm mọi thứ bold; không 3 card đều nhau tranh nhau.

## 5. Palette
- 60% nền, 30% surface/neutral, 10% accent.
- Accent chỉ cho hành động/trạng thái; semantic color chỉ success/warning/danger.
- Text 4.5:1, UI 3:1; không pure black/white; kiểm bằng axe/Lighthouse.
- 3 bảng màu mẫu: `docs/style/directions.md` (Editorial calm, Product precise, Warm expressive).
- Dark mode optional; không tự đảo màu nếu chưa kiểm contrast.

## 6. PAGE_SPEC
- Mỗi route có `agent-state/PAGE_SPEC.md` theo `core/templates/page-spec.md`.
- Ghi mục tiêu, audience, 5 giây, CTA, section order, menu/IA, hierarchy, states, responsive, a11y, metrics, non-goals.
- Learning thêm: bài đang học, continue, review due, level/XP, quiz.
- Không code trước khi spec + owner duyệt (Lite có thể gộp 1 trang).

## 7. Verify
- Browser 360/768/1440 + 320 reflow; states; keyboard; contrast.
- Menu active/skip/focus; mobile menu focus trap.
- So mục tiêu/metrics, không chỉ “đẹp”.
- Ghi `UI_REVIEW.md` + owner F-UI; không “Lighthouse = đẹp”.