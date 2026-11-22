/**
 * "Live build" cursors on the Home page: four labelled cursors (design, front end, back end,
 * testing) that move around the page and put sections together as they scroll into view.
 *
 * This file is the engine: positions, movement and small actions (move, click, drag a box,
 * carry a file, follow a typing caret). <BuildCursors> draws them; useBuild() and <TypeText>
 * ask for them. With reduced motion, or when the visitor hides them, every action resolves
 * immediately so content still appears.
 */

export type CursorId = "design" | "front" | "back" | "test";
export const CURSOR_IDS: CursorId[] = ["design", "front", "back", "test"];
export const CURSOR_LABELS: Record<CursorId, string> = {
  design: "design",
  front: "front end",
  back: "back end",
  test: "testing",
};

/** A point on an element (ax/ay = 0..1 of its box, plus a px offset), followed while the page scrolls. */
export type Anchor = { el: Element; ax: number; ay: number; dx?: number; dy?: number };
/** A point computed every frame (null = stay put), e.g. a caret that moves between lines. */
export type Live = { fn: () => { x: number; y: number } | null };
type Target = Anchor | Live | { x: number; y: number };

export interface CursorNodes {
  root: HTMLElement;
  carry: HTMLElement;
  select: HTMLElement;
  size: HTMLElement;
}

interface Cursor {
  id: CursorId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  target: Target | null;
  slow: boolean;
  shown: boolean;
  pressed: boolean;
  carry: string;
  select: Anchor | null;
  selectDone: boolean;
  waiters: (() => void)[];
  chain: Promise<void>;
  load: number;
  idleSince: number;
  home: [number, number];
  phase: number;
  nodes?: CursorNodes;
}

// Where each cursor rests (fraction of the viewport), away from the main text column
const HOMES: Record<CursorId, [number, number]> = {
  design: [0.86, 0.18],
  front: [0.94, 0.5],
  back: [0.56, 0.9],
  test: [0.76, 0.8],
};

const STORAGE_KEY = "build-cursors";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isAnchor = (t: Target): t is Anchor => "el" in t;
const isLive = (t: Target): t is Live => "fn" in t;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

class CursorEngine {
  private cursors = new Map<CursorId, Cursor>();
  private attached = 0;
  private raf = 0;
  private last = 0;
  private mouse = { x: -9999, y: -9999 };
  private listeners = new Set<() => void>();
  private wantOn = true;
  /** Touch screens: cursors only appear while they're doing something. */
  coarse = false;

  constructor() {
    CURSOR_IDS.forEach((id, i) => {
      this.cursors.set(id, {
        id,
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        target: null,
        slow: false,
        shown: false,
        pressed: false,
        carry: "",
        select: null,
        selectDone: false,
        waiters: [],
        chain: Promise.resolve(),
        load: 0,
        idleSince: 0,
        home: HOMES[id],
        phase: i * 1.7,
      });
    });
    try {
      this.wantOn = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      /* storage blocked: default on */
    }
  }

  /** Motion is allowed at all (typing, build transitions). */
  get motion() {
    return !reducedMotion();
  }

  /** Cursors are on screen and actions animate. */
  get active() {
    return this.attached > 0 && this.wantOn && this.motion;
  }

  get enabled() {
    return this.wantOn;
  }

  setEnabled(on: boolean) {
    this.wantOn = on;
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* ignore */
    }
    this.cursors.forEach((c) => {
      this.reset(c);
      if (on && this.active && !this.coarse && c.nodes) {
        // fly back in from the right edge
        c.x = window.innerWidth + 40;
        c.y = window.innerHeight * c.home[1];
        c.shown = true;
        this.flush(c);
      }
    });
    this.emit();
    this.kick();
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  attach(id: CursorId, nodes: CursorNodes) {
    const c = this.get(id);
    c.nodes = nodes;
    c.x = window.innerWidth + 40;
    c.y = window.innerHeight * c.home[1];
  }

  /** Called by <BuildCursors> on mount/unmount. */
  start() {
    this.attached++;
    this.coarse = window.matchMedia("(hover: none), (max-width: 760px)").matches;
    window.addEventListener("pointermove", this.onPointer, { passive: true });
    document.addEventListener("visibilitychange", this.kick);
    this.emit();
    this.kick();
  }

  stop() {
    this.attached = Math.max(0, this.attached - 1);
    if (this.attached) return;
    window.removeEventListener("pointermove", this.onPointer);
    document.removeEventListener("visibilitychange", this.kick);
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.cursors.forEach((c) => {
      this.reset(c);
      c.nodes = undefined;
      c.load = 0;
      c.chain = Promise.resolve();
    });
    this.emit();
  }

  private reset(c: Cursor) {
    c.target = null;
    c.shown = false;
    c.pressed = false;
    c.carry = "";
    c.select = null;
    this.flush(c);
  }

  private onPointer = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  };

  private get(id: CursorId) {
    return this.cursors.get(id)!;
  }

  /** How busy a cursor is (queued actions). */
  load(id: CursorId) {
    return this.get(id).load;
  }

  /** The least busy of the given cursors. */
  pick(ids: CursorId[] = CURSOR_IDS) {
    return ids.reduce((best, id) => (this.load(id) < this.load(best) ? id : best), ids[0]);
  }

  /** Run actions on a cursor one after another. */
  run(id: CursorId, task: () => Promise<void>): Promise<void> {
    const c = this.get(id);
    c.load++;
    const p = c.chain
      .then(task)
      .catch(() => {})
      .finally(() => {
        c.load--;
        if (!c.load) this.rest(id);
      });
    c.chain = p;
    return p;
  }

  /** Keep a cursor busy (e.g. while a scroll scene uses it) until the returned function is called. */
  hold(id: CursorId): () => void {
    let release = () => {};
    const held = new Promise<void>((r) => (release = r));
    this.get(id).load += 5;
    void this.run(id, () => held);
    return () => {
      this.get(id).load -= 5;
      release();
    };
  }

  // ---- actions (resolve immediately when cursors are off) ----

  moveTo(id: CursorId, target: Target, opts: { slow?: boolean; timeout?: number } = {}): Promise<void> {
    const c = this.get(id);
    if (!this.active) return Promise.resolve();
    c.target = target;
    c.slow = !!opts.slow;
    c.shown = true;
    this.kick();
    return new Promise((resolve) => {
      c.waiters.push(resolve);
      setTimeout(resolve, opts.timeout ?? 1600);
    });
  }

  /** Follow a point without waiting (e.g. a typing caret). */
  follow(id: CursorId, target: Target) {
    if (!this.active) return;
    const c = this.get(id);
    c.target = target;
    c.slow = false;
    c.shown = true;
    this.kick();
  }

  async click(id: CursorId) {
    const c = this.get(id);
    if (!this.active || !c.nodes) return;
    c.pressed = true;
    const root = c.nodes.root;
    root.classList.remove("is-click");
    void root.offsetWidth;
    root.classList.add("is-click");
    this.flush(c);
    await sleep(140);
    c.pressed = false;
    this.flush(c);
    await sleep(60);
  }

  press(id: CursorId, down: boolean) {
    const c = this.get(id);
    c.pressed = down && this.active;
    this.flush(c);
  }

  carry(id: CursorId, label: string) {
    const c = this.get(id);
    c.carry = this.active ? label : "";
    this.flush(c);
  }

  /** Start a selection box anchored at a point; it stretches to the cursor. */
  selectFrom(id: CursorId, anchor: Anchor | null) {
    const c = this.get(id);
    c.select = this.active ? anchor : null;
    c.selectDone = false;
    this.flush(c);
    this.kick();
  }

  /** Finish the selection box (it shows its handles briefly, then fades). */
  async endSelect(id: CursorId) {
    const c = this.get(id);
    if (!c.select) return;
    c.selectDone = true;
    this.flush(c);
    await sleep(380);
    c.select = null;
    c.selectDone = false;
    this.flush(c);
  }

  /** Back to resting/wandering. */
  rest(id: CursorId) {
    const c = this.get(id);
    c.target = null;
    c.slow = false;
    c.idleSince = performance.now();
    this.kick();
  }

  // ---- animation loop ----

  private kick = () => {
    if (!this.raf && this.attached && document.visibilityState === "visible") {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    }
  };

  private point(t: Target): { x: number; y: number } | null {
    if (isLive(t)) return t.fn();
    if (!isAnchor(t)) return t;
    if (!t.el.isConnected) return null;
    const r = t.el.getBoundingClientRect();
    return { x: r.left + r.width * t.ax + (t.dx ?? 0), y: r.top + r.height * t.ay + (t.dy ?? 0) };
  }

  private idlePoint(c: Cursor, now: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = now / 1000;
    let x = c.home[0] * vw + Math.sin(s * 0.45 + c.phase) * 26 + Math.sin(s * 0.19 + c.phase * 2) * 44;
    let y = c.home[1] * vh + Math.cos(s * 0.37 + c.phase) * 22 + Math.sin(s * 0.23 + c.phase * 3) * 34;
    // step aside when the visitor's pointer comes close
    const dx = x - this.mouse.x;
    const dy = y - this.mouse.y;
    const d = Math.hypot(dx, dy);
    if (d < 150 && d > 0.01) {
      x += (dx / d) * (150 - d);
      y += (dy / d) * (150 - d);
    }
    return { x: Math.min(vw - 110, Math.max(14, x)), y: Math.min(vh - 40, Math.max(84, y)) };
  }

  private tick = (now: number) => {
    this.raf = 0;
    if (!this.attached || document.visibilityState !== "visible") return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    let keepGoing = false;

    this.cursors.forEach((c) => {
      if (!c.nodes) return;
      if (!this.active) {
        if (c.shown) this.reset(c);
        return;
      }
      const idle = !c.target;
      if (idle && this.coarse && c.shown && now - c.idleSince > 900) {
        c.shown = false;
        this.flush(c);
      }
      if (idle && !c.shown) return;

      const t = (c.target ? this.point(c.target) : this.idlePoint(c, now)) ?? { x: c.x, y: c.y };
      const k = idle ? 14 : c.slow ? 36 : 70;
      const damp = 2 * Math.sqrt(k);
      c.vx += (k * (t.x - c.x) - damp * c.vx) * dt;
      c.vy += (k * (t.y - c.y) - damp * c.vy) * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;

      if (c.waiters.length && Math.hypot(t.x - c.x, t.y - c.y) < 4 && Math.hypot(c.vx, c.vy) < 60) {
        c.waiters.splice(0).forEach((w) => w());
      }
      this.draw(c);
      keepGoing = true;
    });

    if (keepGoing) this.raf = requestAnimationFrame(this.tick);
  };

  private draw(c: Cursor) {
    const n = c.nodes!;
    n.root.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
    const a = c.select && this.point(c.select);
    if (a) {
      const left = Math.min(a.x, c.x);
      const top = Math.min(a.y, c.y);
      const w = Math.abs(c.x - a.x);
      const h = Math.abs(c.y - a.y);
      n.select.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`;
      n.select.style.width = `${w.toFixed(1)}px`;
      n.select.style.height = `${h.toFixed(1)}px`;
      n.size.textContent = `${Math.round(w)} × ${Math.round(h)}`;
    }
  }

  /** Apply the non-position state (classes, labels). */
  private flush(c: Cursor) {
    const n = c.nodes;
    if (!n) return;
    n.root.classList.toggle("is-shown", c.shown);
    n.root.classList.toggle("is-pressed", c.pressed);
    n.root.classList.toggle("is-carrying", !!c.carry);
    if (c.carry) n.carry.textContent = c.carry;
    n.select.classList.toggle("is-on", !!c.select);
    n.select.classList.toggle("is-done", c.selectDone);
  }
}

export const cursors = new CursorEngine();

// ---- higher-level actions used by sections ----

/** A point on an element that may be replaced while it moves (e.g. a caret ref). */
export function pointOn(el: Element | null | undefined, ax = 0, ay = 0, dx = 0, dy = 0) {
  if (!el || !el.isConnected) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width * ax + dx, y: r.top + r.height * ay + dy };
}

/** Is the element (partly) on screen right now? */
export function onScreen(el: Element) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
}

/** Carry a file onto an element and drop it there. */
export async function dropOnto(id: CursorId, el: Element, label: string) {
  cursors.carry(id, label);
  await cursors.moveTo(id, { el, ax: 0.5, ay: 0.5, dx: 70, dy: -50 });
  await cursors.moveTo(id, { el, ax: 0.5, ay: 0.5 });
  await cursors.click(id);
  cursors.carry(id, "");
}

/** Wait (up to `ms`) until the whole element is on screen below the nav bar. */
export async function untilInView(el: Element, ms = 1200) {
  const end = performance.now() + ms;
  for (;;) {
    const r = el.getBoundingClientRect();
    if (r.top >= 60 && r.bottom <= window.innerHeight - 8) return true;
    if (performance.now() > end) return false;
    await sleep(100);
  }
}

/** Drag a selection box from the element's top-left to its bottom-right corner (only if it fits on screen). */
export async function frame(id: CursorId, el: Element) {
  if (!(await untilInView(el))) return;
  await cursors.moveTo(id, { el, ax: 0, ay: 0 });
  cursors.press(id, true);
  cursors.selectFrom(id, { el, ax: 0, ay: 0 });
  await cursors.moveTo(id, { el, ax: 1, ay: 1 }, { slow: true, timeout: 1400 });
  cursors.press(id, false);
  void cursors.endSelect(id);
}

/** Move to a point on an element and click it. */
export async function clickOn(id: CursorId, el: Element, ax = 0.5, ay = 0.5) {
  await cursors.moveTo(id, { el, ax, ay });
  await cursors.click(id);
}
