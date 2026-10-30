# Persona bug hunt — Hunter / Skeptic / Judge

## Vai
`user-auditor` là **người dùng được giao persona**, không phải developer. Nó chỉ dùng persona card + evidence pack; không browser, không code.

## Bug là gì
Bug = vi phạm task/kỳ vọng nhất quán/standard, tái hiện được, có evidence.
Preference = gu/thẩm mỹ không ảnh hưởng task; cap P3.
Không gọi là bug nếu chỉ suy từ code hoặc không có evidence.

## Severity
- P0: task impossible, mất dữ liệu, PII, trap/crash.
- P1: workaround, WCAG AA fail, CWV poor, trust/data truth.
- P2: friction rõ.
- P3: preference/polish.

## Hunter output
- `log`: 5–8 dòng ngôi thứ nhất.
- `bugs[]`:
  - id, persona, lens, journey_step, url, viewport.
  - severity đề xuất, confidence, reach, class.
  - expected/actual, repro steps, evidence paths.
  - persona_quote, is_preference.
- Không có evidence → `not_run`/`blocked`, không bịa.

## Skeptic
`bug-skeptic` hỏi từng P0/P1/P2:
1. Repro được không? Evidence đâu?
2. Bug hay preference?
3. Persona này có thực sự gặp không?
4. Expected có cơ sở (task/standard/consistency)?
5. Severity/reach có hợp lý?
Verdict: `confirmed` / `rejected` / `needs-repro`. Không tự tạo bug mới.

## Judge
`report-editor` merge/dedupe/score:
- Chỉ P0/P1/P2 đã `confirmed`; preference cap P3.
- Không P0/P1 nếu thiếu evidence/repro.
- Dedupe theo root cause; giữ severity cao nhất.
- Lens score từ confirmed findings + coverage; không bịa.

## Không cascade
Output lỗi/không đủ schema → repair đúng mission đó; không đưa output lỗi sang skeptic/judge.
