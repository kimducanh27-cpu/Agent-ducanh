# Impeccable — optional design skill

Nguồn: https://github.com/pbakaus/impeccable · Apache 2.0.

## Dùng ở đâu
- `ui-rework`: chính.
- `new-web`: nhẹ (shape/document/critique/polish).
- `audit-fix`: chỉ second opinion (`critique`/`audit`).
- `maintenance`: không dùng.

## Cài
```bash
npx impeccable install
```
Cài full skill pack; owner xác nhận; pin release/commit nếu có.
Không auto-install; không dùng `live`/`generate` trên production.

## Lệnh
- Ý tưởng/plan: `shape`, `document`, `extract`.
- Review: `critique`, `audit`, `component-review`.
- Chỉnh gu: `bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`, `animate`, `delight`, `overdrive`.
- Hoàn thiện: `polish`, `harden`, `clarify`, `adapt`, `optimize`, `onboard`.
- Live: `live`, `generate` — chỉ local, có quyền.

## Guardrails
- Chỉ dùng optional; không thay `agent-state`/AC/evidence.
- `PRODUCT.md`/`DESIGN.md` map vào `agent-state/PROJECT.md` + design spec; không tạo nguồn sự thật thứ hai.
- `critique`/`audit` là `docs/source`/`proposed`, không phải `project_verified`.
- Trước khi sửa: owner chọn hướng; không tự `bolder/overdrive`.
- Before/after cùng route/viewport; motion đúng MO/reduced-motion.
- Không copy design system mù; không chạy live trên production.
