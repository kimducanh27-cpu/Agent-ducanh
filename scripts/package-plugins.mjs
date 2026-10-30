import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const manifestDir = join(root, "plugins", "manifests");

function copyContents(src, dest, exclude = new Set()) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    if (exclude.has(name)) continue;
    cpSync(join(src, name), join(dest, name), { recursive: true });
  }
}

// 0. Sync root workspace mirrors (.agents, .claude, .qoder, AGENTS.md, CLAUDE.md, GEMINI.md, router.md) from core/
for (const dirName of [".agents", ".claude", ".qoder"]) {
  const srcDir = join(root, "core", dirName);
  const destDir = join(root, dirName);
  if (existsSync(srcDir)) {
    rmSync(destDir, { recursive: true, force: true });
    copyContents(srcDir, destDir);
  }
}
for (const docName of ["AGENTS.md", "CLAUDE.md", "GEMINI.md", "router.md"]) {
  const srcDoc = join(root, "core", docName);
  if (existsSync(srcDoc)) {
    cpSync(srcDoc, join(root, docName));
  }
}

function copyProjectDocs(dest, coreExclude) {
  for (const file of ["README.md", "LICENSE", "VERSION", "CHANGELOG.md"]) {
    if (existsSync(file)) cpSync(file, join(dest, file));
  }
  copyContents("core", join(dest, "core"), coreExclude);
  copyContents("kits", join(dest, "kits"));
  if (existsSync("docs/tools")) copyContents("docs/tools", join(dest, "docs", "tools"));
  if (existsSync("docs/style")) copyContents("docs/style", join(dest, "docs", "style"));
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

// 1. Antigravity plugin bundle: top-level agents/ (11), skills/ (6), rules/ (7) + .antigravity-plugin/plugin.json + core/ + kits/ + README.md
const antigravity = join(dist, "agent-ducanh-antigravity");
copyContents("core", antigravity, new Set([".claude", ".qoder", "CLAUDE.md", "rules"]));
copyProjectDocs(antigravity, new Set([".claude", ".qoder"]));
mkdirSync(join(antigravity, ".antigravity-plugin"), { recursive: true });
cpSync(join(manifestDir, "antigravity.json"), join(antigravity, ".antigravity-plugin", "plugin.json"));
copyContents(join("core", ".agents", "agents"), join(antigravity, "agents"));
copyContents(join("core", ".agents", "skills"), join(antigravity, "skills"));
copyContents(join("core", ".agents", "rules"), join(antigravity, "rules"));
writeReadme(
  antigravity,
  "Antigravity",
  "`agy plugin install <path-to-this-folder>` or place it under `.agents/plugins/`."
);

// 2. Claude Code plugin bundle
const claude = join(dist, "agent-ducanh-claude");
copyContents("core", claude, new Set([".agents", ".claude", ".qoder", "GEMINI.md"]));
copyProjectDocs(claude, new Set([".agents", ".claude", ".qoder"]));
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

// 3. Qoder plugin bundle
const qoder = join(dist, "agent-ducanh-qoder");
copyContents("core", qoder, new Set([".agents", ".claude", ".qoder", "CLAUDE.md", "GEMINI.md"]));
copyProjectDocs(qoder, new Set([".agents", ".claude", ".qoder"]));
mkdirSync(join(qoder, ".qoder-plugin"), { recursive: true });
cpSync(join(manifestDir, "qoder.json"), join(qoder, ".qoder-plugin", "plugin.json"));
copyContents(join("core", ".qoder", "skills"), join(qoder, "skills"));
writeReadme(
  qoder,
  "Qoder",
  "Settings > Plugins > + Create Plugin > import this folder (project or user scope)."
);

console.log("Synced root workspace mirrors (.agents, .claude, .qoder) and built plugin bundles:");
for (const name of readdirSync(dist)) console.log(`- dist/${name}`);
