# UI style — chọn gu theo nội dung

Áp dụng cho `new-web`, `ui-rework`, và lens A1/A10 của `audit-fix`. Đọc kèm `docs/style/directions.md`.

## 1. Bảng quyết định
| Nội dung/người dùng | Hướng chính | Dấu hiệu |
|---|---|---|
| Học tập, viết, sức khoẻ, tài chính cần tin cậy | Editorial calm | serif + giấy ấm + khoảng thở |
| Dashboard, SaaS, dev tool, dữ liệu | Product precise | sans + lưới 8px + mật độ gọn |
| Cộng đồng, trẻ, sáng tạo, thương hiệu cá nhân | Warm expressive | khối màu + bo tròn + minh hoạ |
| Hỗn hợp | 1 chính + 1 gia vị | ghi lý do; không trộn 3 |

- Mỗi dự án chọn **1 hướng chính**, tối đa **1 gia vị**.
- Ghi lý do trong `DESIGN.md`: người dùng, task, cảm giác muốn tạo.
- Không mặc định trend/template; không “SaaS tím”.

## 2. Hợp đồng style
Mỗi dự án phải ghi:
- **3 từ khoá gu** (ví dụ: tin cậy, ấm, rõ).
- **1 signature element** — dấu hiệu nhận ra, không phải logo.
- **Density** — thoáng hay gọn; số đo.
- **Voice** — giọng nội dung, CTA, error.
- **Anti-pattern** — 3 thứ cấm.
- **References** — tham khảo, không copy mù.

## 3. UX style
Style không chỉ là màu:
- **Navigation:** tuyến tính/guided hay dày/shortcut.
- **Feedback:** nhẹ, chính xác, hay ăn mừng vừa phải.
- **States:** empty/loading/error/success/disabled.
- **Progressive disclosure:** khi nào giấu, khi nào mở.
- **Motion:** none/subtle/expressive + reduced-motion.
- **Microcopy:** lợi ích cụ thể, không “chung chung”.

## 4. Ba hướng
| Hướng | Dùng khi | Signature | Tránh |
|---|---|---|---|
| Editorial calm | nội dung cần tin cậy, đọc nhiều | headline serif + nhịp 3 bước | gradient tím, card grid vô hồn |
| Product precise | dashboard, dữ liệu, thao tác lặp | nhãn mono + số/table | trang trí thừa, màu mè |
| Warm expressive | cộng đồng, trẻ, thương hiệu cá nhân | khối màu/nét vẽ tay | gradient bóng bẩy, emoji rải rác |

Chi tiết palette/type/spacing/motion: `docs/style/directions.md`.

## 5. Khi mơ hồ
- Đưa **2 hướng khác pack thật** trên cùng nội dung/viewport.
- Khác về palette, type, density, motion — không chỉ đổi màu.
- Owner chọn; AI không tự đổi sau khi owner chọn.

## 6. Consistency
- Một style xuyên route; token/component theo `DESIGN.md`.
- Không trộn 3 hướng; không đổi style vì một màn hình.
- Style không được phá a11y, contrast, clarity hoặc task.

## 7. Sign-off
- Owner F-UI accepted/changes_requested/pending.
- Ghi `UI_REVIEW.md`; before/after cùng điều kiện.
- Không nói “Lighthouse = đẹp”.
