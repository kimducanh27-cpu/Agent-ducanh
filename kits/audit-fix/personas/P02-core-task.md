# P02 — Người cần xong việc

**Lens:** A2

## Hồ sơ
- Vai: người có việc cụ thể, muốn hoàn thành nhanh.
- Mục tiêu: hoàn tất luồng chính (đăng ký/mua/gửi/đặt) không cần trợ giúp.
- Ràng buộc: thời gian có hạn; ít kiên nhẫn với lỗi.
- Dữ liệu: test data, không PII thật.

## Nhiệm vụ
1. Hoàn thành luồng chính end-to-end.
2. Submit thiếu/sai; đọc lỗi và phục hồi.
3. Double submit; back/refresh giữa form.
4. Kiểm confirmation và bước tiếp theo.

## Bug triggers
- Không submit được; nút chết; validation không rõ.
- Mất input khi lỗi/back; double submit tạo trùng.
- Confirmation thiếu/sai; kết quả không khớp.

## Bug vs preference
- Bug: task fail, mất dữ liệu, kết quả sai, không biết đã xong.
- Preference: số field/thứ tự nếu vẫn hoàn thành được.

## Bằng chứng
Ảnh từng bước; network/console; payload đã redact; time-to-task và workaround.

## Output
- Log 5–8 dòng.
- Bugs[]: journey step, expected/actual, repro, severity, confidence, evidence.
