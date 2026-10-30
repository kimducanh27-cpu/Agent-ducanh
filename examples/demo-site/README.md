# Focus Board — web demo & Visual Agent Dashboard

Web tĩnh để test bộ kit:
- Làm web mới (`new-web`): trang đích `index.html`.
- Bàn giao sang audit (`audit-fix`) và theo dõi điều phối 11 Subagents: `dashboard.html` + `agent-state/TASK_TRACKER.json`.

## Xem web
- Trang chính Focus Board: mở `index.html` bằng browser, hoặc chạy server tĩnh tại thư mục này (`http://127.0.0.1:8123/`).
- Bảng điều phối Agent: mở `dashboard.html` (`http://127.0.0.1:8123/dashboard.html`) hoặc bấm liên kết **Agent Dashboard** trên thanh điều hướng / chân trang `index.html`.

## Có gì
- `index.html`: Hero + 3 bước + mẫu một ngày + form demo (validation phía client; không gửi email, không lưu dữ liệu; responsive; keyboard/focus/label; reduced-motion).
- `dashboard.html`: Visual Agent Dashboard tải động `agent-state/TASK_TRACKER.json` (có fallback nhúng sẵn khi mở qua `file://`), hiển thị đủ 6 chiều thông tin: Tiến độ (6/6, 100%), 11 Subagents (6 Core App/Dev + 5 Audit/TDD), Nhiệm vụ (`mission_id`), Phân quyền File (`files_owned` cho writer vs `outputs` cho read-only), Lỗi tồn đọng (`open_issues`) và Báo cáo (`reports`).

## Brief và bàn giao
- `agent-state/PROJECT.md` — brief đã điền.
- `agent-state/NEW_WEB_PLAN.md` — plan.
- `agent-state/HANDOFF.md` — bàn giao sang `audit-fix`.
- `agent-state/TASK_TRACKER.json` — sổ theo dõi tiến độ và sự kiện của 11 Subagents.

## Giới hạn demo
- Không backend/auth/payment/tracking.
- Không deploy production.
- Chưa chạy performance trace, screen reader thật, Firefox/WebKit.

## Đã kiểm
- 1440/768/390/320: `scrollWidth = clientWidth`, không overflow trên cả `index.html` và `dashboard.html`; verify tại 1440/390/320.
- Form invalid/valid: đúng; focus field lỗi; không network.
- Dashboard: `hasTracker = true`, render đủ 11 subagents, tương phản màu đạt chuẩn WCAG AA (`--muted: #4A554E`, 6.75:1+).
- Dashboard mobile: bảng cuộn có `tabindex="0"`, `role="region"`; không overflow 320/390.
- Console/network: 0 error/exception/HTTP ≥400.
- axe: 0 violation trên `index.html` (1440) và `dashboard.html` (1440/390/320).
- Ảnh: `screenshots/desktop.png`, `screenshots/tablet.png`, `screenshots/mobile.png`, `screenshots/narrow.png`, `screenshots/dashboard.png`, `screenshots/dashboard-mobile.png`, `screenshots/dashboard-narrow.png`.
- Kết quả máy đọc: `screenshots/verify.json`, `screenshots/axe.json`.
- Báo cáo: `agent-state/AUDIT_REPORT.md`, `agent-state/VERIFICATION_REPORT.md`.
