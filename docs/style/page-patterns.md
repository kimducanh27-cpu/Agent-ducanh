# Page patterns

Pattern là thứ tự section + hành động chính, không phải skin. Chọn theo `docs/style/site-goals.md`; ghi vào `PAGE_SPEC.md`.

## 1. Learning dashboard
- **Mục tiêu:** trong 5 giây biết học gì tiếp.
- **Thứ tự:** lời chào ngắn → “Tiếp tục bài” → daily goal → review due → gợi ý → tiến độ.
- **CTA chính:** Tiếp tục bài; phụ: Ôn 5 phút.
- **States:** người mới (empty), có bài dở, không có review, loading/error.
- **Mobile:** continue card đầu tiên; nav dưới 4–5 mục; không nhồi badge.
- **Tránh:** XP/badge spam; 6 card tranh nhau; streak gây tội lỗi.

## 2. Catalog/search
- **Mục tiêu:** tìm đúng khóa/bài theo mục tiêu, level, thời gian.
- **Thứ tự:** search → filter (mục tiêu/level/thời gian) → kết quả → gợi ý → empty state.
- **CTA chính:** Xem khóa / Bắt đầu.
- **States:** loading skeleton, 0 kết quả có gợi ý, lỗi search, filter không khớp.
- **Mobile:** filter dạng sheet; kết quả 1 cột; giữ search sticky.
- **Tránh:** filter ẩn, kết quả không có lý do, dead end.

## 3. Course detail
- **Mục tiêu:** hiểu kết quả, level, thời lượng, lộ trình trước khi học.
- **Thứ tự:** outcome → level/thời lượng → syllabus → prerequisite → giảng viên/proof → CTA → FAQ.
- **CTA chính:** Bắt đầu / Tiếp tục.
- **States:** chưa đăng ký, đang học, đã xong, khóa bị khóa.
- **Mobile:** CTA sticky dưới; syllabus accordion.
- **Tránh:** giấu thời lượng/level; CTA mơ hồ.

## 4. Lesson player
- **Mục tiêu:** tập trung một bài, không mất chỗ.
- **Thứ tự:** title → nội dung/video → transcript → progress → next.
- **CTA chính:** Hoàn thành / Bài tiếp.
- **States:** loading media, lỗi media, offline, đã xong, ghi chú.
- **Mobile:** player full-width; control ≥44px; không autoplay có tiếng.
- **Tránh:** menu/notification chen ngang; video autoplay; mất vị trí.

## 5. Quiz/practice
- **Mục tiêu:** làm nhanh, hiểu lỗi, thử lại.
- **Thứ tự:** tiến độ → câu hỏi → đáp án → feedback/giải thích → câu tiếp → kết quả.
- **CTA chính:** Trả lời / Thử lại.
- **States:** chưa chọn, đúng, sai, hết giờ (nếu có), bỏ dở.
- **Mobile:** một câu/nhóm ngắn; nút to; không cuộn ngang.
- **Tránh:** phạt nặng, không giải thích, timer áp lực mặc định.

## 6. Landing page
- **Mục tiêu:** hiểu offer + tin + hành động.
- **Thứ tự:** hero (what/for whom/next) → proof → cách hoạt động → offer → FAQ → CTA.
- **CTA chính:** 1 CTA; phụ rõ thứ bậc.
- **States:** form error/success; không có loading giả.
- **Mobile:** CTA trong thumb zone; không che nội dung.
- **Tránh:** nhiều CTA cùng nổi bật; proof bịa; hiệu ứng che thông điệp.

## 7. Docs/article
- **Mục tiêu:** tìm câu trả lời, làm xong việc.
- **Thứ tự:** title → mô tả ngắn → TOC → nội dung/code → next/prev → feedback.
- **CTA chính:** Copy / Chạy thử / Bước tiếp.
- **States:** 404, search 0 kết quả, code lỗi, bản cũ.
- **Mobile:** TOC accordion; code scroll ngang có nhãn; reading width.
- **Tránh:** docs cũ, ví dụ thiếu, heading nhảy cấp.

## 8. Checkout/booking
- **Mục tiêu:** hoàn tất nhanh, không bất ngờ.
- **Thứ tự:** tóm tắt → thông tin → giá/phí → xác nhận → trạng thái.
- **CTA chính:** Đặt / Thanh toán.
- **States:** lỗi field, hết chỗ, timeout, xác nhận, hủy.
- **Mobile:** form ngắn; autofill; không che nút bởi sticky.
- **Tránh:** phí ẩn, timezone sai, bắt tạo tài khoản không cần.

## 9. Dashboard/table
- **Mục tiêu:** giám sát, tìm, xử lý nhanh.
- **Thứ tự:** filter → KPI ngắn → table → bulk action → detail.
- **CTA chính:** Xử lý / Lưu.
- **States:** empty, loading, error, no results, permission denied.
- **Mobile:** table chuyển card/priority columns; filter sheet.
- **Tránh:** chart junk; thiếu empty/error; action không rõ.