import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

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

const now = new Date().toISOString();
const event = input.hook_event_name || input.hookEventName || "SessionEnd";
const line = `- ${now} | ${event} | kit=${kit} | mode=${mode}\n`;
appendFileSync("agent-state/RUNLOG.md", line);

// Task & Event Tracker: record real workspace changes and session state
const changedFiles = (spawnSync("git", ["status", "--short"], { encoding: "utf8" }).stdout || "")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

const trackerPath = "agent-state/TASK_TRACKER.json";
let tracker = {};
if (existsSync(trackerPath)) {
  try { tracker = JSON.parse(readFileSync(trackerPath, "utf8")); } catch { tracker = {}; }
}
tracker.updated_at = now;
tracker.coordinator = {
  role: "Main Coordinator",
  kit,
  mode,
  last_event: event
};
tracker.workspace_changes = changedFiles;
writeFileSync(trackerPath, JSON.stringify(tracker, null, 2) + "\n");

process.exit(0);
