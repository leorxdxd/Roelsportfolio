// UI kit for the project screenshots (rendered as stills, 1600 × 1000). All data shown is sample data.
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { Icon } from "../components/ui";
import { fontFamily } from "../theme";

export const { fontFamily: mono } = loadMono("normal", { weights: ["400", "500", "700"], subsets: ["latin"] });

export const SW = 1600;
export const SH = 1000;

export const ink = {
  text: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  subtle: "#94a3b8",
  border: "#e6eaf0",
  line: "#eef1f5",
  bg: "#f5f7fa",
  surface: "#ffffff",
  green: "#16a34a",
  greenSoft: "#dcfce7",
  amber: "#b45309",
  amberSoft: "#fef3c7",
  red: "#dc2626",
  redSoft: "#fee2e2",
  blue: "#2563eb",
  blueSoft: "#dbeafe",
  violet: "#7c3aed",
  violetSoft: "#ede9fe",
  gray: "#475569",
  graySoft: "#f1f5f9",
};

export type Brand = { name: string; color: string; soft: string; dark: string; icon: string };

export const Screen: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = ink.bg, style }) => (
  <AbsoluteFill style={{ background: bg, fontFamily, color: ink.text, fontSize: 15, lineHeight: 1.45, ...style }}>{children}</AbsoluteFill>
);

export const Logo: React.FC<{ brand: Brand; size?: number; light?: boolean }> = ({ brand, size = 34, light }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: size * 0.56, letterSpacing: -0.3, color: light ? "#fff" : ink.text }}>
    <div style={{ width: size, height: size, borderRadius: size * 0.28, background: brand.color, display: "grid", placeItems: "center", boxShadow: `0 6px 14px -6px ${brand.color}` }}>
      <Icon name={brand.icon} size={size * 0.56} color="#fff" stroke={2.2} />
    </div>
    {brand.name}
  </div>
);

export type NavItem = { icon: string; label: string; badge?: string | number; section?: string };

/** Standard admin layout: sidebar + top bar + content. */
export const AppShell: React.FC<{
  brand: Brand;
  nav: NavItem[];
  active: string;
  user: { name: string; role: string; color?: string };
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  search?: string;
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
}> = ({ brand, nav, active, user, title, subtitle, actions, search = "Search…", children, contentStyle }) => (
  <Screen>
    <div style={{ display: "flex", height: "100%" }}>
      <aside style={{ width: 248, flex: "none", background: ink.surface, borderRight: `1px solid ${ink.border}`, display: "flex", flexDirection: "column", padding: "22px 16px" }}>
        <div style={{ padding: "0 8px 22px" }}>
          <Logo brand={brand} />
        </div>
        {nav.map((n) => {
          const on = n.label === active;
          return (
            <React.Fragment key={n.label}>
              {n.section && <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, padding: "18px 12px 8px" }}>{n.section}</div>}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 2,
                  fontSize: 15,
                  fontWeight: on ? 650 : 500,
                  color: on ? brand.dark : ink.body,
                  background: on ? brand.soft : "transparent",
                }}
              >
                <Icon name={n.icon} size={19} color={on ? brand.color : ink.muted} />
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge !== undefined && (
                  <span style={{ minWidth: 24, padding: "1px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700, textAlign: "center", background: on ? brand.color : ink.graySoft, color: on ? "#fff" : ink.muted }}>{n.badge}</span>
                )}
              </div>
            </React.Fragment>
          );
        })}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, border: `1px solid ${ink.border}` }}>
          <Avatar name={user.name} size={38} color={user.color ?? "#334155"} />
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <div style={{ fontWeight: 650, fontSize: 14.5 }}>{user.name}</div>
            <div style={{ fontSize: 13, color: ink.muted }}>{user.role}</div>
          </div>
          <span style={{ marginLeft: "auto", color: ink.subtle }}>
            <Icon name="logout" size={17} />
          </span>
        </div>
      </aside>
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ height: 76, flex: "none", display: "flex", alignItems: "center", gap: 16, padding: "0 32px", background: ink.surface, borderBottom: `1px solid ${ink.border}` }}>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 22, fontWeight: 750, letterSpacing: -0.4 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 13.5, color: ink.muted, marginTop: 3 }}>{subtitle}</div>}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 280, height: 40, borderRadius: 10, background: ink.bg, border: `1px solid ${ink.border}`, display: "flex", alignItems: "center", gap: 10, padding: "0 14px", color: ink.subtle, fontSize: 14 }}>
              <Icon name="search" size={17} /> {search}
              <span style={{ marginLeft: "auto", fontSize: 12, border: `1px solid ${ink.border}`, borderRadius: 6, padding: "0 6px", background: "#fff" }}>/</span>
            </div>
            {actions}
            <div style={{ position: "relative", width: 40, height: 40, borderRadius: 10, border: `1px solid ${ink.border}`, display: "grid", placeItems: "center", color: ink.muted }}>
              <Icon name="bell" size={18} />
              <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: "50%", background: ink.red, border: "2px solid #fff" }} />
            </div>
          </div>
        </header>
        <div style={{ flex: 1, minHeight: 0, padding: 28, ...contentStyle }}>{children}</div>
      </main>
    </div>
  </Screen>
);

export const Card: React.FC<{ title?: React.ReactNode; action?: React.ReactNode; pad?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  title,
  action,
  pad = 22,
  style,
  children,
}) => (
  <div style={{ background: ink.surface, border: `1px solid ${ink.border}`, borderRadius: 14, padding: pad, boxShadow: "0 1px 2px rgba(15,23,42,0.04)", minWidth: 0, ...style }}>
    {(title || action) && (
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
        <div style={{ marginLeft: "auto" }}>{action}</div>
      </div>
    )}
    {children}
  </div>
);

export const Stat: React.FC<{ label: string; value: React.ReactNode; delta?: string; up?: boolean; good?: boolean; icon: string; color: string; soft: string }> = ({
  label,
  value,
  delta,
  up = true,
  good = true,
  icon,
  color,
  soft,
}) => (
  <Card pad={20}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: soft, display: "grid", placeItems: "center" }}>
        <Icon name={icon} size={20} color={color} />
      </div>
      <div style={{ fontSize: 14, color: ink.muted, fontWeight: 550 }}>{label}</div>
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>{value}</div>
      {delta && (
        <div style={{ fontSize: 13, fontWeight: 650, color: good ? ink.green : ink.red, display: "flex", alignItems: "center", gap: 2 }}>
          {up ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  </Card>
);

type Tone = "blue" | "green" | "amber" | "red" | "gray" | "violet";
const tones: Record<Tone, [string, string]> = {
  blue: [ink.blueSoft, "#1d4ed8"],
  green: [ink.greenSoft, "#15803d"],
  amber: [ink.amberSoft, ink.amber],
  red: [ink.redSoft, "#b91c1c"],
  gray: [ink.graySoft, ink.gray],
  violet: [ink.violetSoft, "#6d28d9"],
};
export const Badge: React.FC<{ tone?: Tone; dot?: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({ tone = "gray", dot, children, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 10px",
      borderRadius: 999,
      background: tones[tone][0],
      color: tones[tone][1],
      fontSize: 12.5,
      fontWeight: 650,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: tones[tone][1] }} />}
    {children}
  </span>
);

export const Btn: React.FC<{ color?: string; variant?: "primary" | "outline" | "ghost"; icon?: string; children?: React.ReactNode; style?: React.CSSProperties; size?: "sm" | "md" }> = ({
  color = ink.blue,
  variant = "primary",
  icon,
  children,
  style,
  size = "md",
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: size === "sm" ? 34 : 40,
      padding: children ? (size === "sm" ? "0 12px" : "0 16px") : 0,
      width: children ? undefined : size === "sm" ? 34 : 40,
      borderRadius: 10,
      fontSize: size === "sm" ? 13.5 : 14.5,
      fontWeight: 650,
      whiteSpace: "nowrap",
      background: variant === "primary" ? color : "#fff",
      color: variant === "primary" ? "#fff" : ink.body,
      border: variant === "outline" ? `1px solid ${ink.border}` : variant === "ghost" ? "1px solid transparent" : `1px solid ${color}`,
      boxShadow: variant === "primary" ? `0 6px 14px -8px ${color}` : "none",
      ...style,
    }}
  >
    {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} color={variant === "primary" ? "#fff" : ink.muted} />}
    {children}
  </span>
);

const avatarColors = ["#2563eb", "#7c3aed", "#0d9488", "#ea580c", "#db2777", "#0891b2", "#4f46e5", "#65a30d"];
export const Avatar: React.FC<{ name: string; size?: number; color?: string }> = ({ name, size = 32, color }) => {
  const initials = name
    .split(" ")
    .filter((p) => /[A-Z]/.test(p[0]))
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const bg = color ?? avatarColors[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % avatarColors.length];
  return (
    <div style={{ width: size, height: size, flex: "none", borderRadius: "50%", background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: size * 0.38, fontWeight: 700 }}>
      {initials}
    </div>
  );
};

export const Table: React.FC<{ cols: { label: string; w?: number | string; align?: "left" | "right" | "center" }[]; rows: React.ReactNode[][]; rowH?: number; highlight?: number; compact?: boolean }> = ({
  cols,
  rows,
  rowH = 58,
  highlight,
}) => {
  const template = cols.map((c) => (typeof c.w === "number" ? `${c.w}px` : c.w ?? "1fr")).join(" ");
  return (
    <div style={{ fontSize: 14.5 }}>
      <div style={{ display: "grid", gridTemplateColumns: template, gap: 16, padding: "0 18px", height: 42, alignItems: "center", background: ink.bg, borderRadius: 10, fontSize: 12, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: ink.muted }}>
        {cols.map((c) => (
          <div key={c.label} style={{ textAlign: c.align ?? "left" }}>
            {c.label}
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: template,
            gap: 16,
            padding: "0 18px",
            height: rowH,
            alignItems: "center",
            borderBottom: i === rows.length - 1 ? "none" : `1px solid ${ink.line}`,
            background: i === highlight ? "#f8faff" : "transparent",
            boxShadow: i === highlight ? `inset 3px 0 0 ${ink.blue}` : "none",
          }}
        >
          {r.map((cell, j) => (
            <div key={j} style={{ minWidth: 0, textAlign: cols[j].align ?? "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

/** Smooth line/area chart. */
export const LineChart: React.FC<{
  w: number;
  h: number;
  series: { color: string; values: number[]; fill?: boolean; dashed?: boolean }[];
  labels: string[];
  max: number;
  ticks?: number;
}> = ({ w, h, series, labels, max, ticks = 4 }) => {
  const padL = 36;
  const padB = 28;
  const cw = w - padL;
  const ch = h - padB;
  const x = (i: number, n: number) => padL + (cw * i) / (n - 1);
  const y = (v: number) => ch - (v / max) * (ch - 8);
  const path = (vals: number[]) =>
    vals
      .map((v, i) => {
        if (i === 0) return `M ${x(i, vals.length)} ${y(v)}`;
        const x0 = x(i - 1, vals.length);
        const x1 = x(i, vals.length);
        const mx = (x0 + x1) / 2;
        return `C ${mx} ${y(vals[i - 1])}, ${mx} ${y(v)}, ${x1} ${y(v)}`;
      })
      .join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible", fontFamily }}>
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`g${i}${s.color.slice(1)}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={s.color} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const v = (max / ticks) * i;
        return (
          <g key={i}>
            <line x1={padL} x2={w} y1={y(v)} y2={y(v)} stroke={ink.line} strokeWidth={1} />
            <text x={0} y={y(v) + 4} fontSize={11.5} fill={ink.subtle}>
              {Math.round(v)}
            </text>
          </g>
        );
      })}
      {labels.map((l, i) => (
        <text key={l + i} x={x(i, labels.length)} y={h - 6} fontSize={11.5} fill={ink.subtle} textAnchor="middle">
          {l}
        </text>
      ))}
      {series.map((s, i) => (
        <g key={i}>
          {s.fill && <path d={`${path(s.values)} L ${x(s.values.length - 1, s.values.length)} ${ch} L ${padL} ${ch} Z`} fill={`url(#g${i}${s.color.slice(1)})`} />}
          <path d={path(s.values)} fill="none" stroke={s.color} strokeWidth={2.6} strokeDasharray={s.dashed ? "6 6" : undefined} strokeLinecap="round" />
        </g>
      ))}
      {series[0] && (
        <circle cx={x(series[0].values.length - 1, series[0].values.length)} cy={y(series[0].values.at(-1)!)} r={5} fill="#fff" stroke={series[0].color} strokeWidth={3} />
      )}
    </svg>
  );
};

export const BarChart: React.FC<{ w: number; h: number; values: number[]; labels: string[]; color: string; soft?: string; highlight?: number; max?: number; unit?: string }> = ({
  w,
  h,
  values,
  labels,
  color,
  soft,
  highlight,
  max,
  unit = "",
}) => {
  const m = max ?? Math.max(...values) * 1.15;
  const bw = (w / values.length) * 0.56;
  return (
    <div style={{ width: w, height: h, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      {values.map((v, i) => (
        <div key={i} style={{ width: w / values.length, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 650, color: i === highlight ? color : ink.muted }}>
            {v}
            {unit}
          </div>
          <div style={{ width: bw, height: (v / m) * (h - 48), borderRadius: 7, background: highlight === undefined || i === highlight ? color : soft ?? `${color}55` }} />
          <div style={{ fontSize: 12, color: ink.muted, whiteSpace: "nowrap" }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
};

export const Donut: React.FC<{ size: number; thickness: number; segments: { value: number; color: string }[]; children?: React.ReactNode }> = ({ size, thickness, segments, children }) => {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={ink.line} strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={thickness} strokeDasharray={`${Math.max(0, len - 3)} ${c}`} strokeDashoffset={-offset} />;
          offset += len;
          return el;
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>{children}</div>
    </div>
  );
};

export const Field: React.FC<{ label: string; children?: React.ReactNode; h?: number; hint?: React.ReactNode; focus?: string; style?: React.CSSProperties }> = ({ label, children, h = 46, hint, focus, style }) => (
  <div style={{ minWidth: 0, ...style }}>
    <div style={{ fontSize: 13.5, fontWeight: 650, color: ink.body, marginBottom: 7 }}>{label}</div>
    <div
      style={{
        minHeight: h,
        borderRadius: 10,
        border: `1.5px solid ${focus ?? ink.border}`,
        boxShadow: focus ? `0 0 0 4px ${focus}22` : "none",
        background: "#fff",
        display: "flex",
        alignItems: h > 60 ? "flex-start" : "center",
        gap: 10,
        padding: h > 60 ? "12px 14px" : "0 14px",
        fontSize: 15,
        color: ink.text,
      }}
    >
      {children}
    </div>
    {hint && <div style={{ fontSize: 12.5, color: ink.muted, marginTop: 6 }}>{hint}</div>}
  </div>
);

export const Toggle: React.FC<{ on?: boolean; color?: string }> = ({ on = true, color = ink.blue }) => (
  <div style={{ width: 42, height: 24, borderRadius: 999, background: on ? color : "#cbd5e1", position: "relative", flex: "none" }}>
    <div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
  </div>
);

export const Bar: React.FC<{ value: number; color: string; h?: number; bg?: string }> = ({ value, color, h = 8, bg = ink.line }) => (
  <div style={{ height: h, borderRadius: h, background: bg, overflow: "hidden" }}>
    <div style={{ width: `${value}%`, height: "100%", borderRadius: h, background: color }} />
  </div>
);

export const Overlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "rgba(15,23,42,0.45)", display: "grid", placeItems: "center" }}>{children}</AbsoluteFill>
);

export { Icon };
