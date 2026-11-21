import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const listeners = new Set<(t: Theme) => void>();

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  listeners.forEach((l) => l(theme));
}

export function useTheme() {
  const [theme, set] = useState<Theme>(getTheme);
  useEffect(() => {
    listeners.add(set);
    return () => {
      listeners.delete(set);
    };
  }, []);
  return {
    theme,
    toggle: () => setTheme(getTheme() === "dark" ? "light" : "dark"),
  };
}
