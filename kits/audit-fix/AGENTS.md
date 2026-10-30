# audit-fix — luật riêng

Đọc `core/AGENTS.md`, `core/protocol/README.md`, `core/prompts/scoring.md`.

## Audit
- `review_only`; không sửa code.
- 10 lens A1–A10; mỗi finding U-* có evidence level, URL, viewport, bước tái hiện.
- Không claim lens nếu chưa đo; thiếu browser → blocked.
- Dedupe theo root cause; scorecard + top 10 + owner summary.
- Kết thúc bằng đúng 1 câu hỏi: chọn việc nào để sửa trước.

## Fix
- Chỉ sau khi owner authorize scope.
- 2–3 phương án; AI chọn A/B/C trong scope; 5+10 tiêu chí.
- Baseline + before/after cùng viewport/state.
- TDD cho behavior; text/style manual/visual.
- Verifier độc lập; không tự review.
- Handoff sau fix.

## Cấm
- Sửa trong audit.
- N/A khi thiếu browser/tool.
- Fake evidence/score.
- Sửa lan, thêm dependency, deploy ngoài quyền.
