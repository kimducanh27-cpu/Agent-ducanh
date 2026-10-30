# HANDOFF.md — Focus Board demo

```yaml
protocol: web-agent/2.5
kit: new-web
mode: implement
delivery_target: local_product
deployment_state: not_deployed

project:
  name: Focus Board demo
  url: examples/demo-site/index.html
  stack: static HTML/CSS/JS

scope:
  requirements: [R-1 landing, R-2 form demo, R-3 responsive]
  findings: []
  tasks: [T-1 hero, T-2 sections, T-3 form validation, T-4 responsive]
  non_goals: [backend, auth, payment, tracking, real email, production deploy]

acceptance:
  criteria: [AC-1 validation, AC-2 success, AC-3 responsive, AC-4 keyboard/labels, AC-5 reduced-motion]
  checks: [V-1 browser 360/768/1440, V-2 keyboard, V-3 console/network]

evidence:
  index: examples/demo-site/agent-state/EVIDENCE.md
  screenshots:
    - examples/demo-site/screenshots/desktop.png
    - examples/demo-site/screenshots/tablet.png
    - examples/demo-site/screenshots/mobile.png
    - examples/demo-site/screenshots/narrow.png
    - examples/demo-site/screenshots/style-before-desktop.png
    - examples/demo-site/screenshots/style-before-mobile.png
  reports:
    - examples/demo-site/agent-state/NEW_WEB_PLAN.md
    - examples/demo-site/agent-state/AUDIT_REPORT.md
    - examples/demo-site/agent-state/VERIFICATION_REPORT.md
    - examples/demo-site/agent-state/DESIGN.md
    - examples/demo-site/agent-state/UI_REVIEW.md
    - examples/demo-site/screenshots/verify.json
    - examples/demo-site/screenshots/axe.json

permissions:
  code_edit: yes
  install_dependency: no
  commit_push: no
  deploy: no
  payment_email: no

blockers: []

review:
  design_revision: demo-2
  state: awaiting_feedback

next_kit: none
resume:
  current_task: T-4 responsive
  next_step: owner review style (DESIGN/UI_REVIEW); optional U1 aria-current fix or performance audit
  notes: Demo verified in Chromium; A5/SR/Firefox/WebKit not_run. Form simulates success only.
```
