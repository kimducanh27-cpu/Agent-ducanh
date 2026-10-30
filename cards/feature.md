# Thẻ — Thêm tính năng

## Dùng khi
Web có sẵn, cần thêm/đổi hành vi nhưng không làm lại web.

## Bạn nói
“Thêm tính năng [..] vào web hiện tại, không đổi giao diện.”

## AI làm
1. Hỏi mục tiêu/non-goals.
2. Lập impact map: route/component/data/API.
3. Lập kế hoạch + tiêu chí nghiệm thu/kiểm tra (AC/V) + phương án quay lui (rollback).
4. Sửa tối thiểu, chạy regression.

## Bạn nhận
Feature chạy, ảnh, báo cáo, handoff.

## Bạn kiểm
- Đúng tính năng, không phá luồng cũ.
- Không đổi stack/rewrite.
- Có rollback nếu rủi ro.

## Đừng
- Đừng gộp nhiều tính năng vào một vòng.
- Đừng để AI refactor ngoài scope.
- Đừng bỏ regression.
