@AGENTS.md

# Claude Code notes

- Đọc thêm `core/router.md` và `core/protocol/README.md`.
- Skill `/web-kit` và `/toolbox` nằm trong `.claude/skills/`.
- Subagent: `lens-auditor` (read-only), `verifier` (read-only + browser), `security-reviewer`, `test-engineer`.
- Không tự đọc bare `AGENTS.md` nếu có `CLAUDE.md`; file này import `@AGENTS.md`.
- Không sửa file ngoài scope; không tự deploy.
