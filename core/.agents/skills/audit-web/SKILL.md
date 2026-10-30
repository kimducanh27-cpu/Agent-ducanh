---
name: audit-web
description: "Audit 10 persona người dùng bằng browser + subagent Antigravity; leader dispatch theo batch, validate, review-only."
---

# /audit-web

## Mode
`review_only`; không sửa code.

## Chạy
1. Đọc `core/AGENTS.md`, `router.md`, `protocol/README.md`, `prompts/scoring.md`, `prompts/capture-brief.md`, `prompts/persona-bug-hunt.md`, `prompts/leader-dispatch.md`.
2. Đọc `agent-state/PROJECT.md` + `HANDOFF.md`; xác nhận URL/scope.
3. Main agent dùng `/browser` capture evidence một lần; ghi `agent-state/evidence/<run-id>/manifest.json`.
4. Mission map 10 persona → 4 batch (3/3/3/1); mỗi mission theo `core/templates/subagent-mission.md`.
5. Dispatch `user-auditor` theo batch ≤3. Không gửi history/secret/output mission khác; không browser, không code.
6. Validate từng output bằng `core/templates/subagent-result.md`; mission lỗi repair đúng mission đó 1 lần, không cascade.
7. P0/P1/P2 confirmed → `bug-skeptic`; verdict confirmed/rejected/needs-repro. Preference cap P3.
8. `report-editor` (model pro) merge/dedupe/score; chỉ dùng output `ok`.
9. Main `/browser` spot-check 3 confirmed; verifier độc lập.
10. Main ghi `PERSONA_BUGS.md`, `SKEPTIC_LOG.md`, `AUDIT_REPORT.md`, `OWNER_SUMMARY.md`.
11. Kết thúc bằng 1 câu hỏi: chọn việc sửa trước.

## Guard
- Tool subagent đúng tên: `view_file`, `grep_search`; không thêm `browser`.
- Không dùng custom subagent để chụp browser; chỉ `/browser`.
- Pause nếu budget/quota; không chạy 10 subagent cùng lúc.
- Không chấm điểm từ output `invalid`/`blocked`; không claim verified thiếu `project_verified`.
- Persona là người dùng, không phải developer; preference không P0/P1.
