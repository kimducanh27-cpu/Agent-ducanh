# Lighthouse CI — optional perf tool

Nguồn: https://github.com/GoogleChrome/lighthouse-ci

## Dùng ở đâu
- `perf-web` (chính).
- `audit-fix` lens A5; `new-web`/`maintenance` khi có trigger tốc độ.

## Cài
- Nhanh, không cần dependency: `npx lighthouse <url> --output=json --output-path=<file> --chrome-flags="--headless=new --no-sandbox"`.
- Windows: nếu Lighthouse không tìm thấy Chrome, đặt `CHROME_PATH` trỏ tới `chrome.exe`; không commit path vào repo.
- CI/3 run: cài `@lhci/cli` pinned; hoặc GitHub Action; owner xác nhận.
- Không auto-update; không upload report có PII lên public storage.

## Chạy
- 3 run/route/viewport; lưu JSON/HTML/trace.
- Mobile + desktop; ghi Chrome/Lighthouse version.
- Assertions: bắt đầu `warn`, sau 2 tuần ổn định mới `error`.

## Đọc
- Lab ≠ field; Lighthouse score không phải tốc độ người thật.
- Ưu tiên LCP/INP/CLS + task impact, không chỉ score.
- Field data (CrUX/RUM) nếu có; nếu không ghi “lab only”.
- Lighthouse lab không đo INP thật; TBT là proxy.

## Guard
- Không bịa số; không so 2 lần chạy khác điều kiện.
- Không chặn CI bằng ngưỡng chưa ổn định.
- Không upload report public nếu có PII.
