// Business websites — three sample sites (made-up businesses) in desktop and mobile layouts.
import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadDmSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { Icon, mono, Screen } from "./kit";
import { fontFamily } from "../theme";

const { fontFamily: fraunces } = loadFraunces("normal", { weights: ["600", "700"], subsets: ["latin", "latin-ext"] });
const { fontFamily: jakarta } = loadJakarta("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin", "latin-ext"] });
const { fontFamily: dmSerif } = loadDmSerif("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });

type SiteProps = { narrow?: boolean };

const Pill: React.FC<{ bg: string; color: string; children: React.ReactNode; h?: number; border?: string; style?: React.CSSProperties }> = ({ bg, color, children, h = 50, border, style }) => (
  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: h, padding: `0 ${h * 0.46}px`, borderRadius: 999, background: bg, color, border, fontWeight: 650, fontSize: h * 0.32, whiteSpace: "nowrap", ...style }}>
    {children}
  </span>
);

const Burger: React.FC<{ color: string }> = ({ color }) => (
  <span style={{ marginLeft: "auto", width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", color }}>
    <Icon name="menu" size={24} />
  </span>
);

/* ---------------------------- Sample Café ---------------------------- */
const cafe = { bg: "#f6efe5", ink: "#2a1c13", muted: "#6f5a4b", accent: "#b5532a", card: "#fffaf3", line: "#e8dccb" };

const Bean: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <ellipse rx={17} ry={11.5} fill="#5a2e17" />
    <path d="M-13 0 C -4 -6, 4 6, 13 0" stroke="#8a4a26" strokeWidth={2.6} fill="none" strokeLinecap="round" />
  </g>
);

const CafeArt: React.FC<{ h: number; narrow?: boolean }> = ({ h, narrow }) => (
  <div style={{ position: "relative", height: h, borderRadius: narrow ? 22 : 30, overflow: "hidden", background: "radial-gradient(120% 90% at 30% 20%, #f0c79c 0%, #d58a52 45%, #a5512a 100%)" }}>
    <svg viewBox="0 0 400 360" style={{ position: "absolute", left: "50%", top: "52%", width: narrow ? "80%" : "74%", transform: "translate(-50%, -50%)" }}>
      <Bean x={52} y={62} r={-30} />
      <Bean x={350} y={90} r={25} />
      <Bean x={70} y={300} r={15} />
      <Bean x={340} y={300} r={-20} />
      <ellipse cx={200} cy={304} rx={165} ry={36} fill="rgba(60,25,10,0.25)" />
      <ellipse cx={200} cy={296} rx={160} ry={34} fill="#f3e6d6" />
      <ellipse cx={200} cy={289} rx={108} ry={19} fill="#e2cdb4" />
      <path d="M305 178 c48 0 54 74 -4 78" stroke="#fffaf3" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M95 152 h210 v34 c0 70 -45 110 -105 110 s-105 -40 -105 -110 z" fill="#fffaf3" />
      <ellipse cx={200} cy={152} rx={105} ry={22} fill="#fffaf3" />
      <ellipse cx={200} cy={154} rx={93} ry={16} fill="#6b3a22" />
      <path d="M200 168 c-10 -8 -26 -6 -24 3 c2 7 24 11 24 11 s22 -4 24 -11 c2 -9 -14 -11 -24 -3z" fill="#e8c7a0" />
      {[165, 200, 235].map((x) => (
        <path key={x} d={`M${x} 116 c-14 -18 14 -30 0 -52`} stroke="rgba(255,255,255,0.75)" strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
    </svg>
    <div style={{ position: "absolute", left: narrow ? 14 : 24, bottom: narrow ? 14 : 24, display: "flex", alignItems: "center", gap: 10, padding: narrow ? "8px 12px" : "12px 16px", borderRadius: 14, background: "rgba(255,250,243,0.95)", color: cafe.ink, fontSize: narrow ? 12.5 : 14.5 }}>
      <span style={{ width: 30, height: 30, borderRadius: "50%", background: cafe.accent, display: "grid", placeItems: "center" }}>
        <Icon name="coffee" size={16} color="#fff" />
      </span>
      <span style={{ lineHeight: 1.25 }}>
        <span style={{ color: cafe.muted, fontSize: "0.85em" }}>Today's roast</span>
        <br />
        <b>House blend · medium</b>
      </span>
    </div>
    {!narrow && (
      <div style={{ position: "absolute", right: 24, top: 24, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 12, background: "rgba(255,250,243,0.95)", color: cafe.ink, fontSize: 14, fontWeight: 650 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#3f8f4f", display: "grid", placeItems: "center" }}>
          <Icon name="check" size={13} color="#fff" stroke={3} />
        </span>
        Order #24 is ready
      </div>
    )}
  </div>
);

export const WsCafe: React.FC<SiteProps> = ({ narrow }) => {
  const pad = narrow ? 22 : 72;
  return (
    <Screen bg={cafe.bg} style={{ color: cafe.ink, fontFamily }}>
      <nav style={{ height: narrow ? 64 : 92, flex: "none", display: "flex", alignItems: "center", gap: 34, padding: `0 ${pad}px` }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: fraunces, fontWeight: 700, fontSize: narrow ? 22 : 27, letterSpacing: -0.5 }}>
          <span style={{ width: narrow ? 32 : 38, height: narrow ? 32 : 38, borderRadius: "50%", background: cafe.accent, display: "grid", placeItems: "center" }}>
            <Icon name="coffee" size={narrow ? 17 : 20} color="#fff" />
          </span>
          Sample Café
        </span>
        {narrow ? (
          <Burger color={cafe.ink} />
        ) : (
          <>
            <span style={{ display: "flex", gap: 34, marginLeft: 40, fontSize: 16, fontWeight: 550, color: cafe.muted }}>
              {["Menu", "Our story", "Visit us", "Catering"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
            <Pill bg={cafe.ink} color="#fff" h={48} style={{ marginLeft: "auto" }}>
              Order ahead
            </Pill>
          </>
        )}
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "1.05fr 0.95fr", gap: narrow ? 24 : 56, padding: `${narrow ? 14 : 30}px ${pad}px 0`, alignItems: "center" }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: `1px solid ${cafe.line}`, background: cafe.card, fontSize: narrow ? 12.5 : 14, fontWeight: 600, color: cafe.muted }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3f8f4f" }} /> Open daily · 7 AM – 9 PM
          </span>
          <h1 style={{ fontFamily: fraunces, fontWeight: 650, fontSize: narrow ? 42 : 82, lineHeight: 1.0, letterSpacing: narrow ? -1 : -2.5, margin: narrow ? "16px 0 14px" : "22px 0 22px" }}>
            Slow coffee and fresh bread, every morning.
          </h1>
          <p style={{ fontSize: narrow ? 16 : 20, lineHeight: 1.55, color: cafe.muted, margin: 0, maxWidth: 560 }}>
            Small-batch roasts, pandesal baked at 5 AM and a quiet corner to work in. Order ahead and skip the line.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: narrow ? 20 : 32, flexWrap: "wrap" }}>
            <Pill bg={cafe.accent} color="#fff" h={narrow ? 46 : 54}>
              See the menu
            </Pill>
            <Pill bg="transparent" color={cafe.ink} border={`1.5px solid ${cafe.ink}`} h={narrow ? 46 : 54}>
              Get directions
            </Pill>
          </div>
          {!narrow && (
            <div style={{ display: "flex", gap: 26, marginTop: 34, fontSize: 15, color: cafe.muted, fontWeight: 550 }}>
              {[
                ["wifi", "Free Wi-Fi"],
                ["sparkle", "Outdoor seats"],
                ["heart", "Pet friendly"],
              ].map(([i, l]) => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name={i} size={18} color={cafe.accent} /> {l}
                </span>
              ))}
            </div>
          )}
        </div>
        <CafeArt h={narrow ? 250 : 500} narrow={narrow} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3, 1fr)", gap: narrow ? 12 : 24, padding: `${narrow ? 22 : 40}px ${pad}px` }}>
        {[
          ["Spanish latte", "Espresso, milk and a little condensed milk", "₱150", "#c98b5b"],
          ["Ube cheese pandesal", "Baked fresh every morning at 5 AM", "₱65", "#8e5bb5"],
          ["Cold brew tonic", "18-hour cold brew with tonic and orange", "₱160", "#d9a441"],
        ].map(([n, d, p, c]) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 16, padding: narrow ? 14 : 18, borderRadius: 20, background: cafe.card, border: `1px solid ${cafe.line}` }}>
            <span style={{ width: narrow ? 52 : 64, height: narrow ? 52 : 64, borderRadius: "50%", flex: "none", background: `radial-gradient(circle at 35% 30%, #fff6 0, transparent 40%), ${c}` }} />
            <div style={{ lineHeight: 1.35, minWidth: 0 }}>
              <div style={{ fontFamily: fraunces, fontWeight: 650, fontSize: narrow ? 18 : 21 }}>{n}</div>
              <div style={{ fontSize: narrow ? 13 : 14.5, color: cafe.muted }}>{d}</div>
            </div>
            <b style={{ marginLeft: "auto", color: cafe.accent, fontSize: narrow ? 16 : 18 }}>{p}</b>
          </div>
        ))}
      </div>
      {!narrow && (
        <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, padding: `30px ${pad}px`, background: cafe.ink, color: "#f6efe5" }}>
          {[
            ["map", "Find us", "Ground floor, Sample Building"],
            ["clock", "Hours", "Monday to Sunday, 7 AM – 9 PM"],
            ["cart", "Order ahead", "Ready for pickup in 10 minutes"],
          ].map(([i, t, d]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(246,239,229,0.3)", display: "grid", placeItems: "center" }}>
                <Icon name={i} size={20} color="#f0c79c" />
              </span>
              <span style={{ lineHeight: 1.35 }}>
                <span style={{ fontFamily: fraunces, fontSize: 19, fontWeight: 650 }}>{t}</span>
                <br />
                <span style={{ fontSize: 14.5, opacity: 0.75 }}>{d}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
};

/* ------------------------- Sample Dental Clinic ------------------------- */
const dent = { navy: "#0b2545", accent: "#1b8bd6", dark: "#136aa6", mint: "#e9f5fc", muted: "#5b6b80", line: "#dde7f0" };

const BookingCard: React.FC<SiteProps> = ({ narrow }) => {
  const fs = narrow ? 14 : 15;
  const field = (label: string, value: React.ReactNode, icon?: string, placeholder?: boolean) => (
    <div>
      <div style={{ fontSize: narrow ? 12.5 : 13.5, fontWeight: 650, color: dent.navy, marginBottom: 6 }}>{label}</div>
      <div style={{ height: narrow ? 44 : 48, borderRadius: 12, border: `1.5px solid ${dent.line}`, display: "flex", alignItems: "center", gap: 10, padding: "0 14px", fontSize: fs, color: placeholder ? "#94a3b8" : dent.navy }}>
        {icon && <Icon name={icon} size={17} color={dent.muted} />}
        {value}
        {icon === "smile" && (
          <span style={{ marginLeft: "auto", color: dent.muted }}>
            <Icon name="chevronDown" size={17} />
          </span>
        )}
      </div>
    </div>
  );
  return (
    <div style={{ background: "#fff", borderRadius: 24, padding: narrow ? 20 : 30, boxShadow: "0 30px 70px -30px rgba(11,37,69,0.35), 0 0 0 1px rgba(11,37,69,0.06)", fontFamily: jakarta }}>
      <div style={{ fontSize: narrow ? 20 : 24, fontWeight: 800, color: dent.navy, letterSpacing: -0.5 }}>Book an appointment</div>
      <div style={{ fontSize: narrow ? 13 : 14.5, color: dent.muted, marginTop: 4 }}>We'll confirm by text within the hour.</div>
      <div style={{ display: "grid", gap: narrow ? 12 : 16, marginTop: narrow ? 16 : 22 }}>
        {field("Full name", "Juan Dela Cruz", "user")}
        {!narrow && field("Mobile number", "09XX XXX XXXX", "phone", true)}
        {field("Service", "Cleaning & check-up", "smile")}
        <div>
          <div style={{ fontSize: narrow ? 12.5 : 13.5, fontWeight: 650, color: dent.navy, marginBottom: 6 }}>Tuesday, Dec 8</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {["9:00", "10:30", "1:00", "3:30"].map((t) => (
              <span key={t} style={{ height: narrow ? 38 : 42, borderRadius: 10, display: "grid", placeItems: "center", fontSize: narrow ? 13 : 14.5, fontWeight: 700, background: t === "10:30" ? dent.accent : "#fff", color: t === "10:30" ? "#fff" : dent.navy, border: `1.5px solid ${t === "10:30" ? dent.accent : dent.line}` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: narrow ? 16 : 22, height: narrow ? 48 : 54, borderRadius: 14, background: dent.navy, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: narrow ? 15 : 16.5 }}>Request appointment</div>
    </div>
  );
};

export const WsClinic: React.FC<SiteProps> = ({ narrow }) => {
  const pad = narrow ? 22 : 72;
  return (
    <Screen bg="#fff" style={{ color: dent.navy, fontFamily: jakarta }}>
      {!narrow && (
        <div style={{ height: 38, flex: "none", display: "flex", alignItems: "center", gap: 28, padding: `0 ${pad}px`, background: dent.navy, color: "#cfe3f5", fontSize: 13.5, fontWeight: 500 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="clock" size={15} /> Mon–Sat · 9:00 AM – 6:00 PM
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="shield" size={15} /> HMO cards accepted
          </span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="map" size={15} /> Ground floor, Sample Building
          </span>
        </div>
      )}
      <nav style={{ height: narrow ? 64 : 84, flex: "none", display: "flex", alignItems: "center", gap: 36, padding: `0 ${pad}px`, borderBottom: `1px solid ${dent.line}` }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: narrow ? 18 : 21, letterSpacing: -0.4 }}>
          <span style={{ width: narrow ? 34 : 40, height: narrow ? 34 : 40, borderRadius: 12, background: dent.accent, display: "grid", placeItems: "center" }}>
            <Icon name="smile" size={narrow ? 19 : 22} color="#fff" />
          </span>
          Sample Dental Clinic
        </span>
        {narrow ? (
          <Burger color={dent.navy} />
        ) : (
          <>
            <span style={{ display: "flex", gap: 32, marginLeft: 28, fontSize: 15.5, fontWeight: 600, color: dent.muted }}>
              {["Services", "Our dentists", "Prices", "FAQ", "Contact"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
            <Pill bg={dent.accent} color="#fff" h={48} style={{ marginLeft: "auto" }}>
              Book a visit
            </Pill>
          </>
        )}
      </nav>

      <div style={{ background: `linear-gradient(180deg, ${dent.mint} 0%, #fff 100%)`, display: "grid", gridTemplateColumns: narrow ? "1fr" : "1.08fr 0.92fr", gap: narrow ? 22 : 64, padding: `${narrow ? 24 : 54}px ${pad}px ${narrow ? 24 : 40}px`, alignItems: "center" }}>
        <div>
          <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 999, background: "#fff", border: `1px solid ${dent.line}`, color: dent.dark, fontSize: narrow ? 12.5 : 14, fontWeight: 700 }}>Family & cosmetic dentistry</span>
          <h1 style={{ fontSize: narrow ? 36 : 66, fontWeight: 800, lineHeight: 1.04, letterSpacing: narrow ? -1.2 : -2.4, margin: narrow ? "14px 0 12px" : "20px 0 18px" }}>
            Gentle dental care for the whole family.
          </h1>
          <p style={{ fontSize: narrow ? 15 : 19, lineHeight: 1.6, color: dent.muted, margin: 0, maxWidth: 560 }}>
            Check-ups, cleaning, braces and whitening in one clinic, with clear prices before every treatment.
          </p>
          <div style={{ display: "grid", gap: narrow ? 8 : 12, marginTop: narrow ? 16 : 26 }}>
            {["Same-week appointments", "Prices explained before treatment", "Kid-friendly dentists"].map((t) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: narrow ? 14.5 : 16.5, fontWeight: 600 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: dent.accent, display: "grid", placeItems: "center" }}>
                  <Icon name="check" size={14} color="#fff" stroke={3} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>
        <BookingCard narrow={narrow} />
      </div>

      {!narrow && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, padding: `10px ${pad}px` }}>
          {[
            ["sparkle", "Cleaning", "Check-up and cleaning in one visit"],
            ["grid", "Braces", "Metal and clear braces, monthly plans"],
            ["star", "Whitening", "In-clinic whitening in about an hour"],
            ["tool", "Extraction", "Simple and wisdom tooth removal"],
          ].map(([i, t, d]) => (
            <div key={t} style={{ padding: 20, borderRadius: 18, border: `1px solid ${dent.line}`, background: "#fff" }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: dent.mint, display: "grid", placeItems: "center" }}>
                <Icon name={i} size={22} color={dent.accent} />
              </span>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 14 }}>{t}</div>
              <div style={{ fontSize: 14.5, color: dent.muted, marginTop: 4 }}>{d}</div>
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
};

/* -------------------------- Sample Residences -------------------------- */
const res = { dark: "#16352a", mid: "#24503d", gold: "#e3a92b", bg: "#f6f5f0", muted: "#5f6b66", line: "#e4e2d9" };

const Tower: React.FC = () => (
  <svg viewBox="0 0 320 380" style={{ width: "100%", height: "100%" }}>
    <rect x={40} y={150} width={100} height={230} fill="#1d4433" />
    <rect x={120} y={30} width={150} height={350} fill={res.mid} />
    <rect x={250} y={120} width={70} height={260} fill="#1d4433" />
    {Array.from({ length: 10 }, (_, r) =>
      Array.from({ length: 4 }, (_, c) => {
        const lit = (r * 7 + c * 3) % 5 === 0 || (r + c) % 6 === 1;
        return <rect key={`${r}-${c}`} x={136 + c * 33} y={50 + r * 32} width={20} height={20} rx={2} fill={lit ? res.gold : "#2f6650"} />;
      }),
    )}
    {Array.from({ length: 6 }, (_, r) =>
      [0, 1].map((c) => <rect key={`s${r}-${c}`} x={56 + c * 38} y={172 + r * 34} width={20} height={20} rx={2} fill={(r + c) % 3 === 0 ? res.gold : "#285a45"} />),
    )}
    <rect x={0} y={372} width={320} height={8} fill="#0f2a20" />
  </svg>
);

const Room: React.FC<{ wall: string; floor: string; accent: string }> = ({ wall, floor, accent }) => (
  <svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width={360} height={220} fill={wall} />
    <rect y={160} width={360} height={60} fill={floor} />
    <rect x={40} y={34} width={110} height={92} rx={4} fill="#fdfcf7" stroke="#ffffff" strokeWidth={6} />
    <rect x={92} y={34} width={6} height={92} fill="#ffffff" />
    <rect x={180} y={118} width={150} height={52} rx={8} fill="#fdfcf7" />
    <rect x={180} y={100} width={36} height={24} rx={6} fill={accent} />
    <rect x={176} y={150} width={158} height={26} rx={6} fill={accent} opacity={0.75} />
    <circle cx={300} cy={84} r={18} fill="#6d9a62" />
    <rect x={292} y={98} width={16} height={22} rx={3} fill="#b87a4b" />
  </svg>
);

export const WsRealty: React.FC<SiteProps> = ({ narrow }) => {
  const pad = narrow ? 12 : 40;
  return (
    <Screen bg={res.bg} style={{ color: res.dark, fontFamily }}>
      <nav style={{ height: narrow ? 64 : 86, flex: "none", display: "flex", alignItems: "center", gap: 36, padding: `0 ${narrow ? 22 : 56}px` }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: dmSerif, fontSize: narrow ? 22 : 27 }}>
          <span style={{ width: narrow ? 34 : 40, height: narrow ? 34 : 40, borderRadius: 10, background: res.dark, display: "grid", placeItems: "center" }}>
            <Icon name="building" size={narrow ? 18 : 21} color={res.gold} />
          </span>
          Sample Residences
        </span>
        {narrow ? (
          <Burger color={res.dark} />
        ) : (
          <>
            <span style={{ display: "flex", gap: 32, marginLeft: 28, fontSize: 15.5, fontWeight: 550, color: res.muted }}>
              {["Units", "Amenities", "Location", "FAQ"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
            <Pill bg={res.dark} color="#fff" h={48} style={{ marginLeft: "auto" }}>
              Schedule a viewing
            </Pill>
          </>
        )}
      </nav>

      <div style={{ flex: "none", margin: `0 ${pad}px`, borderRadius: narrow ? 22 : 30, background: res.dark, color: "#fff", position: "relative", overflow: "hidden", padding: narrow ? "26px 20px" : "54px 56px 50px" }}>
        {!narrow && (
          <div style={{ position: "absolute", right: 30, bottom: 0, width: 360, height: 420 }}>
            <Tower />
          </div>
        )}
        <div style={{ position: "relative", maxWidth: narrow ? undefined : 820 }}>
          <div style={{ fontFamily: mono, fontSize: narrow ? 11.5 : 13.5, letterSpacing: 1.5, color: res.gold, fontWeight: 700 }}>24 UNITS · 4 FLOORS · NEAR THE BUSINESS DISTRICT</div>
          <h1 style={{ fontFamily: dmSerif, fontWeight: 400, fontSize: narrow ? 38 : 70, lineHeight: 1.02, letterSpacing: narrow ? -0.5 : -1.5, margin: narrow ? "12px 0 10px" : "16px 0 14px" }}>Find a home near your work.</h1>
          <p style={{ fontSize: narrow ? 15 : 19, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", margin: 0, maxWidth: 600 }}>
            Studios and 1-bedroom units with Wi-Fi, 24/7 security and monthly bills you can pay online.
          </p>
          <div
            style={{
              marginTop: narrow ? 18 : 30,
              background: "#fff",
              color: res.dark,
              borderRadius: 16,
              padding: narrow ? 12 : 10,
              display: "grid",
              gridTemplateColumns: narrow ? "1fr" : "1fr 1fr 1fr auto",
              gap: narrow ? 8 : 0,
              alignItems: "center",
            }}
          >
            {[
              ["Unit type", "Studio"],
              ["Budget", "₱8,000 – ₱12,000"],
              ["Move-in", "December"],
            ].map(([l, v], i) => (
              <div key={l} style={{ padding: narrow ? "4px 6px" : "6px 18px", borderLeft: !narrow && i ? `1px solid ${res.line}` : "none" }}>
                <div style={{ fontSize: 12, color: res.muted, fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: narrow ? 15 : 16.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  {v}
                  <span style={{ marginLeft: "auto", color: res.muted }}>
                    <Icon name="chevronDown" size={16} />
                  </span>
                </div>
              </div>
            ))}
            <span style={{ height: narrow ? 46 : 56, padding: "0 26px", borderRadius: 12, background: res.gold, color: res.dark, fontWeight: 800, fontSize: narrow ? 15 : 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="search" size={18} /> Search units
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: `${narrow ? 22 : 34}px ${narrow ? 12 : 56}px 0` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: narrow ? 14 : 20 }}>
          <div style={{ fontFamily: dmSerif, fontSize: narrow ? 26 : 36 }}>Available units</div>
          {!narrow && <span style={{ color: res.muted, fontSize: 15.5 }}>6 units open in December</span>}
          {!narrow && <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 15.5 }}>View all units →</span>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
          {[
            ["Unit 305 · 3rd floor", "Studio · 24 sqm", "₱8,500", "#efe4d3", "#d9c3a5", "#c98b5b"],
            ["Unit 106 · 1st floor", "Studio · 22 sqm", "₱7,500", "#dfe8dc", "#c2cdb9", "#5f8f6a"],
            ["Unit 407 · 4th floor", "1 bedroom · 32 sqm", "₱11,500", "#dde6ef", "#bfcad6", "#4f7fae"],
          ].map(([t, s, p, wall, floor, accent]) => (
            <div key={t} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: `1px solid ${res.line}` }}>
              <div style={{ height: narrow ? 170 : 200, position: "relative" }}>
                <Room wall={wall} floor={floor} accent={accent} />
                <span style={{ position: "absolute", left: 14, top: 14, padding: "5px 11px", borderRadius: 999, background: "#fff", fontSize: 12.5, fontWeight: 700 }}>Available Dec 1</span>
              </div>
              <div style={{ padding: narrow ? 16 : 20 }}>
                <div style={{ fontSize: 13.5, color: res.muted, fontWeight: 600 }}>{s}</div>
                <div style={{ fontSize: narrow ? 18 : 20, fontWeight: 800, marginTop: 2 }}>{t}</div>
                <div style={{ fontSize: 16, marginTop: 6 }}>
                  <b>{p}</b> <span style={{ color: res.muted }}>/ month</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
};

/* ------------------------------ Mobile views ------------------------------ */
const PW = 390;
const PH = 844;
const Phone: React.FC<{ x: number; y: number; bar: string; dark?: boolean; label: string; children: React.ReactNode }> = ({ x, y, bar, dark, label, children }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ width: (PW + 24) * 0.88, height: (PH + 24) * 0.88 }}>
    <div style={{ width: PW + 24, height: PH + 24, padding: 12, borderRadius: 62, background: "#111", boxShadow: "0 50px 90px -40px rgba(17,17,17,0.55), 0 0 0 1px rgba(17,17,17,0.2)", transform: "scale(0.88)", transformOrigin: "0 0" }}>
      <div style={{ position: "relative", width: PW, height: PH, borderRadius: 50, overflow: "hidden", background: bar }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46, display: "flex", alignItems: "center", padding: "0 30px", fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#111", fontFamily }}>
          9:41
          <span style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            <Icon name="wifi" size={16} />
            <span style={{ width: 24, height: 12, borderRadius: 4, border: `1.5px solid ${dark ? "#fff" : "#111"}`, padding: 1.5 }}>
              <span style={{ display: "block", width: "75%", height: "100%", borderRadius: 2, background: dark ? "#fff" : "#111" }} />
            </span>
          </span>
        </div>
        <div style={{ position: "absolute", top: 11, left: "50%", width: 118, height: 32, marginLeft: -59, borderRadius: 20, background: "#111", zIndex: 5 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 46, bottom: 0 }}>{children}</div>
      </div>
    </div>
    </div>
    <div style={{ width: (PW + 24) * 0.88, textAlign: "center", marginTop: 18, fontFamily: mono, fontSize: 15, color: "#55554f" }}>{label}</div>
  </div>
);

export const WsMobile: React.FC = () => (
  <AbsoluteFill style={{ background: "#e9e9e3" }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
    <Phone x={150} y={100} bar={cafe.bg} label="samplecafe.test">
      <WsCafe narrow />
    </Phone>
    <Phone x={618} y={70} bar="#fff" label="sampledental.test">
      <WsClinic narrow />
    </Phone>
    <Phone x={1086} y={100} bar={res.bg} label="sampleresidences.test">
      <WsRealty narrow />
    </Phone>
  </AbsoluteFill>
);

// Desktop versions as plain components (for the image list)
export const WsCafeDesktop: React.FC = () => <WsCafe />;
export const WsClinicDesktop: React.FC = () => <WsClinic />;
export const WsRealtyDesktop: React.FC = () => <WsRealty />;
