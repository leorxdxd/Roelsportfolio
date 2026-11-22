import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Avatar, Icon, Phone, Sfx } from "../components/ui";
import { c, fontFamily } from "../theme";
import { kf, pop } from "../lib";
import { person, photo } from "../config";

const SEG = 44;
const segments = [
  { sticker: "Hi! I'm Roel 👋", side: "IT Technical Support", pos: "center 25%", tint: "none" },
  { sticker: "I fix & I build 🛠️", side: "Web & Systems Developer", pos: "center 15%", tint: "contrast(1.05) saturate(1.15)" },
  { sticker: "📍 Metro Manila", side: "Open for projects", pos: "center 35%", tint: "saturate(0.9) hue-rotate(-8deg)" },
];

export const S3Story: React.FC = () => {
  const f = useCurrentFrame();
  const seg = Math.min(2, Math.floor(f / SEG));
  const local = f - seg * SEG;
  const enter = pop(f, 0, 14, 120);
  const s = segments[seg];

  return (
    <AbsoluteFill style={{ background: c.dark, fontFamily, overflow: "hidden" }}>
      {/* blurred photo backdrop */}
      <Img
        src={staticFile(photo(seg))}
        style={{ position: "absolute", inset: -80, width: "calc(100% + 160px)", height: "calc(100% + 160px)", objectFit: "cover", filter: "blur(60px) brightness(0.45) saturate(1.4)" }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.35), transparent 60%)" }} />

      {/* left: big name */}
      <div style={{ position: "absolute", left: 130, top: 330, color: "#fff" }}>
        <Word text="Hi, I'm" start={4} size={70} weight={600} />
        <Word text={`${person.firstName}.`} start={8} size={200} color="#6aa8ff" />
      </div>

      {/* right: roles appear per segment */}
      <div style={{ position: "absolute", left: 1290, top: 380, display: "flex", flexDirection: "column", gap: 22 }}>
        {segments.map((sg, i) => {
          const p = pop(f, i * SEG + 6);
          const active = i === seg;
          return f > i * SEG + 4 ? (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 26px",
                borderRadius: 18,
                background: active ? "#fff" : "rgba(255,255,255,0.12)",
                color: active ? c.text : "#dbe4f7",
                fontSize: 34,
                fontWeight: 750,
                transform: `translateX(${(1 - p) * 80}px) scale(${active ? 1 : 0.94})`,
                transformOrigin: "left center",
                opacity: p,
              }}
            >
              <Icon name={["shield", "code", "map"][i]} size={30} color={active ? c.accent : "#9fb6e8"} />
              {sg.side}
            </div>
          ) : null;
        })}
      </div>

      {/* phone */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - enter) * 300}px) rotate(${(1 - enter) * -10 + Math.sin(f / 18) * 1.2}deg)` }}>
        <Phone x={745} y={98}>
          <Img
            src={staticFile(photo(seg))}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: s.pos,
              filter: s.tint,
              transform: `scale(${1.05 + local / SEG * 0.12}) translateY(${-local * 0.3}px)`,
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.55) 100%)" }} />
          {/* progress bars */}
          <div style={{ position: "absolute", top: 46, left: 16, right: 16, display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.35)", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "#fff", width: `${(i < seg ? 1 : i === seg ? local / SEG : 0) * 100}%` }} />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 64, left: 16, display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
            <div style={{ padding: 2, borderRadius: "50%", background: "linear-gradient(45deg,#2563eb,#7c3aed)" }}>
              <Avatar name={person.name} size={40} src={staticFile(photo(0))} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18 }}>roel.builds</span>
            <span style={{ fontSize: 16, opacity: 0.75 }}>now</span>
          </div>
          {/* sticker */}
          <Sticker key={seg} text={s.sticker} local={local} rot={[-6, 5, -3][seg]} />
          {/* reply bar */}
          <div style={{ position: "absolute", bottom: 26, left: 16, right: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1, height: 52, borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.7)", color: "#fff", fontSize: 17, display: "flex", alignItems: "center", paddingLeft: 20 }}>
              Send message
            </div>
            <Heart beat={local} />
            <Icon name="send" size={30} color="#fff" />
          </div>
        </Phone>
      </div>
      {[0, 1, 2].map((i) => (
        <Sfx key={i} at={i * SEG + 8} name="pop" volume={0.4} />
      ))}
    </AbsoluteFill>
  );
};

const Word: React.FC<{ text: string; start: number; size: number; weight?: number; color?: string }> = ({ text, start, size, weight = 900, color }) => {
  const f = useCurrentFrame();
  const p = pop(f, start, 13, 160);
  return (
    <div style={{ overflow: "hidden", lineHeight: 1, paddingBottom: size * 0.08 }}>
      <div style={{ fontSize: size, fontWeight: weight, letterSpacing: -size * 0.04, color, transform: `translateY(${(1 - p) * 105}%)` }}>{text}</div>
    </div>
  );
};

const Sticker: React.FC<{ text: string; local: number; rot: number }> = ({ text, local, rot }) => {
  const p = pop(local, 6, 9, 220);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "58%",
        transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${p})`,
        padding: "14px 24px",
        borderRadius: 16,
        background: "#fff",
        color: c.text,
        fontWeight: 850,
        fontSize: 32,
        whiteSpace: "nowrap",
        boxShadow: "0 16px 40px -10px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </div>
  );
};

const Heart: React.FC<{ beat: number }> = ({ beat }) => {
  const p = kf(beat, [[26, 1], [30, 1.35], [36, 1]]);
  const on = beat > 28;
  return (
    <div style={{ transform: `scale(${p})` }}>
      <Icon name="heart" size={32} color={on ? "#ff3b5c" : "#fff"} fill={on ? "#ff3b5c" : "none"} />
    </div>
  );
};

