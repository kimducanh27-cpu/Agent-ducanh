# UI REVIEW — Focus Board / style signature

- Route/viewport/state: `/`; 1440/768/390/320; default; form error/success.
- Before: `screenshots/style-before-desktop.png`, `screenshots/style-before-mobile.png`.
- After: `screenshots/desktop.png`, `screenshots/mobile.png`.
- Giữ nguyên: palette giấy ấm, serif/sans, nội dung, layout, hành vi form.
- Đã đổi: thêm “3 nhịp” dưới h1; tokenize radius + warm-soft; sửa aria-label logo khớp chữ “FocusBoard”.
- Hierarchy/CTA: 1 CTA chính “Nhận kế hoạch mẫu”; header CTA phụ; không tranh chấp.
- Tokens/components: màu/radius dùng token; không còn `#fbf0e4` hardcode.
- States: error focus đúng field đầu tiên; success hiện status; empty/loading/disabled không có trong demo tĩnh.
- A11y: axe 0 violation, 1 incomplete; label-content-name-mismatch đã sửa; form focus đo được; tab order đầy đủ chưa đo.
- Responsive: 1440/768/390/320 đều `scrollWidth = clientWidth`; không overflow.
- Motion (MO/reduced): hover 160ms; reduced-motion tắt transform/scroll smooth; chưa quay video.
- Content/trust: demo tĩnh, không gửi email, không lưu dữ liệu, không tracking.
- Anti-AI-slop: giấy ấm + serif + signature 3 nhịp; không gradient tím/card grid/emoji.
- Regression: console 0 error, HTTP 0 error; form invalid/valid đúng.
- Evidence paths: `screenshots/verify.json`, `screenshots/axe.json`, ảnh before/after.
- Owner F-UI: pending
- Verifier: not_run (chờ owner review)
- Next: owner xem ảnh; nếu accepted, cập nhật HANDOFF; nếu changes_requested, mở revision mới.
