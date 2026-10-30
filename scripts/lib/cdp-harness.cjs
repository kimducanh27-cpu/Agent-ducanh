'use strict';

const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function browserCandidates(explicit) {
  return [
    explicit,
    process.env.CHROME_BIN,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ].filter(Boolean);
}

function findBrowser(explicit) {
  return browserCandidates(explicit).find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  }) || null;
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForCdp(port, timeoutMs) {
  const started = Date.now();
  let lastError = '';
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return res.json();
    } catch (error) {
      lastError = error.message;
    }
    await sleep(150);
  }
  throw new Error(`CDP did not open on 127.0.0.1:${port} within ${timeoutMs}ms (${lastError})`);
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let seq = 0;
  const pending = new Map();
  const listeners = new Set();
  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', () => resolve(), { once: true });
    ws.addEventListener('error', () => reject(new Error('CDP WebSocket error')), { once: true });
  });

  ws.addEventListener('message', (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) item.reject(new Error(`CDP ${message.error.code}: ${message.error.message}`));
      else item.resolve(message.result);
      return;
    }
    for (const listener of listeners) {
      try {
        listener(message);
      } catch {
        /* a probe listener must not break the session */
      }
    }
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  const on = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { ws, ready, send, on };
}

function findAxe(explicit) {
  const candidates = [];
  if (explicit) candidates.push(explicit);
  if (process.env.AXE_PATH) candidates.push(process.env.AXE_PATH);
  candidates.push(path.join(process.cwd(), 'node_modules/axe-core/axe.min.js'));

  const npxRoots = [
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'npm-cache/_npx'),
    process.env.APPDATA && path.join(process.env.APPDATA, 'npm-cache/_npx'),
    path.join(os.homedir(), '.npm/_npx'),
  ].filter(Boolean);

  for (const root of npxRoots) {
    try {
      for (const entry of fs.readdirSync(root)) {
        const candidate = path.join(root, entry, 'node_modules/axe-core/axe.min.js');
        if (fs.existsSync(candidate)) candidates.push(candidate);
      }
    } catch {
      /* cache root absent */
    }
  }

  const found = candidates.filter((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
  found.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return found[0] || null;
}

function keyParams(key, options) {
  const named = {
    Enter: { code: 'Enter', vk: 13, text: '\r' },
    Tab: { code: 'Tab', vk: 9 },
    Escape: { code: 'Escape', vk: 27 },
    Backspace: { code: 'Backspace', vk: 8 },
    Delete: { code: 'Delete', vk: 46 },
    ArrowLeft: { code: 'ArrowLeft', vk: 37 },
    ArrowUp: { code: 'ArrowUp', vk: 38 },
    ArrowRight: { code: 'ArrowRight', vk: 39 },
    ArrowDown: { code: 'ArrowDown', vk: 40 },
    Home: { code: 'Home', vk: 36 },
    End: { code: 'End', vk: 35 },
    Space: { code: 'Space', vk: 32, text: ' ' },
  };
  if (named[key]) return { key: key === 'Space' ? ' ' : key, ...named[key] };
  if (/^[a-zA-Z]$/.test(key)) {
    return { key, code: `Key${key.toUpperCase()}`, vk: key.toUpperCase().charCodeAt(0), text: options.text };
  }
  if (/^[0-9]$/.test(key)) {
    return { key, code: `Digit${key}`, vk: key.charCodeAt(0), text: options.text };
  }
  return { key, code: options.code || key, vk: options.vk || 0, text: options.text };
}

async function openSession(options = {}) {
  const browser = findBrowser(options.browser);
  if (!browser) {
    throw new Error('No Chrome, Edge, or Chromium found. Set CHROME_BIN to the browser executable.');
  }

  const port = options.port || await freePort();
  const profile = options.profile || fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-evidence-'));
  const ownsProfile = !options.profile;
  const timeout = options.timeout || 20000;

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-sync',
    '--metrics-recording-only',
    '--mute-audio',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    ...(options.args || []),
    'about:blank',
  ];

  const child = spawn(browser, args, { stdio: 'ignore' });
  let spawnError = '';
  child.on('error', (error) => {
    spawnError = error.message;
  });

  let cdpInfo;
  try {
    cdpInfo = await waitForCdp(port, timeout);
  } catch (error) {
    try {
      child.kill();
    } catch {
      /* already gone */
    }
    throw new Error(`${error.message}${spawnError ? ` | spawn: ${spawnError}` : ''}`);
  }

  let target = null;
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
    if (res.ok) target = await res.json();
  } catch {
    /* fall back to an existing page target */
  }
  if (!target || !target.webSocketDebuggerUrl) {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    target = list.find((item) => item.type === 'page');
  }
  if (!target) throw new Error('Chrome opened but exposed no page target');

  const cdp = connect(target.webSocketDebuggerUrl);
  await cdp.ready;
  const { send } = cdp;

  const state = {
    consoleErrors: [],
    exceptions: [],
    httpErrors: [],
    external: [],
    dialogs: [],
  };
  const baseOrigin = options.base ? new URL(options.base).origin : null;

  cdp.on((message) => {
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      state.consoleErrors.push(
        message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ').trim()
      );
    }
    if (message.method === 'Runtime.exceptionThrown') {
      const detail = message.params.exceptionDetails;
      state.exceptions.push(`${detail.text || ''} ${detail.exception?.description || ''}`.trim());
    }
    if (message.method === 'Network.responseReceived') {
      const response = message.params.response;
      if (response.status >= 400 && /^https?:/i.test(response.url)) {
        state.httpErrors.push({ status: response.status, url: response.url });
      }
    }
    if (message.method === 'Network.requestWillBeSent') {
      const url = message.params.request.url;
      if (/^https?:/i.test(url) && (!baseOrigin || new URL(url).origin !== baseOrigin)) {
        state.external.push(url);
      }
    }
    if (message.method === 'Page.javascriptDialogOpening') {
      state.dialogs.push({ type: message.params.type, message: message.params.message });
      if (options.autoAcceptDialogs !== false) {
        send('Page.handleJavaScriptDialog', { accept: true }).catch(() => {});
      }
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Log.enable').catch(() => {});
  await send('Page.bringToFront').catch(() => {});

  const viewport = (width, height, mobile = !!options.mobile) => send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: options.deviceScaleFactor || 1,
    mobile: !!mobile,
  });
  await viewport(options.width || 1280, options.height || 900, !!options.mobile);

  const ev = async (expression, evalOptions = {}) => {
    const result = await send('Runtime.evaluate', {
      expression,
      returnByValue: evalOptions.returnByValue !== false,
      awaitPromise: evalOptions.awaitPromise !== false,
      userGesture: evalOptions.userGesture === true,
    });
    if (result.exceptionDetails) {
      const detail = result.exceptionDetails;
      throw new Error(`Page exception: ${detail.text || ''} ${detail.exception?.description || ''}`.trim());
    }
    return result.result ? result.result.value : undefined;
  };

  const waitFor = async (expression, waitOptions = {}) => {
    const waitTimeout = waitOptions.timeout ?? 8000;
    const interval = waitOptions.interval ?? 100;
    const started = Date.now();
    let last = '';
    while (Date.now() - started < waitTimeout) {
      try {
        const value = await ev(expression);
        if (value) return value;
        last = String(value);
      } catch (error) {
        last = error.message;
      }
      await sleep(interval);
    }
    throw new Error(`waitFor timed out after ${waitTimeout}ms: ${expression} (last: ${last})`);
  };

  const waitForEvent = (method, eventTimeout = 10000, predicate = () => true) => new Promise((resolve, reject) => {
    let off = null;
    const timer = setTimeout(() => {
      if (off) off();
      reject(new Error(`Timed out waiting for ${method}`));
    }, eventTimeout);
    off = cdp.on((message) => {
      if (message.method === method && predicate(message)) {
        clearTimeout(timer);
        if (off) off();
        resolve(message);
      }
    });
  });

  const urlFor = (targetUrl) => {
    if (!targetUrl) return options.base;
    if (/^[a-z]+:\/\//i.test(targetUrl)) return targetUrl;
    if (!options.base) return targetUrl;
    return new URL(targetUrl, options.base).href;
  };

  const goto = async (targetUrl, goOptions = {}) => {
    const isHash = typeof targetUrl === 'string' && targetUrl.startsWith('#');
    const href = urlFor(targetUrl);
    if (!href) throw new Error('goto needs a URL or options.base');

    if (isHash && goOptions.soft) {
      const current = await ev('location.hash');
      if (current === targetUrl) {
        const loaded = waitForEvent('Page.loadEventFired', goOptions.timeout || 15000).catch(() => null);
        await send('Page.reload', { ignoreCache: goOptions.ignoreCache !== false });
        await loaded;
      } else {
        await ev(`location.hash = ${JSON.stringify(targetUrl)}`);
      }
    } else {
      const loaded = waitForEvent('Page.loadEventFired', goOptions.timeout || 15000).catch(() => null);
      const nav = await send('Page.navigate', { url: href });
      if (nav.errorText) throw new Error(`Navigation failed: ${nav.errorText} (${href})`);
      await loaded;
    }

    await waitFor('document.readyState === "complete"', { timeout: goOptions.timeout || 10000 }).catch(() => {});
    if (goOptions.waitFor) {
      await waitFor(goOptions.waitFor, { timeout: goOptions.waitForTimeout || goOptions.timeout || 10000 });
    }
    await sleep(goOptions.settle ?? 150);
    return href;
  };

  const reset = async (resetOptions = {}) => {
    await ev(`(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (error) {} })()`).catch(() => {});
    if (resetOptions.unregisterSW !== false) {
      await ev(`navigator.serviceWorker && navigator.serviceWorker.getRegistrations
        ? navigator.serviceWorker.getRegistrations().then((items) => Promise.all(items.map((item) => item.unregister()))).then(() => true)
        : true`).catch(() => {});
    }
    const loaded = waitForEvent('Page.loadEventFired', resetOptions.timeout || 15000).catch(() => null);
    await send('Page.reload', { ignoreCache: resetOptions.ignoreCache !== false });
    await loaded;
    await waitFor('document.readyState === "complete"', { timeout: resetOptions.timeout || 10000 }).catch(() => {});
    await sleep(resetOptions.settle ?? 200);
  };

  const media = (mediaOptions = {}) => {
    const features = [];
    if (mediaOptions.reducedMotion !== undefined) {
      features.push({ name: 'prefers-reduced-motion', value: mediaOptions.reducedMotion ? 'reduce' : 'no-preference' });
    }
    if (mediaOptions.colorScheme) {
      features.push({ name: 'prefers-color-scheme', value: mediaOptions.colorScheme });
    }
    return send('Emulation.setEmulatedMedia', { features: mediaOptions.features || features });
  };

  const key = async (name, keyOptions = {}) => {
    const params = keyParams(name, keyOptions);
    const base = {
      key: params.key,
      code: params.code,
      windowsVirtualKeyCode: params.vk,
      nativeVirtualKeyCode: params.vk,
      modifiers: keyOptions.modifiers || 0,
    };
    await send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      ...base,
      ...(params.text ? { text: params.text } : {}),
    });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
  };

  const press = async (name, count = 1, pressOptions = {}) => {
    for (let index = 0; index < count; index++) {
      await key(name, pressOptions);
      if (pressOptions.delay) await sleep(pressOptions.delay);
    }
  };

  const click = (selector) => ev(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return false;
    element.click();
    return true;
  })()`);

  const shotsDir = options.shotsDir || path.join(process.cwd(), '_audit', 'shots');

  const shot = async (name, shotOptions = {}) => {
    fs.mkdirSync(shotsDir, { recursive: true });
    const format = shotOptions.format || 'png';
    const params = { format, fromSurface: true };
    if (format === 'jpeg' && shotOptions.quality) params.quality = shotOptions.quality;

    if (shotOptions.fullPage) {
      const metrics = await send('Page.getLayoutMetrics');
      const size = metrics.cssContentSize || metrics.contentSize;
      params.clip = { x: 0, y: 0, width: Math.ceil(size.width), height: Math.ceil(size.height), scale: 1 };
      params.captureBeyondViewport = true;
    } else if (shotOptions.clip) {
      params.clip = { scale: 1, ...shotOptions.clip };
      params.captureBeyondViewport = true;
    }

    const { data } = await send('Page.captureScreenshot', params);
    const file = path.join(shotsDir, `${name}.${format}`);
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    return { file, bytes: fs.statSync(file).size, width: params.clip?.width, height: params.clip?.height };
  };

  const axePath = options.axePath || findAxe();
  let axeSource = null;

  const injectAxe = async () => {
    if (!axeSource) {
      if (!axePath) {
        throw new Error(
          'axe-core not found. Install it outside the project, e.g. ' +
          'npm install --no-save --prefix "%TEMP%/axe-cache" axe-core, then set AXE_PATH to axe.min.js'
        );
      }
      axeSource = fs.readFileSync(axePath, 'utf8');
    }
    const present = await ev('!!(window.axe && typeof window.axe.run === "function")');
    if (!present) {
      await send('Runtime.evaluate', { expression: axeSource, awaitPromise: true, returnByValue: false });
    }
    return true;
  };

  const axe = async (axeOptions = {}) => {
    await injectAxe();
    const runOnly = axeOptions.runOnly || {
      type: 'tag',
      values: axeOptions.tags || ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
    };
    const maxNodes = axeOptions.maxNodes ?? 3;
    return ev(`axe.run(document, ${JSON.stringify({ runOnly })}).then((result) => ({
      violations: result.violations.map((item) => ({
        id: item.id,
        impact: item.impact,
        help: item.help,
        nodes: item.nodes.slice(0, ${maxNodes}).map((node) => ({
          target: node.target,
          html: (node.html || '').slice(0, 300),
          failureSummary: (node.failureSummary || '').slice(0, 400)
        }))
      })),
      incomplete: result.incomplete.map((item) => ({
        id: item.id,
        impact: item.impact,
        help: item.help,
        count: item.nodes.length,
        targets: item.nodes.slice(0, ${maxNodes}).map((node) => node.target)
      })),
      passes: result.passes.length
    }))`);
  };

  const takeErrors = () => {
    const snapshot = {
      consoleErrors: state.consoleErrors.slice(),
      exceptions: state.exceptions.slice(),
      httpErrors: state.httpErrors.slice(),
      external: [...new Set(state.external)],
      dialogs: state.dialogs.slice(),
    };
    state.consoleErrors.length = 0;
    state.exceptions.length = 0;
    state.httpErrors.length = 0;
    state.external.length = 0;
    state.dialogs.length = 0;
    return snapshot;
  };

  const close = async () => {
    try {
      cdp.ws.close();
    } catch {
      /* socket already closed */
    }
    try {
      child.kill();
    } catch {
      /* already exited */
    }
    if (process.platform === 'win32' && child.pid) {
      try {
        spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
      } catch {
        /* taskkill unavailable */
      }
    }
    await sleep(150);
    if (ownsProfile) {
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          fs.rmSync(profile, { recursive: true, force: true });
          break;
        } catch {
          await sleep(200);
        }
      }
    }
  };

  return {
    browser,
    port,
    profile,
    targetId: target.id,
    base: options.base,
    shotsDir,
    send,
    ev,
    waitFor,
    waitForEvent,
    goto,
    reset,
    viewport,
    media,
    key,
    press,
    click,
    shot,
    injectAxe,
    axe,
    takeErrors,
    close,
    get errors() {
      return {
        consoleErrors: state.consoleErrors.slice(),
        exceptions: state.exceptions.slice(),
        httpErrors: state.httpErrors.slice(),
        external: [...new Set(state.external)],
        dialogs: state.dialogs.slice(),
      };
    },
    cdpInfo,
    axePath,
  };
}

module.exports = { openSession, findBrowser, findAxe, freePort, sleep };
