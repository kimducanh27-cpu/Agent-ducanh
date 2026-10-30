# Context budget

- `AGENTS.md` ≤6KB; không nhồi protocol vào AGENTS.
- Protocol là reference: chỉ đọc section cần; không load cả 242/327 dòng mỗi lần.
- Prompt kit ngắn; chi tiết để trong file.
- Không lặp lại rule ở nhiều file; một nguồn, file khác trỏ tới.
- Khi context dài: đọc `HANDOFF.md`, `PROJECT.md`, `EVIDENCE.md` trước; không đọc raw log.
- Không paste toàn bộ tool output; trích evidence + path.
- Nếu phải đọc nhiều: chia task, checkpoint, rồi tiếp.
