import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const canonical = [
  "brainstorming",
  "dispatching-parallel-agents",
  "executing-plans",
  "finishing-a-development-branch",
  "receiving-code-review",
  "requesting-code-review",
  "subagent-driven-development",
  "systematic-debugging",
  "test-driven-development",
  "using-git-worktrees",
  "using-superpowers",
  "verification-before-completion",
  "writing-plans",
  "writing-skills"
];

const failures = [];
const routingPath = "core/toolbox/superpowers-routing.md";
const routing = readFileSync(routingPath, "utf8");

for (const name of canonical) {
  if (!routing.includes(`\`${name}\``)) failures.push(`routing missing: ${name}`);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "protocol") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (extname(full) === ".md") out.push(full);
  }
  return out;
}

for (const file of ["core", "kits", "docs", "examples"].flatMap((dir) => walk(dir))) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/superpowers:([a-z][a-z-]+)/g)) {
    if (!canonical.includes(match[1])) failures.push(`${file}: unknown skill ${match[1]}`);
  }
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — 14 Superpowers skill names present; no unknown superpowers: names.`);
}
