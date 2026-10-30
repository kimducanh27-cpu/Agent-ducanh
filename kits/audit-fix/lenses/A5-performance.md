# A5 — Performance

## Câu hỏi
Mạng chậm/máy yếu có dùng được, không bị chờ vô lý?

## Kiểm
- LCP ≤2.5s; INP ≤200ms; CLS ≤0.1 (p75).
- TBT; long tasks; render-blocking.
- Ảnh/font/third-party; bundle/bytes.
- Loading state, layout shift.
- 3 run, median; lab vs field.

## Evidence
Trace/Lighthouse; số đo từng run; waterfall; ảnh trạng thái chậm.

## Score
- 0–2: không load/không tương tác.
- 5–6: vượt budget rõ.
- 9–10: trong budget, ổn định 3 run.

## Out of scope
Field p75 nếu không có CrUX/RUM; ghi `not_run`.
