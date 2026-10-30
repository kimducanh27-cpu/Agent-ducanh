const fs = require("node:fs");
const { openSession } = require("./lib/cdp-harness.cjs");

const base = process.env.DEMO_BASE || "http://127.0.0.1:8123/";
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
    const resIndex = await s.axe();

    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    await s.injectAxe();
    const resDash = await s.axe();

    await s.viewport(390, 844, true);
    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    await s.injectAxe();
    const resDashMobile = await s.axe();

    await s.viewport(320, 700, true);
    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    await s.injectAxe();
    const resDashNarrow = await s.axe();

    const formatViolations = (vList) =>
      (vList || []).map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length
      }));

    const summary = {
      url: base,
      viewport: "1440x900 + 390x844 + 320x700",
      violations: [
        ...formatViolations(resIndex.violations),
        ...formatViolations(resDash.violations),
        ...formatViolations(resDashMobile.violations),
        ...formatViolations(resDashNarrow.violations)
      ],
      passes: (resIndex.passes?.length ?? 0) + (resDash.passes?.length ?? 0) + (resDashMobile.passes?.length ?? 0) + (resDashNarrow.passes?.length ?? 0),
      incomplete: (resIndex.incomplete?.length ?? 0) + (resDash.incomplete?.length ?? 0) + (resDashMobile.incomplete?.length ?? 0) + (resDashNarrow.incomplete?.length ?? 0),
      pages: {
        index: {
          violations: formatViolations(resIndex.violations),
          passes: resIndex.passes?.length ?? null,
          incomplete: resIndex.incomplete?.length ?? null
        },
        dashboard: {
          violations: formatViolations(resDash.violations),
          passes: resDash.passes?.length ?? null,
          incomplete: resDash.incomplete?.length ?? null
        },
        dashboardMobile: {
          violations: formatViolations(resDashMobile.violations),
          passes: resDashMobile.passes?.length ?? null,
          incomplete: resDashMobile.incomplete?.length ?? null
        },
        dashboardNarrow: {
          violations: formatViolations(resDashNarrow.violations),
          passes: resDashNarrow.passes?.length ?? null,
          incomplete: resDashNarrow.incomplete?.length ?? null
        }
      }
    };
    fs.writeFileSync(outFile, JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
    if (summary.violations.length > 0) {
      process.exit(1);
    }
  } finally {
    await s.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
