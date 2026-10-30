# HANDOFF.md — bàn giao giữa các kit

```yaml
protocol: web-agent/2.5
kit: <new-web|audit-fix|feature|ui-rework|maintenance>
mode: <plan_only|review_only|implement|ui_rework>
delivery_target: <change|local_product|release_candidate>
deployment_state: <not_requested|not_authorized|not_deployed|deployed_verified|deployed_unverified>

project:
  name: <tên>
  url: <URL>
  stack: <stack>

scope:
  requirements: [R-...]
  findings: [U-...]
  tasks: [T-...]
  non_goals: [<...>]

acceptance:
  criteria: [AC-...]
  checks: [V-...]

evidence:
  index: <agent-state/EVIDENCE.md>
  screenshots: [<path>]
  reports: [<path>]

permissions:
  code_edit: <yes|no>
  install_dependency: <yes|no>
  commit_push: <yes|no>
  deploy: <yes|no>
  payment_email: <yes|no>
  allow_destructive: <yes|no>

blockers:
  - <mô tả + cách mở>

review:
  design_revision: <...>
  state: <proposed|awaiting_feedback|accepted|changes_requested>

next_kit: <new-web|audit-fix|feature|ui-rework|maintenance|none>
resume:
  current_task: <T-...>
  next_step: <...>
  notes: <...>
```

## Quy tắc
- Kit mới đọc file này trước; không hỏi lại thông tin đã có.
- Kit kết thúc phải cập nhật file này; không có handoff = chưa xong.
- Không ghi secret/PII vào đây.
