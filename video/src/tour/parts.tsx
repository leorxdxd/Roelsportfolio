// Building blocks for the site tour video, in the website's own look (ink, paper, lime).
import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/SchibstedGrotesk";
import { cursorPos, CursorKey, Icon, Sfx } from "../components/ui";
import { mono } from "../screens/kit";
import { kf, prog } from "../lib";
import marks from "./marks.json";

export const { fontFamily: sans } = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
export { mono };

export const T = {
  ink: "#111111",
  ink2: "#1b1b1c",
  paper: "#f4f4f0",
  lime: "#d4f54a",
  muted: "#66665f",
  link: "#2747c9",
};

export const SITE = "roelsportfolio.vercel.app";
export const TAB = "Roel Delos Reyes | Software Developer";

// The browser window: 1600 × 888 of page content under a 52px toolbar. The recording is 1600 × 900;
// its bottom 12px (with the timing square) are cut off.
export const WIN = { x: 160, y: 70, w: 1600, bar: 52, h: 888 };

/* ------------------------------------------------------------------ */
/* Recording of the website, cut into segments with their own speed    */
/* ------------------------------------------------------------------ */
export type Seg = { from: number; to: number; src: [number, number] };
const lastSecond = marks.duration - 0.15;

/** Output frame at which a moment of the recording (in seconds) is shown. */
export function outAt(segs: Seg[], second: number) {
  const s = segs.find((g) => second >= g.src[0] && second <= Math.min(g.src[1], lastSecond));
  if (!s) return -1;
  return Math.round(s.from + ((second - s.src[0]) / (s.src[1] - s.src[0])) * (s.to - s.from));
}

export const Footage: React.FC<{ segs: Seg[] }> = ({ segs }) => (
  <>
    {segs.map((s, i) => {
      const end = Math.min(s.src[1], lastSecond);
      const rate = ((end - s.src[0]) * 30) / (s.to - s.from);
      return (
        <Sequence key={i} from={s.from} durationInFrames={s.to - s.from} layout="none">
          <OffthreadVideo
            src={staticFile("tour/site.mp4")}
            trimBefore={Math.round(s.src[0] * 30)}
            playbackRate={rate}
            muted
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </Sequence>
      );
    })}
  </>
);

/* ------------------------------------------------------------------ */
/* Browser chrome                                                      */
/* ------------------------------------------------------------------ */
export const Browser: React.FC<{ url: string; tab: string; favicon: "rd" | "search"; loading?: number; children: React.ReactNode }> = ({ url, tab, favicon, loading = 0, children }) => (
  <div
    style={{
      position: "absolute",
      left: WIN.x,
      top: WIN.y,
      width: WIN.w,
      height: WIN.bar + WIN.h,
      borderRadius: 16,
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 60px 120px -40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)",
      fontFamily: sans,
    }}
  >
    <div style={{ height: WIN.bar, display: "flex", alignItems: "center", gap: 18, padding: "0 20px", background: "#e7e7e1", borderBottom: "1px solid #d9d9d2", position: "relative" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#8a8a82" }}>
        <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
          <Icon name="chevronRight" size={18} />
        </span>
        <span style={{ display: "inline-flex", opacity: 0.45 }}>
          <Icon name="chevronRight" size={18} />
        </span>
        <Icon name="refresh" size={15} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, height: 34, padding: "0 14px", borderRadius: 10, background: "#f6f6f2", border: "1px solid #dcdcd5", fontSize: 14, fontWeight: 600, color: "#3a3a36", maxWidth: 330 }}>
        {favicon === "rd" ? (
          <span style={{ width: 18, height: 18, borderRadius: 4, background: T.lime, border: `1.5px solid ${T.ink}`, fontFamily: mono, fontSize: 8, fontWeight: 700, display: "grid", placeItems: "center", color: T.ink }}>RD</span>
        ) : (
          <span style={{ width: 18, height: 18, borderRadius: 5, background: T.ink, display: "grid", placeItems: "center" }}>
            <Icon name="search" size={11} color={T.lime} stroke={3} />
          </span>
        )}
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tab}</span>
      </div>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 560, height: 34, borderRadius: 999, background: "#fff", border: "1px solid #d4d4cc", display: "flex", alignItems: "center", gap: 9, padding: "0 16px", fontSize: 16, color: "#2c2c28", fontFamily: sans }}>
        <Icon name="lock" size={14} color="#6b6b63" />
        {url}
      </div>
      {loading > 0 && loading < 1 && <span style={{ position: "absolute", left: 0, bottom: -1, height: 3, width: `${loading * 100}%`, background: T.lime, boxShadow: `0 0 12px ${T.lime}` }} />}
    </div>
    <div style={{ position: "relative", width: WIN.w, height: WIN.h, overflow: "hidden", background: T.paper }}>{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Mouse pointer (same look as the one recorded on the website)        */
/* ------------------------------------------------------------------ */
export const Pointer: React.FC<{ keys: CursorKey[]; until?: number }> = ({ keys, until = Infinity }) => {
  const f = useCurrentFrame();
  if (f >= until) return null;
  const { x, y } = cursorPos(f, keys);
  const clicks = keys.filter((k) => k.click).map((k) => k.f);
  const pressed = clicks.some((c) => f >= c - 2 && f < c + 4);
  return (
    <>
      {clicks.map((c) => {
        const p = (f - c) / 16;
        if (p < 0 || p > 1) return null;
        const at = cursorPos(c, keys);
        const r = 10 + 26 * p;
        return (
          <div key={c} style={{ position: "absolute", left: at.x - r, top: at.y - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `3px solid ${T.lime}`, background: "rgba(212,245,74,0.25)", opacity: 1 - p }} />
        );
      })}
      <svg width={30} height={30} viewBox="0 0 28 28" style={{ position: "absolute", left: x - 6, top: y - 4, transform: `scale(${pressed ? 0.85 : 1})`, transformOrigin: "6px 4px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" }}>
        <path d="M5 3 L5 23 L10.5 17.8 L14.2 26 L17.6 24.5 L14 16.6 L21.5 16.2 Z" fill={T.ink} stroke="#fff" strokeWidth={1.7} strokeLinejoin="round" />
      </svg>
      {clicks.map((c) => (
        <Sfx key={`c${c}`} at={c} name="click" volume={0.55} dur={6} />
      ))}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Caption chip over the video                                         */
/* ------------------------------------------------------------------ */
export const Caption: React.FC<{ from: number; to: number; label: string; text: string; x?: number; y?: number }> = ({ from, to, label, text, x = 210, y = 850 }) => {
  const f = useCurrentFrame();
  if (f < from - 1 || f > to + 1) return null;
  const inP = prog(f, from, from + 9);
  const out = prog(f, to - 7, to);
  const shown = text.length * Math.min(1, (f - from) / 14);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: inP * (1 - out),
        transform: `translateY(${(1 - inP) * 24 + out * -10}px)`,
        padding: "14px 22px 16px",
        borderRadius: 16,
        background: "rgba(17,17,17,0.94)",
        boxShadow: "0 24px 50px -20px rgba(0,0,0,0.6)",
        fontFamily: sans,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, color: T.lime, textTransform: "uppercase" }}>
        <span style={{ width: 9, height: 9, background: T.lime }} />
        {label}
      </div>
      <div style={{ marginTop: 6, fontSize: 34, fontWeight: 700, letterSpacing: -0.8, color: "#fff", whiteSpace: "nowrap" }}>
        {text.slice(0, Math.ceil(shown))}
        <span style={{ display: "inline-block", width: 3, height: 32, marginLeft: 3, verticalAlign: -4, background: T.lime, opacity: f - from < 16 ? 1 : 0 }} />
      </div>
      <Sfx at={from} name="pop" volume={0.35} dur={8} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Ink backdrop with a drifting grid and a lime glow                   */
/* ------------------------------------------------------------------ */
export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: `${(f * 0.4) % 64}px ${(f * 0.25) % 64}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 960 - 700 + Math.sin(f / 70) * 120,
          top: 540 - 500,
          width: 1400,
          height: 1000,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(212,245,74,0.16), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Smoothly eased value over keyframes (output frames). */
export const ease = (f: number, pts: [number, number][]) => kf(f, pts);
export const fade = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
