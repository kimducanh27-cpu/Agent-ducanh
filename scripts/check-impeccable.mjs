import { existsSync, readFileSync } from "node:fs";

const failures = [];
const paths = {
  doc: "docs/tools/impeccable.md",
  cli: "docs/tools/antigravity-cli.md",
  persona: "core/prompts/persona-bug-hunt.md",
  skill: "core/.agents/skills/audit-web/SKILL.md",
  rule: "core/.agents/rules/60-persona-bughunt.md",
  kit: "kits/audit-fix/prompts/audit.md",
  template: "core/templates/impeccable-review.md"
};

const text = {};
for (const [key, file] of Object.entries(paths)) {
  if (!existsSync(file)) { failures.push(`missing: ${file}`); continue; }
  text[key] = readFileSync(file, "utf8");
  if (!text[key].trim()) failures.push(`empty: ${file}`);
}

for (const term of ["CLI persona", "một lần", "IMPECCABLE_REVIEW", "docs/source", "proposed", "P0/P1", "DESIGN.md"]) {
  if (text.doc && !text.doc.includes(term)) failures.push(`impeccable doc missing: ${term}`);
}
for (const term of ["Persona + Impeccable", "một lần", "IMPECCABLE_REVIEW"]) {
  if (text.cli && !text.cli.includes(term)) failures.push(`CLI doc missing: ${term}`);
}
for (const term of ["transport", "cli", "Impeccable", "IMPECCABLE_REVIEW", "Không cascade"]) {
  if (text.persona && !text.persona.includes(term)) failures.push(`persona prompt missing: ${term}`);
}
for (const term of ["Impeccable", "IMPECCABLE_REVIEW", "report-editor"]) {
  if (text.skill && !text.skill.includes(term)) failures.push(`audit-web missing: ${term}`);
}
if (text.rule && !text.rule.includes("IMPECCABLE_REVIEW")) failures.push("rule 60 missing IMPECCABLE_REVIEW");
for (const term of ["Impeccable", "IMPECCABLE_REVIEW"]) {
  if (text.kit && !text.kit.includes(term)) failures.push(`audit kit missing: ${term}`);
}
for (const term of ["Finding", "Evidence", "Proposed severity", "A/F-UI", "Owner"]) {
  if (text.template && !text.template.includes(term)) failures.push(`impeccable template missing: ${term}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — persona CLI + one Impeccable pass + reconcile, ${Object.keys(paths).length} files.`);
}