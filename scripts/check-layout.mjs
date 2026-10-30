import { existsSync, readFileSync } from "node:fs";

const failures = [];
const paths = {
  rule: "core/rules/ui-layout.md",
  goals: "docs/style/site-goals.md",
  patterns: "docs/style/page-patterns.md",
  specTpl: "core/templates/page-spec.md",
  prompt: "core/prompts/page-web.md",
  command: "core/.claude/commands/page-web.md",
  demoSpec: "examples/demo-site/agent-state/PAGE_SPEC.md",
  learningExample: "docs/style/examples/learning-home.md",
  newIntake: "kits/new-web/prompts/01-intake.md",
  newPlan: "kits/new-web/prompts/02-plan.md",
  uiAudit: "kits/ui-rework/prompts/01-ui-audit.md",
  uiDirections: "kits/ui-rework/prompts/02-directions.md",
  agents: "core/AGENTS.md",
  map: "docs/kit-map.md"
};

const text = {};
for (const [key, file] of Object.entries(paths)) {
  if (!existsSync(file)) { failures.push(`missing: ${file}`); continue; }
  text[key] = readFileSync(file, "utf8");
  if (!text[key].trim()) failures.push(`empty: ${file}`);
}

for (const term of ["10 câu hỏi", "Menu/navigation", "Phân cấp thị giác", "Palette", "Learning platform", "PAGE_SPEC", "site-goals.md", "page-patterns.md"]) {
  if (text.rule && !text.rule.includes(term)) failures.push(`ui-layout missing: ${term}`);
}

for (const term of ["Learning platform", "tập trung", "tìm khóa", "tiến độ", "bài tập", "quay lại", "E-commerce", "SaaS", "Documentation", "Community", "Media", "Portfolio", "Booking", "Nonprofit", "dashboard/admin", "freeCodeCamp", "Open edX", "Moodle", "Oppia"]) {
  if (text.goals && !text.goals.includes(term)) failures.push(`site-goals missing: ${term}`);
}

for (const term of ["Learning dashboard", "Catalog/search", "Course detail", "Lesson player", "Quiz/practice", "Landing page", "Docs/article", "Checkout/booking", "Dashboard/table"]) {
  if (text.patterns && !text.patterns.includes(term)) failures.push(`page-patterns missing: ${term}`);
}

for (const term of ["PAGE SPEC", "Mục tiêu người dùng", "Menu/vị trí IA", "Hierarchy", "States", "Metrics"]) {
  if (text.specTpl && !text.specTpl.includes(term)) failures.push(`page-spec missing: ${term}`);
}

for (const term of ["PAGE_SPEC", "Learning platform", "Không thêm hiệu ứng", "site-goals.md"]) {
  if (text.prompt && !text.prompt.includes(term)) failures.push(`page prompt missing: ${term}`);
}
for (const term of ["PAGE_SPEC", "site-goals.md", "review_only"]) {
  if (text.command && !text.command.includes(term)) failures.push(`page command missing: ${term}`);
}

for (const term of ["Loại web/trang", "Menu/vị trí IA", "Hierarchy", "Metrics", "owner"]) {
  if (text.demoSpec && !text.demoSpec.includes(term)) failures.push(`demo PAGE_SPEC missing: ${term}`);
}
for (const term of ["Learning platform", "continue", "review due", "level-XP"]) {
  if (text.learningExample && !text.learningExample.includes(term)) failures.push(`learning example missing: ${term}`);
}

if (text.newIntake && !text.newIntake.includes("site-goals")) failures.push("new-web intake missing site-goals");
if (text.newPlan && !text.newPlan.includes("PAGE_SPEC")) failures.push("new-web plan missing PAGE_SPEC");
if (text.uiAudit && !text.uiAudit.includes("site-goals")) failures.push("ui-rework audit missing site-goals");
if (text.uiDirections && !text.uiDirections.includes("PAGE_SPEC")) failures.push("ui-rework directions missing PAGE_SPEC");
if (text.agents && !text.agents.includes("ui-layout")) failures.push("core/AGENTS.md missing ui-layout");
if (text.map && !text.map.includes("PAGE_SPEC")) failures.push("kit-map missing PAGE_SPEC");

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — 10 site types, 9 page patterns, PAGE_SPEC, ${Object.keys(paths).length} files.`);
}