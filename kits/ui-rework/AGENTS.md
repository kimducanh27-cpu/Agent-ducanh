# ui-rework — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`.

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
