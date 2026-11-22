import React from "react";
import { Icon } from "./ui";
import { fontFamily } from "../theme";

export type CoverKind = "helpdesk" | "ai" | "mail" | "dashboard" | "code";

export const covers: Record<CoverKind, { title: string; sub: string; icon: string; from: string; to: string }> = {
  helpdesk: { title: "Helpdesk", sub: "Ticketing system", icon: "ticket", from: "#2563eb", to: "#1e40af" },
  ai: { title: "AI Checker", sub: "Plagiarism detection", icon: "shield", from: "#7c3aed", to: "#4c1d95" },
  mail: { title: "MiroMail", sub: "Email campaigns", icon: "mail", from: "#0d9488", to: "#115e59" },
  dashboard: { title: "Reports", sub: "Live dashboards", icon: "chart", from: "#ea580c", to: "#9a3412" },
  code: { title: "Websites", sub: "Fast & responsive", icon: "code", from: "#0f172a", to: "#334155" },
};

/** A stylised mini "screenshot" of a project, drawn in code (no real data). */
export const Cover: React.FC<{ kind: CoverKind; w: number; h: number; t?: number; label?: boolean; radius?: number }> = ({
  kind,
  w,
  h,
  t = 0,
  label = true,
  radius = 14,
}) => {
  const k = covers[kind];
  const u = w / 360; // unit scale
  const bar = (i: number) => 0.35 + 0.55 * Math.abs(Math.sin(i * 1.7 + t / 12));
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(140deg, ${k.from}, ${k.to})`,
        fontFamily,
        color: "#fff",
        flex: "none",
      }}
    >
      {/* mini window */}
      <div
        style={{
          position: "absolute",
          left: 22 * u,
          top: 22 * u,
          right: 22 * u,
          bottom: label ? 80 * u : 22 * u,
          borderRadius: 10 * u,
          background: "rgba(255,255,255,0.95)",
          padding: 12 * u,
          display: "flex",
          gap: 10 * u,
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.4)",
        }}
      >
        {kind !== "code" && <div style={{ width: 46 * u, borderRadius: 6 * u, background: "#eef2f8" }} />}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 * u }}>
          {kind === "helpdesk" &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: 6 * u, alignItems: "center" }}>
                <div style={{ flex: 1, height: 9 * u, borderRadius: 5 * u, background: "#dfe6f2" }} />
                <div style={{ width: 34 * u, height: 12 * u, borderRadius: 6 * u, background: ["#dcfce7", "#fef3c7", "#dbeafe", "#dcfce7"][i] }} />
              </div>
            ))}
          {kind === "ai" && (
            <>
              {[0.9, 0.7, 0.95, 0.6].map((wd, i) => (
                <div key={i} style={{ width: `${wd * 100}%`, height: 9 * u, borderRadius: 5 * u, background: i === 1 ? "#fde68a" : "#e5e7eb" }} />
              ))}
              <div style={{ marginTop: "auto", alignSelf: "flex-end", fontWeight: 800, fontSize: 16 * u, color: "#7c3aed" }}>12%</div>
            </>
          )}
          {kind === "mail" && (
            <>
              <div style={{ height: 12 * u, width: "60%", borderRadius: 5 * u, background: "#ccfbf1" }} />
              {[1, 0.8, 0.9].map((wd, i) => (
                <div key={i} style={{ width: `${wd * 100}%`, height: 8 * u, borderRadius: 4 * u, background: "#e5e7eb" }} />
              ))}
              <div style={{ marginTop: "auto", alignSelf: "flex-start", padding: `${3 * u}px ${10 * u}px`, borderRadius: 6 * u, background: "#0d9488", fontSize: 10 * u, fontWeight: 700 }}>Send</div>
            </>
          )}
          {kind === "dashboard" && (
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6 * u }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ flex: 1, height: `${bar(i) * 100}%`, borderRadius: 4 * u, background: i === 4 ? "#ea580c" : "#fed7aa" }} />
              ))}
            </div>
          )}
          {kind === "code" &&
            ["#7c3aed", "#2563eb", "#16a34a", "#ea580c", "#2563eb"].map((col, i) => (
              <div key={i} style={{ display: "flex", gap: 6 * u, paddingLeft: (i % 3) * 14 * u }}>
                <div style={{ width: 30 * u, height: 8 * u, borderRadius: 4 * u, background: col, opacity: 0.8 }} />
                <div style={{ width: (60 + i * 17) * u, height: 8 * u, borderRadius: 4 * u, background: "#e5e7eb" }} />
              </div>
            ))}
        </div>
      </div>
      {label && (
        <div style={{ position: "absolute", left: 22 * u, bottom: 18 * u, display: "flex", alignItems: "center", gap: 10 * u }}>
          <div style={{ width: 40 * u, height: 40 * u, borderRadius: 10 * u, background: "rgba(255,255,255,0.18)", display: "grid", placeItems: "center" }}>
            <Icon name={k.icon} size={22 * u} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 20 * u, fontWeight: 800, letterSpacing: -0.3 }}>{k.title}</div>
            <div style={{ fontSize: 13 * u, opacity: 0.8 }}>{k.sub}</div>
          </div>
        </div>
      )}
    </div>
  );
};
