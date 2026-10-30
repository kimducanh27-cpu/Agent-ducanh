# Lite vs Full

## Lite
Dùng khi:
- 1 route/1 component.
- Thay đổi nhỏ, reversible.
- Không auth/data/payment/migration.
- Không launch.

Làm:
- 1 kit + 1 prompt.
- 5+10 cho fix; audit 1 lens + browser.
- Before/after + handoff.
Bỏ:
- 10-lens audit, plan nhiều bước, verifier riêng nếu rủi ro thấp.

## Full
Dùng khi:
- Web mới, audit toàn site, nhiều route.
- Auth/data/payment/migration.
- Launch/release.

Làm:
- Protocol đầy đủ, plan, 10 lens, verifier độc lập, human gate.

## Quy tắc
- AI đề xuất mode; owner có thể nói “lite” hoặc “full”.
- Không dùng Lite cho dữ liệu/quyền/thanh toán/migration.
- Lite vẫn phải verify; không bỏ 5+10 cho fix.
