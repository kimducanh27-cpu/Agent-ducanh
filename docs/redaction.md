# Redaction — repo public

Trước khi commit/public:

- Không có path tuyệt đối: `C:\Users`, `/Users/`, `Downloads`, `AppData`.
- Không email/số điện thoại/tên thật/cookie/token/private key.
- Không raw audit JSON/log có dữ liệu chạy.
- Ảnh: crop browser chrome, che PII, strip metadata, ≤300KB.
- Chỉ dùng test data; form demo không gửi.
- Kiểm `scripts/check-docs.mjs` trước khi push.
- Nếu lỡ lộ secret: thu hồi/rotate; xóa file không đủ.
