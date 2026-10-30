import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const failures = [];
const agentsDir = "core/.agents/agents";
const skillsDir = "core/.agents/skills";
const rulesDir = "core/.agents/rules";
const allowedTools = new Set(["view_file", "grep_search", "run_command", "replace_file_content"]);
const allowedModels = new Set(["inherit", "flash", "pro"]);
const allowedPolicies = new Set(["off", "auto", "eager", "sandbox"]);
const readOnlyOff = new Set(["lens-auditor", "report-editor", "security-reviewer", "user-auditor", "bug-skeptic"]);

function frontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function field(fm, key) {
  const match = fm.match(new RegExp(`^\\s*${key}:\\s*(.+)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

const names = new Set();
for (const file of readdirSync(agentsDir).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(agentsDir, file), "utf8");
  const fm = frontmatter(text);
  const name = field(fm, "name");
  if (!name) failures.push(`${file}: missing name`);
  if (names.has(name)) failures.push(`${file}: duplicate name ${name}`);
  names.add(name);
  for (const key of ["description", "subagent", "model", "tools", "commandExecutionPolicy"]) {
    if (!field(fm, key)) failures.push(`${file}: missing ${key}`);
  }
  if (field(fm, "subagent") !== "true") failures.push(`${file}: subagent must be true`);
  const model = field(fm, "model");
  if (!allowedModels.has(model)) failures.push(`${file}: bad model ${model}`);
  const policy = field(fm, "commandExecutionPolicy");
  if (!allowedPolicies.has(policy)) failures.push(`${file}: bad commandExecutionPolicy ${policy}`);
  const tools = (field(fm, "tools").match(/\[([^\]]*)\]/)?.[1] || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  if (!tools.length) failures.push(`${file}: tools empty`);
  for (const tool of tools) {
    if (!allowedTools.has(tool)) failures.push(`${file}: unknown tool ${tool}`);
    if (tool === "browser") failures.push(`${file}: custom subagent must not use browser`);
    if (tool === "replace_file_content" && name !== "test-engineer") {
      failures.push(`${file}: replace_file_content only allowed for test-engineer`);
    }
  }
  if (readOnlyOff.has(name) && policy !== "off") failures.push(`${file}: read-only agent must use commandExecutionPolicy off`);
  if ((name === "verifier" || name === "test-engineer") && policy !== "sandbox") {
    failures.push(`${file}: ${name} must use sandbox`);
  }
}

const skills = readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
if (skills.length > 6) failures.push(`too many Antigravity skills (${skills.length}); keep <=6`);
for (const skill of skills) {
  const file = join(skillsDir, skill, "SKILL.md");
  if (!existsSync(file)) { failures.push(`${skill}: missing SKILL.md`); continue; }
  const fm = frontmatter(readFileSync(file, "utf8"));
  if (!field(fm, "description")) failures.push(`${skill}: missing description`);
}

for (const file of readdirSync(rulesDir).filter((f) => f.endsWith(".md"))) {
  const full = join(rulesDir, file);
  const text = readFileSync(full, "utf8");
  const fm = frontmatter(text);
  if (!field(fm, "trigger")) failures.push(`${file}: missing trigger`);
  if (!field(fm, "description")) failures.push(`${file}: missing description`);
  if (statSync(full).size > 24 * 1024) failures.push(`${file}: >24KB`);
}
if (!existsSync(join(rulesDir, "50-antigravity-subagents.md"))) failures.push("missing 50-antigravity-subagents.md");
if (!existsSync(join(rulesDir, "60-persona-bughunt.md"))) failures.push("missing 60-persona-bughunt.md");

try {
  const plugin = JSON.parse(readFileSync("plugins/manifests/antigravity.json", "utf8"));
  if (!plugin.name || !plugin.version) failures.push("antigravity plugin manifest missing name/version");
  if (!Array.isArray(plugin.suggestedPrompts) || !plugin.suggestedPrompts.length) {
    failures.push("antigravity plugin manifest missing suggestedPrompts");
  }
} catch (error) {
  failures.push(`antigravity plugin manifest invalid: ${error.message}`);
}

for (const file of ["docs/tools/antigravity-2.md", "core/prompts/persona-bug-hunt.md", "core/prompts/perf-web.md", "core/prompts/release-web.md", "docs/tools/lighthouse-ci.md", "kits/audit-fix/personas/index.md", "core/.agents/skills/audit-web/SKILL.md", "core/.agents/skills/fix-web/SKILL.md", "core/.agents/skills/verify-web/SKILL.md", "core/.agents/skills/perf-web/SKILL.md"]) {
  if (!existsSync(file)) failures.push(`missing: ${file}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — ${names.size} subagents, ${skills.length} skills, ${readdirSync(rulesDir).length} rules.`);
}
