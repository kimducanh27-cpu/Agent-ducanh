# Kit map — chọn kit và chuyển kit

| Việc | Kit | Mode |
|---|---|---|
| Làm web mới | `new-web` | plan_only → implement |
| Audit/fix web đang chạy | `audit-fix` | review_only → implement |
| Thêm tính năng | `feature` | plan_only → implement |
| Đổi GUI/UI/UX | `ui-rework` | ui_rework |
| Bug/hotfix/bảo trì | `maintenance` | review_only → implement |

## Lite hay Full?

- **Lite:** 1 route/component, reversible, không auth/data/payment/migration/launch.
- **Full:** web mới, audit toàn site, nhiều route, auth/data/payment/migration, launch.
- AI đề xuất; owner nói “lite”/“full”. Lite vẫn verify + handoff.

## Lệnh gõ nhanh
- Claude: `/new-web`, `/audit`, `/fix`, `/verify`, `/feature`, `/ui-rework`, `/triage`, `/perf-web`, `/release-web`, `/style-web`, `/ui-review`.
- Antigravity/Qoder: `/web-kit new|audit|fix|verify|feature|ui|triage|perf|release`.

## Stage phụ

- **Perf:** `/perf-web` — 3 run mobile/desktop, before/after, regression; không đoán từ code.
- **Release:** `core/prompts/release-web.md` — gate, rollback, smoke; chỉ deploy khi owner cho phép.
- **UI:** `ui-rework` + `core/rules/ui-quality.md`; lưu `DESIGN.md` và `UI_REVIEW.md`.
- **Style:** `core/rules/ui-style.md` + `docs/style/directions.md`; chọn pack theo nội dung; `/style-web`.
- Các stage này dùng trong kit hiện tại, không phải kit mới.

## Optional
- GitHub research khi API/version/hành vi chưa chắc.
- Impeccable cho ui-rework/new-web; audit-fix chỉ second opinion.
- Lighthouse CI cho perf-web; xem `docs/tools/lighthouse-ci.md`.
- Antigravity: `/audit-web` dùng 10 persona read-only; custom subagent không có browser.

## Chuyển kit

| Từ | Sang | Khi nào |
|---|---|---|
| new-web | audit-fix | Sau release/owner review |
| new-web | feature/ui-rework | Sau release, muốn thêm/đổi |
| audit-fix | maintenance | Finding là bug |
| audit-fix | feature | Finding cần hành vi mới |
| audit-fix | ui-rework | Finding là visual/UX |
| feature | audit-fix | Cần regression toàn diện |
| ui-rework | audit-fix | Cần a11y/visual regression |
| maintenance | feature | Fix cần hành vi mới |

## Dùng chung
- `core/AGENTS.md`, `core/router.md`, `core/protocol/README.md`.
- `agent-state/PROJECT.md`, `HANDOFF.md`.
- IDs R/T/AC/V/U/F-UI/MO.
- Không trộn mode; không hỏi lại việc đã có trong handoff.
