// Apartment Management System — sample data only (names, units and amounts are made up).
import React from "react";
import { AppShell, Avatar, Badge, Bar, BarChart, Brand, Btn, Card, Donut, Icon, IconTile, ink, Logo, peso, Row, Screen, Stat, TabRow, Table } from "./kit";
import { CodeEditor } from "./code";
import { SchemaDiagram, type TableDef } from "./schema";

export const ap: Brand = { name: "Apartments", color: "#0d9488", soft: "#e6f6f4", dark: "#0f766e", icon: "building" };

const nav = [
  { icon: "home", label: "Dashboard" },
  { icon: "building", label: "Units", badge: 24 },
  { icon: "users", label: "Tenants" },
  { icon: "file", label: "Leases" },
  { icon: "receipt", label: "Billing", badge: 7 },
  { icon: "card", label: "Payments" },
  { icon: "tool", label: "Maintenance", badge: 4 },
  { icon: "chart", label: "Reports", section: "Owner" },
  { icon: "settings", label: "Settings" },
];
const owner = { name: "Ana Garcia", role: "Property owner", color: "#0f766e" };

type Pay = "Paid" | "Unpaid" | "Partial" | "Overdue";
const pay = (s: Pay) => (
  <Badge tone={s === "Paid" ? "green" : s === "Unpaid" ? "amber" : s === "Partial" ? "blue" : "red"} dot>
    {s}
  </Badge>
);
const person = (name: string, sub?: string) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Avatar name={name} size={30} />
    <div style={{ lineHeight: 1.25, minWidth: 0 }}>
      <div style={{ fontWeight: 550 }}>{name}</div>
      {sub && <div style={{ fontSize: 12.5, color: ink.muted }}>{sub}</div>}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
export const ApDashboard: React.FC = () => (
  <AppShell
    brand={ap}
    nav={nav}
    active="Dashboard"
    user={owner}
    title="Dashboard"
    subtitle="Sample Residences · 24 units"
    actions={
      <>
        <Btn variant="outline" icon="calendar">December 2026</Btn>
        <Btn color={ap.color} icon="receipt">Generate bills</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      <Stat
        label="Occupied units"
        value={
          <>
            21<span style={{ fontSize: 22, color: ink.subtle }}> / 24</span>
          </>
        }
        delta="2 this month"
        icon="building"
        color={ap.color}
        soft={ap.soft}
      />
      <Stat label="Collected in December" value={peso(186400)} delta="6%" icon="card" color="#16a34a" soft="#dcfce7" />
      <Stat label="Unpaid bills" value={7} icon="receipt" color="#b45309" soft="#fef3c7" />
      <Stat label="Open maintenance" value={4} icon="tool" color="#7c3aed" soft="#ede9fe" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, marginTop: 20 }}>
      <Card title="Rent collected per month" action={<span style={{ fontSize: 13, color: ink.muted }}>₱ thousands · December so far</span>}>
        <BarChart w={830} h={250} values={[204, 209, 205, 216, 214, 186]} labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} color={ap.color} soft="#a7dcd5" highlight={5} unit="k" />
      </Card>
      <Card title="Occupancy" action={<span style={{ fontSize: 13, color: ink.muted }}>24 units</span>}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Donut
            size={150}
            thickness={22}
            segments={[
              { value: 21, color: ap.color },
              { value: 2, color: "#f59e0b" },
              { value: 1, color: "#8b5cf6" },
            ]}
          >
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>88%</div>
              <div style={{ fontSize: 12.5, color: ink.muted }}>occupied</div>
            </div>
          </Donut>
          <div style={{ display: "grid", gap: 12, flex: 1 }}>
            {[
              ["Occupied", 21, ap.color],
              ["Vacant", 2, "#f59e0b"],
              ["Maintenance", 1, "#8b5cf6"],
            ].map(([l, v, c]) => (
              <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: c as string }} />
                <span style={{ color: ink.body }}>{l}</span>
                <span style={{ marginLeft: "auto", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${ink.line}`, fontSize: 13.5, color: ink.muted, lineHeight: 1.7 }}>
          Vacant: <b style={{ color: ink.text }}>Unit 106, Unit 305</b>
          <br />
          Leases ending in 30 days: <b style={{ color: ink.text }}>3</b>
        </div>
      </Card>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, marginTop: 20 }}>
      <Card title="Due this week" action={<span style={{ fontSize: 14, fontWeight: 650, color: ap.dark }}>All bills</span>} pad={18}>
        <Table
          rowH={52}
          cols={[{ label: "Unit", w: 70 }, { label: "Tenant" }, { label: "Amount", w: 110, align: "right" }, { label: "Due", w: 80 }, { label: "Status", w: 110 }]}
          rows={[
            [<b>204</b>, person("Maria Santos"), <b>{peso(9350)}</b>, "Dec 5", pay("Unpaid")],
            [<b>101</b>, person("Juan Dela Cruz"), <b>{peso(8730)}</b>, "Dec 5", pay("Paid")],
            [<b>306</b>, person("Ben Aquino"), <b>{peso(10240)}</b>, "Dec 5", pay("Partial")],
            [<b>102</b>, person("Carmen Lim"), <b>{peso(8610)}</b>, "Nov 5", pay("Overdue")],
          ]}
        />
      </Card>
      <Card title="Maintenance requests" action={<span style={{ fontSize: 14, fontWeight: 650, color: ap.dark }}>View all</span>}>
        {(
          [
            ["droplet", "Leaking kitchen faucet", "Unit 204 · Maria Santos", "In progress", "amber"],
            ["thermometer", "Aircon not cooling", "Unit 302 · Elena Flores", "New", "gray"],
            ["key", "Replace door lock", "Unit 405 · Mark Villanueva", "Dec 3", "blue"],
            ["zap", "Hallway light is out", "3rd floor", "New", "gray"],
          ] as const
        ).map(([icon, t, s, b, tone], i) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: i ? `1px solid ${ink.line}` : "none" }}>
            <IconTile icon={icon} color={ap.dark} soft={ap.soft} size={36} />
            <div style={{ minWidth: 0, lineHeight: 1.3 }}>
              <div style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</div>
              <div style={{ fontSize: 12.5, color: ink.muted }}>{s}</div>
            </div>
            <Badge tone={tone} style={{ marginLeft: "auto" }}>
              {b}
            </Badge>
          </div>
        ))}
      </Card>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
type UnitStatus = "paid" | "unpaid" | "overdue" | "partial" | "vacant" | "maint";
const floors: [string, [string, string | null, number, UnitStatus][]][] = [
  ["4th floor", [["401", "Jose Mendoza", 9500, "paid"], ["402", "Liza Ramos", 9500, "paid"], ["403", "Ramon Cruz", 9500, "unpaid"], ["404", "Grace Tan", 9500, "paid"], ["405", "Mark Villanueva", 10500, "paid"], ["406", "Joy Navarro", 10500, "paid"]]],
  ["3rd floor", [["301", "Carlo Bautista", 8500, "paid"], ["302", "Elena Flores", 8500, "paid"], ["303", "Paolo Garcia", 8500, "overdue"], ["304", "Nina Castro", 8500, "paid"], ["305", null, 8500, "vacant"], ["306", "Ben Aquino", 9000, "partial"]]],
  ["2nd floor", [["201", "Rosa Mercado", 8000, "paid"], ["202", "Leo Santiago", 8000, "paid"], ["203", "Mia Domingo", 8000, "unpaid"], ["204", "Maria Santos", 8000, "unpaid"], ["205", "Pedro Reyes", 8000, "paid"], ["206", null, 8000, "maint"]]],
  ["1st floor", [["101", "Juan Dela Cruz", 7500, "paid"], ["102", "Carmen Lim", 7500, "overdue"], ["103", "Arnel Diaz", 7500, "paid"], ["104", "Faith Ocampo", 7500, "paid"], ["105", "Vic Herrera", 7500, "unpaid"], ["106", null, 7500, "vacant"]]],
];
const unitLook: Record<UnitStatus, { label: string; color: string; tone: "green" | "amber" | "red" | "blue" | "gray" | "violet" }> = {
  paid: { label: "Paid", color: "#16a34a", tone: "green" },
  unpaid: { label: "Unpaid", color: "#d97706", tone: "amber" },
  overdue: { label: "Overdue", color: "#dc2626", tone: "red" },
  partial: { label: "Partial", color: "#2563eb", tone: "blue" },
  vacant: { label: "Vacant", color: "#cbd5e1", tone: "gray" },
  maint: { label: "Repairs", color: "#8b5cf6", tone: "violet" },
};

const UnitTile: React.FC<{ no: string; tenant: string | null; rent: number; status: UnitStatus; selected?: boolean }> = ({ no, tenant, rent, status, selected }) => {
  const look = unitLook[status];
  const empty = status === "vacant" || status === "maint";
  return (
    <div
      style={{
        height: 120,
        borderRadius: 12,
        padding: "12px 14px 12px 16px",
        background: empty ? "#fafbfc" : "#fff",
        border: selected ? `2px solid ${ap.color}` : empty ? `1.5px dashed #cbd5e1` : `1px solid ${ink.border}`,
        boxShadow: selected ? `0 0 0 4px ${ap.color}22, 0 10px 24px -14px rgba(15,23,42,0.35)` : "0 1px 2px rgba(15,23,42,0.04)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!empty && <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: look.color }} />}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <b style={{ fontSize: 18, letterSpacing: -0.3 }}>{no}</b>
        <Badge tone={look.tone} style={{ marginLeft: "auto", fontSize: 11.5, padding: "2px 8px" }}>
          {look.label}
        </Badge>
      </div>
      <div style={{ fontSize: 13.5, color: empty ? ink.subtle : ink.body, marginTop: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {tenant ?? (status === "vacant" ? "Ready to rent" : "Under repair")}
      </div>
      <div style={{ marginTop: "auto", fontSize: 13, fontWeight: 650, color: ink.muted }}>{peso(rent)} / mo</div>
    </div>
  );
};

export const ApUnits: React.FC = () => (
  <AppShell
    brand={ap}
    nav={nav}
    active="Units"
    user={owner}
    title="Units"
    subtitle="Sample Residences · 4 floors · 24 units"
    actions={
      <>
        <Btn variant="outline" icon="filter">Filter</Btn>
        <Btn color={ap.color} icon="plus">Add unit</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 22, height: "100%" }}>
      <div>
        <TabRow tabs={[["All", 24], ["Occupied", 21], ["Vacant", 2], ["Repairs", 1], ["Unpaid", 7]]} active="All" color={ap.color} />
        {floors.map(([label, units]) => (
          <div key={label} style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, marginBottom: 10 }}>{label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
              {units.map(([no, t, r, s]) => (
                <UnitTile key={no} no={no} tenant={t} rent={r} status={s} selected={no === "204"} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card pad={22} style={{ alignSelf: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Unit 204</div>
          {pay("Unpaid")}
        </div>
        <div style={{ fontSize: 13.5, color: ink.muted, marginTop: 4 }}>2nd floor · 1 bedroom · 28 sqm</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, padding: 14, borderRadius: 12, background: ink.bg }}>
          <Avatar name="Maria Santos" size={42} />
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontWeight: 700 }}>Maria Santos</div>
            <div style={{ fontSize: 13, color: ink.muted }}>Tenant since January 2025</div>
          </div>
          <span style={{ marginLeft: "auto", color: ink.muted }}>
            <Icon name="message" size={18} />
          </span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Row label="Lease">Jan 1 – Dec 31, 2026</Row>
          <Row label="Monthly rent">{peso(8000)}</Row>
          <Row label="Deposit">{peso(16000)}</Row>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, margin: "18px 0 4px" }}>December bill</div>
        <Row label="Rent">{peso(8000)}</Row>
        <Row label="Water · 12 m³">{peso(420)}</Row>
        <Row label="Electricity · 131 kWh">{peso(930)}</Row>
        <Row label="Total due Dec 5" strong last>
          {peso(9350)}
        </Row>
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          <Btn color={ap.color} icon="card">Record payment</Btn>
          <Btn variant="outline" icon="send">Send reminder</Btn>
        </div>
      </Card>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const bills: [string, string, string, number, number, number, string, Pay][] = [
  ["B-2612-01", "101", "Juan Dela Cruz", 7500, 360, 870, "Dec 5", "Paid"],
  ["B-2611-02", "102", "Carmen Lim", 7500, 310, 800, "Nov 5", "Overdue"],
  ["B-2612-07", "201", "Rosa Mercado", 8000, 420, 1040, "Dec 5", "Paid"],
  ["B-2612-10", "204", "Maria Santos", 8000, 420, 930, "Dec 5", "Unpaid"],
  ["B-2612-11", "205", "Pedro Reyes", 8000, 380, 990, "Dec 5", "Paid"],
  ["B-2611-15", "303", "Paolo Garcia", 8500, 450, 1120, "Nov 5", "Overdue"],
  ["B-2612-18", "306", "Ben Aquino", 9000, 400, 840, "Dec 5", "Partial"],
  ["B-2612-19", "401", "Jose Mendoza", 9500, 460, 1210, "Dec 5", "Paid"],
  ["B-2612-21", "403", "Ramon Cruz", 9500, 390, 980, "Dec 5", "Unpaid"],
];

export const ApBilling: React.FC = () => (
  <AppShell
    brand={ap}
    nav={nav}
    active="Billing"
    user={owner}
    title="Billing"
    subtitle="December 2026 · 24 bills"
    actions={
      <>
        <Btn variant="outline" icon="download">Export</Btn>
        <Btn color={ap.color} icon="receipt">Generate bills</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {(
        [
          ["Billed", peso(224650), "24 bills · rent, water and electricity", 100, ap.color],
          ["Collected", peso(186400), "17 bills paid in full", 83, "#16a34a"],
          ["Outstanding", peso(38250), "7 bills · 2 overdue", 17, "#d97706"],
        ] as const
      ).map(([label, value, sub, pct, color]) => (
        <Card key={label} pad={20}>
          <div style={{ fontSize: 14, color: ink.muted, fontWeight: 550 }}>{label}</div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, margin: "6px 0 10px" }}>{value}</div>
          <Bar value={pct} color={color} />
          <div style={{ fontSize: 13, color: ink.muted, marginTop: 9 }}>{sub}</div>
        </Card>
      ))}
    </div>

    <Card pad={18} style={{ marginTop: 20 }}>
      <TabRow tabs={[["All", 24], ["Unpaid", 4], ["Partial", 1], ["Overdue", 2], ["Paid", 17]]} active="All" color={ap.color} style={{ marginBottom: 14 }} />
      <Table
        rowH={52}
        highlight={3}
        cols={[
          { label: "Bill", w: 104 },
          { label: "Unit", w: 56 },
          { label: "Tenant" },
          { label: "Rent", w: 84, align: "right" },
          { label: "Water", w: 70, align: "right" },
          { label: "Electricity", w: 96, align: "right" },
          { label: "Total", w: 96, align: "right" },
          { label: "Due", w: 64 },
          { label: "Status", w: 104 },
        ]}
        rows={bills.map(([no, unit, tenant, rent, water, power, due, s]) => [
          <span style={{ color: ink.muted, fontWeight: 600 }}>{no}</span>,
          <b>{unit}</b>,
          person(tenant),
          peso(rent),
          peso(water),
          peso(power),
          <b>{peso(rent + water + power)}</b>,
          due,
          pay(s),
        ])}
      />
    </Card>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const portalBrand: Brand = { ...ap, name: "Sample Residences" };

export const ApTenant: React.FC = () => (
  <Screen bg="#f4f7f6">
    <header style={{ height: 74, flex: "none", display: "flex", alignItems: "center", gap: 34, padding: "0 48px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
      <Logo brand={portalBrand} />
      <nav style={{ display: "flex", gap: 6, marginLeft: 24, fontSize: 15, fontWeight: 600 }}>
        {["Home", "Bills", "Payments", "Requests", "Announcements"].map((n) => (
          <span key={n} style={{ padding: "8px 14px", borderRadius: 9, color: n === "Home" ? ap.dark : ink.muted, background: n === "Home" ? ap.soft : "transparent" }}>
            {n}
          </span>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ color: ink.muted }}>
          <Icon name="bell" size={20} />
        </span>
        <Avatar name="Maria Santos" size={36} />
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontWeight: 650, fontSize: 14.5 }}>Maria Santos</div>
          <div style={{ fontSize: 12.5, color: ink.muted }}>Unit 204</div>
        </div>
      </div>
    </header>

    <div style={{ padding: "30px 48px", flex: 1 }}>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.8 }}>Good morning, Maria</div>
      <div style={{ fontSize: 15, color: ink.muted, marginTop: 4 }}>Unit 204 · Your lease runs until December 31, 2026</div>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 24, marginTop: 24 }}>
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <div style={{ borderRadius: 18, padding: 28, color: "#fff", background: "linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #14b8a6 100%)", boxShadow: "0 24px 50px -28px #0f766e" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 15, opacity: 0.85, fontWeight: 600 }}>Amount due · December</span>
              <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.18)" }}>Due Friday, Dec 5</span>
            </div>
            <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: -2, margin: "6px 0 14px" }}>{peso(9350)}</div>
            {[
              ["Rent", 8000],
              ["Water · 12 m³", 420],
              ["Electricity · 131 kWh", 930],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.18)", fontSize: 15 }}>
                <span style={{ opacity: 0.85 }}>{l}</span>
                <b style={{ marginLeft: "auto" }}>{peso(v as number)}</b>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 18px", borderRadius: 11, background: "#fff", color: ap.dark, fontWeight: 700, fontSize: 15 }}>
                <Icon name="upload" size={17} color={ap.dark} /> Upload proof of payment
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 18px", borderRadius: 11, border: "1.5px solid rgba(255,255,255,0.55)", fontWeight: 650, fontSize: 15 }}>
                <Icon name="download" size={17} color="#fff" /> Bill (PDF)
              </span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 14 }}>Pay by bank transfer, e-wallet or cash at the office.</div>
          </div>

          <Card title="Payment history" action={<span style={{ fontSize: 14, fontWeight: 650, color: ap.dark }}>All payments</span>} pad={20}>
            {[
              ["November 2026", 9120, "Paid Nov 4"],
              ["October 2026", 8980, "Paid Oct 3"],
              ["September 2026", 9040, "Paid Sep 5"],
            ].map(([m, v, d], i) => (
              <div key={m as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i ? `1px solid ${ink.line}` : "none", fontSize: 14.5 }}>
                <IconTile icon="checkCircle" color="#15803d" soft="#dcfce7" size={34} />
                <b>{m}</b>
                <span style={{ color: ink.muted, marginLeft: 8 }}>{d}</span>
                <b style={{ marginLeft: "auto" }}>{peso(v as number)}</b>
                <span style={{ color: ap.dark, fontWeight: 650, fontSize: 13.5, marginLeft: 10 }}>Receipt</span>
              </div>
            ))}
          </Card>
        </div>

        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <Card title="Maintenance requests" action={<Btn size="sm" color={ap.color} icon="plus">New request</Btn>} pad={20}>
            <div style={{ padding: 16, borderRadius: 12, border: `1px solid ${ink.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconTile icon="droplet" color={ap.dark} soft={ap.soft} size={36} />
                <div style={{ lineHeight: 1.3 }}>
                  <div style={{ fontWeight: 650 }}>Leaking kitchen faucet</div>
                  <div style={{ fontSize: 13, color: ink.muted }}>Technician visit: Dec 2, 10:00 AM</div>
                </div>
                <Badge tone="amber" style={{ marginLeft: "auto" }}>
                  In progress
                </Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
                {["Submitted", "Assigned", "In progress", "Done"].map((s, i) => (
                  <React.Fragment key={s}>
                    {i > 0 && <span style={{ flex: 1, height: 2, background: i < 3 ? ap.color : ink.border, margin: "0 6px" }} />}
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: i < 3 ? ink.text : ink.subtle }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: i < 2 ? ap.color : "#fff", border: `2.5px solid ${i < 3 ? ap.color : ink.border}` }} />
                      {s}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 4px 2px" }}>
              <IconTile icon="tool" color={ink.muted} soft={ink.graySoft} size={36} />
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 650 }}>Bathroom exhaust fan</div>
                <div style={{ fontSize: 13, color: ink.muted }}>Fixed on Nov 12</div>
              </div>
              <Badge tone="green" style={{ marginLeft: "auto" }}>
                Done
              </Badge>
            </div>
          </Card>

          <div style={{ display: "flex", gap: 14, padding: 20, borderRadius: 14, background: "#fffbeb", border: "1px solid #fde68a" }}>
            <IconTile icon="droplet" color="#b45309" soft="#fef3c7" size={40} />
            <div style={{ lineHeight: 1.45 }}>
              <div style={{ fontWeight: 700 }}>Water interruption on December 10</div>
              <div style={{ fontSize: 14, color: ink.body, marginTop: 2 }}>9:00 AM to 2:00 PM for tank cleaning. Please store water the night before.</div>
              <div style={{ fontSize: 12.5, color: ink.muted, marginTop: 6 }}>Posted by the building office · Dec 1</div>
            </div>
          </div>

          <Card pad={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <IconTile icon="file" color={ap.dark} soft={ap.soft} size={38} />
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 650 }}>Lease contract · 2026</div>
                <div style={{ fontSize: 13, color: ink.muted }}>Signed Dec 20, 2025 · PDF</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 13.5, fontWeight: 650, color: ap.dark }}>View</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const X = [60, 450, 840, 1230];
const tables: Record<string, TableDef> = {
  properties: { name: "properties", x: X[0], y: 96, color: "#0d9488", rls: true, cols: [["id", "uuid", "pk"], ["name", "text"], ["address", "text"], ["owner_id", "uuid", "fk"]] },
  units: { name: "units", x: X[0], y: 320, color: "#0891b2", rls: true, cols: [["id", "uuid", "pk"], ["property_id", "uuid", "fk"], ["unit_no", "text"], ["floor", "int2"], ["type", "text"], ["monthly_rent", "numeric"], ["status", "text"]] },
  readings: { name: "meter_readings", x: X[0], y: 646, color: "#64748b", rls: true, cols: [["id", "uuid", "pk"], ["unit_id", "uuid", "fk"], ["period", "date"], ["water_m3", "numeric"], ["power_kwh", "numeric"]] },
  profiles: { name: "profiles", x: X[1], y: 96, color: "#2563eb", rls: true, cols: [["id", "uuid", "pk"], ["full_name", "text"], ["role", "text"], ["phone", "text"], ["created_at", "timestamptz"]] },
  maintenance: { name: "maintenance_requests", x: X[1], y: 430, color: "#7c3aed", rls: true, cols: [["id", "uuid", "pk"], ["unit_id", "uuid", "fk"], ["tenant_id", "uuid", "fk"], ["title", "text"], ["status", "text"], ["created_at", "timestamptz"]] },
  leases: { name: "leases", x: X[2], y: 150, color: "#ea580c", rls: true, cols: [["id", "uuid", "pk"], ["unit_id", "uuid", "fk"], ["tenant_id", "uuid", "fk"], ["start_date", "date"], ["end_date", "date"], ["monthly_rent", "numeric"], ["deposit", "numeric"], ["status", "text"]] },
  bills: { name: "bills", x: X[3], y: 96, color: "#16a34a", rls: true, cols: [["id", "uuid", "pk"], ["lease_id", "uuid", "fk"], ["period", "date"], ["rent", "numeric"], ["water", "numeric"], ["electricity", "numeric"], ["total", "numeric"], ["due_date", "date"], ["status", "text"]] },
  payments: { name: "payments", x: X[3], y: 484, color: "#db2777", rls: true, cols: [["id", "uuid", "pk"], ["bill_id", "uuid", "fk"], ["amount", "numeric"], ["method", "text"], ["proof_url", "text"], ["paid_at", "timestamptz"], ["recorded_by", "uuid", "fk"]] },
};

export const ApSchema: React.FC = () => (
  <SchemaDiagram
    project="apartment-system"
    title="Database schema (Supabase · PostgreSQL)"
    color={ap.color}
    width={300}
    tables={tables}
    note="Row level security: tenants only see their own unit, bills and requests."
    rels={[
      ["properties", "owner_id", "profiles", "id"],
      ["units", "property_id", "properties", "id"],
      ["readings", "unit_id", "units", "id"],
      ["maintenance", "unit_id", "units", "id"],
      ["maintenance", "tenant_id", "profiles", "id"],
      ["leases", "unit_id", "units", "id"],
      ["leases", "tenant_id", "profiles", "id"],
      ["bills", "lease_id", "leases", "id"],
      ["payments", "bill_id", "bills", "id"],
    ]}
  />
);

/* ------------------------------------------------------------------ */
export const AP_CODE = `import { createClient } from "npm:@supabase/supabase-js@2";
import { addDays, monthStart, readingsFor } from "../_shared/billing.ts";

// Runs on the 1st of every month (pg_cron): one bill per active lease
Deno.serve(async () => {
  const db = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const period = monthStart(new Date());
  const { data: leases, error } = await db
    .from("leases")
    .select("id, unit_id, monthly_rent")
    .eq("status", "active");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const bills = [];
  for (const lease of leases) {
    const { water, power } = await readingsFor(db, lease.unit_id, period);
    bills.push({ lease_id: lease.id, period, rent: lease.monthly_rent,
      water, electricity: power, due_date: addDays(period, 4) });
  }

  // upsert: running it twice never creates duplicate bills
  await db.from("bills").upsert(bills, { onConflict: "lease_id,period" });
  return Response.json({ created: bills.length });
});`;

export const ApCode: React.FC = () => (
  <CodeEditor
    project="apartment-system"
    file="index.ts"
    path={["supabase", "functions", "generate-bills", "index.ts"]}
    lang="ts"
    code={AP_CODE}
    highlightLine={25}
    tabs={["index.ts", "billing.ts", "supabase.ts"]}
    tree={[
      { name: "apartment-system", depth: 0, folder: true, open: true },
      { name: "src", depth: 1, folder: true, open: true },
      { name: "pages", depth: 2, folder: true },
      { name: "lib", depth: 2, folder: true, open: true },
      { name: "supabase.ts", depth: 3 },
      { name: "supabase", depth: 1, folder: true, open: true },
      { name: "functions", depth: 2, folder: true, open: true },
      { name: "_shared", depth: 3, folder: true },
      { name: "generate-bills", depth: 3, folder: true, open: true },
      { name: "index.ts", depth: 4, active: true, modified: true },
      { name: "index.test.ts", depth: 4 },
      { name: "send-reminders", depth: 3, folder: true },
      { name: "migrations", depth: 2, folder: true },
      { name: "package.json", depth: 1 },
      { name: "vite.config.ts", depth: 1 },
      { name: "README.md", depth: 1 },
    ]}
    terminal={[
      { t: "$ deno test --allow-env supabase/functions/generate-bills", c: "#e2e8f0" },
      { t: "running 4 tests from ./supabase/functions/generate-bills/index.test.ts", c: "#c3cede" },
      { t: "creates one bill per active lease ... ok (21ms)", c: "#addb67" },
      { t: "adds water and electricity from the meter readings ... ok (9ms)", c: "#addb67" },
      { t: "skips vacant units ... ok (6ms)", c: "#addb67" },
      { t: "running twice creates no duplicate bills ... ok (14ms)", c: "#addb67" },
      { t: "ok | 4 passed | 0 failed (188ms)", c: "#addb67" },
    ]}
  />
);
