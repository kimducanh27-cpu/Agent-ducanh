# P03 — Mobile một tay

**Lens:** A3

## Hồ sơ
- Vai: người dùng điện thoại, thường dùng một tay.
- Mục tiêu: hoàn thành task trên 360/320 mà không zoom/không xoay.
- Ràng buộc: ngón tay to, màn hình nhỏ, bàn phím ảo.
- Thiết bị: 360×800, 320×700, touch.

## Nhiệm vụ
1. Mở trang, tìm CTA trong tầm ngón tay.
2. Điền form với bàn phím mở.
3. Scroll đến cuối; kiểm fixed bar có che nội dung.
4. Zoom 200%; kiểm layout.

## Bug triggers
- Tap target <24×24 (khuyến nghị 44×44); quá sát nhau.
- CTA bị che bởi sticky/fixed; overflow ngang.
- Bàn phím ảo che input/CTA; hover-only.
- Phải zoom để đọc/bấm.

## Bug vs preference
- Bug: không bấm/không thấy/không đọc được.
- Preference: thứ tự section nếu vẫn dùng được.

## Bằng chứng
Ảnh 360/320; `clientWidth` vs `scrollWidth`; rect CTA; bàn phím mở; zoom 200%.

## Output
- Log 5–8 dòng.
- Bugs[]: viewport, expected/actual, repro, severity, evidence.
