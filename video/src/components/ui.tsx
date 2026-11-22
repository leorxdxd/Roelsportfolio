import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { c, fontFamily, shadow } from "../theme";
import { ease, kf, pop } from "../lib";

/* ------------------------------------------------------------------ */
/* Sound effect                                                        */
/* ------------------------------------------------------------------ */
export const Sfx: React.FC<{ at: number; name: "click" | "pop" | "whoosh" | "typing"; volume?: number; dur?: number }> = ({
  at,
  name,
  volume = 0.6,
  dur = 30,
}) => (
  <Sequence from={Math.round(at)} durationInFrames={dur} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/* ------------------------------------------------------------------ */
/* Backdrop: soft grid + drifting blobs                                */
/* ------------------------------------------------------------------ */
export const Backdrop: React.FC<{ dark?: boolean; children?: React.ReactNode }> = ({ dark, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: dark ? c.dark : c.bg, overflow: "hidden", fontFamily }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.08)"} 1.5px, transparent 1.5px)`,
          backgroundSize: "36px 36px",
          backgroundPosition: `${f * 0.4}px ${f * 0.2}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          left: -250 + Math.sin(f / 40) * 60,
          top: -380 + Math.cos(f / 50) * 40,
          background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          right: -260 + Math.cos(f / 45) * 50,
          bottom: -360 + Math.sin(f / 35) * 40,
          background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 65%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Camera: focus point (x, y in the 1920×1080 world) + scale           */
/* ------------------------------------------------------------------ */
export type CamKey = { f: number; x: number; y: number; s: number; r?: number };
export const Camera: React.FC<{ keys: CamKey[]; children: React.ReactNode }> = ({ keys, children }) => {
  const f = useCurrentFrame();
  const x = kf(f, keys.map((k) => [k.f, k.x]));
  const y = kf(f, keys.map((k) => [k.f, k.y]));
  const s = kf(f, keys.map((k) => [k.f, k.s]));
  const r = kf(f, keys.map((k) => [k.f, k.r ?? 0]));
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          transformOrigin: "0 0",
          transform: `translate(${960 - x * s}px, ${540 - y * s}px) scale(${s}) rotate(${r}deg)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Cursor                                                              */
/* ------------------------------------------------------------------ */
export type CursorKey = { f: number; x: number; y: number; click?: boolean; hold?: boolean };
export function cursorPos(frame: number, keys: CursorKey[]) {
  return {
    x: kf(frame, keys.map((k) => [k.f, k.x])),
    y: kf(frame, keys.map((k) => [k.f, k.y])),
  };
}
export const Cursor: React.FC<{ keys: CursorKey[]; scale?: number; from?: number; dark?: boolean }> = ({
  keys,
  scale = 1.4,
  from = 0,
  dark,
}) => {
  const f = useCurrentFrame();
  const { x, y } = cursorPos(f, keys);
  const clicks = keys.filter((k) => k.click).map((k) => k.f);
  const holding = keys.some((k, i) => k.hold && f >= k.f && f < (keys[i + 1]?.f ?? Infinity));
  const pressed = holding || clicks.some((cf) => f >= cf - 2 && f < cf + 4);
  const appear = interpolate(f, [from, from + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      {clicks.map((cf) => {
        const p = (f - cf) / 18;
        if (p < 0 || p > 1) return null;
        const at = cursorPos(cf, keys);
        return (
          <div
            key={cf}
            style={{
              position: "absolute",
              left: at.x - 40 * scale * p,
              top: at.y - 40 * scale * p,
              width: 80 * scale * p,
              height: 80 * scale * p,
              borderRadius: "50%",
              border: `${3 * scale}px solid ${c.accent}`,
              background: "rgba(37,99,235,0.15)",
              opacity: 1 - p,
              zIndex: 999,
            }}
          />
        );
      })}
      <svg
        width={28 * scale}
        height={28 * scale}
        viewBox="0 0 28 28"
        style={{
          position: "absolute",
          left: x - 5 * scale,
          top: y - 3 * scale,
          transform: `scale(${(pressed ? 0.85 : 1) * appear})`,
          transformOrigin: "5px 3px",
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))",
          zIndex: 1000,
          opacity: appear,
        }}
      >
        <path
          d="M5 3 L5 23 L10.5 17.8 L14.2 26 L17.6 24.5 L14 16.6 L21.5 16.2 Z"
          fill={dark ? "#fff" : "#0f172a"}
          stroke={dark ? "#0f172a" : "#fff"}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </svg>
      {clicks.map((cf) => (
        <Sfx key={`s${cf}`} at={cf} name="click" volume={0.5} dur={6} />
      ))}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Window chrome                                                       */
/* ------------------------------------------------------------------ */
export const Window: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  url?: string;
  dark?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x, y, w, h, title, url, dark, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 18,
      background: dark ? c.dark2 : c.surface,
      boxShadow: shadow,
      border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : c.border}`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily,
      color: dark ? "#e7ecf5" : c.text,
      ...style,
    }}
  >
    <div
      style={{
        height: 52,
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 20px",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : c.border}`,
        background: dark ? c.dark : c.surface2,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
          <div key={col} style={{ width: 13, height: 13, borderRadius: "50%", background: col }} />
        ))}
      </div>
      {url !== undefined ? (
        <div
          style={{
            flex: 1,
            maxWidth: 620,
            margin: "0 auto",
            height: 32,
            borderRadius: 999,
            background: dark ? c.dark3 : "#fff",
            border: `1px solid ${dark ? "transparent" : c.border}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 16px",
            fontSize: 15,
            color: c.muted,
          }}
        >
          <Icon name="lock" size={14} /> {url}
        </div>
      ) : (
        <div style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 600, color: dark ? "#9aa6bd" : c.muted, marginRight: 60 }}>
          {title}
        </div>
      )}
    </div>
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Phone                                                               */
/* ------------------------------------------------------------------ */
export const Phone: React.FC<{ x: number; y: number; w?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x,
  y,
  w = 430,
  style,
  children,
}) => {
  const h = w * 2.05;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: w * 0.14,
        background: "#0b0f19",
        padding: w * 0.03,
        boxShadow: "0 50px 100px -30px rgba(15,23,42,0.55), inset 0 0 0 2px #2a3245",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: w * 0.115, overflow: "hidden", background: "#000" }}>
        {children}
        <div
          style={{
            position: "absolute",
            top: w * 0.03,
            left: "50%",
            width: w * 0.3,
            height: w * 0.075,
            marginLeft: -w * 0.15,
            borderRadius: 999,
            background: "#000",
            zIndex: 50,
          }}
        />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Kinetic caption (screen space). Wrap a word in *stars* to highlight */
/* ------------------------------------------------------------------ */
export const Caption: React.FC<{
  text: string;
  start: number;
  end: number;
  x?: number;
  y?: number;
  size?: number;
  align?: "left" | "center" | "right";
  dark?: boolean;
  chip?: boolean;
}> = ({ text, start, end, x = 110, y = 860, size = 92, align = "left", dark, chip = true }) => {
  const f = useCurrentFrame();
  if (f < start - 1 || f > end + 12) return null;
  const words = text.split(" ");
  const out = kf(f, [[end, 0], [end + 10, 1]], ease);
  const anchor = align === "center" ? "-50%" : align === "right" ? "-100%" : "0";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${anchor}, ${-out * 40}px)`,
        opacity: 1 - out,
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${size * 0.26}px`,
        padding: chip ? `${size * 0.16}px ${size * 0.34}px` : 0,
        borderRadius: size * 0.3,
        background: chip ? (dark ? "rgba(11,18,32,0.78)" : "rgba(255,255,255,0.86)") : "transparent",
        boxShadow: chip ? "0 20px 50px -20px rgba(15,23,42,0.35)" : "none",
        backdropFilter: chip ? "blur(12px)" : undefined,
        fontFamily,
        fontWeight: 850,
        fontSize: size,
        letterSpacing: -size * 0.035,
        lineHeight: 1.05,
        color: dark ? "#fff" : c.text,
        zIndex: 2000,
        maxWidth: 1700,
      }}
    >
      {words.map((w, i) => {
        const p = pop(f, start + i * 3, 14, 200);
        const hl = w.startsWith("*");
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: size * 0.08 }}>
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * 110}%) rotate(${(1 - p) * 6}deg)`,
                color: hl ? c.accent : undefined,
              }}
            >
              {w.replace(/\*/g, "")}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Small bits                                                          */
/* ------------------------------------------------------------------ */
export const Caret: React.FC<{ color?: string; h?: number }> = ({ color = c.accent, h = 1 }) => {
  const f = useCurrentFrame();
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: `${h}em`,
        marginLeft: 2,
        verticalAlign: "-0.15em",
        background: color,
        opacity: Math.floor(f / 8) % 2 ? 0.15 : 1,
      }}
    />
  );
};

export const Avatar: React.FC<{ name: string; size?: number; color?: string; src?: string }> = ({ name, size = 40, color = c.accent, src }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      flex: "none",
      background: src ? `center / cover url(${src})` : color,
      color: "#fff",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
      fontSize: size * 0.4,
    }}
  >
    {src ? null : name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
  </div>
);

export const Chip: React.FC<{ tone?: "blue" | "green" | "amber" | "red" | "gray"; children: React.ReactNode; style?: React.CSSProperties }> = ({
  tone = "gray",
  children,
  style,
}) => {
  const map = {
    blue: [c.accentSoft, c.accent],
    green: [c.greenSoft, c.green],
    amber: [c.amberSoft, c.amber],
    red: [c.redSoft, c.red],
    gray: [c.surface2, c.muted],
  } as const;
  const [bg, fg] = map[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 999,
        background: bg,
        color: fg,
        fontWeight: 650,
        fontSize: 15,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const paths: Record<string, string> = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z",
  plus: "M12 5v14M5 12h14",
  check: "M20 6 9 17l-5-5",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
  message: "M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0",
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  ticket: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4zM13 5v2M13 17v2M13 11v2",
  chart: "M3 3v18h18M7 15l4-4 3 3 5-6",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14.9H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 5.1V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5.9z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  play: "M6 4l14 8-14 8z",
  scissors: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12",
  music: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  text: "M4 7V4h16v3M9 20h6M12 4v16",
  image: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  map: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  file: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h6",
  wifi: "M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0M12 20h.01",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  more: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  paperclip: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
  bold: "M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z",
  italic: "M19 4h-9M14 20H5M15 4 9 20",
  underline: "M6 4v6a6 6 0 0 0 12 0V4M4 20h16",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  alignLeft: "M21 6H3M15 12H3M17 18H3",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  database: "M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3zM21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5",
  key: "M15 7.5a4.5 4.5 0 1 1-4.03 6.5H8v2H6v2H3v-3.5l6.47-6.47A4.5 4.5 0 0 1 15 7.5zM16.5 9h.01",
  terminal: "M4 17l6-6-6-6M12 19h8",
  branch: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9",
  folder: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  x: "M18 6 6 18M6 6l12 12",
  alert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
  pie: "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  copy: "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  monitor: "M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 21h8M12 17v4",
  printer: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  server: "M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM6 6h.01M6 18h.01",
  undo: "M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
  redo: "M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
  phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12",
  minus: "M5 12h14",
  square: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  building: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18zM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4",
  pill: "M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7zM8.5 8.5l7 7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  stethoscope: "M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3M20 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  card: "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM1 10h22",
  tool: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  cart: "M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6",
  clipboard: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z",
  droplet: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  workflow: "M3 3h7v7H3zM14 14h7v7h-7zM6.5 10v4a2 2 0 0 0 2 2H14",
  table: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18",
  layout: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 9h18M9 21V9",
  trendingUp: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  flask: "M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55A1 1 0 0 0 5.62 22h12.76a1 1 0 0 0 .9-1.45l-5.07-10.12a2 2 0 0 1-.21-.9V2M8.5 2h7M7 16h10",
  alertTriangle: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  menu: "M3 12h18M3 6h18M3 18h18",
  coffee: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zM6 1v3M10 1v3M14 1v3",
  receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM8 8h8M8 12h8M8 16h5",
  repeat: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
  bed: "M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9",
  calendarCheck: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18M9 16l2 2 4-4",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  smile: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
};

export const Icon: React.FC<{ name: keyof typeof paths | string; size?: number; color?: string; fill?: string; stroke?: number }> = ({
  name,
  size = 20,
  color = "currentColor",
  fill = "none",
  stroke = 2,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
    <path d={paths[name]} />
  </svg>
);
