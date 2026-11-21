import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

interface Props {
  items: TabItem[];
  label: string;
  variant?: "pills" | "steps";
  className?: string;
}

/** Accessible tabs (arrow keys, Home/End). Used for skills and the process stepper. */
export default function Tabs({ items, label, variant = "pills", className = "" }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = items.length;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className={`tabs tabs--${variant} ${className}`}>
      <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`tabs__tab${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${uid}-panel-${item.id}`}
          aria-labelledby={`${uid}-tab-${item.id}`}
          hidden={i !== active}
          className="tabs__panel"
          tabIndex={0}
        >
          {i === active && item.content}
        </div>
      ))}
    </div>
  );
}
