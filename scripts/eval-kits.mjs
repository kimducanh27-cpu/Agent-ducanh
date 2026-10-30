import { readFileSync, existsSync } from "node:fs";

const MODES = {
  "new-web": "plan_only",
  "audit-fix": "review_only",
  feature: "plan_only",
  "ui-rework": "ui_rework",
  maintenance: "review_only",
  router: "none"
};

function route(task) {
  const text = task.toLowerCase();
  if (/không rõ|chưa chắc|không biết nên/.test(text)) return "router";
  if (/audit|kiểm tra toàn|review tổng/.test(text)) return "audit-fix";
  if (/lỗi|bug|hotfix|thanh toán|bảo mật|chậm|tốc độ|performance|tải chậm/.test(text)) return "maintenance";
  if (/giao diện|màu|layout|bố cục|ui|ux|đẹp hơn/.test(text)) return "ui-rework";
  if (/thêm tính năng|feature|đăng ký|nút|form/.test(text)) return "feature";
  if (/làm web mới|website mới|landing|web app mới/.test(text)) return "new-web";
  return "router";
}

const cases = JSON.parse(readFileSync("evals/cases.json", "utf8"));
const failures = [];

for (const item of cases) {
  const actual = route(item.task);
  if (actual !== item.expected_kit) {
    failures.push(`${item.id}: kit ${actual} != ${item.expected_kit}`);
  }
  if (MODES[item.expected_kit] !== item.expected_mode) {
    failures.push(`${item.id}: mode map mismatch`);
  }
}

for (const file of [
  "core/AGENTS.md",
  "core/router.md",
  "core/templates/handoff.md",
  "core/hooks/pre-tool-check.mjs",
  "core/.claude/commands/audit.md",
  "core/.claude/agents/verifier.md",
  "core/toolbox/mcp_config.example.json",
  "plugins/manifests/antigravity.json",
  "plugins/manifests/claude.json",
  "plugins/manifests/qoder.json",
  "cards/new-web.md",
  "cards/audit-fix.md",
  "docs/operating/cost-and-models.md",
  "docs/operating/notifications-and-schedule.md",
  "examples/demo-site/agent-state/LESSONS.md",
  "kits/audit-fix/lenses/A1-first-impression.md",
  "kits/audit-fix/lenses/A2-core-task.md",
  "kits/audit-fix/lenses/A3-mobile.md",
  "kits/audit-fix/lenses/A4-accessibility.md",
  "kits/audit-fix/lenses/A5-performance.md",
  "kits/audit-fix/lenses/A6-content-ia-seo.md",
  "kits/audit-fix/lenses/A7-trust-privacy.md",
  "kits/audit-fix/lenses/A8-returning.md",
  "kits/audit-fix/lenses/A9-edge-cases.md",
  "kits/audit-fix/lenses/A10-visual-cross-browser.md",
  "kits/feature/prompts/01-intake.md",
  "kits/feature/prompts/04-verify.md",
  "kits/ui-rework/prompts/01-ui-audit.md",
  "kits/ui-rework/prompts/04-verify.md",
  "kits/maintenance/prompts/01-triage.md",
  "kits/maintenance/prompts/04-regression.md",
  "kits/audit-fix/prompts/verify.md"
]) {
  if (!existsSync(file)) failures.push(`missing: ${file}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS — ${cases.length} routing cases; required infra files present.`);
}
