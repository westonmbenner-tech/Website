"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { commandItems, type CommandAction } from "@/data/personalSections";
import {
  emitPortfolioNav,
  runAfterScroll,
  scrollToSectionId,
} from "@/lib/portfolioNav";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function executeCommandAction(action: CommandAction): void {
  switch (action.type) {
    case "section":
      scrollToSectionId(action.targetId);
      break;
    case "ask-chip":
      scrollToSectionId("ask-me-about");
      runAfterScroll(() =>
        emitPortfolioNav({ kind: "ask-chip", chipId: action.chipId }),
      );
      break;
    case "section-then":
      scrollToSectionId(action.targetId);
      runAfterScroll(() => emitPortfolioNav(action.then));
      break;
    default:
      break;
  }
}

function matchesQuery(
  label: string,
  keywords: string[],
  q: string,
): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  if (label.toLowerCase().includes(s)) return true;
  return keywords.some((k) => k.toLowerCase().includes(s));
}

function HighlightLabel({ label, query }: { label: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{label}</>;
  try {
    const parts = label.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark
              key={i}
              className="rounded bg-cyan-400/25 px-0.5 text-inherit"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  } catch {
    return <>{label}</>;
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    return commandItems.filter((c) =>
      matchesQuery(c.label, c.keywords, query),
    );
  }, [query]);

  useEffect(() => {
    setActive((i) =>
      filtered.length === 0 ? 0 : Math.min(i, filtered.length - 1),
    );
  }, [filtered.length, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const runAt = useCallback(
    (index: number) => {
      const item = filtered[index];
      if (!item) return;
      executeCommandAction(item.action);
      close();
    },
    [filtered, close],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) {
            setQuery("");
            setActive(0);
            return false;
          }
          setQuery("");
          setActive(0);
          return true;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-palette-index="${active}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open, filtered]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center px-4 pt-[min(12vh,8rem)] pb-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-10 flex max-h-[min(70vh,32rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950/85 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        onKeyDown={onDialogKeyDown}
      >
        <div className="border-b border-white/[0.06] px-3 py-3">
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search threads…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-cyan-500/35 focus:bg-black/40"
          />
        </div>

        <ul
          ref={listRef}
          role="listbox"
          aria-label="Commands"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-zinc-500">
              No matching thread found.
            </li>
          ) : (
            filtered.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    data-palette-index={index}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => runAt(index)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-cyan-500/10 text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`}
                  >
                    <span className="font-mono text-[0.65rem] text-zinc-600">
                      →
                    </span>
                    <span className="font-medium">
                      <HighlightLabel label={item.label} query={query} />
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 text-[0.65rem] text-zinc-600">
          <span>
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-400">
              ↑↓
            </kbd>{" "}
            navigate ·{" "}
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-400">
              ↵
            </kbd>{" "}
            go ·{" "}
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-400">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
