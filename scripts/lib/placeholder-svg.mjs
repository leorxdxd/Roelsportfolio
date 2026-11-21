// Builds a clean "app window" placeholder image as an SVG string.
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function placeholderSvg({ width = 1600, height = 1000, title = "", label = "" } = {}) {
  const pad = Math.round(width * 0.07);
  const winX = pad;
  const winY = pad;
  const winW = width - pad * 2;
  const winH = height - pad * 2;
  const bar = Math.round(winH * 0.075);
  const side = Math.round(winW * 0.2);
  const u = winW / 100; // unit
  const contentX = winX + side + u * 3;
  const contentW = winW - side - u * 6;
  const cardsY = winY + bar + u * 6;
  const cardW = (contentW - u * 4.5) / 4;
  const cardH = winH * 0.16;
  const chartY = cardsY + cardH + u * 3;
  const chartH = winY + winH - chartY - u * 3;
  const font = "Segoe UI, Inter, Helvetica, Arial, sans-serif";

  const cards = [0, 1, 2, 3]
    .map(
      (i) =>
        `<rect x="${contentX + i * (cardW + u * 1.5)}" y="${cardsY}" width="${cardW}" height="${cardH}" rx="${u}" fill="#f1f5f9"/>
         <rect x="${contentX + i * (cardW + u * 1.5) + u * 1.5}" y="${cardsY + cardH * 0.3}" width="${cardW * 0.45}" height="${u * 0.9}" rx="${u * 0.45}" fill="#cbd5e1"/>
         <rect x="${contentX + i * (cardW + u * 1.5) + u * 1.5}" y="${cardsY + cardH * 0.58}" width="${cardW * 0.25}" height="${u * 1.6}" rx="${u * 0.5}" fill="#93c5fd"/>`,
    )
    .join("");

  const navItems = [0, 1, 2, 3, 4]
    .map(
      (i) =>
        `<rect x="${winX + u * 2.5}" y="${winY + bar + u * (6 + i * 4)}" width="${side - u * 5}" height="${u * 1.6}" rx="${u * 0.8}" fill="${i === 0 ? "#3b82f6" : "#334155"}"/>`,
    )
    .join("");

  const bars = [0.45, 0.7, 0.55, 0.85, 0.6, 0.95, 0.75]
    .map((h, i) => {
      const bw = (contentW * 0.55) / 7;
      const bh = (chartH - u * 6) * h;
      return `<rect x="${contentX + u * 2 + i * bw * 1.15}" y="${chartY + chartH - u * 2 - bh}" width="${bw * 0.75}" height="${bh}" rx="${u * 0.4}" fill="${i === 5 ? "#2563eb" : "#bfdbfe"}"/>`;
    })
    .join("");

  const labelW = Math.max(esc(label).length, esc(title).length) * u * 1.25 + u * 8;
  const labelH = u * (title ? 11 : 7);
  const lx = width / 2 - labelW / 2;
  const ly = winY + bar + (winH - bar) / 2 - labelH / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eff6ff"/><stop offset="1" stop-color="#dbeafe"/>
    </linearGradient>
    <filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="${u}" stdDeviation="${u * 1.6}" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <g filter="url(#sh)">
    <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" rx="${u * 1.6}" fill="#ffffff"/>
  </g>
  <rect x="${winX}" y="${winY + bar}" width="${side}" height="${winH - bar}" fill="#1e293b"/>
  <rect x="${winX}" y="${winY}" width="${winW}" height="${bar}" rx="${u * 1.6}" fill="#f8fafc"/>
  <rect x="${winX}" y="${winY + bar / 2}" width="${winW}" height="${bar / 2}" fill="#f8fafc"/>
  <line x1="${winX}" y1="${winY + bar}" x2="${winX + winW}" y2="${winY + bar}" stroke="#e2e8f0" stroke-width="${u * 0.15}"/>
  ${[0, 1, 2].map((i) => `<circle cx="${winX + u * 2.5 + i * u * 2.2}" cy="${winY + bar / 2}" r="${u * 0.65}" fill="${["#f87171", "#fbbf24", "#34d399"][i]}"/>`).join("")}
  ${navItems}
  ${cards}
  <rect x="${contentX}" y="${chartY}" width="${contentW}" height="${chartH}" rx="${u}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="${u * 0.12}"/>
  ${bars}
  <g>
    <rect x="${lx}" y="${ly}" width="${labelW}" height="${labelH}" rx="${u * 1.2}" fill="#ffffff" stroke="#e2e8f0" stroke-width="${u * 0.12}" filter="url(#sh)"/>
    ${
      title
        ? `<text x="${width / 2}" y="${ly + labelH * 0.43}" text-anchor="middle" font-family="${font}" font-size="${u * 2.3}" font-weight="700" fill="#0f172a">${esc(title)}</text>
           <text x="${width / 2}" y="${ly + labelH * 0.75}" text-anchor="middle" font-family="${font}" font-size="${u * 1.7}" font-weight="500" fill="#2563eb">${esc(label)}</text>`
        : `<text x="${width / 2}" y="${ly + labelH * 0.62}" text-anchor="middle" font-family="${font}" font-size="${u * 2}" font-weight="600" fill="#475569">${esc(label)}</text>`
    }
  </g>
</svg>`;
}
