import React from "react";
import { useCurrentFrame } from "remotion";
import { Backdrop, Camera, Caption, Cursor, cursorPos, CursorKey, Icon, Sfx, Window } from "../components/ui";
import { Cover, CoverKind, covers } from "../components/covers";
import { c } from "../theme";
import { kf, pop, prog } from "../lib";

const OX = 110; // window content origin in world coords
const OY = 122;
const clips: CoverKind[] = ["helpdesk", "ai", "mail"];
const tiles = [
  { x: 24, y: 84 },
  { x: 220, y: 84 },
  { x: 24, y: 256 },
];
const GRAB = [10, 38, 66];
const DROP = [30, 58, 86];
const SLOT_X = (i: number) => 40 + i * 310;
const V1_Y = 600;

const tileCenter = (i: number) => ({ x: OX + tiles[i].x + 90, y: OY + tiles[i].y + 56 });
const slotCenter = (i: number) => ({ x: OX + SLOT_X(i) + 150, y: OY + V1_Y + 40 });

const keys: CursorKey[] = [
  { f: 0, x: 560, y: 520 },
  ...GRAB.flatMap((g, i) => [
    { f: g, ...tileCenter(i), click: true, hold: true },
    { f: DROP[i], ...slotCenter(i) },
  ]),
  { f: 100, x: 1500, y: 260 },
  { f: 112, x: 1712, y: 163, click: true },
  { f: 162, x: 1640, y: 330 },
];

export const S4Editor: React.FC = () => {
  const f = useCurrentFrame();
  const playX = kf(f, [[90, 40], [154, 970]]);
  const dropped = DROP.filter((d) => f >= d).length;
  const underHead = f >= 90 ? Math.min(2, Math.floor((playX - 40) / 310)) : dropped - 1;
  const exportP = prog(f, 114, 146, (x) => x);
  const cur = cursorPos(f, keys);

  return (
    <Backdrop dark>
      <Camera
        keys={[
          { f: 0, x: 330, y: 330, s: 1.6 },
          { f: 10, x: 260, y: 320, s: 1.55 },
          { f: 30, x: 420, y: 580, s: 1.25 },
          { f: 58, x: 640, y: 590, s: 1.2 },
          { f: 86, x: 900, y: 590, s: 1.15 },
          { f: 98, x: 960, y: 540, s: 1 },
          { f: 112, x: 1480, y: 260, s: 1.5 },
          { f: 124, x: 960, y: 566, s: 1.3 },
          { f: 148, x: 960, y: 566, s: 1.4 },
          { f: 162, x: 960, y: 540, s: 1.1 },
        ]}
      >
        <Window x={110} y={70} w={1700} h={940} title="Studio — portfolio_reel" dark>
          {/* media bin */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 420, bottom: 400, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 22, padding: "22px 24px", fontSize: 17, fontWeight: 650, color: "#8b97ad" }}>
              <span style={{ color: "#fff" }}>Media</span>
              <span>Audio</span>
              <span>Text</span>
              <span>Effects</span>
            </div>
            {clips.map((k, i) => (
              <div key={k} style={{ position: "absolute", left: tiles[i].x, top: tiles[i].y, opacity: f >= GRAB[i] && f < DROP[i] ? 0.35 : 1 }}>
                <Cover kind={k} w={180} h={112} t={f} label={false} radius={10} />
                <div style={{ fontSize: 15, color: "#c7d0e0", marginTop: 8, fontWeight: 600 }}>{covers[k].title.toLowerCase()}_demo.mp4</div>
                {f >= DROP[i] && (
                  <div style={{ position: "absolute", right: 8, top: 8, width: 24, height: 24, borderRadius: "50%", background: c.accent, display: "grid", placeItems: "center", transform: `scale(${pop(f, DROP[i])})` }}>
                    <Icon name="check" size={15} color="#fff" stroke={3} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* preview */}
          <div style={{ position: "absolute", left: 440, top: 24, width: 800, height: 450, borderRadius: 12, background: "#000", overflow: "hidden" }}>
            {underHead >= 0 ? (
              <div style={{ transform: `scale(${1 + ((f % 30) / 30) * 0.04})`, transformOrigin: "center" }}>
                <Cover kind={clips[underHead]} w={800} h={450} t={f} radius={0} />
              </div>
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#55617a", fontSize: 22 }}>Drag clips to the timeline</div>
            )}
            {f >= 92 && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 170,
                  textAlign: "center",
                  fontSize: 64,
                  fontWeight: 900,
                  letterSpacing: -2,
                  color: "#fff",
                  textShadow: "0 6px 24px rgba(0,0,0,0.5)",
                  transform: `scale(${pop(f, 92 + underHead * 20)})`,
                }}
              >
                {["Fix it.", "Build it.", "Ship it."][Math.max(0, underHead)]}
              </div>
            )}
          </div>

          {/* properties panel */}
          <div style={{ position: "absolute", left: 1262, top: 0, right: 0, bottom: 400, padding: "18px 24px", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              style={{
                marginLeft: "auto",
                width: 140,
                height: 46,
                borderRadius: 12,
                background: c.accent,
                color: "#fff",
                fontWeight: 750,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transform: `scale(${f >= 110 && f < 116 ? 0.92 : 1})`,
                boxShadow: "0 10px 24px -8px rgba(37,99,235,0.8)",
              }}
            >
              <Icon name="upload" size={18} color="#fff" /> Export
            </div>
            {[
              ["Transition", "Push cut"],
              ["Speed", "1.0×"],
              ["Music", "upbeat.wav"],
              ["Captions", "Auto"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginTop: 22, fontSize: 17, color: "#8b97ad" }}>
                <span>{k}</span>
                <span style={{ color: "#e7ecf5", fontWeight: 650, background: c.dark3, padding: "4px 12px", borderRadius: 8 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* timeline */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 488, bottom: 0, background: "#0f1626", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 22, padding: "16px 24px", color: "#8b97ad" }}>
              {["scissors", "text", "music", "layers", "image"].map((n) => (
                <Icon key={n} name={n} size={22} />
              ))}
              <div style={{ marginLeft: "auto", fontSize: 15, fontVariantNumeric: "tabular-nums" }}>
                00:{String(Math.floor(((playX - 40) / 930) * 12)).padStart(2, "0")} / 00:12
              </div>
            </div>
            {/* ruler */}
            <div style={{ position: "absolute", left: 40, right: 40, top: 64, height: 30, display: "flex", justifyContent: "space-between", color: "#55617a", fontSize: 13 }}>
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i}>{i}s</span>
              ))}
            </div>
          </div>
          {/* track backgrounds */}
          {[
            { y: V1_Y, h: 80, label: "V1" },
            { y: 694, h: 50, label: "T1" },
            { y: 754, h: 64, label: "A1" },
          ].map((t) => (
            <div key={t.label} style={{ position: "absolute", left: 40, right: 40, top: t.y, height: t.h, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.07)" }} />
          ))}
          {/* video clips */}
          {clips.map((k, i) =>
            f >= DROP[i] ? (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: SLOT_X(i),
                  top: V1_Y,
                  width: 300,
                  height: 80,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `2px solid ${covers[k].from}`,
                  background: covers[k].to,
                  display: "flex",
                  transform: `scaleY(${pop(f, DROP[i], 10, 260)})`,
                }}
              >
                {[0, 1, 2].map((j) => (
                  <Cover key={j} kind={k} w={100} h={80} label={false} radius={0} t={f + j * 10} />
                ))}
                <div style={{ position: "absolute", left: 10, top: 6, fontSize: 13, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px #000" }}>{covers[k].title}</div>
              </div>
            ) : null,
          )}
          {/* text clips */}
          {["Fix it.", "Build it.", "Ship it."].map((t, i) =>
            f >= 90 + i * 4 ? (
              <div
                key={t}
                style={{
                  position: "absolute",
                  left: SLOT_X(i),
                  top: 694,
                  width: 300,
                  height: 50,
                  borderRadius: 10,
                  background: "#7c3aed",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingLeft: 14,
                  transform: `scaleX(${pop(f, 90 + i * 4, 12, 220)})`,
                  transformOrigin: "left",
                }}
              >
                <Icon name="text" size={16} color="#fff" /> {t}
              </div>
            ) : null,
          )}
          {/* audio waveform */}
          <div style={{ position: "absolute", left: 40, top: 754, width: 930, height: 64, borderRadius: 10, background: "rgba(22,163,74,0.25)", border: "2px solid #16a34a", display: "flex", alignItems: "center", gap: 3, padding: "0 10px", overflow: "hidden" }}>
            {Array.from({ length: 150 }, (_, i) => (
              <div key={i} style={{ width: 3, flex: "none", borderRadius: 2, background: "#4ade80", height: 6 + 40 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * (i % 4 === 0 ? 1 : 0.6) }} />
            ))}
          </div>
          {/* playhead */}
          {f >= 88 && (
            <div style={{ position: "absolute", left: playX, top: 552, height: 280, width: 3, background: "#ff3b5c", boxShadow: "0 0 12px #ff3b5c" }}>
              <div style={{ position: "absolute", top: -6, left: -8, width: 19, height: 14, borderRadius: 4, background: "#ff3b5c" }} />
            </div>
          )}

          {/* export modal */}
          {f >= 114 && (
            <div style={{ position: "absolute", inset: 0, background: `rgba(5,8,16,${0.55 * prog(f, 114, 120)})`, display: "grid", placeItems: "center" }}>
              <div
                style={{
                  width: 560,
                  padding: "32px 36px",
                  borderRadius: 20,
                  background: c.dark2,
                  border: "1px solid rgba(255,255,255,0.1)",
                  transform: `scale(${pop(f, 114)})`,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 800 }}>{exportP < 1 ? "Exporting…" : "Exported!"}</div>
                <div style={{ fontSize: 17, color: "#8b97ad", marginTop: 6 }}>portfolio_reel.mp4 · 1080p</div>
                <div style={{ height: 12, borderRadius: 6, background: c.dark3, marginTop: 22, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${exportP * 100}%`, background: exportP < 1 ? c.accent : c.green, borderRadius: 6 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 16, color: "#c7d0e0", fontVariantNumeric: "tabular-nums" }}>
                  <span>{Math.round(exportP * 100)}%</span>
                  {exportP >= 1 && (
                    <span style={{ color: "#4ade80", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, transform: `scale(${pop(f, 146)})` }}>
                      <Icon name="check" size={18} color="#4ade80" stroke={3} /> Ready to share
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Window>

        {/* dragged ghost */}
        {GRAB.map((g, i) =>
          f >= g && f < DROP[i] ? (
            <div key={i} style={{ position: "absolute", left: cur.x - 90, top: cur.y - 56, transform: "rotate(4deg) scale(0.95)", opacity: 0.92, boxShadow: "0 20px 40px rgba(0,0,0,0.5)", borderRadius: 10, zIndex: 900 }}>
              <Cover kind={clips[i]} w={180} h={112} t={f} label={false} radius={10} />
            </div>
          ) : null,
        )}
        <Cursor keys={keys} dark />
      </Camera>
      {DROP.map((d) => (
        <Sfx key={d} at={d} name="pop" volume={0.45} />
      ))}
      <Sfx at={146} name="pop" volume={0.5} />
      <Caption text="I *build* systems." start={24} end={84} x={1810} y={110} size={80} align="right" dark />
    </Backdrop>
  );
};
