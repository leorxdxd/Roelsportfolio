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
