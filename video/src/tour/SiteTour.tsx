// "Site tour": a 30-second video of the portfolio website. Someone searches for the link, opens it,
// and the recorded site builds itself, scrolls through the projects, runs the code scene, filters
// the projects, opens the command palette and switches to dark mode.
//
// Footage: npm run tour:capture (records public/tour/site.mp4 and src/tour/marks.json).
// Render:  npm run tour → out/site-tour.mp4
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Camera, CursorKey, Icon, Sfx } from "../components/ui";
import { kf, pop, prog } from "../lib";
import marks from "./marks.json";
import { Backdrop, Browser, Caption, fade, Footage, mono, outAt, Pointer, sans, Seg, SITE, T, TAB, WIN } from "./parts";
import { SEARCH, SearchPage } from "./search";

const m = marks;
const [navClick, filterClick, , darkClick] = m.clicks; // Projects menu, Healthcare filter, All, dark mode
const [ctrlK, , , , enter] = m.keys; // Ctrl+K, e, m, r, Enter

/** Which part of the recording plays when (output frames ← seconds of the recording). */
const segs: Seg[] = [
  { from: 104, to: 120, src: [m.paint, m.paint + 0.45] }, // first paint
  { from: 120, to: 240, src: [m.paint + 0.45, m.paint + 5.5] }, // cursors build the hero
  { from: 240, to: 300, src: [m.paint + 5.5, m.heroDone - 0.5] }, // 3D tilt, tests pass
  { from: 300, to: 318, src: [m.scroll, m.row1] }, // scroll to the work list
  { from: 318, to: 372, src: [m.row1, m.row2] }, // apartments
  { from: 372, to: 402, src: [m.row2, m.row3] }, // EMR
  { from: 402, to: 430, src: [m.row3, m.more] }, // medicine portal, helpdesk
  { from: 430, to: 450, src: [m.more, m.code] }, // websites, automations
  { from: 450, to: 472, src: [m.code, m.codePlay + 1.1] }, // into the code scene
  { from: 472, to: 536, src: [m.codePlay + 1.1, m.codePlay + 3.9] }, // code types, tests pass
  { from: 536, to: 570, src: [m.codePlay + 3.9, m.codeEnd] }, // the app opens, toast
  { from: 570, to: 660, src: [navClick - 0.4, filterClick + 1.6] }, // projects page + filter
  { from: 660, to: 780, src: [ctrlK - 0.1, darkClick + 2.2] }, // Ctrl+K → EMR → dark mode
];
const at = (second: number) => outAt(segs, second);

// Camera on the whole browser (search part), world coordinates 1920 × 1080
const camera = [
  { f: 0, x: 960, y: 512, s: 1.32 },
  { f: 22, x: 960, y: 512, s: 1.32 },
  { f: 62, x: 975, y: 512, s: 1.42 },
  { f: 72, x: 960, y: 540, s: 1 },
  { f: 84, x: 760, y: 470, s: 1.2 },
  { f: 100, x: 740, y: 460, s: 1.3 },
  { f: 118, x: 960, y: 540, s: 1 },
  { f: 900, x: 960, y: 540, s: 1 },
];

// The pointer in the search page ends where the recorded pointer starts (page x 544, y 324)
const start = { x: WIN.x + 544, y: WIN.y + WIN.bar + 324 };
const pointer: CursorKey[] = [
  { f: 0, x: 1290, y: 860 },
  { f: 6, x: 1270, y: 830 },
  { f: 22, x: 905, y: 512 },
  { f: 24, x: 905, y: 512, click: true },
  { f: 64, x: 912, y: 520 },
  { f: 78, x: 1010, y: 640 },
  { f: 94, x: start.x, y: start.y },
  { f: 98, x: start.x, y: start.y, click: true },
  { f: 130, x: start.x, y: start.y },
];

// Zoom inside the page: [frame, scale, origin x %, origin y %]
const pal = at(ctrlK + 0.25);
const open = at(enter);
const dark = at(darkClick);
const zoom: [number, number, number, number][] = [
  [120, 1, 72, 50],
  [204, 1, 72, 50],
  [236, 1.1, 72, 50],
  [282, 1.1, 72, 50],
  [298, 1, 62, 45],
  [454, 1, 62, 45],
  [472, 1.14, 62, 45],
  [516, 1.14, 62, 45],
  [536, 1, 50, 15],
  [pal - 4, 1, 50, 15],
  [pal + 3, 1.2, 50, 15],
  [open - 2, 1.2, 50, 15],
  [open + 6, 1, 81, 4],
  [dark - 14, 1.16, 81, 4],
  [dark + 6, 1.16, 81, 4],
  [dark + 16, 1, 81, 4],
];
const zk = (i: number) => zoom.map((z) => [z[0], z[i]] as [number, number]);

const PROJECTS = ["Apartment Management System", "Electronic Medical Records", "Medicine Portal", "IT Helpdesk Ticketing", "Business Websites", "Workflow Automations"];
const row4 = at(m.row4) + 2;
const ACTIVE: [number, number][] = [
  [322, 376],
  [376, 406],
  [406, row4],
  [row4, 434],
  [434, 450],
  [434, 450],
];

const WorkPanel: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 296 || f > 456) return null;
  const inP = prog(f, 300, 318);
  const out = prog(f, 440, 452);
  return (
    <div style={{ position: "absolute", left: 104, top: 196, width: 560, opacity: inP * (1 - out), transform: `translateX(${(1 - inP) * -50 - out * 30}px)`, fontFamily: sans }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: mono, fontSize: 18, fontWeight: 700, letterSpacing: 2, color: T.lime }}>
        <span style={{ width: 11, height: 11, background: T.lime }} /> 02 / SELECTED WORK
      </div>
      <div style={{ marginTop: 22, fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -5, color: "#fff" }}>
        <span style={{ color: T.lime }}>6</span> real
        <br />
        projects
      </div>
      <div style={{ marginTop: 44, display: "grid", gap: 12 }}>
        {PROJECTS.map((name, i) => {
          const show = prog(f, 306 + i * 3, 316 + i * 3);
          const on = f >= ACTIVE[i][0] && f < ACTIVE[i][1];
          const done = f >= ACTIVE[i][1];
          return (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 16, opacity: show, transform: `translateX(${on ? 10 : 0}px)`, transition: "none" }}>
              <span style={{ fontFamily: mono, fontSize: 16, color: on ? T.lime : "rgba(255,255,255,0.4)", width: 28 }}>0{i + 1}</span>
              <span style={{ width: 10, height: 10, background: on ? T.lime : done ? "rgba(212,245,74,0.45)" : "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6, color: on ? "#fff" : done ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 782) return null;
  const logo = pop(f, 788, 11, 160);
  const name = prog(f, 794, 814);
  const role = prog(f, 806, 824);
  const mark = prog(f, 816, 834);
  const url = pop(f, 820, 12, 170);
  const tag = prog(f, 834, 850);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: sans, textAlign: "center" }}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 26,
          background: T.lime,
          boxShadow: `inset 0 0 0 5px ${T.ink}, 0 0 80px rgba(212,245,74,0.35)`,
          display: "grid",
          placeItems: "center",
          fontFamily: mono,
          fontWeight: 800,
          fontSize: 46,
          color: T.ink,
          transform: `scale(${logo}) rotate(${(1 - logo) * -12}deg)`,
        }}
      >
        RD
      </div>
      <div style={{ marginTop: 34, fontSize: 124, fontWeight: 800, letterSpacing: -6, lineHeight: 1, color: "#fff", opacity: name, transform: `translateY(${(1 - name) * 40}px)` }}>Roel Delos Reyes</div>
      <div style={{ marginTop: 22, fontSize: 50, fontWeight: 700, letterSpacing: -1.5, opacity: role, transform: `translateY(${(1 - role) * 24}px)` }}>
        <span style={{ position: "relative", padding: "0 10px", color: mark > 0.5 ? T.ink : "#fff" }}>
          <span style={{ position: "absolute", left: 0, top: "12%", height: "80%", width: `${mark * 100}%`, background: T.lime, zIndex: -1 }} />
          Software Developer
        </span>
      </div>
      <div
        style={{
          marginTop: 46,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 28px",
          borderRadius: 999,
          border: `2px solid ${T.lime}`,
          fontFamily: mono,
          fontSize: 30,
          fontWeight: 600,
          color: "#fff",
          transform: `scale(${url})`,
          opacity: Math.min(1, url * 1.4),
        }}
      >
        {SITE}
        <Icon name="arrow" size={26} color={T.lime} stroke={2.6} />
      </div>
      <div style={{ marginTop: 30, fontFamily: mono, fontSize: 20, letterSpacing: 2, color: "rgba(255,255,255,0.6)", opacity: tag }}>WEB APPS · BUSINESS SYSTEMS · AUTOMATION</div>
      <Sfx at={788} name="pop" volume={0.5} dur={8} />
      <Sfx at={820} name="pop" volume={0.4} dur={8} />
    </AbsoluteFill>
  );
};

export const SiteTour: React.FC = () => {
  const f = useCurrentFrame();
  const shrink = kf(f, [
    [292, 0],
    [308, 1],
    [442, 1],
    [458, 0],
  ]);
  const leave = prog(f, 778, 796);
  const scale = (1 - 0.28 * shrink) * (1 - 0.3 * leave);
  const tx = (700 - WIN.x) * shrink + leave * 336;
  const ty = (200 - WIN.y) * shrink + leave * 120;
  const z = kf(f, zk(1));
  const ox = kf(f, zk(2));
  const oy = kf(f, zk(3));
  const searching = f < 112;
  const site = f >= 100;
  const loading = prog(f, 99, 116);
  const white = 1 - fade(f, 110, 118);

  return (
    <AbsoluteFill style={{ background: T.ink, fontFamily: sans }}>
      <Backdrop />
      <AbsoluteFill style={{ opacity: 1 - prog(f, 780, 796), filter: leave > 0 ? `blur(${leave * 6}px)` : undefined }}>
        <Camera keys={camera}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: `${WIN.x}px ${WIN.y}px`, transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}>
            <Browser url={site ? SITE : "search.example"} tab={site ? TAB : "Search"} favicon={site ? "rd" : "search"} loading={loading}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 1600, height: 900, transformOrigin: `${ox}% ${oy}%`, transform: `scale(${z})` }}>
                <Footage segs={segs} />
              </div>
              {searching && (
                <div style={{ position: "absolute", inset: 0, opacity: 1 - fade(f, 100, 106) }}>
                  <SearchPage />
                </div>
              )}
              {f >= 100 && f < 120 && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: white }} />}
            </Browser>
          </div>
          <Pointer keys={pointer} until={119} />
        </Camera>
      </AbsoluteFill>

      <WorkPanel />
      <Caption from={128} to={206} label="Home page" text="Cursors build the page live" />
      <Caption from={210} to={294} label="Home page" text="3D portrait, typed code, real tests" />
      <Caption from={458} to={564} label="How I work" text="Write the code, test it, then run it" />
      <Caption from={574} to={654} label="Projects" text="Every project, filtered in one click" />
      <Caption from={pal} to={open + 4} label="Quick search" text="Ctrl + K opens any page" />
      <Caption from={open + 10} to={776} label="Dark mode" text="Light or dark, one click" />
      <Outro />

      <Audio src={staticFile("tour/music.wav")} volume={(fr) => Math.min(1, fr / 6) * Math.min(1, (900 - fr) / 18) * 0.62} />
      <Sfx at={SEARCH.typeFrom} name="typing" volume={0.45} dur={38} />
      <Sfx at={SEARCH.enter} name="click" volume={0.5} dur={6} />
      {[104, 294, 444, 566, 656, 776].map((w) => (
        <Sfx key={`w${w}`} at={w - 4} name="whoosh" volume={0.38} dur={20} />
      ))}
      {[...m.clicks, ...m.keys].map((s) => at(s)).filter((o) => o > 0).map((o, i) => (
        <Sfx key={`k${i}`} at={o} name="click" volume={0.45} dur={6} />
      ))}
    </AbsoluteFill>
  );
};
