const fs = require("node:fs");
const { openSession } = require("./lib/cdp-harness.cjs");

const base = process.env.DEMO_BASE || "http://127.0.0.1:8123/";
const shotsDir = "examples/demo-site/screenshots";

const metrics = `(() => {
  const h1 = document.querySelector("h1");
  const r = h1 ? h1.getBoundingClientRect() : null;
  return {
    title: document.title,
    h1: h1 ? h1.innerText : null,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    innerWidth: window.innerWidth,
    bodyHeight: document.body.scrollHeight,
    h1Rect: r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null,
    hasForm: Boolean(document.querySelector("#signup-form")),
    navLinks: [...document.querySelectorAll("nav a")].map((a) => a.textContent.trim())
  };
})()`;

const dashMetrics = `(() => {
  const h1 = document.querySelector("h1");
  return {
    title: document.title,
    h1: h1 ? h1.innerText : null,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasTracker: document.body.dataset.hasTracker === "true" && Boolean(window.__TASK_TRACKER__),
    agentCards: document.querySelectorAll(".agent-card[data-agent]").length,
    missionRows: document.querySelectorAll("#missions-tbody tr").length,
    reportItems: document.querySelectorAll("#reports-list li").length
  };
})()`;

(async () => {
  const s = await openSession({
    base,
    width: 1440,
    height: 900,
    shotsDir
  });

  const out = {};
  try {
    await s.goto("/");
    await s.waitFor('document.querySelector("h1")');
    out.desktop = await s.ev(metrics);
    await s.shot("desktop", { fullPage: true });

    await s.click('button[type="submit"]');
    out.invalid = await s.ev(`({
      nameError: document.querySelector("#name-error").textContent,
      emailError: document.querySelector("#email-error").textContent,
      goalError: document.querySelector("#goal-error").textContent,
      activeId: document.activeElement.id
    })`);

    await s.ev(`(() => {
      const set = (id, value) => {
        const el = document.getElementById(id);
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      };
      set("name", "Demo");
      set("email", "demo@example.com");
      set("goal", "focus");
      return true;
    })()`);
    await s.click('button[type="submit"]');
    out.success = await s.ev(`({
      status: document.querySelector("#form-status").textContent,
      nameInvalid: document.querySelector("#name").getAttribute("aria-invalid"),
      emailInvalid: document.querySelector("#email").getAttribute("aria-invalid")
    })`);

    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    out.dashboard = await s.ev(dashMetrics);
    await s.shot("dashboard", { fullPage: true });

    await s.viewport(390, 844, true);
    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    out.dashboardMobile = await s.ev(dashMetrics);
    await s.shot("dashboard-mobile", { fullPage: true });

    await s.viewport(320, 700, true);
    await s.goto("/dashboard.html");
    await s.waitFor('document.body.dataset.hasTracker === "true"');
    out.dashboardNarrow = await s.ev(dashMetrics);
    await s.shot("dashboard-narrow", { fullPage: true });

    await s.viewport(390, 844, true);
    await s.goto("/");
    await s.waitFor('document.querySelector("h1")');
    out.mobile = await s.ev(metrics);
    await s.shot("mobile", { fullPage: true });

    await s.viewport(768, 1024, false);
    await s.goto("/");
    await s.waitFor('document.querySelector("h1")');
    out.tablet = await s.ev(metrics);
    await s.shot("tablet", { fullPage: true });

    await s.viewport(320, 700, true);
    await s.goto("/");
    await s.waitFor('document.querySelector("h1")');
    out.narrow = await s.ev(metrics);
    await s.shot("narrow", { fullPage: true });

    out.console = await s.takeErrors();
  } finally {
    await s.close();
  }

  fs.writeFileSync(`${shotsDir}/verify.json`, JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));

  const overflow = Object.entries(out)
    .filter(([, value]) => value && typeof value === "object" && "scrollWidth" in value && value.scrollWidth > value.clientWidth + 3)
    .map(([key, value]) => `${key}: ${value.scrollWidth}/${value.clientWidth}`);
  if (overflow.length) {
    console.error(`Horizontal overflow: ${overflow.join(", ")}`);
    process.exitCode = 1;
  }
  if (!out.dashboard?.hasTracker || out.dashboard.agentCards !== 11) {
    console.error("Dashboard did not render the tracker or 11 agents.");
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
