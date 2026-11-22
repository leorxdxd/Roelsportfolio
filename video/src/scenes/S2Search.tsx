import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Camera, Caption, Caret, Chip, Cursor, Icon, Sfx, Window } from "../components/ui";
import { c, shadow } from "../theme";
import { pop, prog, typed } from "../lib";
import { person, photo } from "../config";

const QUERY = "IT support + systems developer near me";
const ANSWER =
  "Roel Delos Reyes is an IT technical support specialist and web & systems developer in Metro Manila. He fixes networks and devices, and builds custom systems like helpdesks, dashboards and websites for schools and small businesses.";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const S2Search: React.FC = () => {
  const f = useCurrentFrame();
  const m = prog(f, 58, 76);
  const q = typed(f, 22, 48, QUERY);
  const answer = typed(f, 74, 150, ANSWER);
  const bar = {
    left: lerp(350, 60, m),
    top: lerp(360, 34, m),
    width: lerp(900, 760, m),
    height: lerp(80, 62, m),
  };
  const kp = pop(f, 82);
  const rp = pop(f, 94);
  const hover = prog(f, 126, 132);

  return (
    <Backdrop>
      <Camera
        keys={[
          { f: 0, x: 960, y: 531, s: 1.45 },
          { f: 58, x: 990, y: 531, s: 1.45 },
          { f: 78, x: 960, y: 560, s: 1 },
          { f: 112, x: 900, y: 530, s: 1.05 },
          { f: 134, x: 560, y: 668, s: 1.55 },
          { f: 162, x: 556, y: 672, s: 2.7 },
        ]}
      >
        <Window x={160} y={80} w={1600} h={920} url="search.example/ai">
          {/* logo */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 220 - m * 80,
              textAlign: "center",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              opacity: 1 - m,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Icon name="sparkle" size={60} color={c.accent} fill={c.accentSoft} />
            Ask anything
          </div>

          {/* search bar */}
          <div
            style={{
              position: "absolute",
              ...bar,
              borderRadius: 999,
              background: "#fff",
              border: `2px solid ${f > 18 ? c.accent : c.border}`,
              boxShadow: f > 18 ? "0 0 0 6px rgba(37,99,235,0.12)" : "0 6px 20px -8px rgba(15,23,42,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 10px 0 26px",
              fontSize: lerp(28, 22, m),
            }}
          >
            <Icon name="search" size={26} color={c.muted} />
            <div style={{ flex: 1, whiteSpace: "nowrap" }}>
              {q || <span style={{ color: "#94a3b8" }}>Search or ask…</span>}
              {f > 18 && f < 60 && <Caret />}
            </div>
            <div
              style={{
                width: bar.height - 18,
                height: bar.height - 18,
                borderRadius: "50%",
                background: c.accent,
                display: "grid",
                placeItems: "center",
                transform: `scale(${f >= 54 && f < 60 ? 0.88 : 1})`,
              }}
            >
              <Icon name="arrow" size={24} color="#fff" />
            </div>
          </div>

          {/* AI overview */}
          {f > 66 && (
            <div
              style={{
                position: "absolute",
                left: 60,
                top: 128,
                width: 980,
                padding: "26px 32px",
                borderRadius: 22,
                background: "linear-gradient(135deg, #eef3ff, #f6f0ff)",
                border: `1px solid ${c.border}`,
                opacity: prog(f, 66, 74),
                transform: `translateY(${(1 - prog(f, 66, 76)) * 30}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 20, color: c.accent, marginBottom: 14 }}>
                <Icon name="sparkle" size={22} color={c.accent} fill={c.accentSoft} /> AI Overview
              </div>
              <div style={{ fontSize: 25, lineHeight: 1.55, color: c.text, minHeight: 200 }}>
                {answer}
                {answer.length < ANSWER.length && <Caret />}
              </div>
            </div>
          )}

          {/* top result */}
          {f > 92 && (
            <div
              style={{
                position: "absolute",
                left: 60,
                top: 470,
                width: 980,
                padding: "8px 30px",
                opacity: rp,
                transform: `translateY(${(1 - rp) * 30}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, color: c.muted }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: c.accent, color: "#fff", fontWeight: 800, fontSize: 14, display: "grid", placeItems: "center" }}>
                  {person.initials}
                </div>
                {person.site}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 650,
                  color: c.accent,
                  marginTop: 10,
                  textDecoration: hover > 0 ? "underline" : "none",
                  textUnderlineOffset: 6,
                }}
              >
                Roel Delos Reyes — IT Support | Web & Systems Developer
              </div>
              <div style={{ fontSize: 21, color: c.muted, marginTop: 8, lineHeight: 1.5 }}>
                IT support, custom systems, and websites for small businesses and organizations. See projects, demos and services.
              </div>
            </div>
          )}
          {[0, 1].map((i) =>
            f > 100 + i * 4 ? (
              <div key={i} style={{ position: "absolute", left: 90, top: 680 + i * 100, width: 900, opacity: 0.5 * prog(f, 100 + i * 4, 110 + i * 4) }}>
                <div style={{ width: 260, height: 14, borderRadius: 7, background: c.border }} />
                <div style={{ width: 620, height: 22, borderRadius: 11, background: "#dbe4f3", marginTop: 14 }} />
                <div style={{ width: 820, height: 14, borderRadius: 7, background: c.border, marginTop: 14 }} />
              </div>
            ) : null,
          )}

          {/* knowledge panel */}
          {f > 80 && (
            <div
              style={{
                position: "absolute",
                left: 1080,
                top: 128,
                width: 470,
                borderRadius: 22,
                overflow: "hidden",
                background: "#fff",
                boxShadow: shadow,
                border: `1px solid ${c.border}`,
                opacity: kp,
                transform: `scale(${interpolate(kp, [0, 1], [0.9, 1])})`,
                transformOrigin: "top center",
              }}
            >
              <div style={{ height: 300, overflow: "hidden" }}>
                <Img
                  src={staticFile(photo(0))}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", transform: `scale(${1.15 - prog(f, 80, 160) * 0.1})` }}
                />
              </div>
              <div style={{ padding: "22px 26px 26px" }}>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{person.name}</div>
                <div style={{ fontSize: 18, color: c.muted, marginTop: 6 }}>{person.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  <Chip tone="blue">IT Support</Chip>
                  <Chip tone="green">Systems</Chip>
                  <Chip tone="amber">Websites</Chip>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 17, color: c.muted }}>
                  <Icon name="map" size={18} /> {person.location}, PH
                </div>
              </div>
            </div>
          )}
        </Window>

        <Cursor
          from={0}
          keys={[
            { f: 0, x: 1250, y: 760 },
            { f: 18, x: 880, y: 534, click: true },
            { f: 46, x: 1000, y: 600 },
            { f: 56, x: 1366, y: 532, click: true },
            { f: 78, x: 1250, y: 560 },
            { f: 112, x: 900, y: 620 },
            { f: 134, x: 556, y: 672, click: true },
            { f: 162, x: 556, y: 672 },
          ]}
        />
      </Camera>
      <Sfx at={22} name="typing" volume={0.3} dur={26} />
      <Sfx at={82} name="pop" volume={0.35} />
      <Caption text="Need IT help *and* a system?" start={4} end={50} x={960} y={850} size={64} align="center" />
    </Backdrop>
  );
};
