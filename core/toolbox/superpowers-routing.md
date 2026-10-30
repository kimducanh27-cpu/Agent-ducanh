# Superpowers routing — gọi đúng skill theo việc

Bản local đã kiểm tra: **6.3.0**, 14 skill. Nếu thiếu plugin → `/toolbox` hoặc fallback.

| Việc | Skill | Ghi chú |
|---|---|---|
| Bắt đầu phiên | `using-superpowers` | Luôn đầu tiên |
| Cần chọn cách/thiết kế | `brainstorming` | Không dùng cho bug rõ |
| Nhiều bước | `writing-plans` → `executing-plans` | Plan trước code |
| Gặp bug/lỗi lạ | `systematic-debugging` | Trước khi sửa |
| Sửa behavior | `test-driven-development` | Text/style không ép |
| Nhiều việc độc lập | `dispatching-parallel-agents` | Chỉ khi browser/file tách rời |
| Chạy plan bằng agent con | `subagent-driven-development` | Chỉ khi file/worktree tách rời |
| Repo dirty/rủi ro | `using-git-worktrees` | Tạo nhánh/worktree |
| Trước khi nói xong | `verification-before-completion` | Bắt buộc |
| Trước merge | `requesting-code-review` | Review độc lập |
| Nhận feedback | `receiving-code-review` | Không đồng ý mù |
| Kết thúc nhánh | `finishing-a-development-branch` | Merge/handoff |
| Tạo/sửa skill | `writing-skills` | Chỉ bảo trì kit |

## Hard rules
- Không gọi cả 14 skill; mỗi bước tối đa 1 skill chính + 1 kiểm chứng.
- Không fake đã gọi skill; ghi `agent-state/skills-used.md`.
- Thiếu skill → toolbox/fallback; không bịa tên.
- Qoder gọi tay `superpowers:<skill>`; Antigravity/Claude auto-trigger.
