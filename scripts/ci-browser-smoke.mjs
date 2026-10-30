import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const chrome = process.env.CHROME_BIN || "google-chrome";
const url = process.env.DEMO_BASE || "http://127.0.0.1:8123/";
const dir = "examples/demo-site/screenshots";
const shot = resolve(dir, "ci-desktop.png");

mkdirSync(dir, { recursive: true });
if (existsSync(shot)) rmSync(shot);

const baseArgs = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--hide-scrollbars"
];

const shotRun = spawnSync(
  chrome,
  [...baseArgs, "--window-size=1440,900", "--virtual-time-budget=3000", `--screenshot=${shot}`, url],
  { stdio: "inherit", timeout: 30000 }
);
if (shotRun.error) {
  console.error(`Chrome screenshot failed: ${shotRun.error.message}`);
  process.exit(1);
}
if (shotRun.status !== 0) {
  console.error(`Chrome screenshot exited ${shotRun.status}`);
  process.exit(1);
}
if (!existsSync(shot) || statSync(shot).size < 1000) {
  console.error("Screenshot missing or too small.");
  process.exit(1);
}

const domRun = spawnSync(chrome, [...baseArgs, "--dump-dom", url], {
  encoding: "utf8",
  timeout: 30000
});
if (domRun.error || domRun.status !== 0) {
  console.error("Chrome DOM smoke failed.");
  process.exit(1);
}
if (!domRun.stdout.includes("Focus Board")) {
  console.error("DOM smoke: expected 'Focus Board' not found.");
  process.exit(1);
}

console.log(`PASS — Chrome smoke: ${shot}`);
