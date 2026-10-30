---
trigger: model_decision
description: "Khi audit/fix/verify bằng subagent Antigravity: tool đúng tên, tối đa 3 song song, không browser custom, không cascade lỗi."
---

# Antigravity subagents

- Trước invoke: đọc `docs/tools/antigravity-2.md`; xác nhận tool đúng tên.
- Read-only lens/report/security: `view_file`, `grep_search`; command `off`.
- Verifier/test: `run_command` sandbox; không chạy lệnh lạ.
- Không thêm `browser` vào custom subagent; dùng `/browser` ở main.
- Tối đa 3 subagent song song mỗi batch; pause khi budget/quota.
- Mỗi mission chỉ có lens/evidence/output schema; không kế thừa history.
- Validate output; lỗi → repair đúng mission đó, không cascade.
- Không để subagent sửa file ngoài test/fixture; fix do main/teamwork với file ownership.
- Nesting thực tế ≤2; không lạm dụng 10 level.
