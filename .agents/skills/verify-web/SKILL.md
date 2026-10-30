---
name: verify-web
description: "Verify độc lập bằng criteria + evidence; không sửa code, báo PASS/FAIL/BLOCKED."
---

# /verify-web

1. `review_only`; đọc `HANDOFF.md`, criteria/AC/V.
2. Không nhận lời kể của fixer; chỉ dùng criteria + evidence paths.
3. Verifier subagent chạy `run_command` sandbox cho probe CDP/check có sẵn.
4. Main agent dùng `/browser` cho claim cần visual.
5. Ghi từng dòng: `pass/fail/blocked/not_run/N/A` + evidence level.
6. Không sửa code; không nâng claim; thiếu browser → blocked.
7. Output `VERIFICATION_REPORT.md` + tóm tắt.
