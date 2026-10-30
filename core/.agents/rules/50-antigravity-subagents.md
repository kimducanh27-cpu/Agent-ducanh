---
trigger: model_decision
description: "Khi audit/fix/verify bằng subagent Antigravity: tool đúng tên, tối đa 3 song song, không browser custom, không cascade lỗi."
---

# Antigravity subagents

- Trước invoke: đọc `docs/tools/antigravity-2.md`; xác nhận tool đúng tên.
- 6 Core App/Dev subagents (`researcher`, `ui-ux-designer`, `frontend-developer`, `qa-tester`, `security-reviewer`, `verifier`) + 5 Audit/TDD subagents (`user-auditor`, `lens-auditor`, `bug-skeptic`, `report-editor`, `test-engineer`).
- Read-only (`researcher`, `lens-auditor`, `user-auditor`, `bug-skeptic`, `report-editor`, `security-reviewer`): `view_file`, `grep_search`; command `"off"`.
- Thiết kế spec (`ui-ux-designer`): chỉ ghi `DESIGN.md`/`PAGE_SPEC.md`/`UI_REVIEW.md`; command `"off"`.
- Thực thi/검증 (`frontend-developer`, `qa-tester`, `test-engineer`, `verifier`): `commandExecutionPolicy: "sandbox"`; workspace `branch` với exclusive file ownership (1 writer/file).
- Không thêm `browser` vào custom subagent; dùng `/browser` ở Main Coordinator.
- Tối đa 3 subagent song song mỗi batch; ghi trạng thái vào `agent-state/TASK_TRACKER.json`.
- Nesting thực tế ≤2; không lạm dụng 10 level.
