import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const chrome = process.env.CHROME_BIN || "google-chrome";
const base = (process.env.DEMO_BASE || "http://127.0.0.1:8123/").replace(/\/+$/, "");
const dir = "examples/demo-site/screenshots";
const shotIndex = resolve(dir, "ci-desktop.png");
const shotDash = resolve(dir, "ci-dashboard.png");

mkdirSync(dir, { recursive: true });
for (const s of [shotIndex, shotDash]) {
  if (existsSync(s)) rmSync(s);
}

const profile = mkdtempSync(join(tmpdir(), "chrome-smoke-"));
const baseArgs = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  `--user-data-dir=${profile}`
];

function checkPage(pageUrl, shotPath, expectedTexts) {
  const shotRun = spawnSync(
    chrome,
    [...baseArgs, "--window-size=1440,900", "--virtual-time-budget=3000", `--screenshot=${shotPath}`, pageUrl],
    { stdio: "inherit", timeout: 30000 }
  );
  if (shotRun.error) {
    console.error(`Chrome screenshot failed (${pageUrl}): ${shotRun.error.message}`);
    process.exit(1);
  }
  if (shotRun.status !== 0) {
    console.error(`Chrome screenshot exited ${shotRun.status} (${pageUrl})`);
    process.exit(1);
  }
  if (!existsSync(shotPath) || statSync(shotPath).size < 1000) {
    console.error(`Screenshot missing or too small: ${shotPath}`);
    process.exit(1);
  }

  const domRun = spawnSync(chrome, [...baseArgs, "--virtual-time-budget=3000", "--dump-dom", pageUrl], {
    encoding: "utf8",
    timeout: 30000
  });
  if (domRun.error || domRun.status !== 0) {
    console.error(`Chrome DOM smoke failed (${pageUrl}).`);
    process.exit(1);
  }
  for (const expected of expectedTexts) {
    if (!domRun.stdout.includes(expected)) {
      console.error(`DOM smoke (${pageUrl}): expected '${expected}' not found.`);
      process.exit(1);
    }
  }
}

checkPage(`${base}/`, shotIndex, ["Focus Board", "dashboard.html"]);
checkPage(`${base}/dashboard.html`, shotDash, [
  "Visual Agent Dashboard",
  'data-has-tracker="true"',
  "M-01-RESEARCH",
  "A-05-TEST-ENG"
]);

rmSync(profile, { recursive: true, force: true });
console.log(`PASS — Chrome smoke: ${shotIndex}, ${shotDash}`);
