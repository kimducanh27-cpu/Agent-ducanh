# Plugin bundles

Chạy:

```bash
node scripts/package-plugins.mjs
```

Sinh ra `dist/`:

- `agent-ducanh-antigravity/` — `.antigravity-plugin/plugin.json` + `agents/` (7 file `.md`) + `skills/` (6 thư mục Skill) + `rules/` (7 file Rule) + `.agents/` + `core/` + `kits/` + `README.md` + `docs/tools/` + `docs/style/`.
- `agent-ducanh-claude/` — `.claude-plugin/plugin.json` + `commands/` + `agents/` + `skills/` + `hooks/` + `core/` + `kits/` + `docs/tools/` + `docs/style/`.
- `agent-ducanh-qoder/` — `.qoder-plugin/plugin.json` + `skills/` + `AGENTS.md` + `core/` + `kits/` + `docs/tools/` + `docs/style/`.

`dist/` là generated, không commit. Manifest nằm trong `plugins/manifests/`.

## Cài
- **Antigravity:** `agy plugin install <path-to-folder>` hoặc đặt dưới `.agents/plugins/`.
- **Claude Code:** dùng plugin/local marketplace flow hoặc copy `commands/agents/skills` vào project.
- **Qoder:** Settings → Plugins → + Create Plugin → import folder.

## Lưu ý
- Hooks/settings chỉ là mẫu; review trước khi bật.
- Bundle vẫn cần `agent-state/PROJECT.md` + `HANDOFF.md` trong project đích.
- Không chứa secret; không auto-deploy.
