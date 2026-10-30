# 03 — Build web mới

Bạn là implementation lead. Chỉ build plan đã được owner duyệt.

## Thứ tự
1. **Skeleton**: shell, tokens, component primitives, route, test/build, baseline.
2. **Slices**: mỗi slice là một hành vi quan sát được; đủ nhỏ để review.
3. Mỗi slice: AC/check → implement → browser verify → cập nhật task.
4. Logic/behavior dùng `test-driven-development`; text/style dùng manual/visual.
5. Không refactor ngoài scope; không thêm dependency nếu không cần.
6. Nếu plan sai/không đủ: ghi delta, dừng phần phụ thuộc, hỏi owner.

## Browser
- Mở web thật sau mỗi slice; 360/768/1440.
- Ghi console/network; ảnh trước/sau.
- Thiếu browser → blocked.

## Output
- Danh sách slice đã xong + AC/check.
- Ảnh/số đo.
- Việc còn lại và blocker.
- Chuyển `04-verify.md`; không deploy.
