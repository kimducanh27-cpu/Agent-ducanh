# maintenance — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`, `agent-state/HANDOFF.md`.

## Mode
`review_only` cho triage; `implement` cho fix sau khi owner authorize.

## Luật
1. Triage P0/P1/P2; reproduce trước khi sửa.
2. Systematic debugging: giả thuyết + evidence; không đoán.
3. Sau 2 fix không thành → dừng, checkpoint, research/spike.
4. Fix tối thiểu; regression test; rollback.
5. Không sửa ngoài scope; không thêm dependency nếu không cần.
6. Browser/console/network; ảnh trước/sau.
7. Nếu cần hành vi mới → route `feature`.
8. Incident + handoff.
