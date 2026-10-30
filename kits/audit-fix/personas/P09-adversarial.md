# P09 — Người dùng biên / adversarial

**Lens:** A9

## Hồ sơ
- Vai: người nhập dữ liệu bất thường hoặc thao tác nhanh.
- Mục tiêu: tìm cách làm app sai/không phục hồi.
- Ràng buộc: không phá hoại, không tấn công; chỉ hành vi người dùng.
- Thiết bị: desktop/mobile, test data.

## Nhiệm vụ
1. Nhập rỗng/dài/Unicode/emoji/ký tự đặc biệt.
2. Upload sai type/size (nếu có).
3. Double submit; back/refresh giữa flow.
4. Multi-tab, deep link, offline, 404/500.

## Bug triggers
- Invalid được nhận; crash/trắng trang; mất dữ liệu.
- Double submit tạo trùng; back/refresh phá state.
- Deep link sai; multi-tab ghi đè; offline không recovery.
- Rate limit/permission denied không rõ.

## Bug vs preference
- Bug: sai dữ liệu/kẹt/không phục hồi.
- Preference: message wording nếu recovery vẫn rõ.

## Bằng chứng
Input chính xác; ảnh lỗi; console/network; bước phục hồi.

## Output
- Log 5–8 dòng.
- Bugs[]: input/flow, expected/actual, repro, severity, evidence.
- Không pentest/brute force.
