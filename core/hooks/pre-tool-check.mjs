import { readFileSync, existsSync } from "node:fs";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => { data += chunk; });
    process.stdin.on("end", () => resolve(data));
    if (process.stdin.isTTY) resolve("");
  });
}

function permission(handoff, key) {
  if (!handoff) return null;
  const match = handoff.match(new RegExp(`^\\s*${key}:\\s*(yes|no)\\s*$`, "m"));
  return match ? match[1] : null;
}

function block(reason) {
  console.error(`[agent-ducanh] BLOCKED: ${reason}`);
  process.exit(2);
}

const raw = await readStdin();
let input = {};
try { input = raw ? JSON.parse(raw) : {}; } catch { /* allow empty hook input */ }

const tool = input.tool_name || input.toolName || "";
const toolInput = input.tool_input || input.toolInput || {};
const handoffPath = "agent-state/HANDOFF.md";
const handoff = existsSync(handoffPath) ? readFileSync(handoffPath, "utf8") : "";

const editTools = new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);
if (editTools.has(tool)) {
  if (!handoff) block("Chưa có agent-state/HANDOFF.md. Tạo handoff + owner authorize trước khi sửa.");
  if (permission(handoff, "code_edit") === "no") block("HANDOFF ghi code_edit: no.");
  if (permission(handoff, "code_edit") !== "yes") block("HANDOFF chưa ghi code_edit: yes (owner authorize scope).");
}

if (tool === "Bash") {
  const command = String(toolInput.command || "");
  const destructive = /\b(rm\s+-rf|git\s+reset\s+--hard|git\s+clean\s+-[a-z]*f|drop\s+table|delete\s+from|truncate\s+table|mkfs|dd\s+if=|shutdown|taskkill\s+\/f)\b/i;
  const pushCmd = /\b(git\s+push)\b/i;
  const deployCmd = /\b(npm\s+publish|vercel(?:\s+--prod|\s+deploy)?|netlify\s+deploy|firebase\s+deploy|aws\s+.*deploy)\b/i;

  if (destructive.test(command) && permission(handoff, "allow_destructive") !== "yes") {
    block("Lệnh có thể phá dữ liệu. Cần allow_destructive: yes trong HANDOFF + owner xác nhận.");
  }
  if (pushCmd.test(command) && permission(handoff, "commit_push") !== "yes") {
    block("git push chưa được authorize (cần commit_push: yes trong HANDOFF).");
  }
  if (deployCmd.test(command) && permission(handoff, "deploy") !== "yes") {
    block("Publish/deploy chưa được authorize (cần deploy: yes trong HANDOFF).");
  }
}

process.exit(0);
