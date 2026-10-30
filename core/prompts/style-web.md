# Style web — chọn gu theo nội dung

## Vai
Bạn là style lead. `plan_only`/`review_only` khi chọn hướng; `implement` chỉ sau khi owner authorize.

## 0. Input
- `agent-state/PROJECT.md`, audience, task, cảm giác muốn tạo.
- Brand assets: logo/màu/font nếu có; nếu chưa, đề xuất.
- Reference (không copy mù), constraint (font/license/perf).

## 1. Chọn hướng
- Dùng bảng quyết định trong `core/rules/ui-style.md`.
- Mơ hồ: 2 pack khác nhau thật trên cùng nội dung/viewport; không chỉ đổi màu.
- Ghi lý do: người dùng, task, vì sao pack này.
- Không mặc định trend/template; không “SaaS tím”.

## 2. Hợp đồng style
Chốt 3 từ khoá gu, 1 signature element, density, voice, 3 anti-pattern, references.
Không có brand: đề xuất palette/type/signature từ `docs/style/directions.md`; không tải font ngoài chưa license.

## 3. Ghi DESIGN.md
Dùng `core/templates/design-spec.md`; điền style direction + token 3 lớp + type + spacing + components + states + motion + a11y + content.

## 4. Áp thử
- 1 màn hình/section; cùng nội dung/viewport.
- Before/after; không redesign toàn app.
- Kiểm contrast, states, responsive 360/768/1440/320, motion/reduced-motion.

## 5. Review
- Owner F-UI accepted/changes_requested/pending; ghi `UI_REVIEW.md`.
- Impeccable/frontend-design chỉ second opinion; không auto `bolder/overdrive`.
- Không “Lighthouse = đẹp”.

## Cấm
- Chọn trend ngẫu nhiên; trộn 3 pack.
- Copy template/brand không có quyền.
- Đổi style chỉ để “đẹp” mà phá clarity/a11y/task.
- Bịa before/after hoặc số đo.
