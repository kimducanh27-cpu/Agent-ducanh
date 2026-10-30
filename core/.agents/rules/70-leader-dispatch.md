---
trigger: model_decision
description: "Khi leader gọi subagent: mission packet, batch ≤3, validate, spot-check, repair 1 lần, không cascade."
---

# Leader dispatch

- Đọc `core/prompts/leader-dispatch.md` + `core/templates/subagent-mission.md` + `core/templates/subagent-result.md`.
- Mỗi mission đóng gói đủ field; không gửi chat history, secret/PII hay output mission khác.
- Batch ≤3; chỉ mission độc lập; chờ validate batch trước rồi mới chạy batch sau.
- Read-only dùng `share`/`inherit`; ghi file dùng `branch`; một writer/file; leader merge.
- Transport: `native`/`cli`/`teamwork`; CLI chỉ batch read-only; teamwork file ownership; browser chỉ main.
- Validate schema/evidence/scope ngay sau batch; lỗi repair đúng mission 1 lần; lần 2 → `blocked`.
- Không cascade output `invalid`/`blocked` sang skeptic, judge, score hay report.
- Spot-check 3 claim P0/P1/P2 bằng `/browser`; verifier độc lập.
- Không claim “verified” nếu thiếu `project_verified`.
