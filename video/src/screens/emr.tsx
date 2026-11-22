// EMR (Electronic Medical Records) for a small clinic — sample patients and data only.
import React from "react";
import { AppShell, Avatar, Badge, Brand, Btn, Card, Field, Icon, IconTile, ink, LineChart, Stat, TabRow, Toggle } from "./kit";
import { CodeEditor } from "./code";

export const emr: Brand = { name: "Clinic EMR", color: "#4f46e5", soft: "#eef0ff", dark: "#4338ca", icon: "activity" };

const nav = [
  { icon: "home", label: "Dashboard" },
  { icon: "users", label: "Patients" },
  { icon: "calendar", label: "Appointments", badge: 24 },
  { icon: "clipboard", label: "Consultations" },
  { icon: "pill", label: "Prescriptions" },
  { icon: "flask", label: "Lab results", badge: 3 },
  { icon: "receipt", label: "Billing" },
  { icon: "chart", label: "Reports", section: "Clinic" },
  { icon: "shield", label: "Audit log" },
  { icon: "settings", label: "Settings" },
];
const doctor = { name: "Dr. Ana Reyes", role: "Internal medicine", color: emr.dark };

/* ------------------------------------------------------------------ */
const Vital: React.FC<{ icon: string; label: string; value: string; unit: string; sub: string; good?: boolean }> = ({ icon, label, value, unit, sub, good }) => (
  <Card pad={16}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: ink.muted, fontWeight: 600 }}>
      <Icon name={icon} size={16} color={emr.color} /> {label}
    </div>
    <div style={{ marginTop: 8 }}>
      <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: -0.8 }}>{value}</span>
      <span style={{ fontSize: 13.5, color: ink.muted, marginLeft: 5 }}>{unit}</span>
    </div>
    <div style={{ fontSize: 12.5, marginTop: 2, color: good ? ink.green : ink.muted, fontWeight: good ? 650 : 500 }}>{sub}</div>
  </Card>
);

export const EmrChart: React.FC = () => (
  <AppShell
    brand={emr}
    nav={nav}
    active="Patients"
    user={doctor}
    title="Patient record"
    subtitle="Patients / Juan Dela Cruz"
    search="Search patients…"
    actions={<Btn variant="outline" icon="printer">Print summary</Btn>}
  >
    <Card pad={20}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Avatar name="Juan Dela Cruz" size={64} color={emr.color} />
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Juan Dela Cruz</div>
          <div style={{ fontSize: 14, color: ink.muted, marginTop: 2 }}>Male · 42 years · Blood type O+ · Patient no. P-00428</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Badge tone="red">
              <Icon name="alertTriangle" size={13} /> Allergy: Penicillin
            </Badge>
            <Badge tone="amber">Hypertension</Badge>
            <Badge tone="gray">Last visit Nov 18</Badge>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <Btn variant="outline" icon="calendar">Book follow-up</Btn>
          <Btn color={emr.color} icon="plus">New consultation</Btn>
        </div>
      </div>
    </Card>

    <TabRow tabs={["Overview", ["Visits", 12], "Vitals", "Prescriptions", ["Lab results", 3], "Files"]} active="Overview" color={emr.color} style={{ marginTop: 18 }} />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, marginTop: 18 }}>
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Vital icon="activity" label="Blood pressure" value="128/82" unit="mmHg" sub="▼ from 142/90 in June" good />
          <Vital icon="heart" label="Heart rate" value="76" unit="bpm" sub="Normal" />
          <Vital icon="thermometer" label="Temperature" value="36.7" unit="°C" sub="Normal" />
          <Vital icon="user" label="Weight" value="72" unit="kg" sub="BMI 24.1" />
        </div>
        <Card
          title="Blood pressure"
          action={
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: ink.muted }}>
              {[
                ["Systolic", emr.color],
                ["Diastolic", "#0ea5e9"],
                ["Target 130", "#94a3b8"],
              ].map(([l, c]) => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 12, height: 3, background: c, borderRadius: 2 }} /> {l}
                </span>
              ))}
            </div>
          }
        >
          <LineChart
            w={820}
            h={190}
            max={160}
            labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]}
            series={[
              { color: emr.color, values: [138, 141, 142, 137, 134, 131, 130, 128], fill: true },
              { color: "#0ea5e9", values: [88, 89, 90, 87, 85, 84, 83, 82] },
              { color: "#94a3b8", values: [130, 130, 130, 130, 130, 130, 130, 130], dashed: true },
            ]}
          />
        </Card>
        <Card title="Latest consultation" action={<span style={{ fontSize: 13.5, color: ink.muted }}>Nov 18 · Dr. Ana Reyes</span>}>
          {[
            ["S", "No headaches or dizziness. Takes amlodipine every morning."],
            ["O", "BP 128/82 mmHg, heart rate 76, no swelling of the legs."],
            ["A", "Essential hypertension (I10), controlled."],
            ["P", "Continue amlodipine 5 mg. Low-salt diet. Recheck in 6 weeks."],
          ].map(([k, t], i) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderTop: i ? `1px solid ${ink.line}` : "none", fontSize: 14.5, color: ink.body }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: emr.soft, color: emr.dark, fontWeight: 800, fontSize: 13, display: "grid", placeItems: "center", flex: "none" }}>{k}</span>
              {t}
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <Card title="Medicines & allergies">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon="pill" color={emr.dark} soft={emr.soft} size={38} />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 650 }}>Amlodipine 5 mg tablet</div>
              <div style={{ fontSize: 13, color: ink.muted }}>1 tablet every morning · since Jun 30</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${ink.line}` }}>
            <IconTile icon="alertTriangle" color="#b91c1c" soft={ink.redSoft} size={38} />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 650 }}>Penicillin</div>
              <div style={{ fontSize: 13, color: ink.muted }}>Allergy · skin rash</div>
            </div>
          </div>
        </Card>
        <Card title="Visit history" action={<span style={{ fontSize: 14, fontWeight: 650, color: emr.dark }}>All 12</span>}>
          {[
            ["Nov 18", "Follow-up", "Blood pressure controlled"],
            ["Oct 7", "Follow-up", "No change to medicine"],
            ["Aug 26", "Lab results", "CBC, lipid profile, creatinine"],
            ["Jun 30", "Consultation", "Started amlodipine 5 mg"],
            ["Apr 12", "First visit", "Annual physical exam"],
          ].map(([d, t, s], i, all) => (
            <div key={d} style={{ display: "flex", gap: 14, position: "relative", paddingBottom: i < all.length - 1 ? 16 : 0 }}>
              {i < all.length - 1 && <span style={{ position: "absolute", left: 6, top: 16, bottom: 0, width: 2, background: ink.line }} />}
              <span style={{ width: 14, height: 14, borderRadius: "50%", marginTop: 3, flex: "none", background: i === 0 ? emr.color : "#fff", border: `3px solid ${i === 0 ? emr.soft : ink.border}`, boxSizing: "content-box", position: "relative" }} />
              <div style={{ lineHeight: 1.35, flex: 1 }}>
                <div style={{ display: "flex" }}>
                  <b style={{ fontSize: 14.5 }}>{t}</b>
                  <span style={{ marginLeft: "auto", fontSize: 13, color: ink.muted }}>{d}, 2026</span>
                </div>
                <div style={{ fontSize: 13.5, color: ink.muted }}>{s}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
type Appt = [col: number, start: string, mins: number, name: string, reason: string, status: "Done" | "In consult" | "Checked in" | "Booked"];
const doctors = [
  { name: "Dr. Ana Reyes", spec: "Internal medicine", color: "#4f46e5", soft: "#eef0ff" },
  { name: "Dr. Jose Mendoza", spec: "Pediatrics", color: "#0d9488", soft: "#e6f6f4" },
  { name: "Dr. Liza Ramos", spec: "OB-GYN", color: "#db2777", soft: "#fdeef6" },
];
const appts: Appt[] = [
  [0, "8:00", 30, "Juan Dela Cruz", "Follow-up", "Done"],
  [0, "8:30", 30, "Maria Santos", "Check-up", "Done"],
  [0, "9:00", 30, "Grace Tan", "BP check", "Done"],
  [0, "9:30", 30, "Pedro Reyes", "Lab review", "In consult"],
  [0, "10:00", 30, "Carmen Lim", "Follow-up", "Checked in"],
  [0, "10:30", 60, "Ramon Cruz", "Annual physical exam", "Checked in"],
  [0, "11:30", 30, "Arnel Diaz", "Consultation", "Booked"],
  [1, "8:00", 30, "Liam Torres", "Vaccination", "Done"],
  [1, "8:30", 30, "Sofia Ramos", "Fever", "Done"],
  [1, "9:30", 30, "Noah Cruz", "Check-up", "In consult"],
  [1, "10:00", 30, "Ella Santos", "Cough and colds", "Checked in"],
  [1, "11:00", 30, "Miguel Flores", "Vaccination", "Booked"],
  [1, "12:00", 30, "Bea Lim", "Check-up", "Booked"],
  [2, "8:30", 60, "Joy Navarro", "Prenatal check-up", "Done"],
  [2, "9:30", 60, "Faith Ocampo", "Ultrasound", "In consult"],
  [2, "10:30", 30, "Nina Castro", "Consultation", "Checked in"],
  [2, "11:30", 60, "Rosa Mercado", "Prenatal check-up", "Booked"],
];
const SLOT = 52;
const GUT = 64;
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const EmrQueue: React.FC = () => {
  const colW = (1296 - 380 - 20 - GUT) / 3;
  const top = (t: string) => ((toMin(t) - 480) / 30) * SLOT;
  return (
    <AppShell
      brand={emr}
      nav={nav}
      active="Appointments"
      user={doctor}
      title="Appointments"
      subtitle="Today · Tuesday, December 1 · Sample Clinic"
      search="Search patients…"
      actions={
        <>
          <Btn variant="outline" icon="calendar">Today</Btn>
          <Btn color={emr.color} icon="plus">Book appointment</Btn>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <Stat label="Appointments today" value={24} icon="calendar" color={emr.color} soft={emr.soft} />
        <Stat label="Checked in" value={9} icon="checkCircle" color="#16a34a" soft="#dcfce7" />
        <Stat label="Waiting now" value={4} icon="users" color="#b45309" soft="#fef3c7" />
        <Stat label="Average wait" value="11 min" delta="3 min" up={false} icon="clock" color="#0891b2" soft="#cffafe" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginTop: 20 }}>
        <Card pad={0} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", height: 62, borderBottom: `1px solid ${ink.border}` }}>
            <div style={{ width: GUT, flex: "none" }} />
            {doctors.map((d) => (
              <div key={d.name} style={{ width: colW, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", borderLeft: `1px solid ${ink.line}` }}>
                <Avatar name={d.name} size={32} color={d.color} />
                <div style={{ lineHeight: 1.25 }}>
                  <div style={{ fontWeight: 650, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 12.5, color: ink.muted }}>{d.spec}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: SLOT * 10 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * SLOT, height: SLOT, borderTop: i ? `1px ${i % 2 ? "dashed" : "solid"} ${ink.line}` : "none" }}>
                {i % 2 === 0 && <span style={{ position: "absolute", left: 14, top: 6, fontSize: 12.5, color: ink.subtle, fontWeight: 600 }}>{8 + i / 2}:00</span>}
              </div>
            ))}
            {[0, 1, 2].map((c) => (
              <div key={c} style={{ position: "absolute", top: 0, bottom: 0, left: GUT + c * colW, width: 1, background: ink.line }} />
            ))}
            <div style={{ position: "absolute", left: GUT - 6, right: 0, top: top("9:40"), height: 2, background: "#ef4444" }}>
              <span style={{ position: "absolute", left: -2, top: -4, width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            </div>
            {appts.map(([col, start, mins, name, reason, status]) => {
              const d = doctors[col];
              const live = status === "In consult";
              return (
                <div
                  key={name}
                  style={{
                    position: "absolute",
                    left: GUT + col * colW + 6,
                    width: colW - 12,
                    top: top(start) + 3,
                    height: (mins / 30) * SLOT - 6,
                    borderRadius: 9,
                    padding: "6px 10px",
                    background: live ? d.color : d.soft,
                    color: live ? "#fff" : ink.text,
                    borderLeft: `3px solid ${d.color}`,
                    opacity: status === "Done" ? 0.55 : 1,
                    boxShadow: live ? `0 10px 20px -10px ${d.color}` : "none",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <b style={{ fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</b>
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", color: live ? "#fff" : status === "Checked in" ? "#b45309" : ink.muted }}>
                      {status === "Done" ? "✓ Done" : status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: live ? "rgba(255,255,255,0.85)" : ink.muted, whiteSpace: "nowrap" }}>
                    {start} · {reason}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Waiting room" action={<Badge tone="amber">4 waiting</Badge>}>
          <div style={{ borderRadius: 12, padding: 16, background: emr.color, color: "#fff" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, opacity: 0.8 }}>NOW SERVING</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
              <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>A-06</span>
              <span style={{ fontWeight: 650 }}>Pedro Reyes</span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Room 1 · Dr. Ana Reyes</div>
          </div>
          {(
            [
              ["A-07", "Carmen Lim", "Dr. Ana Reyes · waiting 14 min", true],
              ["B-04", "Ella Santos", "Dr. Jose Mendoza · waiting 9 min", true],
              ["C-03", "Nina Castro", "Dr. Liza Ramos · waiting 6 min", false],
              ["A-08", "Ramon Cruz", "Dr. Ana Reyes · arrived 9:38", false],
            ] as const
          ).map(([q, n, s, vitals]) => (
            <div key={q} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${ink.line}` }}>
              <span style={{ width: 48, fontWeight: 800, fontSize: 15, color: emr.dark }}>{q}</span>
              <div style={{ lineHeight: 1.3, minWidth: 0 }}>
                <div style={{ fontWeight: 650 }}>{n}</div>
                <div style={{ fontSize: 12.5, color: ink.muted }}>{s}</div>
              </div>
              <Badge tone={vitals ? "green" : "gray"} style={{ marginLeft: "auto" }}>
                {vitals ? "Vitals ✓" : "Vitals"}
              </Badge>
            </div>
          ))}
          <Btn color={emr.color} icon="bell" style={{ width: "100%", marginTop: 16 }}>
            Call next patient
          </Btn>
        </Card>
      </div>
    </AppShell>
  );
};

/* ------------------------------------------------------------------ */
export const EmrConsult: React.FC = () => (
  <AppShell
    brand={emr}
    nav={nav}
    active="Consultations"
    user={doctor}
    title="New consultation"
    subtitle="Juan Dela Cruz · Male, 42 · Follow-up · Today, 9:05 AM"
    search="Search patients…"
    actions={
      <>
        <Btn variant="outline">Save draft</Btn>
        <Btn color={emr.color} icon="check">Save &amp; sign</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: 20 }}>
      <Card title="Consultation notes" action={<Badge tone="violet">SOAP</Badge>} pad={24}>
        <div style={{ display: "grid", gap: 16 }}>
          <Field label="Chief complaint">Follow-up for high blood pressure</Field>
          <Field label="Subjective" h={84}>
            No headaches, chest pain or dizziness. Takes amlodipine every morning. Home readings are around 125–135 / 80–85.
          </Field>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 650, color: ink.body, marginBottom: 7 }}>Objective</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                ["Blood pressure", "128/82", "mmHg"],
                ["Heart rate", "76", "bpm"],
                ["Temperature", "36.7", "°C"],
                ["Weight", "72", "kg"],
              ].map(([l, v, u]) => (
                <div key={l} style={{ border: `1.5px solid ${ink.border}`, borderRadius: 10, padding: "8px 12px" }}>
                  <div style={{ fontSize: 12, color: ink.muted, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 17, fontWeight: 750 }}>
                    {v} <span style={{ fontSize: 12.5, color: ink.muted, fontWeight: 500 }}>{u}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Field label="Assessment">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: 8, background: emr.soft, color: emr.dark, fontWeight: 650, fontSize: 14 }}>
              <b style={{ fontFamily: "monospace" }}>I10</b> Essential (primary) hypertension
            </span>
            <Badge tone="green">Controlled</Badge>
            <span style={{ marginLeft: "auto", color: ink.subtle, fontSize: 14 }}>+ Add diagnosis</span>
          </Field>
          <Field label="Plan" h={84} focus={emr.color}>
            <span>
              Continue amlodipine 5 mg once a day. Low-salt diet and 30 minutes of walking daily. Recheck blood pressure in 6 weeks
              <span style={{ display: "inline-block", width: 2, height: 18, background: emr.color, marginLeft: 2, verticalAlign: -3 }} />
            </span>
          </Field>
        </div>
      </Card>

      <Card title="Prescription" action={<span style={{ fontFamily: "serif", fontSize: 22, fontWeight: 700, color: emr.dark }}>℞</span>} pad={24}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: ink.redSoft, color: "#b91c1c", fontWeight: 650, fontSize: 14 }}>
          <Icon name="alertTriangle" size={18} /> Allergic to penicillin
        </div>
        <div style={{ marginTop: 14, padding: 16, borderRadius: 12, border: `1px solid ${ink.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <IconTile icon="pill" color={emr.dark} soft={emr.soft} size={36} />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 700 }}>Amlodipine 5 mg tablet</div>
              <div style={{ fontSize: 13.5, color: ink.muted }}>1 tablet every morning</div>
            </div>
            <span style={{ marginLeft: "auto", color: ink.subtle }}>
              <Icon name="edit" size={17} />
            </span>
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 12, fontSize: 13.5, color: ink.body }}>
            <span>
              Quantity: <b>30</b>
            </span>
            <span>
              Refills: <b>1</b>
            </span>
            <span>
              Duration: <b>30 days</b>
            </span>
          </div>
        </div>
        <Field label="Add medicine" focus={emr.color} style={{ marginTop: 16 }}>
          <Icon name="search" size={17} color={ink.muted} /> losar
          <span style={{ display: "inline-block", width: 2, height: 18, background: emr.color, marginLeft: -8 }} />
        </Field>
        <div style={{ marginTop: 6, borderRadius: 10, border: `1px solid ${ink.border}`, boxShadow: "0 16px 30px -18px rgba(15,23,42,0.4)", overflow: "hidden" }}>
          {["Losartan 50 mg tablet", "Losartan 100 mg tablet", "Losartan + HCTZ 50/12.5 mg tablet"].map((m, i) => (
            <div key={m} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", fontSize: 14, background: i === 0 ? emr.soft : "#fff", borderTop: i ? `1px solid ${ink.line}` : "none" }}>
              <Icon name="pill" size={15} color={i === 0 ? emr.color : ink.subtle} />
              <span style={{ fontWeight: i === 0 ? 650 : 500 }}>{m}</span>
              {i === 0 && <span style={{ marginLeft: "auto", fontSize: 12, color: ink.muted }}>Enter ↵</span>}
            </div>
          ))}
        </div>
        <Field label="Follow-up" style={{ marginTop: 16 }}>
          <Icon name="calendar" size={17} color={ink.muted} /> Tuesday, Jan 12, 2027 · in 6 weeks
        </Field>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, fontSize: 14, color: ink.body }}>
          <Toggle on color={emr.color} /> Text the patient a reminder the day before
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Btn variant="outline" icon="printer">Print prescription</Btn>
          <Btn variant="outline" icon="download">PDF</Btn>
        </div>
      </Card>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
export const EMR_SQL = `-- Medical records are private: staff only see patients of their own clinic
alter table patients enable row level security;
alter table consultations enable row level security;

create policy "staff read own clinic patients"
  on patients for select to authenticated
  using (clinic_id = (select clinic_id from staff where user_id = auth.uid()));

create policy "doctors write consultations"
  on consultations for insert to authenticated
  with check (
    exists (
      select 1 from staff
      where staff.user_id = auth.uid()
        and staff.role = 'doctor'
        and staff.clinic_id = consultations.clinic_id
    )
  );

-- Every change to a consultation is kept in the audit log
create trigger audit_consultations
  after insert or update or delete on consultations
  for each row execute function audit.log_change();`;

export const EmrCode: React.FC = () => (
  <CodeEditor
    project="clinic-emr"
    file="20261103_rls_policies.sql"
    path={["supabase", "migrations", "20261103_rls_policies.sql"]}
    lang="sql"
    code={EMR_SQL}
    highlightLine={7}
    tabs={["20261103_rls_policies.sql", "rls_patients.test.sql", "consultations.ts"]}
    tree={[
      { name: "clinic-emr", depth: 0, folder: true, open: true },
      { name: "src", depth: 1, folder: true, open: true },
      { name: "components", depth: 2, folder: true },
      { name: "pages", depth: 2, folder: true },
      { name: "lib", depth: 2, folder: true },
      { name: "supabase", depth: 1, folder: true, open: true },
      { name: "migrations", depth: 2, folder: true, open: true },
      { name: "20261020_init.sql", depth: 3 },
      { name: "20261103_rls_policies.sql", depth: 3, active: true, modified: true },
      { name: "20261110_audit_log.sql", depth: 3 },
      { name: "tests", depth: 2, folder: true, open: true },
      { name: "rls_consultations.test.sql", depth: 3 },
      { name: "rls_patients.test.sql", depth: 3 },
      { name: "package.json", depth: 1 },
      { name: "vite.config.ts", depth: 1 },
    ]}
    terminal={[
      { t: "$ supabase test db", c: "#e2e8f0" },
      { t: "./supabase/tests/rls_consultations.test.sql .. ok", c: "#addb67" },
      { t: "./supabase/tests/rls_patients.test.sql ....... ok", c: "#addb67" },
      { t: "All tests successful.", c: "#addb67" },
      { t: "Files=2, Tests=9,  1 wallclock secs", c: "#c3cede" },
      { t: "Result: PASS", c: "#addb67" },
    ]}
  />
);
