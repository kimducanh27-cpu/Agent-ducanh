# Task & Event Tracker (`agent-state/TASK_TRACKER.json`)

Mẫu sổ theo dõi tiến độ, phân quyền file và nhật ký sự kiện giữa **Main Coordinator** và 11 Subagents (6 Core App/Dev + 5 Audit/TDD).

## Quy tắc cốt lõi
1. **Main Coordinator** là người duy nhất tạo và cập nhật `agent-state/TASK_TRACKER.json` sau mỗi lần phân công (`mission_id`) hoặc nghiệm thu kết quả.
2. **Phân biệt rõ `files_owned` và `outputs` theo quyền ghi (`write_access`)**:
   - Chỉ các subagent có quyền ghi (`ui-ux-designer`, `frontend-developer`, `qa-tester`, `test-engineer`) mới được liệt kê đường dẫn file trong `files_owned` và không được trùng lặp giữa các nhánh chạy song song.
   - Các subagent chỉ đọc (`researcher`, `security-reviewer`, `verifier`, `user-auditor`, `lens-auditor`, `bug-skeptic`, `report-editor`) **bắt buộc** để `"files_owned": []` và ghi kết quả trả về cho Main Coordinator trong `"outputs": [...]`.
3. Mọi sự kiện (`started`, `completed`, `blocked`, `verified`) đều phải gắn mốc thời gian ISO-8601 và tóm tắt bằng chứng.

## Cấu trúc chuẩn (`agent-state/TASK_TRACKER.json`)

```json
{
  "updated_at": "<YYYY-MM-DDTHH:mm:ssZ>",
  "coordinator": {
    "role": "Main Coordinator (Leader Agent)",
    "active_kit": "<new-web | audit-fix | feature | ui-rework | maintenance>",
    "mode": "<review_only | propose | implement>",
    "status": "<in_progress | completed | blocked>",
    "files_owned": [
      "agent-state/PROJECT.md",
      "agent-state/HANDOFF.md",
      "agent-state/AUDIT_REPORT.md",
      "agent-state/VERIFICATION_REPORT.md",
      "agent-state/TASK_TRACKER.json"
    ]
  },
  "progress": {
    "completed": "<number_of_completed_missions>",
    "total": "<total_missions>",
    "percent": "<0_to_100>"
  },
  "agents": [
    {
      "agent": "researcher",
      "role": "Product & UX Researcher (read-only)",
      "write_access": false,
      "mission_id": "<M-01-RESEARCH>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": [],
      "outputs": ["agent-state/PROJECT.md (input brief cho Main Coordinator)"],
      "summary": "<Tóm tắt kết quả khảo sát>",
      "events": [
        { "time": "<YYYY-MM-DDTHH:mm:ssZ>", "type": "started", "note": "<Bắt đầu khảo sát>" },
        { "time": "<YYYY-MM-DDTHH:mm:ssZ>", "type": "completed", "note": "<Hoàn tất khảo sát>" }
      ]
    },
    {
      "agent": "ui-ux-designer",
      "role": "UI/UX & Design System Architect (writer)",
      "write_access": true,
      "mission_id": "<M-02-DESIGN-SPEC>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": ["agent-state/DESIGN.md", "agent-state/PAGE_SPEC.md"],
      "outputs": ["agent-state/DESIGN.md", "agent-state/PAGE_SPEC.md"],
      "summary": "<Tóm tắt hệ thống thiết kế và bố cục>",
      "events": []
    },
    {
      "agent": "frontend-developer",
      "role": "Frontend Developer (writer)",
      "write_access": true,
      "mission_id": "<M-03-FRONTEND-BUILD>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": ["<index.html>", "<styles.css>", "<script.js>"],
      "outputs": ["<index.html>", "<styles.css>", "<script.js>"],
      "summary": "<Tóm tắt các thành phần giao diện đã xây dựng>",
      "events": []
    },
    {
      "agent": "qa-tester",
      "role": "Browser QA & Accessibility Tester (writer: screenshots/)",
      "write_access": true,
      "mission_id": "<M-04-BROWSER-QA>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": ["screenshots/verify.json", "screenshots/axe.json"],
      "outputs": ["screenshots/verify.json", "screenshots/axe.json", "agent-state/UI_REVIEW.md (input)"],
      "summary": "<Tóm tắt kết quả kiểm thử trình duyệt ở 4 kích thước màn hình>",
      "events": []
    },
    {
      "agent": "security-reviewer",
      "role": "Security & Privacy Reviewer (read-only)",
      "write_access": false,
      "mission_id": "<M-05-SEC-AUDIT>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": [],
      "outputs": ["agent-state/AUDIT_REPORT.md (security section input)"],
      "summary": "<Tóm tắt kết quả kiểm tra bảo mật và quyền riêng tư>",
      "events": []
    },
    {
      "agent": "verifier",
      "role": "Independent Verification Gate (read-only + runner)",
      "write_access": false,
      "mission_id": "<M-06-FINAL-VERIFY>",
      "status": "<pending | in_progress | done | blocked>",
      "files_owned": [],
      "outputs": ["agent-state/VERIFICATION_REPORT.md (evidence input)"],
      "summary": "<Tóm tắt kết quả nghiệm thu độc lập>",
      "events": []
    }
  ],
  "audit_agents": [
    {
      "agent": "user-auditor",
      "role": "Persona & Journey Auditor (read-only)",
      "write_access": false,
      "mission_id": "<A-01-USER-JOURNEY>",
      "status": "<pending | in_progress | done | skipped>",
      "files_owned": [],
      "outputs": ["agent-state/AUDIT_REPORT.md (persona findings)"],
      "summary": "<Tóm tắt kết quả đóng vai người dùng>"
    },
    {
      "agent": "lens-auditor",
      "role": "Specialist Lens Auditor (read-only)",
      "write_access": false,
      "mission_id": "<A-02-LENS-AUDIT>",
      "status": "<pending | in_progress | done | skipped>",
      "files_owned": [],
      "outputs": ["agent-state/AUDIT_REPORT.md (lens findings)"],
      "summary": "<Tóm tắt kết quả kiểm tra theo góc nhìn chuyên môn>"
    },
    {
      "agent": "bug-skeptic",
      "role": "Counter-Evidence & Repro Skeptic (read-only + runner)",
      "write_access": false,
      "mission_id": "<A-03-BUG-SKEPTIC>",
      "status": "<pending | in_progress | done | skipped>",
      "files_owned": [],
      "outputs": ["agent-state/AUDIT_REPORT.md (verified vs downgraded findings)"],
      "summary": "<Tóm tắt kết quả phản biện và tái hiện lỗi>"
    },
    {
      "agent": "report-editor",
      "role": "Audit Report Editor (read-only)",
      "write_access": false,
      "mission_id": "<A-04-REPORT-EDIT>",
      "status": "<pending | in_progress | done | skipped>",
      "files_owned": [],
      "outputs": ["agent-state/AUDIT_REPORT.md (executive summary)"],
      "summary": "<Tóm tắt kết quả biên tập báo cáo>"
    },
    {
      "agent": "test-engineer",
      "role": "Regression Test Engineer (writer: tests/scripts)",
      "write_access": true,
      "mission_id": "<A-05-TEST-ENG>",
      "status": "<pending | in_progress | done | skipped>",
      "files_owned": ["<scripts/verify-demo.cjs>"],
      "outputs": ["<scripts/verify-demo.cjs>"],
      "summary": "<Tóm tắt kết quả viết và chạy kiểm thử hồi quy>"
    }
  ],
  "workspace_changes": [
    {
      "file": "<path/to/file>",
      "owner": "<agent-name>",
      "action": "<created | updated | verified>",
      "detail": "<Mô tả ngắn thay đổi>"
    }
  ],
  "open_issues": [
    {
      "id": "<U1>",
      "severity": "<P0 | P1 | P2 | P3>",
      "status": "<open | fixed | accepted>",
      "title": "<Tên vấn đề còn tồn đọng>",
      "detail": "<Mô tả chi tiết và hướng xử lý>"
    }
  ],
  "reports": [
    {
      "name": "<AUDIT_REPORT.md>",
      "path": "<agent-state/AUDIT_REPORT.md>",
      "writer": "Main Coordinator",
      "contributors": ["<user-auditor>", "<lens-auditor>", "<security-reviewer>"]
    }
  ]
}
```
