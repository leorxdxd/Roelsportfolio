/** Infinite scrolling strip of labels. Pauses on hover; static with reduced motion. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="marquee">
      <ul className="marquee__track" aria-label={label}>
        {[...items, ...items].map((t, i) => (
          <li key={`${t}-${i}`} aria-hidden={i >= items.length || undefined}>
            <span className="marquee__dot" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
