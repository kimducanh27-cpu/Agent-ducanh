# ui-rework — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`, `core/rules/ui-quality.md`, `core/rules/ui-style.md`, `core/rules/ui-layout.md`, `docs/style/directions.md`, `docs/style/site-goals.md`, `docs/style/page-patterns.md`, `core/templates/design-spec.md`, `core/templates/page-spec.md`, `core/templates/ui-review.md`.

## Mode
`ui_rework`.

## Luật
1. Ghi F-UI-*: màn hình/luồng, điều cụ thể, phần giữ lại.
2. Audit before bằng browser; thiếu ảnh ghi missing, không tái dựng.
3. Hướng rõ → làm; chưa rõ → 2 hướng thật trên cùng nội dung/viewport.
4. Token/component gốc trước; không hardcode màu/px rải rác.
5. Before/after cùng route/viewport/fixture; keyboard/contrast/responsive.
6. Motion chỉ khi trigger: MO-* + reduced-motion; screenshot không chứng minh motion.
7. Không loop vô hạn; review state + feedback mới.
8. Không nói owner đã ưng nếu chưa xác nhận.
9. `agent-state/DESIGN.md` là nguồn sự thật; chưa có thì tạo từ template trước khi rework lớn.
10. Kết thúc bằng `UI_REVIEW.md`; owner F-UI accepted/changes_requested/pending; không “Lighthouse = đẹp”.
11. Chọn style pack theo nội dung; 1 chính + tối đa 1 gia vị; 2 hướng phải khác pack thật, không chỉ đổi màu.
12. Mỗi style có 1 signature element; không trộn 3 pack; không đổi style vì một màn hình.
13. Mỗi route có `PAGE_SPEC.md`: mục tiêu, 10 câu hỏi, menu/IA, hierarchy, states, metric.
14. Không thêm hiệu ứng nếu không phục vụ mục tiêu; learning ưu tiên tập trung/tìm/tiến độ/luyện/quay lại.
