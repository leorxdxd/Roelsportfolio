import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Avatar, Backdrop, Caption, Icon, Phone, Sfx } from "../components/ui";
import { c } from "../theme";
import { kf, pop, prog } from "../lib";
import { photo } from "../config";

const SEG = 44;
const SCREEN_H = 856;
const reels = [
  { kind: "ai", caption: "AI Plagiarism Checker — results in seconds ⚡", likes: 1240 },
  { kind: "mail", caption: "MiroMail — email campaigns, simplified ✉️", likes: 986 },
  { kind: "photo", caption: "Behind the build 💻 systems for schools & small businesses", likes: 2310 },
] as const;

export const S7Reels: React.FC = () => {
  const f = useCurrentFrame();
  const offset = (pop(f, 40, 16, 140) + pop(f, 84, 16, 140)) * SCREEN_H;
  const enter = pop(f, 0, 14, 120);

  return (
    <Backdrop>
      <Caption text="Built to" start={4} end={124} x={120} y={330} size={120} chip={false} />
      <Caption text="be *used.*" start={8} end={124} x={120} y={470} size={120} chip={false} />
      <div style={{ position: "absolute", left: 128, top: 640, fontSize: 30, color: c.muted, fontWeight: 600, opacity: prog(f, 14, 24) }}>
        Clean, fast, and easy for real people.
      </div>

      {/* feature chips */}
      {[
        ["⚡", "Fast"],
        ["🔒", "Secure"],
        ["📱", "Responsive"],
        ["🙂", "Easy to use"],
      ].map(([e, t], i) => {
        const p = pop(f, 14 + i * 10);
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: 1290 + (i % 2) * 60,
              top: 300 + i * 120 + Math.sin((f + i * 20) / 16) * 8,
              padding: "18px 30px",
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 20px 50px -20px rgba(15,23,42,0.35)",
              fontSize: 36,
              fontWeight: 800,
              display: "flex",
              gap: 14,
              alignItems: "center",
              transform: `scale(${p}) rotate(${(i % 2 ? 3 : -3) * (1 - p)}deg)`,
              opacity: p,
            }}
          >
            <span>{e}</span> {t}
          </div>
        );
      })}

      {/* floating hearts */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = (f * 1.6 + i * 37) % 160;
        return (
          <div key={i} style={{ position: "absolute", left: 1150 + Math.sin((t + i * 30) / 14) * 26 + (i % 3) * 22, top: 860 - t * 4.2, opacity: Math.max(0, 1 - t / 150) * 0.9, transform: `scale(${0.7 + (i % 3) * 0.25})` }}>
            <Icon name="heart" size={34} color="#ff3b5c" fill="#ff3b5c" />
          </div>
        );
      })}

      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - enter) * 400}px) rotate(${2 - enter * 2 + Math.sin(f / 20)}deg)` }}>
        <Phone x={745} y={98}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, transform: `translateY(${-offset}px)` }}>
            {reels.map((r, i) => (
              <Reel key={i} index={i} local={f - i * SEG} kind={r.kind} caption={r.caption} likes={r.likes} />
            ))}
          </div>
          <div style={{ position: "absolute", top: 50, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24, color: "#fff", fontWeight: 700, fontSize: 18, textShadow: "0 1px 6px rgba(0,0,0,0.5)", zIndex: 5 }}>
            <span style={{ opacity: 0.6 }}>Following</span>
            <span style={{ borderBottom: "2px solid #fff", paddingBottom: 4 }}>Reels</span>
          </div>
        </Phone>
      </div>
      {[20, 64, 108].map((at) => (
        <Sfx key={at} at={at} name="pop" volume={0.45} />
      ))}
      <Sfx at={40} name="whoosh" volume={0.25} />
      <Sfx at={84} name="whoosh" volume={0.25} />
    </Backdrop>
  );
};

const Reel: React.FC<{ index: number; local: number; kind: "ai" | "mail" | "photo"; caption: string; likes: number }> = ({ index, local, kind, caption, likes }) => {
  const liked = local >= 20;
  const burst = local >= 20 && local < 40 ? prog(local, 20, 38) : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: index * SCREEN_H,
        height: SCREEN_H,
        overflow: "hidden",
        background: kind === "ai" ? "linear-gradient(160deg,#7c3aed,#2e1065)" : kind === "mail" ? "linear-gradient(160deg,#0d9488,#042f2e)" : "#000",
        color: "#fff",
      }}
    >
      {kind === "photo" && (
        <Img src={staticFile(photo(0))} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", transform: `scale(${1.1 + Math.max(0, local) * 0.003})` }} />
      )}
      {kind === "ai" && <AiMock local={local} />}
      {kind === "mail" && <MailMock local={local} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.65))" }} />

      {/* big heart */}
      {burst > 0 && (
        <div style={{ position: "absolute", left: "50%", top: "42%", transform: `translate(-50%,-50%) scale(${kf(burst, [[0, 0.2], [0.3, 1.25], [0.5, 1], [1, 1.1]])})`, opacity: 1 - kf(burst, [[0.6, 0], [1, 1]]) }}>
          <Icon name="heart" size={170} color="#ff3b5c" fill="#ff3b5c" />
        </div>
      )}

      {/* right rail */}
      <div style={{ position: "absolute", right: 14, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, fontSize: 14, fontWeight: 700 }}>
        <div style={{ textAlign: "center", transform: `scale(${kf(local, [[20, 1], [24, 1.3], [30, 1]])})` }}>
          <Icon name="heart" size={38} color={liked ? "#ff3b5c" : "#fff"} fill={liked ? "#ff3b5c" : "none"} />
          <div>{((likes + (liked ? 1 : 0)) / 1000).toFixed(1)}k</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Icon name="message" size={36} color="#fff" />
          <div>{48 + index * 17}</div>
        </div>
        <Icon name="send" size={34} color="#fff" />
        <Icon name="bookmark" size={34} color="#fff" />
      </div>

      {/* caption */}
      <div style={{ position: "absolute", left: 18, right: 90, bottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18 }}>
          <Avatar name="Roel" size={38} src={staticFile(photo(0))} />
          roel.builds
          <span style={{ border: "1.5px solid #fff", borderRadius: 8, padding: "2px 10px", fontSize: 14 }}>Follow</span>
        </div>
        <div style={{ fontSize: 17, marginTop: 10, lineHeight: 1.4 }}>{caption}</div>
        <div style={{ fontSize: 14, marginTop: 8, opacity: 0.85, display: "flex", gap: 6, alignItems: "center", whiteSpace: "nowrap", overflow: "hidden" }}>
          <Icon name="music" size={14} color="#fff" />
          <span style={{ transform: `translateX(${-((Math.max(0, local) * 2) % 120)}px)` }}>original audio · roel.builds · original audio · roel.builds</span>
        </div>
      </div>
    </div>
  );
};

const AiMock: React.FC<{ local: number }> = ({ local }) => {
  const scan = prog(local, 0, 30, (x) => x);
  const score = Math.round(kf(local, [[4, 0], [30, 12]]));
  return (
    <div style={{ position: "absolute", left: 30, right: 30, top: 130 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 24, color: c.text, position: "relative", overflow: "hidden" }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 14 }}>essay_final.docx</div>
        {[1, 0.92, 0.75, 1, 0.85, 0.6, 0.95, 0.7].map((w, i) => (
          <div key={i} style={{ height: 12, width: `${w * 100}%`, borderRadius: 6, marginBottom: 10, background: (i === 2 || i === 5) && scan > (i + 1) / 9 ? "#fde68a" : "#e5e7eb" }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 50 + scan * 200, height: 3, background: "#7c3aed", boxShadow: "0 0 18px #7c3aed", opacity: scan < 1 ? 1 : 0 }} />
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", background: `conic-gradient(#fbbf24 ${score * 3.6}deg, rgba(255,255,255,0.2) 0)`, display: "grid", placeItems: "center" }}>
          <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#3b0f8c", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 28 }}>{score}%</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>
          Similarity
          <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.8, marginTop: 4 }}>2 sources matched</div>
        </div>
      </div>
    </div>
  );
};

const MailMock: React.FC<{ local: number }> = ({ local }) => {
  const sent = Math.round(kf(local, [[10, 0], [34, 248]]));
  return (
    <div style={{ position: "absolute", left: 30, right: 30, top: 130 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 24, color: c.text }}>
        <div style={{ fontSize: 15, color: c.muted }}>To: All subscribers (248)</div>
        <div style={{ fontWeight: 800, fontSize: 22, margin: "10px 0 16px" }}>📣 Enrollment is now open!</div>
        {[1, 0.9, 0.95, 0.6].map((w, i) => (
          <div key={i} style={{ height: 11, width: `${w * 100}%`, borderRadius: 6, marginBottom: 10, background: "#e5e7eb" }} />
        ))}
        <div style={{ marginTop: 14, display: "inline-flex", padding: "10px 22px", borderRadius: 10, background: "#0d9488", color: "#fff", fontWeight: 750, transform: `scale(${kf(local, [[6, 1], [9, 0.9], [13, 1]])})` }}>Send campaign</div>
      </div>
      <div style={{ marginTop: 24, background: "rgba(255,255,255,0.14)", borderRadius: 16, padding: "18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 20 }}>
          <span>Delivered</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{sent} / 248</span>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: "rgba(255,255,255,0.2)", marginTop: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(sent / 248) * 100}%`, background: "#5eead4" }} />
        </div>
      </div>
    </div>
  );
};
