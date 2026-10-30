---
description: Checklist release trước/sau deploy; chỉ deploy khi owner cho phép.
argument-hint: [environment hoặc phạm vi release]
---

Đọc `AGENTS.md`, `agent-state/HANDOFF.md`, `core/prompts/release-web.md`.

Dùng `$ARGUMENTS` làm môi trường/phạm vi. Không deploy/push/merge nếu chưa được phép.
Chốt rollback + người bấm trước; preview smoke 360/768/1440; CI xanh; không P0/P1 mở.
Sau deploy: smoke production + theo dõi 15–30 phút; ghi `RELEASE_REPORT.md` + handoff.
Claim “đã deploy” chỉ khi có URL/thời gian/evidence.
