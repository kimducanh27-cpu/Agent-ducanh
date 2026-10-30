import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = process.cwd();
const required = [
  "README.md",
  "core/AGENTS.md",
  "core/router.md",
  "core/protocol/PLAN_SPEC.md",
  "core/protocol/EXECUTION_SPEC.md",
  "core/checklists/definition-of-done.md",
  "core/templates/project-state.md",
  "core/templates/handoff.md",
  "kits/new-web/prompts/01-intake.md",
  "kits/new-web/prompts/04-verify.md",
  "kits/audit-fix/prompts/audit.md",
  "kits/audit-fix/prompts/fix.md",
  "kits/audit-fix/prompts/verify.md",
  "kits/feature/START-HERE.md",
  "kits/ui-rework/START-HERE.md",
  "kits/maintenance/START-HERE.md",
  "examples/demo-site/index.html",
  "examples/demo-site/styles.css",
  "examples/demo-site/script.js",
  "examples/demo-site/agent-state/PROJECT.md",
  "examples/demo-site/agent-state/HANDOFF.md",
  "docs/kit-map.md",
  "LICENSE",
  "SECURITY.md",
  "VERSION",
  "CHANGELOG.md",
  ".github/workflows/validate.yml",
  ".pre-commit-config.yaml",
  "core/hooks/pre-tool-check.mjs",
  "core/hooks/post-edit-check.mjs",
  "core/hooks/stop-evidence.mjs",
  "core/.claude/agents/lens-auditor.md",
  "core/.claude/agents/verifier.md",
  "core/.claude/agents/security-reviewer.md",
  "core/.claude/agents/test-engineer.md",
  "core/.qoder/agents/README.md",
  "core/toolbox/mcp_config.example.json",
  "examples/demo-site/agent-state/LESSONS.md",
  "kits/audit-fix/lenses/A1-first-impression.md",
  "kits/audit-fix/lenses/A10-visual-cross-browser.md",
  "kits/feature/prompts/01-intake.md",
  "kits/feature/prompts/04-verify.md",
  "kits/ui-rework/prompts/01-ui-audit.md",
  "kits/ui-rework/prompts/04-verify.md",
  "kits/maintenance/prompts/01-triage.md",
  "kits/maintenance/prompts/04-regression.md",
  "core/.claude/commands/audit.md",
  "core/.claude/commands/fix.md",
  "core/.claude/settings.json.example",
  "core/prompts/lite.md",
  "core/prompts/github-research.md",
  "core/rules/context-budget.md",
  "core/rules/memory.md",
  "core/templates/skills-used.md",
  "core/templates/checkpoint.md",
  "core/templates/lessons.md",
  "core/templates/runlog.md",
  "core/hooks/session-log.mjs",
  "core/.agents/agents/verifier.md",
  "core/.agents/agents/security-reviewer.md",
  "core/.agents/agents/test-engineer.md",
  "core/.agents/agents/user-auditor.md",
  "core/.agents/agents/bug-skeptic.md",
  "core/.agents/rules/60-persona-bughunt.md",
  "core/.agents/rules/70-leader-dispatch.md",
  "core/prompts/persona-bug-hunt.md",
  "core/prompts/leader-dispatch.md",
  "core/templates/bug-report.md",
  "core/templates/subagent-mission.md",
  "core/templates/subagent-result.md",
  "scripts/check-dispatch.mjs",
  "scripts/lib/cdp-harness.cjs",
  "kits/audit-fix/personas/index.md",
  "scripts/check-personas.mjs",
  "core/.agents/skills/audit-web/SKILL.md",
  "core/.agents/skills/fix-web/SKILL.md",
  "core/.agents/skills/verify-web/SKILL.md",
  "core/.agents/rules/50-antigravity-subagents.md",
  "docs/tools/antigravity-2.md",
  "scripts/check-antigravity.mjs",
  "scripts/ci-browser-smoke.mjs",
  "plugins/README.md",
  "plugins/manifests/antigravity.json",
  "plugins/manifests/claude.json",
  "plugins/manifests/qoder.json",
  "scripts/package-plugins.mjs",
  "cards/README.md",
  "cards/new-web.md",
  "cards/audit-fix.md",
  "cards/feature.md",
  "cards/ui-rework.md",
  "cards/maintenance.md",
  "docs/operating/cost-and-models.md",
  "docs/operating/notifications-and-schedule.md",
  "docs/tools/impeccable.md",
  "evals/cases.json",
  "scripts/check-superpowers.mjs",
  "scripts/eval-kits.mjs",
  "scripts/checkpoint.mjs"
];

const failures = [];
for (const file of required) {
  try {
    const st = statSync(join(root, file));
    if (!st.isFile() || st.size === 0) failures.push(`empty/missing: ${file}`);
  } catch {
    failures.push(`missing: ${file}`);
  }
}

try {
  const registry = JSON.parse(readFileSync(join(root, "core/toolbox/registry.json"), "utf8"));
  if (!Array.isArray(registry.tools) || registry.tools.length === 0) {
    failures.push("registry.json: tools empty");
  }
} catch (error) {
  failures.push(`registry.json invalid: ${error.message}`);
}

const agents = readFileSync(join(root, "core/AGENTS.md"), "utf8");
if (Buffer.byteLength(agents, "utf8") > 6000) failures.push("core/AGENTS.md > 6KB");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "dist") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const textExt = new Set([".md", ".json", ".html", ".css", ".js", ".mjs", ".cjs", ".txt", ".yml", ".yaml"]);
const absolutePath = /(?:\b[A-Za-z]:[\\/]|\/(?:Users|home)\/|[\\/](?:Downloads|AppData)[\\/])/;
const skipPathCheck = new Set(["docs/redaction.md", "scripts/lib/cdp-harness.cjs"]);
const secret = /(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY)/;
const email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

let scanned = 0;
for (const file of walk(root)) {
  if (!textExt.has(extname(file))) continue;
  const rel = relative(root, file).replaceAll("\\", "/");
  const text = readFileSync(file, "utf8");
  scanned += 1;
  if (!skipPathCheck.has(rel) && absolutePath.test(text)) failures.push(`absolute path: ${rel}`);
  if (secret.test(text)) failures.push(`possible secret: ${rel}`);
  for (const match of text.matchAll(email)) {
    if (!match[0].toLowerCase().endsWith("@example.com")) {
      failures.push(`email: ${rel} (${match[0]})`);
      break;
    }
  }
}

for (const skill of [
  "core/.agents/skills/web-kit/SKILL.md",
  "core/.agents/skills/toolbox/SKILL.md",
  "core/.qoder/skills/web-kit/SKILL.md",
  "core/.claude/skills/web-kit/SKILL.md"
]) {
  const text = readFileSync(join(root, skill), "utf8");
  if (!/^---[\s\S]*?description:/m.test(text)) failures.push(`SKILL description missing: ${skill}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — ${scanned} text files scanned, ${required.length} required files present.`);
}
