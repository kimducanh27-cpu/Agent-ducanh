# ui-rework — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`, `core/rules/ui-quality.md`, `core/templates/design-spec.md`, `core/templates/ui-review.md`.

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
