// Generates an ORIGINAL upbeat backing track + UI sound effects (no samples, no copyright).
// Output: public/music.wav and public/sfx/*.wav
// If public/music.mp3 exists (a royalty-free track you downloaded), the video uses that instead.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const timeline = JSON.parse(fs.readFileSync(path.join(root, "src/timeline.json"), "utf8"));
const SR = 44100;
const BPM = timeline.bpm;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const LENGTH = timeline.end / timeline.fps + 1.5; // a little tail after the video ends

// ---------- helpers ----------
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

function biquad(type, freq, q = 0.707) {
  const w = (2 * Math.PI * freq) / SR;
  const a = Math.sin(w) / (2 * q);
  const c = Math.cos(w);
  let b0, b1, b2;
  if (type === "lp") [b0, b1, b2] = [(1 - c) / 2, 1 - c, (1 - c) / 2];
  else if (type === "hp") [b0, b1, b2] = [(1 + c) / 2, -(1 + c), (1 + c) / 2];
  else [b0, b1, b2] = [a, 0, -a]; // band-pass
  const a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x) => {
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    return y;
  };
}

function track(seconds) {
  const n = Math.ceil(seconds * SR);
  return { L: new Float32Array(n), R: new Float32Array(n) };
}
function add(buf, t0, sampleFn, dur, gain = 1, pan = 0) {
  const start = Math.floor(t0 * SR);
  const n = Math.floor(dur * SR);
  const gl = gain * Math.min(1, 1 - pan), gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < n && start + i < buf.L.length; i++) {
    if (start + i < 0) continue;
    const s = sampleFn(i / SR, i);
    buf.L[start + i] += s * gl;
    buf.R[start + i] += s * gr;
  }
}
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));

// ---------- instruments ----------
function kick(buf, t) {
  let ph = 0;
  add(buf, t, (s) => {
    const f = 45 + 110 * Math.exp(-s * 28);
    ph += f / SR;
    const click = s < 0.004 ? rand() * 0.4 : 0;
    return (Math.sin(2 * Math.PI * ph) * Math.exp(-s * 7) + click);
  }, 0.45, 0.95);
}
function clap(buf, t, gain = 0.45) {
  const bp = biquad("bp", 1500, 0.9);
  add(buf, t, (s) => {
    const burst = s < 0.03 ? Math.exp(-((s * 1000) % 10) / 2.5) : 0;
    const env = burst + Math.exp(-s * 18) * 0.8;
    return bp(rand()) * env * 3;
  }, 0.3, gain);
}
function hat(buf, t, open = false, gain = 0.16) {
  const hp = biquad("hp", 8000, 0.7);
  add(buf, t, (s) => hp(rand()) * Math.exp(-s * (open ? 14 : 60)), open ? 0.3 : 0.06, gain, 0.15);
}
function bass(buf, t, midi, dur) {
  const lp = biquad("lp", 520, 1.2);
  const f = mtof(midi);
  add(buf, t, (s) => {
    const env = Math.min(1, s * 300) * Math.exp(-s * 5);
    return lp(saw(f * s) * 0.7 + Math.sin(2 * Math.PI * f * s)) * env;
  }, dur, 0.5);
}
function stab(buf, t, notes, gain = 0.15) {
  for (const [k, m] of notes.entries()) {
    for (const det of [-0.08, 0.08]) {
      const lp = biquad("lp", 2600, 0.8);
      const f = mtof(m + det);
      add(buf, t, (s) => lp(saw(f * s)) * Math.min(1, s * 250) * Math.exp(-s * 9), 0.4, gain, det > 0 ? 0.35 : -0.35 + k * 0.05);
    }
  }
}
function pluck(buf, t, midi, gain = 0.11, pan = 0) {
  const f = mtof(midi);
  add(buf, t, (s) => {
    const sq = Math.sign(Math.sin(2 * Math.PI * f * s)) * 0.5 + Math.sin(2 * Math.PI * 2 * f * s) * 0.3;
    return sq * Math.min(1, s * 400) * Math.exp(-s * 11);
  }, 0.35, gain, pan);
}
function riser(buf, t, dur) {
  add(buf, t, (s) => {
    const p = s / dur;
    const bp = riser.f || (riser.f = biquad("bp", 600, 2));
    return bp(rand()) * p * p * 1.6;
  }, dur, 0.35);
  riser.f = null;
}
function impact(buf, t) {
  let ph = 0;
  const hp = biquad("hp", 3000);
  add(buf, t, (s) => {
    ph += (30 + 60 * Math.exp(-s * 10)) / SR;
    return Math.sin(2 * Math.PI * ph) * Math.exp(-s * 3) + hp(rand()) * Math.exp(-s * 2.2) * 0.5;
  }, 2, 0.7);
}

// ---------- arrangement ----------
const drums = track(LENGTH);
const music = track(LENGTH);

// C – G – Am – F (one chord per bar)
const prog = [
  { root: 36, chord: [60, 64, 67, 72] },
  { root: 43, chord: [59, 62, 67, 71] },
  { root: 45, chord: [57, 60, 64, 69] },
  { root: 41, chord: [57, 60, 65, 69] },
];
const stabPattern = [0, 3, 6, 10, 12]; // 16th-note positions
const arp = [0, 1, 2, 3, 2, 1, 2, 3];
const bars = Math.ceil(LENGTH / BAR);
const dropAt = 2 * BAR; // full groove from bar 2
const finalHit = 34; // seconds
const kicks = [];

for (let b = 0; b < bars; b++) {
  const t0 = b * BAR;
  if (t0 >= finalHit) break;
  const { root, chord } = prog[b % 4];
  const full = t0 >= dropAt;
  for (const p of stabPattern) {
    const t = t0 + (p * BEAT) / 4;
    if (t < finalHit) stab(music, t, chord, full ? 0.13 : 0.09);
  }
  for (let beat = 0; beat < 4; beat++) {
    const t = t0 + beat * BEAT;
    if (t >= finalHit) break;
    if (b >= 1) { kick(drums, t); kicks.push(t); }
    if (full && (beat === 1 || beat === 3)) clap(drums, t);
    if (b >= 1) hat(drums, t + BEAT / 2, full, full ? 0.14 : 0.1);
    if (full) for (const s of [0.25, 0.75]) hat(drums, t + BEAT * s, false, 0.06);
    if (full) bass(music, t + BEAT / 2, root + 12 * (beat === 3 ? 1 : 0), BEAT / 2);
    if (full && beat === 0) bass(music, t, root, BEAT / 2);
  }
  if (b >= 6) arp.forEach((idx, i) => {
    const t = t0 + (i * BEAT) / 2;
    if (t < finalHit) pluck(music, t, chord[idx] + 12, 0.08, i % 2 ? 0.3 : -0.3);
  });
}
riser(music, dropAt - BAR, BAR);
// build-up into the outro cut, then the big hit
const outroCut = timeline.cuts.at(-1) / timeline.fps;
riser(music, outroCut - 1.5, 1.5);
for (let i = 0; i < 8; i++) clap(drums, outroCut - 1 + i * (BEAT / 4), 0.12 + i * 0.03);
impact(drums, outroCut);
impact(drums, finalHit);
stab(music, finalHit, [48, 60, 64, 67, 72], 0.2);

// sidechain "pump": duck the music under each kick
for (const t of kicks) {
  const s0 = Math.floor(t * SR), n = Math.floor(BEAT * 0.9 * SR);
  for (let i = 0; i < n && s0 + i < music.L.length; i++) {
    const g = 1 - 0.55 * Math.exp(-i / SR / 0.09);
    music.L[s0 + i] *= g;
    music.R[s0 + i] *= g;
  }
}

const mix = track(LENGTH);
for (let i = 0; i < mix.L.length; i++) {
  const fade = Math.min(1, (LENGTH - i / SR) / 1.2);
  mix.L[i] = Math.tanh((drums.L[i] + music.L[i]) * 1.1) * 0.85 * fade;
  mix.R[i] = Math.tanh((drums.R[i] + music.R[i]) * 1.1) * 0.85 * fade;
}

// ---------- SFX ----------
function sfx(seconds, fn) {
  const b = track(seconds);
  fn(b);
  return b;
}
const click = sfx(0.08, (b) => {
  const hp = biquad("hp", 2500);
  add(b, 0, (s) => hp(rand()) * Math.exp(-s * 120) + Math.sin(2 * Math.PI * 1800 * s) * Math.exp(-s * 90) * 0.4, 0.08, 0.8);
});
const pop = sfx(0.15, (b) => {
  let ph = 0;
  add(b, 0, (s) => { ph += (500 + 1400 * s / 0.15) / SR; return Math.sin(2 * Math.PI * ph) * Math.exp(-s * 30); }, 0.15, 0.6);
});
const whoosh = sfx(0.6, (b) => {
  let f = biquad("bp", 400, 1.5), last = 0;
  add(b, 0, (s, i) => {
    if (i % 64 === 0) { const nf = 300 + 5000 * Math.sin((Math.PI * s) / 0.6) ** 2; if (Math.abs(nf - last) > 50) { f = biquad("bp", nf, 1.5); last = nf; } }
    return f(rand()) * Math.sin((Math.PI * s) / 0.6) ** 2 * 2.2;
  }, 0.6, 0.5);
});
const typing = sfx(4, (b) => {
  for (let t = 0; t < 4; t += 0.055 + Math.abs(rand()) * 0.05) {
    const bp = biquad("bp", 2500 + rand() * 900, 3);
    add(b, t, (s) => bp(rand()) * Math.exp(-s * 140) * 3, 0.03, 0.45, rand() * 0.2);
  }
});

// ---------- write WAVs ----------
function writeWav(file, buf) {
  const n = buf.L.length;
  const data = Buffer.alloc(44 + n * 4);
  data.write("RIFF", 0); data.writeUInt32LE(36 + n * 4, 4); data.write("WAVE", 8);
  data.write("fmt ", 12); data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(2, 22);
  data.writeUInt32LE(SR, 24); data.writeUInt32LE(SR * 4, 28); data.writeUInt16LE(4, 32); data.writeUInt16LE(16, 34);
  data.write("data", 36); data.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf.L[i])) * 32767), 44 + i * 4);
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf.R[i])) * 32767), 46 + i * 4);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
  console.log("wrote", path.relative(root, file));
}
writeWav(path.join(root, "public/music.wav"), mix);
writeWav(path.join(root, "public/sfx/click.wav"), click);
writeWav(path.join(root, "public/sfx/pop.wav"), pop);
writeWav(path.join(root, "public/sfx/whoosh.wav"), whoosh);
writeWav(path.join(root, "public/sfx/typing.wav"), typing);
