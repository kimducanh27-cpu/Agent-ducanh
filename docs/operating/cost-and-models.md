# Cost & model guidance

## Chọn model theo việc
- **Read-only audit/review:** model nhanh/rẻ cho scan; model mạnh cho tổng hợp/top 10.
- **Fix/feature/UI:** model mạnh; lỗi khó dùng thêm `/boost`.
- **Kit maintenance:** model mạnh + review diff; không auto-update skill.

## Lite vs Full
| Việc | Mode | Chi phí |
|---|---|---|
| 1 component/route, reversible | Lite | Thấp |
| Web mới, audit toàn site, auth/data/payment | Full | Cao |

- Lite: 1 kit + 1 prompt; không 10 lens.
- Full: 10 lens + verifier; chỉ dùng khi cần.

## Token budget
- Không load cả protocol 242/327 dòng; đọc section cần.
- Không paste raw log; trích evidence + path.
- 10 agent chỉ khi browser/file tách rời; còn lại tuần tự.
- Dùng `/effort` nếu app hỗ trợ; tăng effort cho final verify.

## `/goal`
- Chỉ dùng khi có 5+10 + stop rule.
- Một goal/conversation; không có iteration cap.
- Dừng sau 2 fail/30 phút.

## Không
- Không dùng full 10 agent cho việc nhỏ.
- Không dùng model mạnh cho scan lặp.
- Không auto-deploy/payment.
