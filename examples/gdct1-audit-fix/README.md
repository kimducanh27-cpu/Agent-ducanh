# GDCT1 — ví dụ audit-fix

Web công khai: https://kimducanh27-cpu.github.io/so-on-gdct1/ (đã kiểm tra HTTP 200).

## Kết quả audit gốc
- Ngày: 2026-10-28.
- 10 P1 root cause, 0 P0.
- Overall: 5.58/10.
- Verdict: “Sẵn sàng kèm lưu ý”.

## 10 P1 (tóm tắt)
1. U1 — Landing hứa 20 ngày, app chạy 16 ngày.
2. U2 — Today tự cuộn, che H1/CTA trên mobile.
3. U3 — Goal/streak/completion không nhất quán.
4. U4 — Reload/back mất session và kết quả.
5. U5 — Kiểm đáp án chỉ hiện 80/100.
6. U6 — Desktop “Câu tiếp” nằm dưới viewport.
7. U7 — Keyboard flow hỏng (Enter bị nuốt, focus BODY).
8. U8 — 4 control Cài đặt thiếu accessible name.
9. U9 — Ngày Lộ trình click-only, không dùng bàn phím.
10. U10 — Backup sai định dạng làm app kẹt; import không preview.

## Không đưa vào repo
- Raw audit evidence/lens reports.
- Ảnh có PII/local path.
- Log/screenshot chưa che.

Đây là case study để kiểm tra kit `audit-fix`, không phải template để copy nguyên.
