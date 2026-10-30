---
trigger: always_on
description: "Agent-ducanh: dùng đúng kit, browser-first, không sửa trước khi owner authorize."
---

# Agent-ducanh scope

- Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`.
- Chọn đúng kit: new-web, audit-fix, feature, ui-rework, maintenance.
- Audit = review_only; chỉ sửa sau khi owner authorize scope.
- Browser-first; thiếu browser = blocked, không N/A.
- Cập nhật `agent-state/HANDOFF.md` sau mỗi kit.
- Không push/deploy/payment/xóa dữ liệu nếu chưa được phép.
