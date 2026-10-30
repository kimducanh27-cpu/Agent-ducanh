# AGENTS.md — phần thêm cho dự án đã có AGENTS.md

<!-- agent-ducanh:start -->
## Agent-ducanh web kit

- Đọc `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md` trước khi làm web.
- Chọn kit theo `core/router.md`: new-web, audit-fix, feature, ui-rework, maintenance.
- Audit là `review_only`; chỉ sửa sau khi owner authorize scope.
- Browser-first; thiếu browser ghi `blocked`, không ghi N/A.
- Không push/deploy/payment/xóa dữ liệu nếu chưa được phép.
- Cập nhật `agent-state/HANDOFF.md` sau mỗi kit.
<!-- agent-ducanh:end -->
