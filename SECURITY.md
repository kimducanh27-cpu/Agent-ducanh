# Security

## Report
- Không mở public issue cho lỗi bảo mật.
- Dùng GitHub private vulnerability reporting/advisory của repo.
- Ghi phiên bản, file, bước tái hiện, tác động; không gửi secret thật.

## Rules
- Không commit token, cookie, auth state, `.env`, PII.
- Không chạy hook/script tải từ nguồn lạ.
- Hook chạy shell tùy ý; review trước khi bật.
- CI không nhận secret; dùng OAuth/secret store.
- Nếu lộ secret: revoke/rotate; xóa file không đủ.

## Scope
Bộ kit là prompt/workflow, không phải dịch vụ production. Không bảo đảm an toàn cho site được audit/fix.
