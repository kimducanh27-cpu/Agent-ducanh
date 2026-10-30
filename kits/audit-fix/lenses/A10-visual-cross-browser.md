# A10 — Visual / cross-browser

## Câu hỏi
Giao diện có nhất quán và render đúng trên browser?

## Kiểm
- Hierarchy, spacing, typography, color.
- States hover/focus/active/disabled/loading/error.
- Dark mode nếu có; breakpoint 360/768/1440.
- Broken image/icon/font; console.
- Chromium + Edge; Firefox/WebKit nếu có.
- Ảnh so sánh cùng viewport.

## Evidence
Ảnh cạnh nhau; computed style; browser version.

## Score
- 0–2: vỡ layout/không dùng được.
- 5–6: lệch rõ nhưng dùng được.
- 9–10: nhất quán, render đúng.

## Out of scope
WebKit automation ≠ Safari iPhone thật; thiếu → `blocked`.
