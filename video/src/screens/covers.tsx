// Cover images (project-card thumbnails and video posters): layered screens in browser frames.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Brand, SH, SW } from "./kit";
import { fontFamily } from "../theme";

// `dark` frames hold the code editor, which has its own title bar, so they get no browser bar.
const Frame: React.FC<{ comp: React.FC; width: number; x: number; y: number; url: string; shadow?: string; dark?: boolean }> = ({ comp: Comp, width, x, y, url, shadow, dark }) => {
  const scale = width / SW;
  const bar = dark ? 0 : Math.round(width * 0.036);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        borderRadius: Math.max(8, width * 0.014),
        overflow: "hidden",
        background: dark ? "#0b1019" : "#fff",
        boxShadow: shadow ?? "0 40px 80px -30px rgba(17,17,17,0.45), 0 0 0 1px rgba(17,17,17,0.1)",
      }}
    >
      {!dark && (
      <div style={{ height: bar, display: "flex", alignItems: "center", gap: bar * 0.22, padding: `0 ${bar * 0.45}px`, background: "#f3f5f8", borderBottom: "1px solid #e6eaf0" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: bar * 0.3, height: bar * 0.3, borderRadius: "50%", background: c }} />
        ))}
        <span
          style={{
            margin: "0 auto",
            padding: `${bar * 0.08}px ${bar * 0.6}px`,
            borderRadius: 999,
            background: "#fff",
            border: "1px solid #e6eaf0",
            fontFamily,
            fontSize: bar * 0.36,
            color: "#64748b",
          }}
        >
          {url}
        </span>
      </div>
      )}
      <div style={{ width, height: SH * scale, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: SW, height: SH, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
          <Comp />
        </div>
      </div>
    </div>
  );
};

export const Cover: React.FC<{
  brand: Brand;
  w: number;
  h: number;
  main: React.FC;
  second: React.FC;
  url: string;
  secondUrl?: string;
  secondDark?: boolean;
}> = ({ brand, w, h, main, second, url, secondUrl, secondDark }) => {
  const mainW = Math.round(w * 0.74);
  const secondW = Math.round(w * 0.43);
  const secondH = secondW * (SH / SW) + (secondDark ? 0 : secondW * 0.036);
  return (
    <AbsoluteFill style={{ background: "#e9e9e3", overflow: "hidden" }}>
      {/* design-canvas grid, matching the website */}
      <AbsoluteFill
        style={{
          backgroundImage: "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
          backgroundSize: `${Math.round(w / 24)}px ${Math.round(w / 24)}px`,
        }}
      />
      <div style={{ position: "absolute", left: 0, top: 0, width: Math.round(w * 0.012), height: "100%", background: brand.color }} />
      <Frame comp={main} width={mainW} x={Math.round(w * 0.06)} y={Math.round(h * 0.09)} url={url} />
      <Frame
        comp={second}
        width={secondW}
        x={w - secondW - Math.round(w * 0.045)}
        y={h - secondH - Math.round(h * 0.06)}
        url={secondUrl ?? url}
        dark={secondDark}
        shadow="0 50px 90px -30px rgba(17,17,17,0.6), 0 0 0 1px rgba(17,17,17,0.12)"
      />
    </AbsoluteFill>
  );
};
