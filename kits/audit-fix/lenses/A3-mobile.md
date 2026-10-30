# A3 — Mobile one-handed

## Câu hỏi
Dùng một tay trên 360/320 có hoàn thành được việc chính?

## Kiểm
- Tap target ≥24×24 CSS px (khuyến nghị 44×44).
- Sticky header/footer, CTA bị che.
- Bàn phím ảo che input/CTA.
- Overflow ngang: `scrollWidth - clientWidth`.
- Zoom 200%, orientation, safe-area.
- Hover-only interaction.

## Evidence
Ảnh 360/320; số đo `clientWidth/scrollWidth`; rect CTA; bàn phím mở.

## Score
- 0–2: không bấm/không thấy CTA.
- 5–6: dùng được nhưng phải zoom/vuốt khó.
- 9–10: một tay, không overflow, target đủ.

## Out of scope
iOS/Android thật nếu không có; ghi `blocked`.
