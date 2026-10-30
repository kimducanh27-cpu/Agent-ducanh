# EVIDENCE — Focus Board demo

## Files
- `../screenshots/desktop.png` — 1440×900 full page.
- `../screenshots/tablet.png` — 768×1024 full page.
- `../screenshots/mobile.png` — 390×844 full page.
- `../screenshots/narrow.png` — 320×700 full page.
- `../screenshots/verify.json` — metrics/form/console.
- `../screenshots/axe.json` — axe result.
- `../screenshots/style-before-desktop.png`, `style-before-mobile.png` — trước signature.
- `DESIGN.md`, `UI_REVIEW.md` — style contract + review.
- `AUDIT_REPORT.md`, `VERIFICATION_REPORT.md`.

## Kết quả
- `scrollWidth = clientWidth` ở 1440/768/390/320.
- Console/network: 0 error/exception/HTTP ≥400.
- Form invalid: 3 lỗi, focus `name`.
- Form valid: status demo, không network.
- axe: 0 violation, 1 incomplete.
- Style: Editorial calm; signature “3 nhịp” dưới h1; token radius/warm-soft; logo aria-label khớp “FocusBoard”.

## Chưa kiểm
- Performance trace 3 run.
- Screen reader thật.
- Firefox/WebKit, iOS/Android thật.
