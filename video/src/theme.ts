import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const c = {
  bg: "#f4f7fc",
  surface: "#ffffff",
  surface2: "#f1f4f9",
  border: "#e3e8f0",
  text: "#0f172a",
  muted: "#5b6577",
  accent: "#2563eb",
  accentSoft: "#e8efff",
  green: "#16a34a",
  greenSoft: "#e3f6ea",
  amber: "#d97706",
  amberSoft: "#fdf1dc",
  red: "#dc2626",
  redSoft: "#fde8e8",
  dark: "#0b1220",
  dark2: "#141c2e",
  dark3: "#1d2740",
};

export const shadow = "0 30px 80px -20px rgba(15, 23, 42, 0.28), 0 8px 24px -8px rgba(15, 23, 42, 0.12)";
