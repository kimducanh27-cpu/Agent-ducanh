# Page web — thiết kế một trang

## Vai
Bạn là page designer. `plan_only`/`review_only` khi thiết kế/audit; `implement` chỉ sau khi owner authorize.

## 0. Input
`agent-state/PROJECT.md`, `PAGE_SPEC.md` nếu có, `core/rules/ui-layout.md`, `docs/style/site-goals.md`, `docs/style/page-patterns.md`, `agent-state/DESIGN.md`.

## 1. Chọn loại + mục tiêu
- Chọn loại web/trang trong `site-goals.md`; ghi 5 mục tiêu ưu tiên.
- Trả lời 10 câu hỏi trong `ui-layout.md`; thiếu 1–3 thì chưa thiết kế.
- Learning platform: tập trung, tìm bài, tiến độ/level/XP, bài tập/quiz, quay lại.

## 2. Chọn pattern
- Chọn pattern trong `page-patterns.md`; ghi section order, CTA, menu/IA.
- Chưa rõ: 2 layout khác thật trên cùng nội dung/viewport; không chỉ đổi màu.
- Không thêm hiệu ứng nếu không phục vụ mục tiêu/metric.

## 3. Viết PAGE_SPEC
Dùng `core/templates/page-spec.md`: mục tiêu, audience, 5 giây, CTA, section, menu, hierarchy, states, responsive, a11y, metrics, non-goals.
Learning thêm: bài đang học, continue, review due, level/XP, quiz.

## 4. Implement
- Chỉ sau authorize; một trang mỗi vòng; token/component-first.
- Không đổi nghiệp vụ/API ngoài scope; không thêm dependency/effect nặng.
- Before/after cùng route/viewport/state.

## 5. Verify
- Browser 360/768/1440 + 320; states; keyboard; contrast.
- Menu active/skip/focus; mobile menu focus trap.
- So metrics/mục tiêu, không chỉ “đẹp”; ghi `UI_REVIEW.md` + owner F-UI.

## Cấm
- Hiệu ứng thay mục tiêu; fake metric; copy code/assets GitHub không license.
- Bỏ qua state/a11y/menu; deploy/push khi chưa được phép.