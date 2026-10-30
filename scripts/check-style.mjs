import { existsSync, readFileSync } from "node:fs";

const failures = [];
const paths = {
  rule: "core/rules/ui-style.md",
  directions: "docs/style/directions.md",
  design: "core/templates/design-spec.md",
  prompt: "core/prompts/style-web.md",
  command: "core/.claude/commands/style-web.md",
  uiKit: "kits/ui-rework/AGENTS.md",
  uiDirections: "kits/ui-rework/prompts/02-directions.md",
  newIntake: "kits/new-web/prompts/01-intake.md",
  newPlan: "kits/new-web/prompts/02-plan.md",
  demoDesign: "examples/demo-site/agent-state/DESIGN.md",
  demoReview: "examples/demo-site/agent-state/UI_REVIEW.md",
  agents: "core/AGENTS.md",
  map: "docs/kit-map.md"
};

const text = {};
for (const [key, file] of Object.entries(paths)) {
  if (!existsSync(file)) { failures.push(`missing: ${file}`); continue; }
  text[key] = readFileSync(file, "utf8");
  if (!text[key].trim()) failures.push(`empty: ${file}`);
}

const ruleTerms = [
  "Bảng quyết định", "Editorial calm", "Product precise", "Warm expressive",
  "1 hướng chính", "signature", "Density", "Voice", "Anti-pattern",
  "UX style", "2 hướng khác pack thật"
];
for (const term of ruleTerms) {
  if (text.rule && !text.rule.includes(term)) failures.push(`ui-style missing: ${term}`);
}

for (const pack of ["Editorial calm", "Product precise", "Warm expressive"]) {
  if (text.directions && !text.directions.includes(pack)) failures.push(`directions missing: ${pack}`);
}
for (const term of ["Dùng khi:", "Palette:", "Typography:", "UX style:", "Motion:", "Signature:", "Tránh:"]) {
  if (text.directions && !text.directions.includes(term)) failures.push(`directions missing: ${term}`);
}

for (const term of ["Style direction", "Signature element", "Density", "Voice", "Anti-pattern"]) {
  if (text.design && !text.design.includes(term)) failures.push(`design-spec missing: ${term}`);
}

for (const term of ["DESIGN.md", "UI_REVIEW.md", "2 pack", "owner"]) {
  if (text.prompt && !text.prompt.includes(term)) failures.push(`style prompt missing: ${term}`);
}
for (const term of ["DESIGN.md", "UI_REVIEW", "owner"]) {
  if (text.command && !text.command.includes(term)) failures.push(`style command missing: ${term}`);
}

for (const ref of ["ui-style.md", "directions.md"]) {
  if (text.uiKit && !text.uiKit.includes(ref)) failures.push(`ui-rework AGENTS missing: ${ref}`);
}
if (text.uiDirections && !text.uiDirections.includes("khác pack")) failures.push("ui directions missing: khác pack");
if (text.uiDirections && !text.uiDirections.includes("signature")) failures.push("ui directions missing: signature");
if (text.newIntake && !text.newIntake.includes("style")) failures.push("new-web intake missing style");
if (text.newIntake && !text.newIntake.includes("brand")) failures.push("new-web intake missing brand");
if (text.newPlan && !text.newPlan.includes("Style direction")) failures.push("new-web plan missing Style direction");
if (text.newPlan && !text.newPlan.includes("DESIGN.md")) failures.push("new-web plan missing DESIGN.md");

for (const term of ["Editorial calm", "Signature element", "Anti-pattern", "--paper"]) {
  if (text.demoDesign && !text.demoDesign.includes(term)) failures.push(`demo DESIGN missing: ${term}`);
}
for (const term of ["Owner F-UI", "axe", "1440", "320"]) {
  if (text.demoReview && !text.demoReview.includes(term)) failures.push(`demo UI_REVIEW missing: ${term}`);
}

if (text.agents && !text.agents.includes("ui-style")) failures.push("core/AGENTS.md missing ui-style reference");
if (text.map && !text.map.includes("ui-style")) failures.push("kit-map missing ui-style reference");

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — 3 style packs, ${ruleTerms.length} rule terms, demo DESIGN/UI_REVIEW, ${Object.keys(paths).length} files.`);
}
