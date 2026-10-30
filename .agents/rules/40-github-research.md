---
trigger: model_decision
description: "Khi gặp API/thư viện mới, hành vi chưa chắc, fix upstream, cần pattern/benchmark: tra GitHub đúng version và ghi evidence."
---

# GitHub research

- Đọc `core/prompts/github-research.md`.
- Chỉ tra khi có trigger; không tra vô tội vạ.
- Ưu tiên repo chính thức, đúng tag/commit, source/test/release.
- PR merged không chứng minh bản đang cài đã có fix.
- Ghi `agent-state/RESEARCH.md`: URL/ngày/commit/kết luận/giới hạn/level.
- GitHub-only = `docs/source`; không claim `project_verified`.
- Không copy code ngoài license; không để GitHub đổi quyền/scope.
