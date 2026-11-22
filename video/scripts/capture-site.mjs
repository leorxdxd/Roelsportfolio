// Records the real website in Edge (headless) for the site tour video: the hero building itself,
// scrolling through the projects, the code scene, the Projects page, the command palette and dark mode.
//
// 1. In the website folder: npm run build && npm run preview   (serves http://localhost:4173)
// 2. Here:                  npm run tour:capture               (or: node scripts/capture-site.mjs <url>)
//
// Output: public/tour/site.mp4 (30 fps, 1600 × 900) and src/tour/marks.json: when each action shows up
// in the recording, in seconds. A busy browser can draw a second or more after an action, so every
// action also changes the colour of a small square in the bottom-right corner; the script finds those
// colour changes in the frames. The video crops that corner off.
import { chromium } from "playwright-core";
import sharp from "sharp"; // resolved from the website's node_modules
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const BASE = (process.argv[2] ?? "http://localhost:4173").replace(/\/$/, "");
const VW = 1600;
const VH = 900;
const outVideo = path.join(root, "public/tour/site.mp4");
const outMarks = path.join(root, "src/tour/marks.json");
const BEACON = ["#ff0000", "#00ff00", "#0000ff"];

// The search result preview in the video uses the website share image
fs.mkdirSync(path.join(root, "public/tour"), { recursive: true });
fs.copyFileSync(path.join(root, "../public/og-image.png"), path.join(root, "public/tour/og-image.png"));

const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "no-preference" });

// A visible mouse pointer (headless browsers don't draw one) with a click ripple, and the beacon square.
await ctx.addInitScript((colors) => {
  const setup = () => {
    if (document.getElementById("__tour-pointer")) return;
    const el = document.createElement("div");
    el.id = "__tour-pointer";
    el.innerHTML =
      '<svg width="30" height="30" viewBox="0 0 28 28"><path d="M5 3 L5 23 L10.5 17.8 L14.2 26 L17.6 24.5 L14 16.6 L21.5 16.2 Z" fill="#111" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    Object.assign(el.style, { position: "fixed", left: "0", top: "0", zIndex: "2147483647", pointerEvents: "none", transform: "translate(-200px,-200px)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" });
    document.documentElement.appendChild(el);
    let x = -200;
    let y = -200;
    const place = (s = 1) => (el.style.transform = `translate(${x - 6}px, ${y - 4}px) scale(${s})`);
    document.addEventListener("pointermove", (e) => ((x = e.clientX), (y = e.clientY), place()), true);
    document.addEventListener("pointerdown", (e) => {
      place(0.85);
      const ring = document.createElement("div");
      Object.assign(ring.style, { position: "fixed", left: `${e.clientX - 22}px`, top: `${e.clientY - 22}px`, width: "44px", height: "44px", borderRadius: "50%", border: "3px solid #d4f54a", background: "rgba(212,245,74,.25)", zIndex: "2147483646", pointerEvents: "none" });
      document.documentElement.appendChild(ring);
      ring.animate([{ transform: "scale(.3)", opacity: 1 }, { transform: "scale(1.6)", opacity: 0 }], { duration: 520, easing: "ease-out" }).onfinish = () => ring.remove();
    }, true);
    document.addEventListener("pointerup", () => place(1), true);

    const beacon = document.createElement("div");
    Object.assign(beacon.style, { position: "fixed", right: "0", bottom: "0", width: "12px", height: "12px", zIndex: "2147483647", pointerEvents: "none", background: colors[0] });
    document.documentElement.appendChild(beacon);
    // Popovers sit in the browser top layer, above modal dialogs such as the command palette.
    // Showing them again moves them to the top of that layer.
    for (const p of [el, beacon]) {
      p.setAttribute("popover", "manual");
      Object.assign(p.style, { margin: "0", padding: "0", border: "0", overflow: "visible", background: p === beacon ? colors[0] : "transparent", width: p === beacon ? "12px" : "auto", height: p === beacon ? "12px" : "auto", inset: p === beacon ? "auto 0 0 auto" : "0 auto auto 0" });
    }
    const raise = () => {
      for (const p of [el, beacon]) {
        try {
          p.hidePopover();
          p.showPopover();
        } catch {
          /* popover not supported: stays a normal fixed element */
        }
      }
    };
    raise();
    window.__tourBeacon = (i) => {
      beacon.style.background = colors[i % colors.length];
      raise();
    };
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
}, BEACON);

const page = await ctx.newPage();
await page.goto("about:blank");
const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", (e) => {
  // The browser timestamps (e.metadata.timestamp) sometimes jump backwards, so frames are timed by arrival.
  frames.push({ data: e.data, t: Date.now() / 1000 });
  cdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }).catch(() => {});
});

const events = []; // { name, at (script clock), i (beacon index) }
async function beacon(name) {
  const i = events.length + 1;
  events.push({ name, at: Date.now() / 1000, i });
  await page.evaluate((n) => window.__tourBeacon?.(n), i).catch(() => {});
}
const mark = (name) => beacon(name);
const wait = (ms) => page.waitForTimeout(ms);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let mouse = { x: VW * 0.34, y: VH * 0.36 };
async function glide(x, y, ms = 650) {
  const from = mouse;
  const steps = Math.max(6, Math.round(ms / 20));
  for (let i = 1; i <= steps; i++) {
    const e = ease(i / steps);
    await page.mouse.move(from.x + (x - from.x) * e, from.y + (y - from.y) * e);
    await wait(ms / steps / 1.4);
  }
  mouse = { x, y };
}
async function click(x, y, ms = 650) {
  await glide(x, y, ms);
  await wait(90);
  await page.mouse.down();
  await beacon("click");
  await wait(90);
  await page.mouse.up();
}
async function clickOn(locator, ms) {
  const b = await locator.boundingBox();
  if (!b) throw new Error(`not visible: ${locator}`);
  await click(b.x + b.width / 2, b.y + b.height / 2, ms);
}
async function key(k) {
  await page.keyboard.press(k);
  await beacon("key");
}
const scrollTo = (y, ms) =>
  page.evaluate(
    ([y, ms]) =>
      new Promise((done) => {
        const y0 = window.scrollY;
        const t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
        const step = (now) => {
          const t = Math.min(1, (now - t0) / ms);
          window.scrollTo({ top: y0 + (y - y0) * ease(t), behavior: "instant" });
          if (t < 1) requestAnimationFrame(step);
          else done();
        };
        requestAnimationFrame(step);
      }),
    [y, ms],
  );
/** Scroll position that puts the element in the middle of the viewport (or near the top). */
const posOf = (selector, index = 0, align = "center") =>
  page.evaluate(
    ([s, i, a]) => {
      const el = document.querySelectorAll(s)[i];
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      return Math.max(0, a === "center" ? top - (innerHeight - Math.min(r.height, innerHeight)) / 2 : top - 90);
    },
    [selector, index, align],
  );

// ---------------------------------------------------------------- recording
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 90, maxWidth: VW, maxHeight: VH, everyNthFrame: 1 });
await wait(300);

// 1. The page loads and builds itself (cursors, typed headline, 3D portrait, code + tests)
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await page.mouse.move(mouse.x, mouse.y);
await wait(900);
await glide(VW * 0.42, VH * 0.6, 1400);
await wait(1500);
await mark("tilt");
await glide(VW * 0.72, VH * 0.3, 1100);
await glide(VW * 0.82, VH * 0.55, 900);
await glide(VW * 0.62, VH * 0.62, 900);
await wait(700);
await mark("heroDone");

// 2. Scroll through the selected work (images dropped in, titles typed)
await glide(VW * 0.9, VH * 0.72, 700);
await mark("scroll");
await scrollTo(await posOf(".home-work .home-head", 0, "top"), 1100);
await wait(500);
for (let i = 0; i < 4; i++) {
  await mark(`row${i + 1}`);
  await scrollTo(await posOf(".work-row", i), 850);
  await wait([2300, 1900, 1500, 1300][i]);
}
await mark("more");
await scrollTo(await posOf(".work-more"), 900);
await wait(1800);

// 3. The "How a feature gets built" scene plays as the page scrolls
const code = await page.evaluate(() => {
  const r = document.querySelector(".coderun").getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height };
});
await mark("code");
await scrollTo(code.top, 900);
await wait(300);
await mark("codePlay");
await scrollTo(code.top + code.h - VH, 6000);
await wait(1100);
await mark("codeEnd");

// 4. Projects page: open it from the menu, hover the cards, filter
await clickOn(page.locator('header a[href$="/projects"]:visible').first(), 800);
await page.waitForURL(/\/projects$/);
await wait(700);
await mark("projects");
await glide(VW * 0.33, VH * 0.7, 700);
await glide(VW * 0.52, VH * 0.66, 600);
await clickOn(page.locator(".filter-chip", { hasText: "Healthcare System" }).first(), 700);
await wait(1500);
await clickOn(page.locator(".filter-chip", { hasText: "All" }).first(), 600);
await wait(500);
await scrollTo(300, 900);
await wait(400);

// 5. Command palette (Ctrl+K) → open the EMR case study, then switch to dark mode
await key("Control+K");
await wait(500);
for (const ch of "emr") {
  await key(ch);
  await wait(140);
}
await wait(650);
await key("Enter");
await page.waitForURL(/electronic-medical-records/);
await wait(1100);
await mark("dark");
await clickOn(page.locator('button[aria-label="Switch to dark mode"]:visible').first(), 800);
await wait(700);
await glide(VW * 0.7, VH * 0.75, 500);
await scrollTo(720, 1400);
await wait(900);
await mark("end");
await wait(300);

await cdp.send("Page.stopScreencast");
await browser.close();
if (frames.length < 10) throw new Error("no frames captured");

// ---------------------------------------------------------------- timing
const t0 = frames[0].t;
const timeOf = (f) => f.t - t0;

// Colour of the beacon square in each frame (0, 1, 2, or -1 when there is none)
const classify = async (f) => {
  const px = await sharp(Buffer.from(f.data, "base64"))
    .extract({ left: VW - 9, top: VH - 9, width: 5, height: 5 })
    .raw()
    .toBuffer();
  const avg = [0, 1, 2].map((c) => px.filter((_, i) => i % 3 === c).reduce((a, b) => a + b, 0) / 25);
  const top = avg.indexOf(Math.max(...avg));
  return avg[top] > 140 && avg.every((v, c) => c === top || v < avg[top] - 90) ? top : -1;
};
const colour = [];
for (const f of frames) colour.push(await classify(f));
// Each action is drawn at the first frame after it (within 1.5 s) that shows its colour
for (const e of events) {
  const from = e.at - t0 - 0.05;
  for (let k = 0; k < frames.length; k++) {
    const t = timeOf(frames[k]);
    if (t < from) continue;
    if (t > from + 1.5) break;
    if (colour[k] === e.i % BEACON.length) {
      e.shown = t;
      break;
    }
  }
}
const placed = events.filter((e) => e.shown !== undefined);
const delays = placed.map((e) => e.shown - (e.at - t0)).sort((a, b) => a - b);
const typical = delays.length ? delays[Math.floor(delays.length / 2)] : 0;
for (const e of events) if (e.shown === undefined) e.shown = e.at - t0 + typical;

const rel = {};
for (const e of events) if (e.name !== "click" && e.name !== "key") rel[e.name] = +e.shown.toFixed(3);
const painted = frames.find((f) => f.data.length > frames[0].data.length * 4) ?? frames[0];
rel.paint = +timeOf(painted).toFixed(3);
rel.duration = +(timeOf(frames.at(-1)) + 0.4).toFixed(3);
rel.clicks = events.filter((e) => e.name === "click").map((e) => +e.shown.toFixed(3));
rel.keys = events.filter((e) => e.name === "key").map((e) => +e.shown.toFixed(3));
fs.mkdirSync(path.dirname(outMarks), { recursive: true });
fs.writeFileSync(outMarks, JSON.stringify(rel, null, 2) + "\n");

// ---------------------------------------------------------------- encode
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "site-tour-"));
let list = "";
frames.forEach((f, i) => {
  const name = `f${String(i).padStart(5, "0")}.jpg`;
  fs.writeFileSync(path.join(tmp, name), Buffer.from(f.data, "base64"));
  const after = frames[i + 1]?.t ?? f.t + 0.4;
  list += `file '${name}'\nduration ${Math.max(0.001, after - f.t).toFixed(4)}\n`;
});
list += `file 'f${String(frames.length - 1).padStart(5, "0")}.jpg'\n`;
fs.writeFileSync(path.join(tmp, "list.txt"), list);

// ffmpeg ships with Remotion (npx remotion ffmpeg …) and must run from this project folder.
// Paths are quoted, and no argument contains "," or "=", which the Windows shell would split.
const q = (s) => `"${s.split(path.sep).join("/")}"`;
fs.mkdirSync(path.dirname(outVideo), { recursive: true });
const r = spawnSync(
  "npx",
  ["remotion", "ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", q(path.join(tmp, "list.txt")), "-fps_mode", "cfr", "-r", "30", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "15", "-movflags", "+faststart", q(outVideo)],
  { cwd: root, shell: true, stdio: "inherit" },
);
if (r.status !== 0) throw new Error(`ffmpeg failed; the frames are in ${tmp}`);
fs.rmSync(tmp, { recursive: true, force: true });

const fps = frames.length / (frames.at(-1).t - frames[0].t);
console.log(`captured ${frames.length} frames (${fps.toFixed(1)} fps), ${placed.length}/${events.length} actions found in the frames, typical drawing delay ${typical.toFixed(2)} s`);
console.log(rel);
