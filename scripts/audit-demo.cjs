const fs = require("node:fs");
const { openSession } = require("./lib/cdp-harness.cjs");

const base = process.env.DEMO_BASE || "http://127.0.0.1:8138/";
const outFile = "examples/demo-site/screenshots/axe.json";

(async () => {
  const s = await openSession({
    base,
    width: 1440,
    height: 900,
    shotsDir: "examples/demo-site/screenshots"
  });

  try {
    await s.goto("/");
    await s.waitFor('document.querySelector("h1")');
    await s.injectAxe();
    const result = await s.axe();
    const summary = {
      url: base,
      viewport: "1440x900",
      violations: (result.violations || []).map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length
      })),
      passes: result.passes?.length ?? null,
      incomplete: result.incomplete?.length ?? null
    };
    fs.writeFileSync(outFile, JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await s.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
