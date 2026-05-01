"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import { collegePoems } from "@/data/collegePoems";
import type { CollegePoem } from "@/data/types";

function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function CollegePoems() {
  const baseId = useId().replace(/:/g, "");
  const [open, setOpen] = useState<CollegePoem | null>(null);
  const titleId = `${baseId}-poem-title`;
  const bodyId = `${baseId}-poem-body`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="text-left">
      <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/80">
        Writings
      </p>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
        Selected poems and creative work from college.
      </p>

      <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 sm:gap-5">
        {collegePoems.map((poem) => {
          const minutes = estimateReadingMinutes(poem.body);
          return (
            <li key={poem.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-200 hover:border-white/[0.1] hover:bg-white/[0.035] sm:p-6">
                <p className="text-[0.65rem] font-medium uppercase tracking-wide text-cyan-400/70">
                  {poem.label}
                </p>
                <h4 className="mt-2 font-serif text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {poem.title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {poem.description}
                </p>
                <p className="mt-3 text-xs text-zinc-500">~{minutes} min read</p>
                <button
                  type="button"
                  onClick={() => setOpen(poem)}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                  aria-haspopup="dialog"
                  aria-expanded={open?.id === poem.id}
                >
                  Read
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      {open
        ? createPortal(
            <div
              id={`${baseId}-poem-modal`}
              className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
              role="presentation"
              onClick={() => setOpen(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={bodyId}
                className="flex max-h-[min(92dvh,44rem)] w-full max-w-2xl flex-col rounded-t-2xl border border-white/10 bg-zinc-950 shadow-2xl sm:rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <header className="shrink-0 border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-[0.65rem] font-medium uppercase tracking-wide text-cyan-400/70">
                    {open.label}
                  </p>
                  <h2
                    id={titleId}
                    className="mt-1 font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl"
                  >
                    {open.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    ~{estimateReadingMinutes(open.body)} min read
                  </p>
                </header>
                <div
                  id={bodyId}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-5 sm:px-8 sm:py-7"
                >
                  <pre className="m-0 max-w-none whitespace-pre-wrap border-0 bg-transparent p-0 font-serif text-[0.9375rem] leading-[1.75] text-zinc-200 sm:text-base sm:leading-[1.8]">
                    {open.body}
                  </pre>
                </div>
                <footer className="shrink-0 border-t border-white/[0.06] px-5 py-3 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1] sm:w-auto sm:px-8"
                  >
                    Close
                  </button>
                </footer>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
