# Plugin bundles

Chạy:

```bash
node scripts/package-plugins.mjs
```

Sinh ra `dist/`:

- `agent-ducanh-antigravity/` — `.antigravity-plugin/plugin.json` + `.agents/` + `AGENTS.md` + `core/` + `kits/`.
- `agent-ducanh-claude/` — `.claude-plugin/plugin.json` + `commands/` + `agents/` + `skills/` + `hooks/`.
- `agent-ducanh-qoder/` — `.qoder-plugin/plugin.json` + `skills/` + `AGENTS.md`.

`dist/` là generated, không commit. Manifest nằm trong `plugins/manifests/`.

## Cài
- **Antigravity:** `agy plugin install <path-to-folder>` hoặc đặt dưới `.agents/plugins/`.
- **Claude Code:** dùng plugin/local marketplace flow hoặc copy `commands/agents/skills` vào project.
- **Qoder:** Settings → Plugins → + Create Plugin → import folder.

## Lưu ý
- Hooks/settings chỉ là mẫu; review trước khi bật.
- Bundle vẫn cần `agent-state/PROJECT.md` + `HANDOFF.md` trong project đích.
- Không chứa secret; không auto-deploy.
