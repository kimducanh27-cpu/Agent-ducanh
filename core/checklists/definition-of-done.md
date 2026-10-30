# Definition of Done

## 0. Mode, handoff, research

- [ ] Lite/Full đã chọn và ghi lý do (`core/prompts/lite.md`).
- [ ] Đầu kit: đọc `PROJECT.md` + `HANDOFF.md`; thiếu dữ kiện → hỏi tối đa 3 câu.
- [ ] Cuối kit: cập nhật `HANDOFF.md` + `skills-used.md` + evidence.
- [ ] Nếu có trigger GitHub research: có entry trong `RESEARCH.md`/`EVIDENCE.md`; GitHub-only không phải `project_verified`.
- [ ] Nếu dùng Impeccable: ghi command/version; critique không phải proof; before/after vẫn bắt buộc.
- [ ] Không handoff = chưa xong.

## 1. Khung chung: 5 câu hỏi chặn + 10 tiêu chí

### 5 câu hỏi chặn
Chỉ cần 1 câu “KHÔNG” là chưa xong. Viết trước khi làm, gắn với scope:
1. Người dùng có hoàn thành được việc chính không?
2. Có lỗi dữ liệu/trạng thái sai nào không?
3. Có vi phạm quyền riêng tư/bảo mật/thanh toán không?
4. Có regression ngoài scope không?
5. Có bằng chứng `project_verified` cho mọi AC bắt buộc không?

### 10 tiêu chí đo được
Mỗi tiêu chí phải có: cách đo, expected, môi trường, trạng thái `PASS/FAIL/BLOCKED/NOT_RUN/N/A`.
1. AC chính chạy đúng trên browser thật.
2. Responsive 320/360/768/1440 không vỡ layout.
3. Keyboard/focus/label/contrast đạt criterion áp dụng.
4. Không console error/HTTP ≥400 mới trong luồng chính.
5. `scrollWidth ≤ clientWidth` ở viewport mobile.
6. Loading/empty/error state đúng.
7. Dữ liệu/form không mất khi lỗi.
8. Performance trong budget (3 run, median) nếu có trigger.
9. Không PII/secret/local path trong artifact công khai.
10. Before/after cùng route/viewport/fixture; evidence tồn tại.

## 2. Checklist theo kit

### new-web
- [ ] Brief/PROJECT.md đủ mục tiêu, người dùng, non-goals, stack, content.
- [ ] Plan có sitemap, flow, design direction, tokens, AC/V.
- [ ] Skeleton chạy local; content thật/placeholder rõ.
- [ ] Từng slice có AC/check; browser verify.
- [ ] Responsive/a11y/perf/SEO trigger.
- [ ] Release note + handoff.

### audit-fix
- [ ] 10 lens có coverage; U-* có evidence level.
- [ ] Scorecard, top 10, owner summary.
- [ ] Fix có 2–3 options, 5+10, DoR.
- [ ] Before/after; verifier độc lập; handoff.

### feature
- [ ] Feature request + success + non-goals.
- [ ] Impact map route/component/data/API/auth.
- [ ] AC/V + regression + rollback.
- [ ] Không rewrite ngoài scope.

### ui-rework
- [ ] F-UI feedback cụ thể; before có hoặc ghi missing.
- [ ] 2 directions nếu mơ hồ; token/component-first.
- [ ] Before/after cùng viewport; motion chỉ khi trigger.
- [ ] Owner review state, không tự nói đã ưng.

### maintenance
- [ ] Triage P0/P1/P2 + reproduce.
- [ ] Systematic debugging; stop sau 2 fail.
- [ ] Fix tối thiểu + regression.
- [ ] Incident/handoff.

## 3. Cấm
- CLI-only rồi kết luận UI/UX.
- `overflow-x:hidden` để che overflow.
- Thêm dependency/refactor ngoài scope.
- Đổi content/data chưa duyệt.
- “Xong” không evidence; fake independent review.
- Ghi N/A khi thiếu browser/tool.
- Ép TDD cho text/style; ép cookie/i18n/auth/DB/CMS/analytics ngoài trigger.
- Bịa research/link/commit; claim verified từ GitHub-only.
- Không có HANDOFF/skills-used mà vẫn nói “xong”.
