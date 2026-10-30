import { existsSync, readFileSync } from "node:fs";

const failures = [];
const paths = {
  prompt: "core/prompts/leader-dispatch.md",
  mission: "core/templates/subagent-mission.md",
  result: "core/templates/subagent-result.md",
  rule: "core/.agents/rules/70-leader-dispatch.md",
  skill: "core/.agents/skills/audit-web/SKILL.md",
  docs: "docs/tools/antigravity-2.md",
  agents: "core/AGENTS.md"
};

const text = {};
for (const [key, file] of Object.entries(paths)) {
  if (!existsSync(file)) { failures.push(`missing: ${file}`); continue; }
  text[key] = readFileSync(file, "utf8");
  if (!text[key].trim()) failures.push(`empty: ${file}`);
}

const fields = [
  "mission_id", "agent", "model", "tools", "command_policy", "workspace",
  "persona/lens", "objective", "scope", "non_goals", "inputs", "evidence",
  "constraints", "output_schema", "stop_conditions", "budget", "acceptance"
];
for (const field of fields) {
  if (text.prompt && !text.prompt.includes(field)) failures.push(`leader-dispatch missing field: ${field}`);
  if (text.mission && !text.mission.includes(field)) failures.push(`subagent-mission missing field: ${field}`);
}

const loop = ["batch", "≤3", "validate", "spot-check", "repair", "share", "branch", "project_verified"];
for (const term of loop) {
  if (text.prompt && !text.prompt.toLowerCase().includes(term.toLowerCase())) {
    failures.push(`leader-dispatch missing rule: ${term}`);
  }
}
if (text.prompt && !/không cascade/i.test(text.prompt)) failures.push("leader-dispatch missing: không cascade");
if (text.mission && !/chat history/i.test(text.mission)) failures.push("subagent-mission missing: chat history guard");

for (const status of ["ok", "invalid", "blocked", "needs-repro", "failed"]) {
  if (text.result && !text.result.includes(status)) failures.push(`subagent-result missing status: ${status}`);
}
if (text.result && !text.result.includes("validation")) failures.push("subagent-result missing validation line");

const ruleFrontmatter = text.rule?.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || "";
if (!/^\s*trigger:/m.test(ruleFrontmatter)) failures.push("70-leader-dispatch missing trigger");
if (!/^\s*description:/m.test(ruleFrontmatter)) failures.push("70-leader-dispatch missing description");
if (text.rule && !text.rule.includes("batch") ) failures.push("70-leader-dispatch missing batch rule");
if (text.rule && !text.rule.includes("repair")) failures.push("70-leader-dispatch missing repair rule");

for (const ref of ["leader-dispatch.md", "subagent-mission.md", "subagent-result.md"]) {
  if (text.skill && !text.skill.includes(ref)) failures.push(`audit-web missing reference: ${ref}`);
}
if (text.docs && !text.docs.includes("leader-dispatch.md")) failures.push("antigravity-2 doc missing leader-dispatch reference");
if (text.agents && !text.agents.includes("leader-dispatch.md")) failures.push("core/AGENTS.md missing leader-dispatch reference");

try {
  const version = readFileSync("VERSION", "utf8").match(/^kit:\s*(\S+)/m)?.[1] || "";
  const semver = version.split("-")[0];
  if (!semver) failures.push("VERSION missing kit version");
  for (const manifest of ["antigravity", "claude", "qoder"]) {
    const data = JSON.parse(readFileSync(`plugins/manifests/${manifest}.json`, "utf8"));
    if (data.version !== semver) failures.push(`${manifest} manifest ${data.version} != VERSION ${semver}`);
  }
} catch (error) {
  failures.push(`version check failed: ${error.message}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — ${fields.length} mission fields, batch/validate/repair rules, ${Object.keys(paths).length} dispatch files.`);
}
