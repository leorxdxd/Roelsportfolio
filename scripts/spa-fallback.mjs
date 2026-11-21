// GitHub Pages has no rewrite rules, so serve the app for unknown paths
// (e.g. /projects/miromail) by copying index.html to 404.html.
import fs from "node:fs";

fs.copyFileSync("dist/index.html", "dist/404.html");
console.log("Created dist/404.html for GitHub Pages routing.");
