# UI quality — luật gu và bằng chứng

Áp dụng cho `ui-rework`, phần UI của `new-web`, và lens A1/A3/A4/A10 của `audit-fix`.

## 1. Bằng chứng trước gu
- Before/after cùng route, viewport, state, fixture; 360/768/1440 + 320 reflow.
- Ảnh + DOM/computed style + keyboard; không kết luận từ code hoặc cảm giác.
- Thiếu browser → `blocked`; ảnh cũ không thay before mới.
- Ghi F-UI-* cụ thể: màn hình, điều chưa ưng, phần giữ lại.

## 2. Hierarchy và CTA
- Mỗi màn hình 1 CTA chính; phụ rõ thứ bậc.
- Type scale/spacing scale; không 6 cỡ chữ hoặc 10 khoảng cách tùy hứng.
- Above-the-fold trả lời: đây là gì, cho ai, làm gì tiếp.
- Không tranh chấp CTA bằng nhiều nút cùng màu/nổi bật.

## 3. States
- Đủ empty/loading/error/success/disabled nếu có.
- Error nói cách sửa; success nói đã xảy ra gì; loading không nhảy layout.
- Form: label, hint, error gắn field; focus vào lỗi đầu tiên.
- Không dùng màu làm tín hiệu duy nhất.

## 4. Accessibility
- WCAG AA: text 4.5:1, UI 3:1; focus-visible; keyboard đủ.
- Label/alt/heading order; link có mục đích; button là button.
- Touch target ≥44×44; zoom 200% không mất nội dung.
- reduced-motion; không autoplay có tiếng.

## 5. Responsive
- 360/768/1440; 320 reflow; không overflow ngang.
- Mobile: thumb zone, sticky CTA không che nội dung; bàn phím không che field.
- Bảng/nav phải có cách xử lý hẹp, không chỉ scale.

## 6. Token và component
- Token 3 lớp: primitive → semantic → component; không hardcode màu/px rải rác.
- Dùng component gốc; không tạo one-off nếu đã có.
- Không thêm UI kit nặng; không đổi token toàn cục vì một màn hình.
- `agent-state/DESIGN.md` là nguồn sự thật; lệch phải ghi lý do.

## 7. Motion
- Chỉ khi có MO-*; nêu mục đích (feedback, hierarchy, chuyển state).
- reduced-motion; không loop vô hạn; không cản task.
- Screenshot không chứng minh motion; cần video/trace/DOM.
- Không dùng animation để che loading chậm.

## 8. Nội dung và niềm tin
- Copy thật, không lorem; nói lợi ích cụ thể; không claim bảo mật/giá không có căn cứ.
- Giá/ngày/liên hệ/privacy rõ; locale đúng.
- Empty state hướng dẫn; error không đổ lỗi người dùng.
- Không dùng emoji làm icon chức năng nếu không có label.

## 9. Chống “AI slop”
- Không gradient tím/xanh mặc định, glassmorphism, 3 card icon đều nhau, hero giữa vô hồn.
- Không emoji rải rác, không “✨” trong UI nghiệp vụ.
- Phải có dấu hiệu thương hiệu: type, màu, chi tiết, ảnh, copy.
- Đẹp phục vụ task; không hy sinh clarity để trang trí.

## 10. Review và sign-off
- Owner xác nhận F-UI; AI không tự nói “owner đã ưng”.
- Verifier độc lập; không tự review.
- Không nói “Lighthouse = đẹp”; perf/a11y/visual là ba trục riêng.
- Feedback mới → revision mới; không loop vô hạn.
- Ghi `UI_REVIEW.md` theo `core/templates/ui-review.md`.
