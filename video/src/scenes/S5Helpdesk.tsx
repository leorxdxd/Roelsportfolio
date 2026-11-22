import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Avatar, Backdrop, Camera, Caption, Caret, Chip, Cursor, CursorKey, Icon, Sfx, Window } from "../components/ui";
import { c, shadow } from "../theme";
import { kf, pop, prog, typed } from "../lib";

// All names below are dummy data.
const OX = 80;
const OY = 112;
const SUBJECT = "Projector not working — Room 204";
const REQUESTER = "Juan Dela Cruz";

type Row = { id: number; subject: string; who: string; prio: "Low" | "Medium" | "High"; tech: string; status: "Open" | "In progress" | "Resolved" };
const rows: Row[] = [
  { id: 1041, subject: "Wi-Fi drops in the library", who: "Maria Santos", prio: "Medium", tech: "Mark", status: "Resolved" },
  { id: 1040, subject: "Printer offline — Registrar", who: "Pedro Reyes", prio: "Low", tech: "Ana", status: "In progress" },
  { id: 1039, subject: "Email password reset", who: "Ana Cruz", prio: "Low", tech: "Mark", status: "Resolved" },
  { id: 1038, subject: "Lab PC won't boot", who: "Jose Garcia", prio: "High", tech: "Ana", status: "Open" },
  { id: 1037, subject: "Install software — Lab 3", who: "Liza Mendoza", prio: "Medium", tech: "Mark", status: "Resolved" },
  { id: 1036, subject: "New account for faculty", who: "Carlo Ramos", prio: "Low", tech: "Ana", status: "Resolved" },
];

const COLS = [30, 150, 640, 900, 1060, 1250];
const TABLE_X = 290;
const ROW0_Y = 340;
const ROW_H = 64;

// key frames
const NEW_BTN = { x: OX + 1635, y: OY + 48 };
const MODAL = { x: 530, y: 190, w: 700 };
const HIGH = { x: OX + MODAL.x + 40 + 2 * 130 + 55, y: OY + MODAL.y + 329 };
const SUBMIT = { x: OX + MODAL.x + MODAL.w - 40 - 90, y: OY + MODAL.y + 405 };
const ROW_NEW_Y = OY + ROW0_Y + ROW_H / 2;
const ASSIGN = { x: OX + TABLE_X + COLS[4] + 40, y: ROW_NEW_Y };
const STATUS = { x: OX + TABLE_X + COLS[5] + 60, y: ROW_NEW_Y };

const keys: CursorKey[] = [
  { f: 0, x: 1250, y: 760 },
  { f: 16, ...NEW_BTN, click: true },
  { f: 40, x: 1100, y: 520 },
  { f: 58, ...HIGH, click: true },
  { f: 74, ...SUBMIT, click: true },
  { f: 96, x: ASSIGN.x - 60, y: ASSIGN.y + 90 },
  { f: 110, ...ASSIGN, click: true },
  { f: 124, x: ASSIGN.x + 20, y: ASSIGN.y + 55, click: true },
  { f: 146, ...STATUS, click: true },
  { f: 192, x: STATUS.x - 120, y: STATUS.y + 140 },
];

export const S5Helpdesk: React.FC = () => {
  const f = useCurrentFrame();
  const modalIn = pop(f, 18, 14, 200);
  const modalOut = prog(f, 78, 86);
  const showModal = f >= 18 && f < 86;
  const newRow = prog(f, 86, 98);
  const status: Row["status"] = f >= 148 ? "Resolved" : f >= 130 ? "In progress" : "Open";
  const assigned = f >= 126;
  const open = f >= 88 && f < 148 ? 13 : 12;
  const resolved = f >= 150 ? 29 : 28;

  return (
    <Backdrop>
      <Camera
        keys={[
          { f: 0, x: 960, y: 540, s: 1 },
          { f: 14, x: 1560, y: 220, s: 1.7 },
          { f: 24, x: 960, y: 520, s: 1.45 },
          { f: 76, x: 980, y: 560, s: 1.5 },
          { f: 90, x: 960, y: 540, s: 1 },
          { f: 106, x: 1240, y: 520, s: 1.55 },
          { f: 140, x: 1420, y: 530, s: 1.7 },
          { f: 160, x: 1380, y: 500, s: 1.5 },
          { f: 192, x: 960, y: 540, s: 0.96 },
        ]}
      >
        <Window x={80} y={60} w={1760} h={960} url="helpdesk.sampleschool.test">
          {/* sidebar */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 260, background: "#f8fafd", borderRight: `1px solid ${c.border}`, padding: "26px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 22, marginBottom: 30, paddingLeft: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: c.accent, display: "grid", placeItems: "center" }}>
                <Icon name="ticket" size={20} color="#fff" />
              </div>
              HelpDesk
            </div>
            {[
              ["home", "Dashboard"],
              ["ticket", "Tickets"],
              ["users", "Users"],
              ["chart", "Reports"],
              ["settings", "Settings"],
            ].map(([ic, label], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 600,
                  color: i === 0 ? c.accent : c.muted,
                  background: i === 0 ? c.accentSoft : "transparent",
                  marginBottom: 4,
                }}
              >
                <Icon name={ic} size={20} /> {label}
              </div>
            ))}
          </div>

          {/* header */}
          <div style={{ position: "absolute", left: TABLE_X, top: 24, right: 30, display: "flex", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.6 }}>Good morning, Admin</div>
              <div style={{ fontSize: 17, color: c.muted, marginTop: 4 }}>Sample School · IT Helpdesk</div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                height: 52,
                padding: "0 22px",
                borderRadius: 14,
                background: c.accent,
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transform: `scale(${f >= 14 && f < 20 ? 0.92 : 1})`,
                boxShadow: "0 10px 24px -8px rgba(37,99,235,0.7)",
              }}
            >
              <Icon name="plus" size={20} color="#fff" stroke={2.6} /> New ticket
            </div>
          </div>

          {/* KPIs */}
          {[
            { label: "Open tickets", value: open, tone: c.accent, icon: "ticket" },
            { label: "In progress", value: 5, tone: c.amber, icon: "settings" },
            { label: "Resolved today", value: resolved, tone: c.green, icon: "check" },
            { label: "Avg. response", value: "14m", tone: "#7c3aed", icon: "bell" },
          ].map((k, i) => {
            const bump = typeof k.value === "number" ? kf(f, [[i === 0 ? 88 : 150, 1], [i === 0 ? 92 : 154, 1.12], [i === 0 ? 100 : 162, 1]]) : 1;
            return (
              <div
                key={k.label}
                style={{
                  position: "absolute",
                  left: TABLE_X + i * 360,
                  top: 110,
                  width: 340,
                  height: 130,
                  borderRadius: 18,
                  border: `1px solid ${c.border}`,
                  background: "#fff",
                  padding: "20px 24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", color: c.muted, fontSize: 17, fontWeight: 600 }}>
                  {k.label}
                  <Icon name={k.icon} size={22} color={k.tone} />
                </div>
                <div style={{ fontSize: 46, fontWeight: 850, marginTop: 10, letterSpacing: -1, color: c.text, transform: `scale(${bump})`, transformOrigin: "left center" }}>
                  {k.value}
                </div>
              </div>
            );
          })}

          {/* table */}
          <div style={{ position: "absolute", left: TABLE_X, top: 266, width: 1440, bottom: 24, borderRadius: 18, border: `1px solid ${c.border}`, background: "#fff", overflow: "hidden" }}>
            <div style={{ position: "relative", height: 58, borderBottom: `1px solid ${c.border}`, background: "#f8fafd", fontSize: 15, fontWeight: 700, color: c.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>
              {["ID", "Subject", "Requester", "Priority", "Assignee", "Status"].map((h, i) => (
                <span key={h} style={{ position: "absolute", left: COLS[i], top: 19 }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
          {/* new row */}
          {f >= 86 && (
            <TableRow
              y={ROW0_Y}
              row={{ id: 1042, subject: SUBJECT, who: REQUESTER, prio: "High", tech: assigned ? "Mark" : "", status }}
              style={{ opacity: newRow, background: interpolate(f, [86, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) > 0 ? `rgba(37,99,235,${0.08 * (1 - prog(f, 100, 150))})` : undefined }}
              assignPop={pop(f, 126)}
              statusPop={pop(f, status === "Resolved" ? 148 : 130)}
              highlight
            />
          )}
          {rows.map((r, i) => (
            <TableRow key={r.id} y={ROW0_Y + (i + newRow) * ROW_H} row={r} />
          ))}

          {/* assign dropdown */}
          {f >= 112 && f < 128 && (
            <div
              style={{
                position: "absolute",
                left: TABLE_X + COLS[4] - 10,
                top: ROW0_Y + ROW_H - 6,
                width: 220,
                borderRadius: 14,
                background: "#fff",
                boxShadow: shadow,
                border: `1px solid ${c.border}`,
                padding: 8,
                transform: `scale(${pop(f, 112, 14, 240)})`,
                transformOrigin: "top left",
                zIndex: 20,
              }}
            >
              {["Mark (IT)", "Ana (IT)", "Unassigned"].map((t, i) => (
                <div key={t} style={{ padding: "10px 12px", borderRadius: 10, fontSize: 17, fontWeight: 600, background: i === 0 && f >= 118 ? c.accentSoft : "transparent", color: i === 0 && f >= 118 ? c.accent : c.text }}>
                  {t}
                </div>
              ))}
            </div>
          )}

          {/* modal */}
          {showModal && (
            <div style={{ position: "absolute", inset: 0, background: `rgba(15,23,42,${0.35 * Math.min(prog(f, 18, 24), 1 - modalOut)})`, zIndex: 30 }}>
              <div
                style={{
                  position: "absolute",
                  left: MODAL.x,
                  top: MODAL.y,
                  width: MODAL.w,
                  borderRadius: 22,
                  background: "#fff",
                  boxShadow: shadow,
                  padding: "30px 40px",
                  transform: `scale(${modalIn * (1 - modalOut * 0.1)}) translateY(${modalOut * 40}px)`,
                  opacity: 1 - modalOut,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800 }}>New ticket</div>
                <Field label="Subject" top={20}>
                  {typed(f, 22, 70, SUBJECT)}
                  {f >= 22 && f < 40 && <Caret />}
                </Field>
                <Field label="Requester" top={16}>
                  {typed(f, 38, 60, REQUESTER)}
                </Field>
                <div style={{ fontSize: 15, fontWeight: 700, color: c.muted, marginTop: 18 }}>Priority</div>
                <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                  {(["Low", "Medium", "High"] as const).map((p) => {
                    const on = p === "High" ? f >= 58 : p === "Medium" && f < 58;
                    return (
                      <div
                        key={p}
                        style={{
                          width: 110,
                          height: 46,
                          borderRadius: 12,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                          fontSize: 17,
                          border: `2px solid ${on ? (p === "High" ? c.red : c.accent) : c.border}`,
                          background: on ? (p === "High" ? c.redSoft : c.accentSoft) : "#fff",
                          color: on ? (p === "High" ? c.red : c.accent) : c.muted,
                          transform: `scale(${p === "High" ? kf(f, [[56, 1], [59, 0.92], [64, 1.06], [68, 1]]) : 1})`,
                        }}
                      >
                        {p}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28 }}>
                  <div style={{ height: 50, padding: "0 22px", borderRadius: 12, display: "grid", placeItems: "center", fontWeight: 700, color: c.muted, fontSize: 17 }}>Cancel</div>
                  <div
                    style={{
                      height: 50,
                      width: 180,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 750,
                      fontSize: 17,
                      background: c.accent,
                      color: "#fff",
                      transform: `scale(${f >= 72 && f < 78 ? 0.92 : 1})`,
                    }}
                  >
                    Create ticket
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* toast */}
          {f >= 80 && f < 140 && (
            <div
              style={{
                position: "absolute",
                right: 30,
                bottom: 40,
                padding: "16px 22px",
                borderRadius: 16,
                background: c.text,
                color: "#fff",
                fontSize: 18,
                fontWeight: 650,
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: shadow,
                transform: `translateY(${(1 - pop(f, 80)) * 120 + prog(f, 132, 140) * 120}px)`,
                zIndex: 40,
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.green, display: "grid", placeItems: "center" }}>
                <Icon name="check" size={16} color="#fff" stroke={3} />
              </div>
              Ticket #1042 created · Requester notified
            </div>
          )}
        </Window>
        <Cursor keys={keys} />
      </Camera>
      <Sfx at={22} name="typing" volume={0.3} dur={26} />
      <Sfx at={80} name="pop" volume={0.45} />
      <Sfx at={148} name="pop" volume={0.55} />
      <Caption text="Systems that *actually* work." start={150} end={186} x={110} y={870} size={76} />
    </Backdrop>
  );
};

const Field: React.FC<{ label: string; top: number; children: React.ReactNode }> = ({ label, top, children }) => (
  <div style={{ marginTop: top }}>
    <div style={{ fontSize: 15, fontWeight: 700, color: c.muted }}>{label}</div>
    <div style={{ marginTop: 8, height: 54, borderRadius: 12, border: `2px solid ${c.border}`, display: "flex", alignItems: "center", padding: "0 18px", fontSize: 20 }}>{children}</div>
  </div>
);

const statusTone = { Open: "blue", "In progress": "amber", Resolved: "green" } as const;
const prioTone = { Low: "gray", Medium: "amber", High: "red" } as const;

const TableRow: React.FC<{ y: number; row: Row; style?: React.CSSProperties; assignPop?: number; statusPop?: number; highlight?: boolean }> = ({
  y,
  row,
  style,
  assignPop = 1,
  statusPop = 1,
  highlight,
}) => {
  if (y > 860) return null;
  return (
    <div style={{ position: "absolute", left: TABLE_X + 1, top: y, width: 1438, height: ROW_H, borderBottom: `1px solid ${c.border}`, fontSize: 18, ...style }}>
      {highlight && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: c.accent }} />}
      <span style={{ position: "absolute", left: COLS[0], top: 20, color: c.muted, fontWeight: 600 }}>#{row.id}</span>
      <span style={{ position: "absolute", left: COLS[1], top: 20, fontWeight: 650 }}>{row.subject}</span>
      <span style={{ position: "absolute", left: COLS[2], top: 13, display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={row.who} size={36} color={["#2563eb", "#7c3aed", "#0d9488", "#ea580c"][row.id % 4]} />
        {row.who}
      </span>
      <span style={{ position: "absolute", left: COLS[3], top: 16 }}>
        <Chip tone={prioTone[row.prio]}>{row.prio}</Chip>
      </span>
      <span style={{ position: "absolute", left: COLS[4], top: 14, display: "flex", alignItems: "center", gap: 8, transform: `scale(${assignPop})`, transformOrigin: "left center" }}>
        {row.tech ? (
          <>
            <Avatar name={row.tech} size={34} color="#334155" /> {row.tech}
          </>
        ) : (
          <span style={{ color: c.muted, border: `1.5px dashed ${c.border}`, borderRadius: 10, padding: "5px 12px", fontSize: 16 }}>+ Assign</span>
        )}
      </span>
      <span style={{ position: "absolute", left: COLS[5], top: 16, transform: `scale(${statusPop})`, transformOrigin: "left center" }}>
        <Chip tone={statusTone[row.status]}>
          {row.status === "Resolved" && <Icon name="check" size={14} stroke={3} />}
          {row.status}
        </Chip>
      </span>
    </div>
  );
};
