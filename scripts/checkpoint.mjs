import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const label = (process.argv[2] || "checkpoint").replace(/[^a-zA-Z0-9._-]+/g, "-");
if (!existsSync("agent-state")) {
  console.error("agent-state/ not found; nothing to checkpoint.");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = join("agent-state", "checkpoints", `${stamp}-${label}`);
mkdirSync(dir, { recursive: true });

for (const name of readdirSync("agent-state")) {
  if (name === "checkpoints") continue;
  cpSync(join("agent-state", name), join(dir, name), { recursive: true });
}

const gitHead = spawnSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).stdout?.trim() || "no-git";
const gitStatus = spawnSync("git", ["status", "--short"], { encoding: "utf8" }).stdout?.trim() || "";

writeFileSync(
  join(dir, "CHECKPOINT.md"),
  `# Checkpoint\n\n- label: ${label}\n- created: ${new Date().toISOString()}\n- git: ${gitHead}\n- dirty:\n\`\`\`\n${gitStatus || "(clean)"}\n\`\`\`\n\nRestore manually after review; do not overwrite newer user changes.\n`
);

console.log(`Checkpoint created: ${dir}`);
