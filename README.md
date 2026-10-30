# Agent-ducanh — bộ kit AI làm website

Bộ kit cho AI agent làm website theo 5 việc:

| Việc | Kit |
|---|---|
| Làm website mới | `kits/new-web/` |
| Audit/fix web đang chạy | `kits/audit-fix/` |
| Thêm tính năng | `kits/feature/` |
| Đổi GUI/UI/UX | `kits/ui-rework/` |
| Bug/hotfix/bảo trì | `kits/maintenance/` |

Tất cả dùng chung `core/` và một sổ dự án `agent-state/`. Kit sau đọc `HANDOFF.md` để tiếp tục, không hỏi lại từ đầu.

## Bộ kit có gì

- `core/`: luật agent, router chọn kit, protocol web-agent/2.5, template brief/handoff, rule UI/page, checklist, skill `/web-kit`, `/audit-web`, `/fix-web`, `/verify-web`, `/perf-web`.
- `kits/new-web/`: 4 prompt — hỏi brief, lập plan, build, verify.
- `kits/audit-fix/`: audit 10 góc nhìn + 10 persona, fix, verify độc lập.
- `kits/feature/`, `kits/ui-rework/`, `kits/maintenance/`: 4 prompt mỗi kit.
- `examples/demo-site/`: một web tĩnh nhỏ đã có brief, để xem kit hoạt động thế nào.

Chưa đưa vào repo: deploy thật, ảnh GDCT1 gốc, dữ liệu người dùng.

## Dùng thử trong 5 bước

1. Copy **nội dung** thư mục `core/` vào **root project** (để `AGENTS.md`, `.agents/`, `.qoder/`, `.claude/`, `router.md`, `protocol/` nằm ngay root).
2. Copy thư mục `kits/` vào root, giữ đường dẫn `kits/<kit>/...`; hoặc chỉ copy kit cần dùng vào `kits/<kit>/`.
3. Mở project bằng Antigravity 2.0 (hoặc Qoder/Claude Code).
4. Gõ `/web-kit` và nói việc bạn muốn. Nếu không chắc, nó hỏi tối đa 3 câu.
5. Đọc bản tóm tắt 1 trang, duyệt phạm vi. AI làm, kiểm tra bằng browser thật, rồi ghi `agent-state/HANDOFF.md`.

Mỗi kit cũng có `START-HERE.md` để dùng riêng, không cần router.

## Xem web demo

Mở file `examples/demo-site/index.html` bằng browser, hoặc chạy một server tĩnh tại thư mục đó. Web demo có:

- Trang chủ một trang, responsive.
- Form đăng ký nhận kế hoạch mẫu (chỉ demo, không gửi email).
- `agent-state/PROJECT.md` là brief đã điền.
- `agent-state/HANDOFF.md` là ví dụ bàn giao sang `audit-fix`.

## Demo đã kiểm

- 1440/768/390/320: không overflow; `scrollWidth = clientWidth`.
- Console/network: 0 error/exception/HTTP ≥400.
- Form invalid/valid: đúng; focus field lỗi; không gửi network.
- axe: 0 violation, 1 incomplete.
- Ảnh: `examples/demo-site/screenshots/desktop.png`, `tablet.png`, `mobile.png`, `narrow.png`.
- Style: `style-before-desktop.png` / `style-before-mobile.png` và ảnh sau; `agent-state/DESIGN.md` + `UI_REVIEW.md`.
- Kết quả máy đọc: `examples/demo-site/screenshots/verify.json`, `axe.json`; axe 0 violation.
- Báo cáo mẫu: `examples/demo-site/agent-state/AUDIT_REPORT.md`, `VERIFICATION_REPORT.md`, `OWNER_SUMMARY.md`.

Chưa kiểm: performance trace, screen reader thật, Firefox/WebKit.

## P0 đã có

- Hooks: `core/hooks/pre-tool-check.mjs`, `post-edit-check.mjs`, `stop-evidence.mjs` + `core/.claude/settings.json.example`.
- CI: `.github/workflows/validate.yml`; pre-commit: `.pre-commit-config.yaml`.
- CI browser: `scripts/ci-browser-smoke.mjs` (portable Chrome); local full verify dùng `scripts/verify-demo.cjs` + `scripts/lib/cdp-harness.cjs` (portable, chỉ cần Chrome).
- Audit sâu `scripts/audit-demo.cjs` cần `axe-core`: đặt `AXE_PATH` hoặc cài ngoài project.
- Lệnh Claude: `/new-web`, `/audit`, `/fix`, `/verify`, `/feature`, `/ui-rework`, `/triage`.
- Eval: `evals/cases.json` + `node scripts/eval-kits.mjs`.
- Check: `node scripts/check-docs.mjs`, `check-superpowers`, `check-antigravity`, `check-personas`, `check-dispatch`, `check-ui`, `check-style`, `check-layout`.
- Checkpoint: `node scripts/checkpoint.mjs "label"`.
- License MIT, SECURITY.md, VERSION, CHANGELOG.
- Lite/Full: `core/prompts/lite.md`; GitHub research: `core/prompts/github-research.md`.
- Impeccable optional: `docs/tools/impeccable.md`.

## P1 đã có

- Đủ 10 lens A1–A10: `kits/audit-fix/lenses/`.
- Full 4 prompt cho feature/ui-rework/maintenance.
- Subagent Claude: `core/.claude/agents/` (lens-auditor, verifier, security-reviewer, test-engineer).
- Qoder agent guide: `core/.qoder/agents/README.md`.
- MCP config mẫu: `core/toolbox/mcp_config.example.json`.
- Settings allow/deny: `core/.claude/settings.json.example`.
- Memory: `examples/demo-site/agent-state/LESSONS.md`, `core/rules/context-budget.md`.
- Eval mở rộng: 10 case.

## P2 đã có

- Plugin bundle: `plugins/` + `node scripts/package-plugins.mjs` → `dist/` (generated).
- Cost/model/effort: `docs/operating/cost-and-models.md`.
- Notification/schedule: `docs/operating/notifications-and-schedule.md`.
- Session log: `core/hooks/session-log.mjs` + `core/templates/runlog.md`.
- 5 thẻ non-tech: `cards/README.md`.

## Antigravity deep (0.4.0)

- 5 subagent: `lens-auditor` (flash), `report-editor` (pro), `verifier`, `security-reviewer`, `test-engineer`.
- Audit: `/browser` capture một lần → 10 lens auditor đọc evidence, batch ≤3 → report-editor → main confirm.
- Custom subagent không có browser; chỉ `/browser` ở main.
- Tool whitelist: `view_file`, `grep_search`, `run_command`, `replace_file_content`; kiểm bằng `node scripts/check-antigravity.mjs`.
- Skills: `web-kit`, `toolbox`, `audit-web`, `fix-web`, `verify-web` (5; 0.7.0 thêm `perf-web` = 6).
- Rule: `core/.agents/rules/50-antigravity-subagents.md`.

## Persona bug hunt (0.5.0)

- 10 persona P01–P10 trong `kits/audit-fix/personas/`.
- Audit: `/browser` capture → `user-auditor` ×10, batch ≤3 → `bug-skeptic` P0/P1/P2 → `report-editor`.
- Persona là người dùng, không phải developer; preference cap P3.
- P0/P1 không có evidence/repro sẽ bị loại.
- Kiểm bằng `node scripts/check-personas.mjs`.

## Leader dispatch (0.6.0)

- Một vòng lặp chuẩn: recon → mission map → batch ≤3 → validate → spot-check 3 → repair 1 lần → merge → verify.
- Mỗi mission đóng gói 17 field; không gửi chat history/secret/output mission khác.
- 10 persona chia 4 batch (3/3/3/1), không chạy 10 cùng lúc.
- Output lỗi (`invalid`/`blocked`) không được sang skeptic/judge/score.
- File: `core/prompts/leader-dispatch.md`, `core/templates/subagent-mission.md`, `subagent-result.md`, rule `70-leader-dispatch.md`.
- Kiểm bằng `node scripts/check-dispatch.mjs`.

## Perf và release (0.7.0)

- **`perf-web`** — skill Antigravity thứ 6: baseline 3 run mobile/desktop, before/after, regression; lab ≠ field.
- **`release-web`** — prompt/command có cổng xác nhận, rollback và smoke production; cố tình không thành skill để AI không tự deploy.
- File: `core/prompts/perf-web.md`, `core/prompts/release-web.md`, `core/templates/perf-report.md`, `core/templates/release-report.md`.
- Lighthouse CI optional: `docs/tools/lighthouse-ci.md`; lệnh Claude: `/perf-web`, `/release-web`.

## UI quality (0.8.0)

- Rule `core/rules/ui-quality.md`: 10 điều về bằng chứng, hierarchy, states, a11y, responsive, token, motion, nội dung, chống “AI slop”, sign-off.
- Template `core/templates/design-spec.md` → lưu `agent-state/DESIGN.md` làm nguồn sự thật cho gu.
- Template `core/templates/ui-review.md` → lưu `agent-state/UI_REVIEW.md` với before/after + owner F-UI.
- Lệnh `/ui-review` read-only; không thêm skill Antigravity thứ 7.
- Impeccable/Design Review chỉ là second opinion; không “Lighthouse = đẹp”.

## UI style (0.9.0)

- Rule `core/rules/ui-style.md`: AI chọn 1 hướng theo nội dung/người dùng/task, tối đa 1 gia vị; ghi 3 từ khoá, signature, density, voice, anti-pattern.
- 3 hướng trong `docs/style/directions.md`: **Editorial calm**, **Product precise**, **Warm expressive** — palette, type, UX style, motion, do/don't.
- `agent-state/DESIGN.md` ghi hướng đã chọn; `/style-web` để chọn/áp thử; không thêm skill Antigravity.
- Demo Focus Board chọn **Editorial calm** + signature “3 nhịp”; có before/after, `DESIGN.md`, `UI_REVIEW.md`.
- Kiểm bằng `node scripts/check-style.mjs`.

## Page goals & layout (0.10.0)

- `docs/style/site-goals.md`: 10 loại web; **learning platform** ưu tiên tập trung, tìm bài, tiến độ/XP, bài tập/quiz, quay lại; kèm e-commerce, SaaS, docs, community, media, portfolio, booking, nonprofit, dashboard.
- `core/rules/ui-layout.md`: 10 câu hỏi mỗi trang, menu/navigation, phân cấp thị giác, palette 60-30-10, `PAGE_SPEC`.
- `docs/style/page-patterns.md`: 9 pattern — learning dashboard, catalog, course detail, lesson, quiz, landing, docs, checkout/booking, dashboard/table.
- `core/templates/page-spec.md` + `/page-web`: mỗi route có mục tiêu, CTA, menu/IA, hierarchy, states, metrics.
- GitHub pattern references: freeCodeCamp, Open edX, Moodle, Oppia; chỉ đọc pattern, không copy code/assets.
- Demo có `PAGE_SPEC.md`; ví dụ learning home ở `docs/style/examples/learning-home.md`.
- Kiểm bằng `node scripts/check-layout.mjs`.

## Cấu trúc chính

```text
core/                 # copy một lần
kits/new-web/         # làm web mới
kits/audit-fix/       # audit + fix
kits/feature/         # thêm tính năng (khung)
kits/ui-rework/       # đổi giao diện (khung)
kits/maintenance/     # bug/hotfix (khung)
examples/demo-site/   # web demo
docs/kit-map.md       # chọn kit + chuyển kit
scripts/check-docs.mjs
```

## An toàn

- Không tự deploy, không thanh toán thật, không xóa dữ liệu.
- Không đưa PII/secret/lệnh local lên repo public.
- Không nói “xong” nếu chưa có bằng chứng; thiếu browser thì ghi `blocked`.
- Superpowers là tùy chọn; kit vẫn chạy nếu không có plugin.
