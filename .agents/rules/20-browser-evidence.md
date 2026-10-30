---
trigger: model_decision
description: "Khi audit/fix/verify web: dùng Browser Subagent, chụp ảnh/số đo, không kết luận từ code."
---

# Browser evidence

- Dùng Browser Subagent qua `/browser`.
- Mỗi lúc một browser agent; không cho nhiều agent tranh browser.
- Lưu screenshot/trace dưới `agent-state/evidence/<run-id>/`.
- Kiểm 360/768/1440; thêm 320 reflow khi mobile.
- Ghi console/network; không bỏ qua lỗi 4xx/5xx.
- Thiếu browser = `blocked`, không ghi N/A.
- Không dùng ảnh cũ làm bằng chứng sau fix.
