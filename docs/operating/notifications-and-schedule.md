# Notification & schedule

## Antigravity
- `/schedule` cho one-shot/cron; chỉ dùng khi owner muốn.
- `/agents` xem agent; `/tasks` xem background.
- `/goal` không thay schedule; không chạy vô hạn.

## Claude Code
- `SessionEnd` hook ghi `agent-state/RUNLOG.md` (mẫu trong settings example).
- Notification ngoài (Slack/email) chỉ khi owner cấu hình; không gửi PII.

## Qoder
- Dùng CI/scheduled job bên ngoài nếu cần; không giả định có `/schedule`.

## Cadence gợi ý
- Trước release: Full verify.
- Hàng tuần: audit Lite hoặc smoke.
- Sau dependency update: maintenance/audit.

Không auto-deploy; không auto-payment; log không thay evidence.
