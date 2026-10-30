---
name: audit-web
description: "Audit 10 persona người dùng bằng browser + subagent Antigravity; leader dispatch theo batch, validate, review_only."
---

# /audit-web

## Mode
`review_only`; không sửa code.

## Chạy
1. Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`, `core/prompts/scoring.md`, `core/prompts/capture-brief.md`, `core/prompts/persona-bug-hunt.md`, `core/prompts/leader-dispatch.md`.
2. Đọc `agent-state/PROJECT.md` + `HANDOFF.md`; xác nhận URL/scope.
3. Main agent dùng `/browser` capture evidence một lần; ghi `agent-state/evidence/<run-id>/manifest.json`.
4. Mission map 10 persona → 4 batch (3/3/3/1); mỗi mission theo `core/templates/subagent-mission.md`.
5. Dispatch `user-auditor` theo batch ≤3, transport `native` hoặc `cli` read-only. Không gửi history/secret/output mission khác; không browser, không code.
6. Validate từng output bằng `core/templates/subagent-result.md`; mission lỗi repair đúng mission đó 1 lần, không cascade.
7. P0/P1/P2 confirmed → `bug-skeptic`; verdict confirmed/rejected/needs-repro. Preference cap P3.
8. Optional Impeccable `critique`/`audit` **một lần** trên cùng evidence + `DESIGN.md`; ghi `IMPECCABLE_REVIEW.md`; không P0/P1 nếu chưa repro.
9. `report-editor` (model pro) merge/dedupe/score; chỉ dùng output `ok`; reconcile persona + Impeccable.
10. Main `/browser` spot-check 3 confirmed; verifier độc lập.
11. Main ghi `PERSONA_BUGS.md`, `SKEPTIC_LOG.md`, `IMPECCABLE_REVIEW.md` (nếu dùng), `AUDIT_REPORT.md`, `OWNER_SUMMARY.md`.
12. Kết thúc bằng 1 câu hỏi: chọn việc sửa trước.

## Guard
- Tool subagent đúng tên: `view_file`, `grep_search`; không thêm `browser`.
- Không dùng custom subagent để chụp browser; chỉ `/browser`.
- Pause nếu budget/quota; không chạy 10 subagent cùng lúc.
- Không chấm điểm từ output `invalid`/`blocked`; không claim verified thiếu `project_verified`.
- Persona là người dùng, không phải developer; preference không P0/P1.
- Impeccable một lần, `docs/source`/`proposed`, không thay persona evidence; không auto `bolder/overdrive`.
