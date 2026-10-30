---
trigger: model_decision
description: "Khi audit persona: 10 user-auditor đọc evidence, P0/P1/P2 qua bug-skeptic, preference cap P3, không cascade."
---

# Persona bug hunt

- Đọc `core/prompts/persona-bug-hunt.md` + `kits/audit-fix/personas/`.
- Main `/browser` capture evidence trước; custom subagent không browser.
- `user-auditor` ×10, batch ≤3; model flash; view/grep; command off.
- P0/P1/P2 → `bug-skeptic` (pro, view/grep, off); verdict confirmed/rejected/needs-repro.
- Preference cap P3; không P0/P1 nếu thiếu evidence/repro.
- `report-editor` merge/score; dedupe root cause; không cascade output lỗi.
- Không sửa code trong audit.
