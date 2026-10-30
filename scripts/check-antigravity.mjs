import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const failures = [];
const agentsDir = "core/.agents/agents";
const skillsDir = "core/.agents/skills";
const rulesDir = "core/.agents/rules";
const rootAgentsDir = ".agents/agents";
const rootSkillsDir = ".agents/skills";
const rootRulesDir = ".agents/rules";
const allowedTools = new Set(["view_file", "grep_search", "run_command", "replace_file_content"]);
const allowedModels = new Set(["inherit", "flash", "pro"]);
const allowedPolicies = new Set(["off", "auto", "eager", "sandbox"]);
const readOnlyOff = new Set(["researcher", "lens-auditor", "report-editor", "security-reviewer", "user-auditor", "bug-skeptic"]);
const writerAgents = new Set(["ui-ux-designer", "frontend-developer", "qa-tester", "test-engineer"]);
const sandboxAgents = new Set(["verifier", "test-engineer", "qa-tester", "frontend-developer"]);
const requiredAgents = [
  "researcher", "ui-ux-designer", "frontend-developer", "qa-tester", "security-reviewer", "verifier",
  "user-auditor", "lens-auditor", "bug-skeptic", "report-editor", "test-engineer"
];

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

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
  const coreFile = join(agentsDir, file);
  const text = readFileSync(coreFile, "utf8");
  const fm = frontmatter(text);
  const name = field(fm, "name");
  if (!name) failures.push(`${file}: missing name`);
  if (names.has(name)) failures.push(`${file}: duplicate name ${name}`);
  names.add(name);
  for (const key of ["description", "subagent", "mainAgent", "model", "tools", "commandExecutionPolicy"]) {
    if (!field(fm, key)) failures.push(`${file}: missing ${key}`);
  }
  if (field(fm, "subagent") !== "true") failures.push(`${file}: subagent must be true`);
  if (field(fm, "mainAgent") !== "false") failures.push(`${file}: mainAgent must be false`);
  const model = field(fm, "model");
  if (!allowedModels.has(model)) failures.push(`${file}: bad model ${model}`);
  if (/^\s*commandExecutionPolicy:\s*off\s*$/m.test(fm)) {
    failures.push(`${file}: commandExecutionPolicy "off" must be quoted to avoid YAML 1.1 boolean parsing`);
  }
  const policy = field(fm, "commandExecutionPolicy");
  if (!allowedPolicies.has(policy)) failures.push(`${file}: bad commandExecutionPolicy ${policy}`);
  const tools = (field(fm, "tools").match(/\[([^\]]*)\]/)?.[1] || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  if (!tools.length) failures.push(`${file}: tools empty`);
  for (const tool of tools) {
    if (!allowedTools.has(tool)) failures.push(`${file}: unknown tool ${tool}`);
    if (tool === "browser") failures.push(`${file}: custom subagent must not use browser`);
    if (tool === "replace_file_content" && !writerAgents.has(name)) {
      failures.push(`${file}: replace_file_content not allowed for ${name}`);
    }
  }
  if (readOnlyOff.has(name) && policy !== "off") failures.push(`${file}: read-only agent must use commandExecutionPolicy "off"`);
  if (name === "ui-ux-designer" && policy !== "off") failures.push(`${file}: ui-ux-designer must use commandExecutionPolicy "off"`);
  if (sandboxAgents.has(name) && policy !== "sandbox") {
    failures.push(`${file}: ${name} must use sandbox`);
  }
  const rootFile = join(rootAgentsDir, file);
  if (!existsSync(rootFile)) {
    failures.push(`root .agents/agents missing ${file}`);
  } else if (sha256File(coreFile) !== sha256File(rootFile)) {
    failures.push(`root .agents/agents/${file} drifted from core/.agents/agents/${file}`);
  }
}

for (const req of requiredAgents) {
  if (!names.has(req)) failures.push(`missing required subagent: ${req}`);
}

const skills = readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
if (skills.length > 6) failures.push(`too many Antigravity skills (${skills.length}); keep <=6`);
for (const skill of skills) {
  const file = join(skillsDir, skill, "SKILL.md");
  if (!existsSync(file)) { failures.push(`${skill}: missing SKILL.md`); continue; }
  const fm = frontmatter(readFileSync(file, "utf8"));
  if (!field(fm, "description")) failures.push(`${skill}: missing description`);
  const rootSkillFile = join(rootSkillsDir, skill, "SKILL.md");
  if (!existsSync(rootSkillFile)) {
    failures.push(`root .agents/skills/${skill} missing SKILL.md`);
  } else if (sha256File(file) !== sha256File(rootSkillFile)) {
    failures.push(`root .agents/skills/${skill}/SKILL.md drifted from core/.agents/skills/${skill}/SKILL.md`);
  }
}

for (const file of readdirSync(rulesDir).filter((f) => f.endsWith(".md"))) {
  const full = join(rulesDir, file);
  const text = readFileSync(full, "utf8");
  const fm = frontmatter(text);
  if (!field(fm, "trigger")) failures.push(`${file}: missing trigger`);
  if (!field(fm, "description")) failures.push(`${file}: missing description`);
  if (statSync(full).size > 24 * 1024) failures.push(`${file}: >24KB`);
  const rootRuleFile = join(rootRulesDir, file);
  if (!existsSync(rootRuleFile)) {
    failures.push(`root .agents/rules missing ${file}`);
  } else if (sha256File(full) !== sha256File(rootRuleFile)) {
    failures.push(`root .agents/rules/${file} drifted from core/.agents/rules/${file}`);
  }
}
if (!existsSync(join(rulesDir, "50-antigravity-subagents.md"))) failures.push("missing 50-antigravity-subagents.md");
if (!existsSync(join(rulesDir, "60-persona-bughunt.md"))) failures.push("missing 60-persona-bughunt.md");

try {
  const plugin = JSON.parse(readFileSync("plugins/manifests/antigravity.json", "utf8"));
  if (!plugin.name || !plugin.version) failures.push("antigravity plugin manifest missing name/version");
  if (!Array.isArray(plugin.suggestedPrompts) || !plugin.suggestedPrompts.length) {
    failures.push("antigravity plugin manifest missing suggestedPrompts");
  } else if (plugin.suggestedPrompts.length > 3) {
    failures.push(`antigravity plugin manifest has ${plugin.suggestedPrompts.length} suggestedPrompts; keep <=3`);
  }
} catch (error) {
  failures.push(`antigravity plugin manifest invalid: ${error.message}`);
}

for (const file of [
  "docs/tools/antigravity-2.md", "docs/tools/antigravity-cli.md", "core/prompts/persona-bug-hunt.md",
  "core/prompts/perf-web.md", "core/prompts/release-web.md", "docs/tools/lighthouse-ci.md",
  "kits/audit-fix/personas/index.md", "core/.agents/skills/audit-web/SKILL.md",
  "core/.agents/skills/fix-web/SKILL.md", "core/.agents/skills/verify-web/SKILL.md",
  "core/.agents/skills/perf-web/SKILL.md", "core/templates/task-tracker.md",
  "examples/demo-site/dashboard.html", "examples/demo-site/agent-state/TASK_TRACKER.json"
]) {
  if (!existsSync(file)) failures.push(`missing: ${file}`);
}

// Validate TASK_TRACKER.json & core/templates/task-tracker.md
try {
  const tracker = JSON.parse(readFileSync("examples/demo-site/agent-state/TASK_TRACKER.json", "utf8"));
  const coreList = Array.isArray(tracker.agents) ? tracker.agents : [];
  const auditList = Array.isArray(tracker.audit_agents) ? tracker.audit_agents : [];
  if (coreList.length !== 6) failures.push(`TASK_TRACKER.json expected 6 core agents, got ${coreList.length}`);
  if (auditList.length !== 5) failures.push(`TASK_TRACKER.json expected 5 audit_agents, got ${auditList.length}`);
  for (const entry of [...coreList, ...auditList]) {
    if (!writerAgents.has(entry.agent)) {
      if (entry.write_access !== false) {
        failures.push(`TASK_TRACKER.json: read-only agent ${entry.agent} must have write_access: false`);
      }
      if (!Array.isArray(entry.files_owned) || entry.files_owned.length !== 0) {
        failures.push(`TASK_TRACKER.json: read-only agent ${entry.agent} must have empty files_owned []`);
      }
      if (!Array.isArray(entry.outputs) || entry.outputs.length === 0) {
        failures.push(`TASK_TRACKER.json: read-only agent ${entry.agent} must declare outputs []`);
      }
    }
  }
} catch (error) {
  failures.push(`TASK_TRACKER.json invalid: ${error.message}`);
}

const tplText = readFileSync("core/templates/task-tracker.md", "utf8");
if (!tplText.includes('"audit_agents"')) failures.push("core/templates/task-tracker.md missing audit_agents section");
if (!tplText.includes('"outputs"')) failures.push("core/templates/task-tracker.md missing outputs field");
if (tplText.includes('"completed": 4')) failures.push("core/templates/task-tracker.md still has hardcoded sample 4/6");

const dashText = readFileSync("examples/demo-site/dashboard.html", "utf8");
if (!dashText.includes('href="favicon.svg"')) failures.push("dashboard.html missing favicon.svg link");
if (!dashText.includes('fetch("./agent-state/TASK_TRACKER.json")')) failures.push("dashboard.html does not fetch TASK_TRACKER.json");
if (!dashText.toLowerCase().includes("--muted: #4a554e")) failures.push("dashboard.html must use WCAG AA contrast --muted: #4A554E");
if (dashText.includes('\\"off\\"')) failures.push('dashboard.html contains literal \\"off\\"');
if (!dashText.includes('tabindex="0"')) failures.push("dashboard.html table wrapper must be focusable");
if (!dashText.includes('role="region"')) failures.push("dashboard.html table wrapper must have role=region");
if (!dashText.includes("minmax(0, 1fr)")) failures.push("dashboard.html must use minmax(0, 1fr) for mobile grids");

if (existsSync("dist/agent-ducanh-antigravity")) {
  const distRoot = "dist/agent-ducanh-antigravity";
  for (const sub of [".antigravity-plugin/plugin.json", "agents", "skills", "rules", "core", "kits", "README.md"]) {
    if (!existsSync(join(distRoot, sub))) failures.push(`dist/agent-ducanh-antigravity missing ${sub}`);
  }
  if (existsSync(join(distRoot, "agents"))) {
    const distAgents = readdirSync(join(distRoot, "agents")).filter((f) => f.endsWith(".md"));
    if (distAgents.length !== requiredAgents.length) {
      failures.push(`dist/agent-ducanh-antigravity/agents expected ${requiredAgents.length} files, got ${distAgents.length}`);
    }
    for (const f of distAgents) {
      if (sha256File(join(agentsDir, f)) !== sha256File(join(distRoot, "agents", f))) {
        failures.push(`dist/agent-ducanh-antigravity/agents/${f} drifted from core/.agents/agents/${f}`);
      }
    }
  }
  if (existsSync(join(distRoot, "skills"))) {
    const distSkills = readdirSync(join(distRoot, "skills"), { withFileTypes: true }).filter((d) => d.isDirectory());
    if (distSkills.length !== 6) failures.push(`dist/agent-ducanh-antigravity/skills expected 6 dirs, got ${distSkills.length}`);
  }
  if (existsSync(join(distRoot, "rules"))) {
    const distRules = readdirSync(join(distRoot, "rules")).filter((f) => f.endsWith(".md"));
    if (distRules.length !== 7) failures.push(`dist/agent-ducanh-antigravity/rules expected 7 files, got ${distRules.length}`);
  }
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — ${names.size} subagents (6 Core App/Dev + 5 Audit/TDD, mainAgent:false, quoted policy, SHA-256 synced), ${skills.length} skills, ${readdirSync(rulesDir).length} rules, Dashboard & Task Tracker verified.`);
}
