import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` is "/" for Netlify. The `build:gh` script overrides it for GitHub Pages.
export default defineConfig({
  plugins: [react()],
  build: {
    // Bundled JS/CSS go to /static so they never collide with /assets (your media).
    assetsDir: "static",
  },
});
