---
name: perf-web
description: "Đo và sửa hiệu năng web bằng Lighthouse/Chrome; 3 run, before/after, không đoán từ code."
---

# /perf-web

1. Đọc `core/AGENTS.md`, `agent-state/HANDOFF.md`, `core/prompts/perf-web.md`, `docs/tools/lighthouse-ci.md`.
2. Xác nhận browser + Lighthouse/Chrome; thiếu → `blocked`.
3. Baseline 3 run mobile/desktop; lưu JSON/HTML/trace + screenshot.
4. Chẩn đoán top 3 nút thắt; 2–3 phương án; lập 5+10.
5. Chỉ sửa sau khi owner authorize; một root cause mỗi vòng.
6. Verify 3 run cùng điều kiện; before/after + regression.
7. Ghi `PERF_REPORT.md` + `HANDOFF.md`; không deploy.

## Guard
- Không bịa score; không claim từ 1 run.
- Không tối ưu score-only; không thêm dependency/redesign ngoài scope.
- Lab ≠ field; thiếu field ghi “lab only”.
