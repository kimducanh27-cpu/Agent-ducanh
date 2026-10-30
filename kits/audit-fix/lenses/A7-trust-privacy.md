# A7 — Trust / privacy / security UX

## Câu hỏi
Người dùng có nên tin để giao dữ liệu/tiền?

## Kiểm
- Consent/cookie; tracking trước consent.
- Auth/signup/login/reset; session expiry.
- PII hiển thị; error lộ thông tin.
- Dark patterns: pre-checked, urgency giả, khó hủy.
- External link, policy/contact.
- Authz/tenant nếu có trigger.

## Evidence
Ảnh consent/auth; network header/cookie đã redact; copy.

## Score
- 0–2: lừa đảo/lộ PII.
- 5–6: thiếu giải thích/khó hủy.
- 9–10: rõ, có kiểm soát, không dark pattern.

## Out of scope
Pentest/khai thác lỗ hổng; chỉ UX/trust.
