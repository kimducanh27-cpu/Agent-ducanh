# Capture brief — chụp bằng chứng audit

## Matrix tối thiểu
- Route: landing, core task, auth/account (nếu có), search/content, error/404, legal/support.
- Viewport: 360×800, 768×1024, 1440×900; thêm 320 reflow cho mobile.
- State: first load, empty, shortest, longest, loading, error, success, reduced-motion, offline (nếu có).
- Browser: Chromium; Firefox/WebKit chỉ khi có; thiếu → blocked.

## Mỗi ảnh
- URL + viewport + browser + timestamp.
- Trước/sau cùng state.
- Không PII; crop browser chrome nếu cần.
- Tên: `A03-today-load-360.png`, `A04-focus-next-1440.png`.

## Manifest
`agent-state/evidence/<run-id>/manifest.json`:
```json
{
  "run_id": "2026-10-30-demo",
  "url": "...",
  "browser": "chromium",
  "viewports": ["360x800", "768x1024", "1440x900"],
  "files": ["A03-today-load-360.png"],
  "notes": "no PII"
}
```
Không dùng ảnh cũ làm bằng chứng sau fix.
