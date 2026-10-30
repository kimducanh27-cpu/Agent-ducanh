# feature — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`, `agent-state/HANDOFF.md`.

## Mode
`plan_only` cho impact/plan; `implement` sau khi owner authorize.

## Luật
1. Hiểu web hiện tại trước; không rewrite/đổi stack.
2. Impact map: route/component/data/API/auth/tenant/perf/a11y.
3. Feature spec: R/T/AC/V, non-goals, rollback.
4. TDD cho behavior; text/style manual/visual.
5. Chỉ sửa phần cần; không refactor ngoài scope.
6. Regression luồng chính + AC mới; browser thật.
7. Nếu cần hành vi lớn hơn scope → dừng, route lại.
8. Handoff sau khi verify.
