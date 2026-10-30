---
description: Audit website đang chạy, chỉ review, không sửa code.
argument-hint: [URL hoặc scope]
---

Đọc `core/AGENTS.md`, `core/router.md`, `kits/audit-fix/AGENTS.md`, `kits/audit-fix/prompts/audit.md`, `core/prompts/persona-bug-hunt.md`, `core/prompts/leader-dispatch.md`.

`work_mode: review_only`. Dùng `$ARGUMENTS` làm URL/scope.
Chạy 10 lens theo `kits/audit-fix/lenses/index.md` + 10 persona theo `kits/audit-fix/personas/index.md` (batch ≤3, qua `bug-skeptic` và optional 1 lần Impeccable `agent-state/IMPECCABLE_REVIEW.md`); mỗi finding có evidence.
Không sửa code. Kết thúc bằng `agent-state/AUDIT_REPORT.md` + `agent-state/OWNER_SUMMARY.md` + 1 câu hỏi.
