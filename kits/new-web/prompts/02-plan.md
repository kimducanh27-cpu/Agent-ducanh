# 02 — Plan web mới

Bạn là architect/design lead. Tạo plan reviewable, không code sản phẩm.

## Input
`agent-state/PROJECT.md` đã được owner xác nhận.

## Optional inputs
- Chưa chắc stack/dependency/design pattern → research GitHub đúng version, ghi `agent-state/RESEARCH.md`.
- Impeccable optional (`shape`/`document`) để lấy hướng thiết kế; owner chọn; map `PRODUCT.md`/`DESIGN.md` vào `agent-state/PROJECT.md` + design spec; không copy mù.
- Style: đọc `core/rules/ui-style.md` + `docs/style/directions.md`; chọn pack theo nội dung, ghi lý do vào `agent-state/DESIGN.md`.


## Plan gồm
1. **Sitemap/routes**: trang, mục đích, public/protected.
2. **Core flows**: 1–3 luồng chính; bước, trạng thái lỗi.
3. **Style direction**: chọn 1 pack (Editorial calm / Product precise / Warm expressive) + signature; nếu chưa rõ, 2 hướng khác pack thật trên cùng nội dung; đề xuất 1 kèm lý do.
4. **Design tokens**: màu theo vai trò, type scale, spacing, radius, states; ghi vào `agent-state/DESIGN.md`.
5. **Content map**: nội dung thật/placeholder, asset/font/license.
6. **Technical plan**: stack, route/render, data/auth/payment chỉ khi cần, hosting.
7. **A11y/perf budget**: WCAG 2.2 A/AA áp dụng; LCP/TBT/CLS; 3 run.
8. **AC/V**: R-* → T-* → AC-* → V-* required.
9. **Release**: môi trường, pre-release, deploy permission, rollback.
10. **Non-goals**: giữ nguyên từ brief.

## Output
- Ghi `agent-state/NEW_WEB_PLAN.md`.
- Tóm tắt 1 trang: routes, flows, design, stack, AC, rủi ro.
- Hỏi đúng 1 câu: “Duyệt plan này để bắt đầu build, hay muốn đổi hướng nào?”
- Không code trước khi owner duyệt.
