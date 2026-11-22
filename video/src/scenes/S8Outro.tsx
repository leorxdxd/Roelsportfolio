import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Camera, Caption, Icon, Sfx, Window } from "../components/ui";
import { c, shadow } from "../theme";
import { kf, pop, prog } from "../lib";
import { person, photo } from "../config";

const HIT = 96; // final musical hit (34 s)

export const S8Outro: React.FC = () => {
  const f = useCurrentFrame();
  const bump = kf(f, [[HIT - 1, 1], [HIT + 3, 1.04], [HIT + 12, 1]]);
  const flash = kf(f, [[HIT, 0.7], [HIT + 8, 0]]) * (f >= HIT ? 1 : 0);

  return (
    <Backdrop>
      <AbsoluteFill style={{ transform: `scale(${bump})` }}>
        <Camera
          keys={[
            { f: 0, x: 720, y: 470, s: 1.9 },
            { f: 30, x: 960, y: 540, s: 1.0 },
            { f: 46, x: 1370, y: 540, s: 0.8 },
            { f: 126, x: 1390, y: 545, s: 0.78 },
          ]}
        >
          <Window x={260} y={120} w={1400} h={840} url={person.site}>
            {/* nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 34, padding: "22px 48px", fontSize: 17, fontWeight: 600, color: c.muted }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: c.text, fontWeight: 800, fontSize: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: c.accent, color: "#fff", display: "grid", placeItems: "center", fontSize: 15 }}>{person.initials}</div>
                {person.name}
              </div>
              <span style={{ marginLeft: "auto" }}>About</span>
              <span>Services</span>
              <span>Projects</span>
              <span>Demos</span>
              <span style={{ padding: "10px 18px", borderRadius: 12, background: c.accent, color: "#fff" }}>Let's talk</span>
            </div>
            {/* hero */}
            <div style={{ position: "absolute", left: 70, top: 150, width: 720 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: c.greenSoft, color: c.green, fontWeight: 700, fontSize: 17 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: c.green }} /> Available for projects
              </div>
              <div style={{ fontSize: 66, fontWeight: 850, letterSpacing: -2.2, lineHeight: 1.05, marginTop: 24 }}>
                I fix, maintain <span style={{ color: c.accent }}>&amp; build</span> the tech you rely on.
              </div>
              <div style={{ fontSize: 22, color: c.muted, marginTop: 22, lineHeight: 1.5 }}>{person.title}</div>
              <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
                <div style={{ padding: "16px 26px", borderRadius: 14, background: c.accent, color: "#fff", fontWeight: 750, fontSize: 19 }}>View Projects</div>
                <div style={{ padding: "16px 26px", borderRadius: 14, border: `2px solid ${c.border}`, fontWeight: 750, fontSize: 19 }}>Contact Me</div>
              </div>
            </div>
            <div style={{ position: "absolute", right: 70, top: 140, width: 440, height: 520, borderRadius: 28, overflow: "hidden", boxShadow: shadow, transform: `rotate(${2 - prog(f, 0, 40) * 2}deg)` }}>
              <Img src={staticFile(photo(0))} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", transform: "scale(1.16)", transformOrigin: "50% 20%" }} />
            </div>
          </Window>
        </Camera>

        {/* call to action */}
        <Caption text="Let's build" start={40} end={999} x={1250} y={290} size={104} chip={false} />
        <Caption text="*yours.*" start={46} end={999} x={1250} y={410} size={104} chip={false} />
        {[
          { icon: "mail", text: person.email, at: 56 },
          { icon: "code", text: person.site, at: 62 },
        ].map((r) => (
          <div
            key={r.text}
            style={{
              position: "absolute",
              left: 1256,
              top: r.at === 56 ? 570 : 630,
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 27,
              fontWeight: 650,
              color: c.text,
              opacity: prog(f, r.at, r.at + 8),
              transform: `translateX(${(1 - prog(f, r.at, r.at + 12)) * 40}px)`,
            }}
          >
            <div style={{ width: 46, height: 46, borderRadius: 12, background: c.accentSoft, display: "grid", placeItems: "center" }}>
              <Icon name={r.icon} size={24} color={c.accent} />
            </div>
            {r.text}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 1256,
            top: 730,
            padding: "20px 34px",
            borderRadius: 18,
            background: c.accent,
            color: "#fff",
            fontSize: 28,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 20px 40px -14px rgba(37,99,235,0.8)",
            transform: `scale(${pop(f, 70)}) scale(${kf(f, [[HIT, 1], [HIT + 4, 1.12], [HIT + 14, 1]])})`,
            transformOrigin: "left center",
          }}
        >
          Start a project <Icon name="arrow" size={28} color="#fff" stroke={2.6} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
      <Sfx at={56} name="pop" volume={0.35} />
      <Sfx at={70} name="pop" volume={0.45} />
    </Backdrop>
  );
};
