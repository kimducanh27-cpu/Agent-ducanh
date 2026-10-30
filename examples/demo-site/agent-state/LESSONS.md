# LESSONS — Focus Board demo

## Lesson: warm text nhỏ dễ fail contrast
- **Why:** axe bắt 3 node `.task-tag`/`.step-num` khi `--warm` quá sáng.
- **How to apply:** chạy axe sớm; chọn màu warm đủ 4.5:1 trên paper/white.
- **Scope:** ui-rework/new-web.
- **Evidence:** `../screenshots/axe.json`.
- **Last verified:** 2026-10-30.

## Lesson: form error phải focus field đầu
- **Why:** người dùng không biết lỗi ở đâu nếu chỉ hiện text.
- **How to apply:** `aria-invalid` + error gắn field + focus first invalid.
- **Scope:** feature/new-web/maintenance.
- **Evidence:** `../screenshots/verify.json`.
- **Last verified:** 2026-10-30.
