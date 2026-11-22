import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;
export const ease = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Piecewise keyframes: kf(frame, [[0, 1], [20, 1.5], [40, 1]]) */
export function kf(frame: number, points: [number, number][], easing = ease) {
  return interpolate(
    frame,
    points.map((p) => p[0]),
    points.map((p) => p[1]),
    { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

/** 0 → 1 spring starting at `start`. */
export function pop(frame: number, start: number, damping = 12, stiffness = 180) {
  return spring({ frame: frame - start, fps: FPS, config: { damping, stiffness, mass: 0.6 } });
}

/** 0 → 1 eased progress between two frames. */
export function prog(frame: number, start: number, end: number, easing = easeOut) {
  return interpolate(frame, [start, end], [0, 1], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

/** Number of characters typed so far. */
export function typed(frame: number, start: number, cps: number, text: string) {
  return text.slice(0, Math.max(0, Math.floor(((frame - start) * cps) / FPS)));
}
