---
description: Đo và sửa hiệu năng web; 3 run, before/after.
argument-hint: [URL hoặc route]
---

Đọc `core/AGENTS.md`, `agent-state/HANDOFF.md`, `core/prompts/perf-web.md`, `docs/tools/lighthouse-ci.md`.

Dùng `$ARGUMENTS` làm URL/route. Browser + Lighthouse thật; thiếu → `blocked`.
Baseline 3 run mobile/desktop; 2–3 phương án; 5+10; chỉ sửa sau authorize.
Verify cùng route/viewport/device/network/cache; before/after + regression; không deploy.
Không claim từ 1 run; lab ≠ field.
