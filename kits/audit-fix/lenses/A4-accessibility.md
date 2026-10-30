# A4 — Accessibility

## Câu hỏi
Người dùng keyboard/screen reader có hoàn thành task?

## Kiểm
- Keyboard: tab order, focus visible, không trap.
- Label/name/role/value; heading/landmark.
- Alt text; ARIA đúng, không thừa.
- Contrast 4.5:1 text, 3:1 large/UI.
- Target ≥24×24; reflow 320; zoom 200%.
- Error identification, reduced motion.
- axe + manual; axe không đủ.

## Evidence
axe JSON; a11y tree; ảnh focus; keyboard trace; contrast đo được.

## Score
- 0–2: keyboard trap/không có tên.
- 5–6: có barrier lớn nhưng workaround.
- 9–10: hoàn thành keyboard/SR, axe sạch.

## Out of scope
Screen reader thật nếu thiếu; ghi `blocked`.
