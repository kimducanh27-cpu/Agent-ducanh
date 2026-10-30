# A8 — Returning user

## Câu hỏi
Lần sau quay lại có nhanh hơn, state có được giữ?

## Kiểm
- Session/login persistence.
- Settings, history, saved state.
- Notifications, bulk actions, shortcuts.
- Export/delete data; logout.
- Consistency giữa các lần.

## Evidence
Ảnh trước/sau reload; storage; account test.

## Score
- 0–2: mất state/không dùng lại được.
- 5–6: phải làm lại nhiều bước.
- 9–10: state đúng, thao tác nhanh.

## N/A
Không account/history → `null`, redistribute weight, ghi rõ.
