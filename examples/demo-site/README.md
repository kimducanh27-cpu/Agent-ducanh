# Focus Board — web demo

Web tĩnh một trang để test bộ kit:
- Làm web mới (`new-web`).
- Bàn giao sang audit (`audit-fix`).

## Xem web
Mở `index.html` bằng browser, hoặc chạy server tĩnh tại thư mục này.

## Có gì
- Hero + 3 bước + mẫu một ngày + form demo.
- Form validation phía client; không gửi email, không lưu dữ liệu.
- Responsive; keyboard/focus/label; reduced-motion.

## Brief và bàn giao
- `agent-state/PROJECT.md` — brief đã điền.
- `agent-state/NEW_WEB_PLAN.md` — plan.
- `agent-state/HANDOFF.md` — bàn giao sang `audit-fix`.

## Giới hạn demo
- Không backend/auth/payment/tracking.
- Không deploy production.
- Chưa chạy performance trace, screen reader thật, Firefox/WebKit.

## Đã kiểm
- 1440/768/390/320: `scrollWidth = clientWidth`, không overflow.
- Form invalid/valid: đúng; focus field lỗi; không network.
- Console/network: 0 error/exception/HTTP ≥400.
- axe: 0 violation, 1 incomplete.
- Ảnh: `screenshots/desktop.png`, `tablet.png`, `mobile.png`, `narrow.png`.
- Kết quả máy đọc: `screenshots/verify.json`, `screenshots/axe.json`.
- Báo cáo: `agent-state/AUDIT_REPORT.md`, `agent-state/VERIFICATION_REPORT.md`.
