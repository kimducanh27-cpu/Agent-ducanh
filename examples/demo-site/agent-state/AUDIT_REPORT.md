# AUDIT_REPORT — Focus Board demo

- `work_mode: review_only`
- Ngày: 2026-10-30
- URL: `http://127.0.0.1:8123/` (local)
- Verdict: **Ready with caveats (demo partial)** — không có P0/P1; A5/A6/A7 chưa đo đủ.

## Scorecard (partial)

| Lens | Kết quả | Ghi chú |
|---|---|---|
| A1 First impression | Pass | H1/value prop rõ; 5s test chưa chạy với người thật |
| A2 Core task | Pass | Form invalid/valid đúng; không gửi network |
| A3 Mobile | Pass | 320/390/768/1440 không overflow |
| A4 Accessibility | Pass | axe 0 violation; keyboard mới test form |
| A5 Performance | **not_run** | Chưa chạy trace/Lighthouse 3 run |
| A6 IA/content/SEO | N/A | Demo local, không public/index |
| A7 Trust/privacy | N/A | Không cookie/data/auth/payment |
| A8 Returning | N/A | Không account |
| A9 Edge cases | Partial | Mới test invalid/valid form |
| A10 Visual/cross-browser | Pass | Chromium 4 viewport; Firefox/WebKit not_run |

## Findings

### U1 — [P3] Nav chưa đánh dấu mục đang xem
- **Lens:** A4/A10.
- **Evidence:** `../screenshots/verify.json` (navLinks); DOM không có `aria-current`.
- **Observation:** 3 nav link đều không có trạng thái “đang ở đây”.
- **Impact:** người dùng screen reader khó biết mục hiện tại; đây là enhancement, không phải lỗi chặn.
- **Recommendation:** nếu có scroll-spy, thêm `aria-current="location"` cho link của section đang xem; nếu không, giữ nguyên và ghi rõ.
- **Acceptance:** link active có `aria-current`; không thêm aria-current cho link không active.
- **Basis:** WAI-ARIA `aria-current`; heuristic consistency.
- **Confidence:** high; **verified:** true (`project_verified`).

## Limitations
- A5 performance chưa đo; không kết luận CWV.
- Chưa test screen reader thật, Firefox/WebKit, iOS/Android thật.
- Form chỉ demo; không có backend/email.
- Chưa test offline/refresh/back.

## Một câu hỏi
Bạn muốn `audit-fix` sửa U1 (aria-current) trước, hay chạy performance trace trước?
