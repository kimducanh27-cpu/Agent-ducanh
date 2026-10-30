# Mục tiêu theo loại web

Thiết kế theo **job của người dùng**, không theo số hiệu ứng. Chọn loại web/trang, ghi mục tiêu vào `agent-state/PAGE_SPEC.md`, rồi mới chọn pattern.

## 1. Learning platform — ưu tiên số 1

### 5 mục tiêu
| Mục tiêu | Nghĩa là | Đo bằng |
|---|---|---|
| **Dễ tập trung** | một bài/một việc mỗi lúc; ít menu, ít thông báo; resume đúng chỗ | time-to-resume, lesson completion, số lần rời bài |
| **Dễ tìm khóa/bài/ôn** | tìm theo mục tiêu, level, thời gian; filter rõ; review due | search success, zero-result, time-to-find |
| **Theo dõi tiến độ/cấp/XP** | thấy đang ở đâu, tiếp theo là gì; không chỉ badge | completion, mastery, resume rate |
| **Làm bài tập/trắc nghiệm thuận tiện** | một câu/nhóm ngắn; feedback ngay; retry; giải thích | quiz start/finish, error recovery, retry |
| **Hứng thú quay lại** | daily goal, streak, review due, nhắc nhẹ | D1/D7 return, review completion, streak không gây lo lắng |

### Page goals
| Trang | Mục tiêu chính | CTA |
|---|---|---|
| Home/dashboard | trong 5 giây biết “học gì tiếp” | Tiếp tục bài / Ôn 5 phút |
| Catalog/search | tìm đúng khóa theo mục tiêu/level/thời gian | Xem khóa / Bắt đầu |
| Course detail | hiểu kết quả, level, thời lượng, lộ trình | Bắt đầu / Tiếp tục |
| Lesson player | tập trung một bài; transcript; tiến độ | Hoàn thành / Bài tiếp |
| Quiz/practice | làm nhanh, feedback, retry, giải thích | Trả lời / Thử lại |
| Review | ôn đúng phần yếu/đến hạn | Ôn ngay |
| Progress/profile | level/XP, mastery, mốc tiếp theo | Mục tiêu tiếp theo |
| Onboarding | chọn mục tiêu/level/thời gian; có skip | Vào học |
| Empty/error/offline | không mất chỗ; retry/fallback | Tiếp tục / Thử lại |

### Tránh
- Hiệu ứng/XP che nội dung học; badge spam; streak gây cảm giác tội lỗi.
- Autoplay video có tiếng; khóa nội dung không rõ lý do.
- Quiz phạt nặng, không giải thích; ẩn tiến độ; quá nhiều thông báo.
- Bắt đăng ký trước khi thấy giá trị.

### GitHub tham khảo
| Repo | Học pattern | Lưu ý |
|---|---|---|
| [freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) | superblock → block → challenge/project; tiến độ theo bước | chỉ đọc cấu trúc; không copy curriculum/code |
| [Open edX platform](https://github.com/openedx/openedx-platform) + [learning MFE](https://github.com/openedx/frontend-app-learning) | course outline, progress page, learning app | AGPL; chỉ tham khảo pattern |
| [Moodle](https://github.com/moodle/moodle) | completion tracking, quiz, gradebook | GPL; không copy code |
| [Oppia](https://github.com/oppia/oppia) | exploration/state transition, feedback theo câu trả lời | Apache-2.0; kiểm lại license |
| [Exercism](https://github.com/exercism/exercism) | track → exercise → mentoring; luyện tập lặp | chỉ tham khảo flow |

## 2. Các loại web khác

| Loại | Người dùng cần | Trang lõi | CTA chính | Đo bằng | Tránh |
|---|---|---|---|---|---|
| **E-commerce** | tìm, so sánh, mua | catalog, product, cart, checkout | Thêm vào giỏ / Mua | conversion, cart abandonment | urgency giả, phí ẩn |
| **SaaS/product tool** | đánh giá, dùng thử, kích hoạt | landing, pricing, onboarding, dashboard | Bắt đầu / Dùng thử | activation, retention | feature dump, giá ẩn |
| **Documentation** | tìm câu trả lời, làm xong việc | home, search, guide, reference | Copy / Chạy thử | search success, task completion | docs cũ, thiếu ví dụ |
| **Community/forum** | hỏi, trả lời, kết nối | feed, topic, profile | Đăng / Trả lời | active members, response time | nhiễu, moderation yếu |
| **Media/blog/news** | đọc, khám phá, theo dõi | home, article, category | Đọc / Subscribe | read depth, return | clickbait, quảng cáo rối |
| **Portfolio/agency** | tin năng lực, liên hệ | home, work, case study, contact | Liên hệ | inquiry, case study read | đẹp nhưng thiếu kết quả |
| **Booking/service** | xem lịch, đặt chỗ | service, calendar, confirmation | Đặt lịch | booking completion, no-show | phí ẩn, timezone sai |
| **Nonprofit/association** | hiểu, tin, tham gia/quyên góp | mission, programs, impact, donate | Quyên góp / Tham gia | donation, trust | cảm giác tội lỗi, impact mơ hồ |
| **Internal dashboard/admin** | giám sát, xử lý | overview, table, detail, settings | Xử lý / Lưu | task time, error rate | chart junk, thiếu empty/error |

## 3. Dùng thế nào
1. Chọn loại web + loại trang; ghi vào `PAGE_SPEC.md`.
2. Trả lời 10 câu hỏi trong `core/rules/ui-layout.md`.
3. Chọn pattern trong `docs/style/page-patterns.md`; không copy nguyên.
4. Ghi metric + non-goals; không thêm hiệu ứng nếu không phục vụ metric.
5. GitHub chỉ là pattern reference: ghi URL/ngày/commit/license; không copy code/assets.