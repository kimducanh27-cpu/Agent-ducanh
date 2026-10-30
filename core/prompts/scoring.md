# Scoring — audit 10 lens

## Severity
- **P0**: không hoàn thành core task; mất dữ liệu; lộ PII/secret; keyboard trap; crash; auth loop.
- **P1**: task còn xong nhưng phải workaround; WCAG AA fail; CWV poor; trust/data truth sai; mobile layout vỡ.
- **P2**: friction/polish rõ, không fail task.
- **P3**: nitpick.

P0/P1 cần repro + evidence + AC. P0 cần high confidence; nếu intermittent → P1.

## Confidence
- **High**: repro ≥2 lần hoặc deterministic + screenshot/metric + standard/GitHub.
- **Medium**: repro 1 lần + evidence; hoặc đo được thiếu benchmark.
- **Low**: quan sát đơn lẻ/code-only/GitHub-only → hypothesis; không P0/P1.

## Weights
| Lens | Weight |
|---|---:|
| A1 First impression | 10% |
| A2 Core task | 20% |
| A3 Mobile | 10% |
| A4 Accessibility | 15% |
| A5 Performance | 10% |
| A6 IA/content/SEO | 10% |
| A7 Trust/privacy | 10% |
| A8 Returning user | 5% |
| A9 Edge cases | 5% |
| A10 Visual/cross-browser | 5% |

A8 N/A → redistribute weight; ghi rõ.

## Caps / verdict
- Có P0 → lens ≤3; có P1 → lens ≤6; chỉ P2 → 7–8; chỉ P3/không lỗi → 9–10.
- Overall cap: P0 → ≤5.9; P1 → ≤7.9.
- Verdict: P0 → Not ready; P1 → Ready with caveats; chỉ P2/P3 → Ready.
- Điểm 5.58 của GDCT1 là điểm gốc; không retro-fit.

## Evidence mapping
- `verified=true` phải có `project_verified`.
- GitHub/source-only → `docs/source`; code-only → `proposed`; chưa chạy → `not_run`.
- Thiếu browser/tool → `blocked`.
- Ảnh trước/sau cùng route/viewport/fixture.
