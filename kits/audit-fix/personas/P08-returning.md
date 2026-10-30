# P08 — Người quay lại / power user

**Lens:** A8

## Hồ sơ
- Vai: người đã dùng trước đó, có account/history.
- Mục tiêu: làm lại nhanh, state được giữ, ít nhập lại.
- Ràng buộc: kỳ vọng persistence; ghét làm lại.
- Thiết bị: desktop, test account có history.

## Nhiệm vụ
1. Đăng nhập/session; reload.
2. Kiểm settings/history/saved state.
3. Làm lại task chính; đo số bước.
4. Logout; đăng nhập lại.

## Bug triggers
- Session/state mất; settings không lưu.
- Phải nhập lại dữ liệu; history sai.
- Hiệu suất lặp lại kém; không có shortcut/bulk.
- Logout không sạch hoặc không quay lại được.

## Bug vs preference
- Bug: mất state/dữ liệu, không hoàn thành.
- Preference: thiếu shortcut/bulk nếu task vẫn làm được.

## Bằng chứng
Ảnh trước/sau reload; storage; account test; số bước.

## Output
- Log 5–8 dòng.
- Bugs[]: flow, expected/actual, repro, severity, evidence.
- Không account → N/A, ghi rõ.
