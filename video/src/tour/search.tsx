// A plain, unbranded search engine page: someone types the site's address and opens the first result.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Icon } from "../components/ui";
import { prog, typed } from "../lib";
import { mono, sans, SITE, T } from "./parts";

export const SEARCH = {
  typeFrom: 26,
  enter: 66,
  results: 70,
  hover: 92,
};
const CPS = 21;
const DESCRIPTION =
  "Software developer in Metro Manila. I design, build and maintain web applications, business systems and websites for schools and small businesses, with IT support when you need it.";

const Logo: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.28, fontFamily: sans, fontWeight: 800, fontSize: size, letterSpacing: -size * 0.04, color: T.ink }}>
    <span style={{ width: size * 1.05, height: size * 1.05, borderRadius: size * 0.28, background: T.ink, display: "grid", placeItems: "center" }}>
      <Icon name="search" size={size * 0.62} color={T.lime} stroke={2.6} />
    </span>
    Search
  </div>
);

const Caret: React.FC = () => {
  const f = useCurrentFrame();
  return <span style={{ display: "inline-block", width: 2, height: 26, marginLeft: 2, verticalAlign: -5, background: T.ink, opacity: Math.floor(f / 8) % 2 ? 0 : 1 }} />;
};

export const SearchPage: React.FC = () => {
  const f = useCurrentFrame();
  const query = typed(f, SEARCH.typeFrom, CPS, SITE);
  const res = f >= SEARCH.results;
  const enter = f >= SEARCH.enter && f < SEARCH.enter + 5;
  const item = (i: number) => {
    const p = prog(f, SEARCH.results + 2 + i * 4, SEARCH.results + 14 + i * 4);
    return { opacity: p, transform: `translateY(${(1 - p) * 26}px)` } as React.CSSProperties;
  };
  const hover = f >= SEARCH.hover;

  if (!res) {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: sans }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", justifyContent: "center" }}>
          <Logo size={64} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 420,
            top: 360,
            width: 760,
            height: 64,
            borderRadius: 32,
            border: `1.5px solid ${f >= 24 ? "#bdbdb4" : "#dcdcd5"}`,
            boxShadow: f >= 24 ? "0 10px 30px -12px rgba(0,0,0,0.25)" : "none",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0 24px",
            fontSize: 22,
            color: T.ink,
          }}
        >
          <Icon name="search" size={22} color="#8a8a82" />
          {query ? <span>{query}</span> : <span style={{ color: "#a3a39b" }}>Search the web or type a link</span>}
          {f >= 24 && <Caret />}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 456, display: "flex", justifyContent: "center" }}>
          <span style={{ height: 46, padding: "0 26px", borderRadius: 999, background: enter ? T.lime : T.ink, color: enter ? T.ink : "#fff", fontWeight: 700, fontSize: 17, display: "grid", placeItems: "center", transform: `scale(${enter ? 0.94 : 1})` }}>
            Search
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: sans, color: T.ink }}>
      <div style={{ height: 112, borderBottom: "1px solid #e6e6df", position: "relative" }}>
        <div style={{ position: "absolute", left: 40, top: 26 }}>
          <Logo size={30} />
        </div>
        <div style={{ position: "absolute", left: 210, top: 20, width: 680, height: 48, borderRadius: 24, border: "1.5px solid #dcdcd5", display: "flex", alignItems: "center", gap: 12, padding: "0 20px", fontSize: 18 }}>
          {SITE}
          <span style={{ marginLeft: "auto" }}>
            <Icon name="search" size={19} color="#6b6b63" />
          </span>
        </div>
        <div style={{ position: "absolute", left: 210, bottom: 0, display: "flex", gap: 30, fontSize: 15, fontWeight: 600, color: "#6b6b63" }}>
          {["All", "Images", "Videos", "News"].map((t, i) => (
            <span key={t} style={{ paddingBottom: 12, color: i === 0 ? T.ink : undefined, boxShadow: i === 0 ? `inset 0 -3px 0 ${T.ink}` : "none" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 210, top: 250, width: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, ...item(0) }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: T.lime, border: `2px solid ${T.ink}`, fontFamily: mono, fontWeight: 700, fontSize: 11, display: "grid", placeItems: "center" }}>RD</span>
          <span style={{ lineHeight: 1.25 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Roel Delos Reyes</span>
            <br />
            <span style={{ fontSize: 13.5, color: "#5d5d56" }}>https://{SITE}</span>
          </span>
        </div>
        <div style={{ marginTop: 14, fontSize: 27, fontWeight: 500, lineHeight: 1.25, color: T.link, textDecoration: hover ? "underline" : "none", ...item(0) }}>
          Roel Delos Reyes | Software Developer: Web Apps &amp; Business Systems
        </div>
        <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.55, color: "#4a4a45", ...item(1) }}>{DESCRIPTION}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 40px", marginTop: 22, paddingLeft: 18, borderLeft: "2px solid #ececE6", ...item(2) }}>
          {[
            ["Projects", "Apartment system, EMR, Medicine Portal and more"],
            ["Demos", "Walkthrough videos of each system"],
            ["Services", "Custom systems, websites and automation"],
            ["Contact", "Tell me about your project"],
          ].map(([t, d]) => (
            <div key={t}>
              <div style={{ fontSize: 19, color: T.link, fontWeight: 500 }}>{t}</div>
              <div style={{ fontSize: 14, color: "#5d5d56", marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 42, ...item(3) }}>
          <div style={{ fontSize: 13.5, color: "#5d5d56" }}>{SITE} › projects › electronic-medical-records</div>
          <div style={{ marginTop: 4, fontSize: 22, color: T.link }}>Electronic Medical Records (EMR) – Roel Delos Reyes</div>
          <div style={{ marginTop: 4, fontSize: 15, color: "#4a4a45" }}>Patient records for a small clinic: appointments, consultation notes, vital signs and prescriptions.</div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 1010, top: 150, width: 470, borderRadius: 18, border: "1px solid #e6e6df", overflow: "hidden", ...item(1) }}>
        <Img src={staticFile("tour/og-image.png")} style={{ width: "100%", display: "block" }} />
        <div style={{ padding: "16px 20px 20px" }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>Roel Delos Reyes</div>
          <div style={{ fontSize: 15, color: "#5d5d56", marginTop: 2 }}>Software Developer · Metro Manila</div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {["Web apps", "Business systems", "Supabase", "TypeScript"].map((t) => (
              <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "#f1f1ec", fontFamily: mono, fontSize: 12.5, color: "#3a3a36" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
