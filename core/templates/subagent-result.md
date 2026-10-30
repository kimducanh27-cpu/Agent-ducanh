# RESULT — <mission_id>

- status: ok | invalid | blocked | needs-repro | failed
- agent/model:
- summary:
- items:
- evidence:
- measurements:
- blockers:
- out_of_scope:
- confidence:
- next:
- validation: schema=pass|fail; evidence=pass|fail; scope=pass|fail

## Item schema

Mỗi item (bug/finding/check) gồm:

- id:
- persona/lens:
- route/viewport:
- severity: P0 | P1 | P2 | P3
- confidence: high | medium | low
- expected:
- actual:
- repro:
- evidence:
- persona_quote:
- is_preference: true | false

## Quy ước

- `ok`: đủ schema, evidence hợp lệ, trong scope.
- `invalid`: thiếu field/sai schema; leader repair 1 lần.
- `blocked`: thiếu browser/tool/quyền hoặc repair lần 2 vẫn lỗi.
- `needs-repro`: có dấu hiệu bug nhưng evidence chưa đủ.
- `failed`: mission không chạy được; không dùng để chấm.
- Không bịa số/ảnh/link; thiếu thì ghi `not_run`.
- Không tự nâng severity; preference cap P3.
