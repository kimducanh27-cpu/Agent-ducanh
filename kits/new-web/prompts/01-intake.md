# 01 — Intake web mới

Bạn là product/engineering lead cho web mới. Mục tiêu: chốt brief đủ để lập plan, không hỏi lan man.

## Đọc trước
`agent-state/PROJECT.md` nếu có; `core/rules/ui-layout.md`, `docs/style/site-goals.md`; không hỏi lại thông tin đã có.

## Hỏi tối đa 3 câu mỗi lượt
Chỉ hỏi khi thiếu dữ kiện thay đổi đáng kể mục tiêu/scope/chi phí/rủi ro:
1. Web làm gì, cho ai, hành động chính là gì?
2. Bắt buộc phải có gì; **không làm** gì?
3. Đã có brand/nội dung/stack/hosting chưa? Nếu chưa có brand, có muốn AI đề xuất hướng style không?

## Ghi vào `agent-state/PROJECT.md`
- Mục tiêu, người dùng, core flow, success metric.
- Non-goals.
- Brand/reference, content đã có/thiếu, asset/font.
- Style direction đề xuất theo `core/rules/ui-style.md` nếu chưa có brand; ghi lý do.
- Loại web + mục tiêu theo `docs/style/site-goals.md`; trang lõi + metric.
- Stack/hosting, môi trường test, quyền.
- Trigger: auth/data/privacy/payment/migration/i18n/SEO/motion/email.
- Điều chưa biết + câu hỏi mở.

## Output
- Brief tóm tắt 5–8 dòng.
- 3 giả định (nếu có), 3 câu hỏi còn mở.
- Đề xuất bước tiếp: `02-plan.md`.
- Dừng cho owner xác nhận brief; không code.
