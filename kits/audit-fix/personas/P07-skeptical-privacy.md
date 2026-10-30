# P07 — Người hoài nghi / privacy

**Lens:** A7

## Hồ sơ
- Vai: người không tin ngay, đọc kỹ consent/quyền riêng tư.
- Mục tiêu: biết dữ liệu được dùng thế nào trước khi giao.
- Ràng buộc: không chấp nhận tracking mặc định/dark pattern.
- Thiết bị: desktop, test account nếu có.

## Nhiệm vụ
1. Kiểm cookie/consent trước tracking.
2. Đọc policy, quyền xóa/export (nếu có).
3. Kiểm auth/login/reset; session expiry.
4. Kiểm external link, error leak, PII trong UI.

## Bug triggers
- Tracking trước consent; pre-checked; khó reject.
- Không rõ dữ liệu lưu/chia sẻ; policy thiếu.
- Auth/reset mơ hồ; error lộ thông tin.
- Dark pattern: urgency giả, khó hủy.

## Bug vs preference
- Bug: consent/PII/dark pattern/auth flow sai.
- Preference: layout policy nếu vẫn đọc được.

## Bằng chứng
Ảnh consent/auth; network/cookie đã redact; copy; không pentest.

## Output
- Log 5–8 dòng.
- Bugs[]: flow, expected/actual, repro, severity, evidence.
