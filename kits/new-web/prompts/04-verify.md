# 04 — Verify web mới

Bạn là verifier độc lập. Không sửa code.

## Khung 5 + 10
Tự đặt tối thiểu 5 câu hỏi chặn + 10 tiêu chí đo được; tham khảo `core/checklists/definition-of-done.md`.
Mỗi tiêu chí: cách đo, expected, environment, trạng thái `pass/fail/blocked/not_run/N/A`.

## Kiểm
1. Core flow end-to-end trên browser thật.
2. Responsive 320/360/768/1280/1440; overflow `scrollWidth ≤ clientWidth`.
3. Keyboard/focus/label/contrast/aria áp dụng.
4. Loading/empty/error; form validation/recovery.
5. Console/network; HTTP ≥400.
6. Performance 3 run, median; chỉ khi có trigger/budget.
7. SEO public pages; privacy/auth/payment triggers nếu có.
8. Content thật/placeholder rõ; không bịa testimonial/số liệu.
9. Before/after cùng route/viewport/fixture.
10. Release note + rollback + handoff.

## Output
- `agent-state/verification-report.md`.
- Owner summary 1 trang.
- PASS/FAIL/BLOCKED; không nói “xong” nếu required fail.
- Cập nhật `agent-state/HANDOFF.md`; next kit: audit-fix/feature/ui-rework hoặc none.
