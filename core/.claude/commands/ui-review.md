---
description: Audit UI/UX read-only theo rule gu; before/after, a11y, responsive, motion.
argument-hint: [màn hình hoặc F-UI]
---

Đọc `AGENTS.md`, `agent-state/HANDOFF.md`, `agent-state/DESIGN.md` nếu có, `core/rules/ui-quality.md`, `core/templates/ui-review.md`.

`work_mode: review_only`; không sửa code. Dùng `$ARGUMENTS` làm phạm vi.
Mở browser thật; chụp before/after nếu có; kiểm 360/768/1440 + 320 reflow.
Kiểm hierarchy/CTA, states, token/component, a11y, motion, content, anti-AI-slop.
Ghi `agent-state/UI_REVIEW.md` theo template; owner F-UI là accepted/changes_requested/pending.
Không nói “Lighthouse = đẹp”; thiếu browser → `blocked`.
