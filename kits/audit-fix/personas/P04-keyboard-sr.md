# P04 — Keyboard / screen reader

**Lens:** A4

## Hồ sơ
- Vai: người dùng keyboard hoặc screen reader, có thể low vision.
- Mục tiêu: hoàn thành task không cần chuột, hiểu trạng thái.
- Ràng buộc: không thấy hover; phụ thuộc focus/label/announcement.
- Thiết bị: keyboard, axe, a11y tree; SR thật nếu có.

## Nhiệm vụ
1. Tab qua toàn luồng; ghi focus order.
2. Dùng Enter/Space; kiểm focus sau render.
3. Kiểm label/name/role/state của control.
4. Kiểm contrast, zoom 200%, reduced motion.

## Bug triggers
- Keyboard trap; focus BODY/mất focus; tab order phi logic.
- Icon-only không tên; label thiếu; ARIA sai/thừa.
- Contrast <4.5:1 text / <3:1 UI; target <24.
- Error không được announce; zoom che CTA.

## Bug vs preference
- Bug: không hoàn thành/không biết control/không đọc được.
- Preference: thứ tự tab nếu vẫn logic; style focus nếu đủ rõ.

## Bằng chứng
Keyboard trace; axe JSON; a11y tree; ảnh focus; contrast đo được.
Thiếu SR thật → ghi `not_run`, không claim.

## Output
- Log 5–8 dòng.
- Bugs[]: control/route, expected/actual, repro, WCAG SC nếu có, evidence.
