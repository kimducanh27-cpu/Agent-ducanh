import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const manifestDir = join(root, "plugins", "manifests");

function copyContents(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    cpSync(join(src, name), join(dest, name), { recursive: true });
  }
}

function copyProjectDocs(dest) {
  for (const file of ["LICENSE", "VERSION", "CHANGELOG.md"]) {
    if (existsSync(file)) cpSync(file, join(dest, file));
  }
  copyContents("kits", join(dest, "kits"));
}

function writeReadme(dest, app, installLine) {
  writeFileSync(
    join(dest, "PLUGIN-README.md"),
    `# Agent-ducanh — ${app} bundle\n\n` +
      `Generated from core/ + kits/ by scripts/package-plugins.mjs.\n\n` +
      `## Install\n${installLine}\n\n` +
      `## Use\n- Read AGENTS.md and router.md.\n- Use /web-kit or the app commands.\n- Hooks are examples; review before enabling.\n`
  );
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const antigravity = join(dist, "agent-ducanh-antigravity");
copyContents("core", antigravity);
copyProjectDocs(antigravity);
mkdirSync(join(antigravity, ".antigravity-plugin"), { recursive: true });
cpSync(join(manifestDir, "antigravity.json"), join(antigravity, ".antigravity-plugin", "plugin.json"));
writeReadme(
  antigravity,
  "Antigravity",
  "`agy plugin install <path-to-this-folder>` or place it under `.agents/plugins/`."
);

const claude = join(dist, "agent-ducanh-claude");
copyContents("core", claude);
copyProjectDocs(claude);
mkdirSync(join(claude, ".claude-plugin"), { recursive: true });
cpSync(join(manifestDir, "claude.json"), join(claude, ".claude-plugin", "plugin.json"));
copyContents(join("core", ".claude", "commands"), join(claude, "commands"));
copyContents(join("core", ".claude", "agents"), join(claude, "agents"));
copyContents(join("core", ".claude", "skills"), join(claude, "skills"));
copyContents(join("core", "hooks"), join(claude, "hooks"));
writeReadme(
  claude,
  "Claude Code",
  "Install the folder via Claude Code's plugin/local marketplace flow, or copy commands/agents/skills into the project."
);

const qoder = join(dist, "agent-ducanh-qoder");
copyContents("core", qoder);
copyProjectDocs(qoder);
mkdirSync(join(qoder, ".qoder-plugin"), { recursive: true });
cpSync(join(manifestDir, "qoder.json"), join(qoder, ".qoder-plugin", "plugin.json"));
copyContents(join("core", ".qoder", "skills"), join(qoder, "skills"));
writeReadme(
  qoder,
  "Qoder",
  "Settings > Plugins > + Create Plugin > import this folder (project or user scope)."
);

console.log("Built plugin bundles:");
for (const name of readdirSync(dist)) console.log(`- dist/${name}`);
