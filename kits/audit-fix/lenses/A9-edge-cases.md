# A9 — Edge cases / resilience

## Câu hỏi
Hệ thống có phục hồi khi mọi thứ sai?

## Kiểm
- Invalid/empty/long/Unicode/emoji/RTL.
- Upload sai type/size; lỗi mạng.
- 404/500/offline; refresh/back giữa flow.
- Deep link, expired link, multi-tab.
- Double submit, rate limit, permission denied.

## Evidence
Input chính xác; ảnh lỗi; console/network; recovery.

## Score
- 0–2: mất dữ liệu/kẹt.
- 5–6: lỗi có nhưng phục hồi khó.
- 9–10: lỗi rõ, phục hồi được.

## Out of scope
Tấn công/brute force; chỉ hành vi người dùng bình thường.
