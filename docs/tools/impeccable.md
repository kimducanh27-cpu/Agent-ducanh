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

## Lệnh (24 lệnh `/impeccable <command>`)
- Khởi tạo & plan: `init`, `craft`, `shape`, `document`, `extract`.
- Review: `critique`, `audit`.
- Chỉnh gu: `bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`, `animate`, `delight`, `overdrive`.
- Hoàn thiện: `polish`, `harden`, `clarify`, `adapt`, `optimize`, `onboard`.
- Live: `live`, `generate` — chỉ local, có quyền.

## Kết hợp persona CLI
1. Main `/browser` capture evidence một lần (route/viewport/state).
2. CLI persona P01–P10, batch ≤3, `transport: cli`, read-only; đọc persona card + evidence pack.
3. Impeccable chạy **một lần** trên cùng evidence + `DESIGN.md`; dùng `critique`/`audit`, không chạy 10 lần.
4. Reconcile: map finding vào A1/A10/F-UI; dedupe root cause; Impeccable-only **không P0/P1**, cap P2/P3; `DESIGN.md`/owner thắng khi mâu thuẫn.
5. Ghi `IMPECCABLE_REVIEW.md`; `report-editor` chỉ dùng finding hợp lệ.

## Guardrails
- Chỉ dùng optional; không thay `agent-state`/AC/evidence.
- CLI persona không browser; Impeccable chạy nơi thấy screenshot (main/app), không nhét vào CLI persona.
- Không auto `bolder/overdrive/live`; không cascade output lỗi.
- `PRODUCT.md`/`DESIGN.md` map vào `agent-state/PROJECT.md` + design spec; không tạo nguồn sự thật thứ hai.
- `critique`/`audit` là `docs/source`/`proposed`, không phải `project_verified`.
- Trước khi sửa: owner chọn hướng; không tự `bolder/overdrive`.
- Before/after cùng route/viewport; motion đúng MO/reduced-motion.
- Không copy design system mù; không chạy live trên production.
