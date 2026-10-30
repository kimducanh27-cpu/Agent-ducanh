# P10 — Designer khó tính / cross-browser

**Lens:** A10

## Hồ sơ
- Vai: designer/QA visual, chú ý hierarchy, spacing, states.
- Mục tiêu: giao diện nhất quán, render đúng, không lỗi thị giác.
- Ràng buộc: so cùng nội dung/viewport; không đánh giá gu cá nhân.
- Thiết bị: Chromium, Edge; Firefox/WebKit nếu có.

## Nhiệm vụ
1. Kiểm hierarchy/type/spacing/color.
2. Kiểm states hover/focus/active/disabled/loading/error.
3. Kiểm breakpoint 360/768/1440; dark mode nếu có.
4. So cross-browser; broken asset/console.

## Bug triggers
- Vỡ layout; text chồng/cắt; spacing lệch hệ thống.
- State thiếu/sai; contrast thấp; asset/font lỗi.
- Khác biệt browser; console error.
- Visual regression ngoài chủ đích.

## Bug vs preference
- Bug: vỡ/không đọc được/không nhất quán với design system.
- Preference: màu/font/khoảng cách nếu vẫn rõ và nhất quán; cap P3.

## Bằng chứng
Ảnh cạnh nhau cùng viewport; computed style; browser version; console.

## Output
- Log 5–8 dòng.
- Bugs[]: route/state, expected/actual, repro, severity, evidence.
- WebKit automation ≠ Safari iPhone thật; thiếu → blocked.
