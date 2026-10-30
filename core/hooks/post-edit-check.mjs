import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => { data += chunk; });
    process.stdin.on("end", () => resolve(data));
    if (process.stdin.isTTY) resolve("");
  });
}

const raw = await readStdin();
let input = {};
try { input = raw ? JSON.parse(raw) : {}; } catch { /* allow empty */ }

const tool = input.tool_name || input.toolName || "";
const editTools = new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);
if (!editTools.has(tool)) process.exit(0);

if (!existsSync("scripts/check-docs.mjs")) {
  console.error("[agent-ducanh] check-docs.mjs not found; post-edit check skipped.");
  process.exit(0);
}

const result = spawnSync(process.execPath, ["scripts/check-docs.mjs"], {
  encoding: "utf8",
  timeout: 20000
});

if (result.status !== 0) {
  console.error("[agent-ducanh] post-edit check failed:");
  console.error((result.stdout || "") + (result.stderr || ""));
  process.exit(2);
}

process.exit(0);
