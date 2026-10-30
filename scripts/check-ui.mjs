import { existsSync, readFileSync } from "node:fs";

const failures = [];
const paths = {
  rule: "core/rules/ui-quality.md",
  design: "core/templates/design-spec.md",
  review: "core/templates/ui-review.md",
  command: "core/.claude/commands/ui-review.md",
  kit: "kits/ui-rework/AGENTS.md",
  audit: "kits/ui-rework/prompts/01-ui-audit.md",
  verify: "kits/ui-rework/prompts/04-verify.md",
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
  "Bằng chứng", "Hierarchy", "States", "Accessibility", "Responsive",
  "Token", "Motion", "Nội dung", "AI slop", "sign-off",
  "360", "768", "1440", "320", "WCAG", "reduced-motion", "44"
];
for (const term of ruleTerms) {
  if (text.rule && !text.rule.includes(term)) failures.push(`ui-quality missing: ${term}`);
}

const designTerms = ["Primitive", "Semantic", "Component", "Typography", "Spacing", "States", "Motion", "Accessibility"];
for (const term of designTerms) {
  if (text.design && !text.design.includes(term)) failures.push(`design-spec missing: ${term}`);
}

const reviewTerms = ["Before", "After", "A11y", "Responsive", "Motion", "Owner F-UI"];
for (const term of reviewTerms) {
  if (text.review && !text.review.includes(term)) failures.push(`ui-review missing: ${term}`);
}

for (const term of ["review_only", "UI_REVIEW", "ui-quality", "360", "320"]) {
  if (text.command && !text.command.includes(term)) failures.push(`ui-review command missing: ${term}`);
}

for (const ref of ["core/rules/ui-quality.md", "core/templates/design-spec.md", "core/templates/ui-review.md"]) {
  if (text.kit && !text.kit.includes(ref)) failures.push(`ui-rework AGENTS missing: ${ref}`);
}
if (text.audit && !text.audit.includes("ui-quality")) failures.push("ui-audit prompt missing ui-quality rule");
if (text.audit && !text.audit.includes("DESIGN")) failures.push("ui-audit prompt missing DESIGN.md");
if (text.verify && !text.verify.includes("ui-review.md")) failures.push("ui-verify prompt missing ui-review template");
if (text.agents && !text.agents.includes("ui-quality")) failures.push("core/AGENTS.md missing ui-quality reference");
if (text.map && !text.map.includes("UI_REVIEW")) failures.push("kit-map missing UI_REVIEW reference");

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — UI rule ${ruleTerms.length} terms, design/review templates, ${Object.keys(paths).length} UI files.`);
}
