# new-web — luật riêng

Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`, `core/rules/ui-style.md`, `core/rules/ui-layout.md`, `docs/style/site-goals.md` trước.

## Mode
- `plan_only` cho intake/plan.
- `implement` sau khi owner duyệt plan.

## Luật
1. Không code trước khi plan được owner duyệt.
2. Không tự thêm page/feature ngoài brief; đề xuất thì ghi proposal.
3. Design chưa rõ: 2–3 hướng thật khác nhau trên cùng nội dung; không hỏi từng padding.
4. Mỗi slice có hành vi quan sát được + AC/check.
5. TDD cho logic/behavior; text/style dùng manual/visual.
6. Browser-first; 320/360/768/1280/1440; thiếu browser = blocked.
7. Không ép cookie/i18n/auth/DB/CMS/analytics nếu không cần.
8. Không deploy/push nếu chưa được phép.
9. Style: chọn pack theo nội dung + signature; ghi `agent-state/DESIGN.md`; không trộn 3 pack.
10. Page: mỗi route có `PAGE_SPEC.md`; chọn mục tiêu theo `site-goals.md`, pattern theo `page-patterns.md`.
11. Kết thúc: owner summary + handoff + next kit.

## Trigger
- Motion: chọn none/subtle/expressive; MO-* nếu có.
- Privacy/auth/data/payment: chỉ khi brief có.
- Perf: budget theo loại trang; 3 run.
