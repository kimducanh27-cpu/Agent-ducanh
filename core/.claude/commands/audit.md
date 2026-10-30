---
description: Audit website đang chạy, chỉ review, không sửa code.
argument-hint: [URL hoặc scope]
---

Đọc `AGENTS.md`, `router.md`, `kits/audit-fix/AGENTS.md`, `kits/audit-fix/prompts/audit.md`.

`work_mode: review_only`. Dùng `$ARGUMENTS` làm URL/scope.
Chạy 10 lens theo `kits/audit-fix/lenses/index.md`; mỗi finding có evidence.
Không sửa code. Kết thúc bằng `AUDIT_REPORT.md` + `OWNER_SUMMARY.md` + 1 câu hỏi.
