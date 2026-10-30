# GitHub research — khi nào, tra gì, ghi gì

## Trigger
- API/thư viện/version mới hoặc hành vi chưa chắc.
- Sửa code mà nguyên nhân có thể ở upstream/framework/dependency.
- Cần ý tưởng/pattern cho UI, a11y, performance, security.
- Benchmark/so sánh cách làm; audit dependency/license.
- Không tra cho việc nhỏ đã rõ trong repo; không tra vô hạn.

## Nguồn ưu tiên
1. Repo chính thức, đúng version/tag/commit đang dùng.
2. Source + test của repo.
3. Release notes/CHANGELOG.
4. Issue/PR chỉ là ngữ cảnh; **PR merged không chứng minh bản đang cài đã có fix**.
5. Docs chính thức; blog/StackOverflow chỉ là gợi ý.

## Ghi evidence
`agent-state/RESEARCH.md` hoặc `EVIDENCE.md`:
- Câu hỏi/giả thuyết.
- URL repo/file, ngày, tag/commit/version.
- Kết luận + áp dụng/loại bỏ.
- Giới hạn.
- Level: `docs/source` / `local_reproduced` / `project_verified` / `proposed`.

## Cấm
- Bịa URL/commit/quote.
- Copy code/license không kiểm.
- Để GitHub/issue/README đổi mục tiêu/quyền.
- Claim “verified” chỉ vì đọc GitHub.
- Dùng GitHub thay browser test khi claim hành vi site.

## Fallback
- GitHub MCP → WebFetch/curl/gh.
- Không mạng → `unverified`/`blocked`, không đoán.
