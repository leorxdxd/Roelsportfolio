import { useEffect, useRef, useState } from "react";
import { useInView, usePageVisible, usePrefersReducedMotion } from "../lib/hooks";
import Icon from "./Icon";
import TiltCard from "./TiltCard";

/* Sample data only (no real people or organizations). */
const POOL = [
  { title: "Printer offline", who: "Juan Dela Cruz", dept: "Registrar", priority: "High", cat: "Printer" },
  { title: "Can't connect to Wi-Fi", who: "Maria Santos", dept: "Library", priority: "Medium", cat: "Network" },
  { title: "Password reset request", who: "Pedro Reyes", dept: "Accounting", priority: "Low", cat: "Account" },
  { title: "PC won't boot", who: "Ana Garcia", dept: "Faculty Room", priority: "High", cat: "Computer" },
  { title: "Projector shows no signal", who: "Jose Ramos", dept: "Room 204", priority: "Medium", cat: "Hardware" },
  { title: "Email not syncing", who: "Liza Cruz", dept: "HR Office", priority: "Low", cat: "Email" },
];

interface Ticket {
  id: number;
  title: string;
  who: string;
  dept: string;
  priority: string;
  cat: string;
}

const SEED = [0.32, 0.45, 0.38, 0.52, 0.48, 0.61, 0.55, 0.66, 0.6, 0.72, 0.64, 0.78];

function chartPaths(values: number[], w = 300, h = 90) {
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - 6 - v * (h - 16)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w} ${h} L0 ${h} Z`, last: pts[pts.length - 1] };
}

/** Animated helpdesk dashboard preview: shows the kind of systems I build. */
export default function LiveDashboard() {
  const reduced = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>({ once: false });
  const running = !reduced && pageVisible && inView;

  const nextId = useRef(1047);
  const tick = useRef(0);
  const [open, setOpen] = useState(18);
  const [resolved, setResolved] = useState(42);
  const [series, setSeries] = useState(SEED);
  const [feed, setFeed] = useState<Ticket[]>(() =>
    POOL.slice(0, 3).map((t, i) => ({ ...t, id: 1046 - i })),
  );
  const [toast, setToast] = useState<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const iv = window.setInterval(() => {
      tick.current += 1;
      const n = tick.current;

      setSeries((s) => {
        const prev = s[s.length - 1];
        const next = Math.min(0.95, Math.max(0.2, prev + (Math.random() - 0.45) * 0.22));
        return [...s.slice(1), next];
      });

      if (n % 2 === 1) {
        const t = POOL[(n + 2) % POOL.length];
        const id = nextId.current++;
        setFeed((f) => [{ ...t, id }, ...f].slice(0, 3));
        setOpen((o) => o + 1);
      } else {
        setFeed((f) => {
          const done = f[f.length - 1];
          if (done) setToast(done.id);
          return f;
        });
        setOpen((o) => Math.max(8, o - 1));
        setResolved((r) => r + 1);
      }
    }, 2400);
    return () => window.clearInterval(iv);
  }, [running]);

  useEffect(() => {
    if (toast === null) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const { line, area, last } = chartPaths(series);

  return (
    <div
      className="dash-wrap"
      ref={ref}
      role="img"
      aria-label="Animated preview of a helpdesk dashboard, the kind of system I build. Uses sample data."
    >
      <TiltCard className="dash" max={5}>
        <div className="dash__top">
          <span className="dash__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="dash__url">
            <Icon name="lock" size={11} /> helpdesk.sample.app/dashboard
          </span>
          <span className="live-badge">
            <span className="live-dot" /> Live
          </span>
        </div>

        <div className="dash__body">
          <div className="dash__stats">
            <div className="dash__stat">
              <span className="dash__stat-icon">
                <Icon name="ticket" size={15} />
              </span>
              <span className="dash__stat-label">Open tickets</span>
              <strong key={`o${open}`} className="dash__stat-value tick">
                {open}
              </strong>
            </div>
            <div className="dash__stat">
              <span className="dash__stat-icon dash__stat-icon--ok">
                <Icon name="checkCircle" size={15} />
              </span>
              <span className="dash__stat-label">Resolved today</span>
              <strong key={`r${resolved}`} className="dash__stat-value tick">
                {resolved}
              </strong>
            </div>
            <div className="dash__stat">
              <span className="dash__stat-icon">
                <Icon name="clock" size={15} />
              </span>
              <span className="dash__stat-label">Avg. response</span>
              <strong className="dash__stat-value">12m</strong>
            </div>
          </div>

          <div className="dash__chart">
            <div className="dash__chart-head">
              <span>Tickets this week</span>
              <span className="dash__trend">
                <Icon name="activity" size={13} /> Live
              </span>
            </div>
            <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="dash__svg">
              <defs>
                <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.35 }} />
                  <stop offset="1" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#dash-fill)" className="dash__area" />
              <path d={line} fill="none" className="dash__line" />
              <circle cx={last[0] - 3} cy={last[1]} r="4" className="dash__point" />
            </svg>
          </div>

          <ul className="dash__feed">
            {feed.map((t) => (
              <li key={t.id} className="dash__ticket">
                <span className={`prio prio--${t.priority.toLowerCase()}`}>{t.priority}</span>
                <span className="dash__ticket-main">
                  <span className="dash__ticket-title">{t.title}</span>
                  <span className="dash__ticket-meta">
                    #{t.id} · {t.who} · {t.dept}
                  </span>
                </span>
                <span className="dash__cat">{t.cat}</span>
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>

      <div className={`dash-toast${toast !== null ? " is-visible" : ""}`}>
        <Icon name="checkCircle" size={16} /> Ticket #{toast ?? ""} resolved
      </div>
      <div className="dash-chip dash-chip--a">
        <Icon name="sparkles" size={14} /> AI-assisted triage
      </div>
      <div className="dash-chip dash-chip--b">
        <Icon name="shield" size={14} /> Role-based access
      </div>
    </div>
  );
}
