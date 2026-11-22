import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { reels } from "../data/showreel";
import { pages, site } from "../data/site";
import { useTheme } from "../lib/theme";
import Icon, { type IconName } from "./Icon";
import { playReel } from "./Showreel";

interface Item {
  id: string;
  label: string;
  hint?: string;
  icon: IconName;
  group: string;
  run: () => void;
}

export const openCommandPalette = () => window.dispatchEvent(new Event("open-command-palette"));

/** Ctrl/Cmd + K quick navigation. */
export default function CommandPalette() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items: Item[] = [
    ...pages.map((p) => ({
      id: `page-${p.label.toLowerCase()}`,
      label: p.label,
      hint: p.description,
      icon: p.icon,
      group: "Pages",
      run: () => navigate(p.to),
    })),
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      hint: p.category,
      icon: "folder" as IconName,
      group: "Projects",
      run: () => navigate(`/projects/${p.slug}`),
    })),
    ...reels.map((r) => ({
      id: `action-${r.id}`,
      label: `Watch the ${r.title.toLowerCase()}`,
      hint: `${r.duration} video`,
      icon: "play" as IconName,
      group: "Actions",
      // On Home it scrolls to the video and plays it; elsewhere it opens Home at the videos.
      run: () => {
        if (!playReel(r.id)) navigate("/#showreel");
      },
    })),
    {
      id: "action-theme",
      label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      icon: theme === "dark" ? "sun" : "moon",
      group: "Actions",
      run: toggle,
    },
    {
      id: "action-email",
      label: "Send me an email",
      hint: site.email,
      icon: "mail",
      group: "Actions",
      run: () => {
        window.location.href = `mailto:${site.email}`;
      },
    },
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q))
    : items;

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setActive(0);
      d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    const id = results[active]?.id;
    if (id) document.getElementById(`cmd-${id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const run = (item: Item) => {
    setOpen(false);
    item.run();
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="cmdk"
      aria-label="Quick navigation"
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === dialogRef.current && setOpen(false)}
    >
      <div className="cmdk__panel">
        <div className="cmdk__search">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search pages, projects, actions…"
            aria-label="Search pages, projects, and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        {results.length === 0 && <p className="cmdk__empty">No results for “{query}”.</p>}

        <ul id="cmdk-list" role="listbox" aria-label="Results" className="cmdk__list">
          {results.map((item, i) => (
            <Fragment key={item.id}>
              {(i === 0 || results[i - 1].group !== item.group) && (
                <li role="presentation" className="cmdk__group">
                  {item.group}
                </li>
              )}
              <li
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={i === active}
                className={`cmdk__item${i === active ? " is-active" : ""}`}
                onMouseMove={() => setActive(i)}
                onClick={() => run(item)}
              >
                <span className="cmdk__icon">
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="cmdk__label">{item.label}</span>
                {item.hint && <span className="cmdk__hint">{item.hint}</span>}
                <Icon name="cornerDownLeft" size={14} className="cmdk__enter" />
              </li>
            </Fragment>
          ))}
        </ul>

        <div className="cmdk__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>Enter</kbd> open
          </span>
          <span>
            <kbd>Ctrl</kbd>
            <kbd>K</kbd> toggle
          </span>
        </div>
      </div>
    </dialog>
  );
}
