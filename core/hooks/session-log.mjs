import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

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

if (!existsSync("agent-state")) process.exit(0);
mkdirSync("agent-state", { recursive: true });

let kit = "unknown";
let mode = "unknown";
if (existsSync("agent-state/HANDOFF.md")) {
  const text = readFileSync("agent-state/HANDOFF.md", "utf8");
  kit = (text.match(/^\s*kit:\s*(.+)$/m) || [])[1]?.trim() || kit;
  mode = (text.match(/^\s*mode:\s*(.+)$/m) || [])[1]?.trim() || mode;
}

const event = input.hook_event_name || input.hookEventName || "SessionEnd";
const line = `- ${new Date().toISOString()} | ${event} | kit=${kit} | mode=${mode}\n`;
appendFileSync("agent-state/RUNLOG.md", line);
process.exit(0);
