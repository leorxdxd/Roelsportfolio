import { useEffect, useRef, useState } from "react";
import portrait from "../data/portrait.json";
import { assetUrl } from "../data/projects";
import { site } from "../data/site";

const COLOR = assetUrl("assets/portrait/portrait.webp");
const DEPTH = assetUrl("assets/portrait/portrait-depth.webp");

const VERT = `
attribute vec2 p;
varying vec2 v;
void main() {
  v = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`;

// Parallax from the depth map (closer parts move more), plus a "being built" reveal from the
// bottom: a pixelated band under a lime scan line.
const FRAG = `
precision mediump float;
varying vec2 v;
uniform sampler2D img;
uniform sampler2D dep;
uniform vec2 m;
uniform float rev;
uniform float str;
uniform vec2 res;
uniform vec3 line;
void main() {
  float d = texture2D(dep, v).r;
  vec2 uv = v - m * (d - 0.5) * str;
  vec4 c = texture2D(img, uv);
  float b = 1.04 - rev * 1.24;
  if (v.y < b) { gl_FragColor = vec4(0.0); return; }
  float band = 1.0 - smoothstep(0.0, 0.14, v.y - b);
  if (band > 0.01) {
    vec2 cell = vec2(9.0) / res;
    vec4 q = texture2D(img, (floor(uv / cell) + 0.5) * cell);
    c = mix(c, q, band);
  }
  float l = 1.0 - smoothstep(0.0, 0.005, abs(v.y - b));
  c.rgb = mix(c.rgb, line * c.a, l);
  gl_FragColor = c;
}`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

interface Props {
  /** Reveal the portrait (plays the build-up animation once). */
  show: boolean;
  className?: string;
}

/**
 * The hero portrait in 3D: a cut-out photo plus a depth map (made by `npm run portrait` in video/),
 * drawn with WebGL so the face turns slightly with the mouse (or drifts on touch screens).
 * Falls back to the plain image without WebGL or with reduced motion.
 */
export default function Portrait3D({ show, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const showRef = useRef(show);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    showRef.current = show;
  }, [show]);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    if (!box || !cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let revStart = 0;
    let rev = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, last: -1e9 };

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uM = u("m");
    const uRev = u("rev");
    const uRes = u("res");
    gl.uniform1f(u("str"), 0.045);
    gl.uniform3f(u("line"), 0.83, 0.96, 0.29);
    gl.uniform1i(u("img"), 0);
    gl.uniform1i(u("dep"), 1);

    const texture = (unit: number, img: HTMLImageElement, premultiply: boolean) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiply);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const resize = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      mouse.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      mouse.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      mouse.last = performance.now();
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed) return;
      if (now - mouse.last > 2500) {
        // no mouse: drift gently so the depth still shows
        const s = now / 1000;
        mouse.tx = Math.sin(s * 0.6) * 0.55;
        mouse.ty = Math.sin(s * 0.43) * 0.22;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      if (showRef.current) {
        if (!revStart) revStart = now;
        const t = Math.min(1, (now - revStart) / 1300);
        rev = 1 - Math.pow(1 - t, 3);
      }
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uRev, rev);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !disposed) raf = requestAnimationFrame(frame);
    });

    Promise.all([loadImage(COLOR), loadImage(DEPTH)])
      .then(([color, depth]) => {
        if (disposed) return;
        texture(0, color, true);
        texture(1, depth, false);
        // already shown as a plain image (slow load): skip the build-up
        if (showRef.current) revStart = -1e9;
        resize();
        ro.observe(box);
        io.observe(box);
        window.addEventListener("pointermove", onMove, { passive: true });
        setReady(true);
      })
      .catch(() => {});

    const onLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      setReady(false);
    };
    cv.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cv.removeEventListener("webglcontextlost", onLost);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className={`portrait3d${className ? ` ${className}` : ""}`}
      data-gl={ready ? "ready" : undefined}
      data-show={show ? "true" : "false"}
      style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
    >
      <img
        className="portrait3d__img"
        src={COLOR}
        alt={`${site.name}, ${site.role}`}
        width={portrait.width}
        height={portrait.height}
        decoding="async"
      />
      <canvas ref={canvas} className="portrait3d__canvas" aria-hidden="true" />
    </div>
  );
}
