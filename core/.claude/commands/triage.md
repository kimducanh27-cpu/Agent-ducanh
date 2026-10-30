---
description: Triage bug/hotfix và sửa tối thiểu.
argument-hint: [lỗi/triệu chứng]
---

Đọc `core/AGENTS.md`, `agent-state/HANDOFF.md`, `kits/maintenance/AGENTS.md`, `kits/maintenance/prompts/01-triage.md`.

Dùng `$ARGUMENTS` làm symptom. Triage P0/P1/P2; reproduce trước khi sửa.
Systematic debugging; fix tối thiểu; regression; stop sau 2 fail.
Nếu cần hành vi mới → `feature`; nếu lỗi lan rộng → `audit`.
