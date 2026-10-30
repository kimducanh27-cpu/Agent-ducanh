# Agent state — sổ dự án dùng chung

Mỗi project có `agent-state/`:

| File | Nội dung |
|---|---|
| `PROJECT.md` | Brief: mục tiêu, người dùng, stack, non-goals, quyền |
| `PLAN.md` / `NEW_WEB_PLAN.md` | Kế hoạch hiện tại |
| `TASKS.md` | Task/AC/V và trạng thái |
| `DECISIONS.md` | Quyết định + lý do |
| `EVIDENCE.md` | Index ảnh/báo cáo; không PII |
| `HANDOFF.md` | Bàn giao giữa kit |
| `skills-used.md` | Skill đã gọi, lý do, output |
| `installed.json` | Tool đã cài/verify |

## Quy tắc
- Không ghi secret/PII.
- Không copy state sang nhiều nơi; một nguồn.
- Kit mới đọc `HANDOFF.md`; kit cũ cập nhật trước khi kết thúc.
- Không có handoff = chưa xong.
- Ảnh/evidence để trong `agent-state/evidence/` hoặc `examples/.../screenshots/` nếu là demo.
