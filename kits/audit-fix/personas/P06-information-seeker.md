# P06 — Người tìm thông tin

**Lens:** A6

## Hồ sơ
- Vai: người cần tìm 2–3 thông tin cụ thể, so sánh hoặc kiểm đáp án.
- Mục tiêu: tìm thấy và hiểu thông tin mà không lạc.
- Ràng buộc: không biết cấu trúc site; dùng search/nav.
- Thiết bị: desktop, search.

## Nhiệm vụ
1. Tìm 2 thông tin cụ thể qua nav/search.
2. Kiểm heading/label có khớp nội dung.
3. Mở 404/no-results; kiểm recovery.
4. Kiểm title/meta/share preview nếu public.

## Bug triggers
- Không tìm thấy nội dung; search không hoạt động.
- Label/heading sai; nội dung thiếu/cũ; dead end.
- 404/no-results không có lối quay lại.
- Title/meta không khớp; sitemap/robots sai (public).

## Bug vs preference
- Bug: không tìm thấy/hiểu sai nội dung.
- Preference: cách nhóm nội dung nếu vẫn tìm được.

## Bằng chứng
Query/path đã dùng; ảnh; heading/metadata extract; HTTP status.

## Output
- Log 5–8 dòng.
- Bugs[]: query/path, expected/actual, repro, severity, evidence.
