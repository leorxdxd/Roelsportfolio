import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Camera, Caption, Cursor, CursorKey, Icon, Sfx, Window } from "../components/ui";
import { Cover, CoverKind } from "../components/covers";
import { c, shadow } from "../theme";
import { kf, pop, prog } from "../lib";
import { photo } from "../config";

type Tile = { kind: "photo"; i: number } | { kind: CoverKind };
const tiles: Tile[] = [
  { kind: "photo", i: 0 },
  { kind: "helpdesk" },
  { kind: "ai" },
  { kind: "photo", i: 1 },
  { kind: "mail" },
  { kind: "dashboard" },
  { kind: "photo", i: 2 },
  { kind: "code" },
];
const ORDER = [0, 1, 2, 3, 7, 6, 5, 4];
const TW = 352;
const TH = 330;
const pos = (i: number) => ({ x: 40 + (i % 4) * 376, y: 100 + Math.floor(i / 4) * 354 });
const center = (i: number) => ({ x: 160 + pos(i).x + TW / 2, y: 142 + pos(i).y + TH / 2 });
const clickAt = (i: number) => 12 + ORDER.indexOf(i) * 10;
const PUBLISH = { x: 1655, y: 182 };

const keys: CursorKey[] = [
  { f: 0, x: 700, y: 720 },
  ...ORDER.map((i, k) => ({ f: 12 + k * 10, x: center(i).x + 40, y: center(i).y + 30, click: true })),
  { f: 96, x: 1400, y: 320 },
  { f: 106, ...PUBLISH, click: true },
  { f: 132, x: 1560, y: 300 },
];

export const S6Photos: React.FC = () => {
  const f = useCurrentFrame();
  const count = ORDER.filter((i) => f >= clickAt(i)).length;
  const published = f >= 108;

  return (
    <Backdrop>
      <Camera
        keys={[
          { f: 0, x: 420, y: 430, s: 1.7, r: -1.5 },
          { f: 12, x: 500, y: 420, s: 1.5 },
          { f: 42, x: 1380, y: 420, s: 1.5 },
          { f: 52, x: 1380, y: 760, s: 1.5, r: 1 },
          { f: 82, x: 520, y: 760, s: 1.5 },
          { f: 96, x: 960, y: 540, s: 1 },
          { f: 108, x: 1480, y: 300, s: 1.45 },
          { f: 132, x: 960, y: 540, s: 1.04 },
        ]}
      >
        <Window x={160} y={90} w={1600} h={900} title="Photos — Portfolio">
          <div style={{ position: "absolute", left: 40, right: 30, top: 18, height: 50, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>Portfolio</div>
            <div style={{ fontSize: 18, color: c.muted }}>8 items</div>
            {count > 0 && (
              <div style={{ padding: "6px 14px", borderRadius: 999, background: c.accentSoft, color: c.accent, fontWeight: 750, fontSize: 17, transform: `scale(${kf(f - clickAt(ORDER[count - 1]), [[0, 1.2], [6, 1]])})` }}>
                {count} selected
              </div>
            )}
            <div
              style={{
                marginLeft: "auto",
                width: 150,
                height: 50,
                borderRadius: 12,
                background: published ? c.green : c.accent,
                color: "#fff",
                fontWeight: 750,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transform: `scale(${f >= 104 && f < 110 ? 0.92 : 1})`,
              }}
            >
              <Icon name={published ? "check" : "upload"} size={18} color="#fff" stroke={2.6} />
              {published ? "Published" : "Publish"}
            </div>
          </div>
          {tiles.map((t, i) => {
            const p = pos(i);
            const sel = f >= clickAt(i);
            const press = kf(f, [[clickAt(i) - 2, 1], [clickAt(i) + 1, 0.92], [clickAt(i) + 8, 0.95]]);
            const wave = published ? kf(f - 108 - i * 2, [[0, 0], [5, -18], [12, 0]]) : 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  width: TW,
                  height: TH,
                  borderRadius: 18,
                  overflow: "hidden",
                  transform: `translateY(${wave}px) scale(${sel ? press : 1})`,
                  boxShadow: sel ? `0 0 0 5px ${c.accent}, ${shadow}` : "0 6px 18px -8px rgba(15,23,42,0.25)",
                  background: c.surface2,
                }}
              >
                {t.kind === "photo" ? (
                  <Img
                    src={staticFile(photo(t.i))}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: ["center 20%", "center 40%", "center 10%"][t.i % 3],
                      transform: `scale(${[1, 1.35, 1.6][t.i % 3]})`,
                      filter: ["none", "saturate(1.2)", "grayscale(0.2) contrast(1.05)"][t.i % 3],
                    }}
                  />
                ) : (
                  <Cover kind={t.kind} w={TW} h={TH} t={f} radius={0} />
                )}
                {sel && <div style={{ position: "absolute", inset: 0, background: "rgba(37,99,235,0.12)" }} />}
                <div
                  style={{
                    position: "absolute",
                    right: 14,
                    top: 14,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "3px solid #fff",
                    background: sel ? c.accent : "rgba(0,0,0,0.2)",
                    display: "grid",
                    placeItems: "center",
                    transform: `scale(${sel ? 0.8 + 0.2 * pop(f, clickAt(i), 8, 260) : 1})`,
                  }}
                >
                  {sel && <Icon name="check" size={22} color="#fff" stroke={3.2} />}
                </div>
              </div>
            );
          })}
          {f >= 110 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 40,
                transform: `translateX(-50%) translateY(${(1 - pop(f, 110)) * 120}px)`,
                padding: "16px 24px",
                borderRadius: 16,
                background: c.text,
                color: "#fff",
                fontSize: 19,
                fontWeight: 650,
                display: "flex",
                gap: 12,
                alignItems: "center",
                boxShadow: shadow,
                opacity: prog(f, 110, 114),
              }}
            >
              <Icon name="check" size={20} color="#4ade80" stroke={3} /> 8 items published to your portfolio
            </div>
          )}
        </Window>
        <Cursor keys={keys} />
      </Camera>
      {ORDER.map((i) => (
        <Sfx key={i} at={clickAt(i)} name="pop" volume={0.25} dur={6} />
      ))}
      <Sfx at={110} name="pop" volume={0.5} />
      <Caption text="Every *detail* checked." start={18} end={90} x={960} y={880} size={72} align="center" />
    </Backdrop>
  );
};
