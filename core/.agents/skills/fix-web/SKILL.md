---
name: fix-web
description: "Sửa một root cause sau audit, có owner authorize, 5+10, before/after và verifier."
---

# /fix-web

1. Chỉ chạy sau khi owner authorize scope; đọc `agent-state/HANDOFF.md`, `kits/audit-fix/prompts/fix.md`.
2. Xác nhận 1 U-ID/root cause; baseline + ảnh trước.
3. Đề xuất 2–3 phương án; chọn trong scope; lập 5+10.
4. Nhiều bước → `/plan`; dùng `/goal` chỉ khi criteria + stop rule.
5. Main agent sửa; nhiều file độc lập → `/teamwork` với file ownership; không giao subagent read-only sửa.
6. Browser `/browser` verify + ảnh sau; verifier subagent kiểm lại.
7. Cập nhật handoff; không deploy/push nếu chưa được phép.
