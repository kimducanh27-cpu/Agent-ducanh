# Agent state — sổ dự án dùng chung

Mỗi project có `agent-state/`:

| File | Nội dung |
|---|---|
| `PROJECT.md` | Brief: mục tiêu, người dùng, stack, non-goals, quyền |
| `NEW_WEB_PLAN.md` | Kế hoạch làm web mới |
| `DESIGN.md` | Nguồn sự thật cho gu thẩm mỹ, style pack, token 3 lớp |
| `PAGE_SPEC.md` | Mục tiêu, IA/menu, hierarchy, states và metrics của từng trang |
| `UI_REVIEW.md` | Biên bản nghiệm thu giao diện before/after và quyết định `Owner F-UI` |
| `IMPECCABLE_REVIEW.md` | Đánh giá thiết kế bổ trợ chạy 1 lần từ Impeccable (`proposed`) |
| `PERSONA_BUGS.md` / `SKEPTIC_LOG.md` | Nhật ký bug từ 10 persona và phán quyết của `bug-skeptic` |
| `AUDIT_REPORT.md` | Báo cáo tổng hợp audit 10 góc nhìn + scorecard + top 10 |
| `VERIFICATION_REPORT.md` | Báo cáo kiểm chứng độc lập (`PASS/FAIL/BLOCKED`) |
| `PERF_REPORT.md` / `RELEASE_REPORT.md` | Báo cáo đo hiệu năng 3-run và báo cáo kiểm soát release |
| `OWNER_SUMMARY.md` | Bản tóm tắt 1 trang cho owner |
| `RESEARCH.md` / `LESSONS.md` | Bằng chứng nghiên cứu GitHub và bài học dài hạn |
| `EVIDENCE.md` | Index ảnh/báo cáo; không PII |
| `HANDOFF.md` | Bàn giao giữa kit (một nguồn duy nhất) |
| `RUNLOG.md` / `skills-used.md` / `installed.json` | Nhật ký phiên chạy, skill đã gọi và tool đã cài |

## Quy tắc
- Không ghi secret/PII.
- Không copy state sang nhiều nơi; một nguồn.
- Kit mới đọc `HANDOFF.md`; kit cũ cập nhật trước khi kết thúc.
- Không có handoff = chưa xong.
- Ảnh/evidence để trong `agent-state/evidence/` hoặc `examples/.../screenshots/` nếu là demo.
