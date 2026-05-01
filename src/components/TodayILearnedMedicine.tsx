"use client";

import { useCallback, useMemo, useState } from "react";
import {
  MEDICINE_TIL_CARDS,
  type MedicineTilCard,
} from "@/data/todayILearnedMedicine";

/** 0-based “day index” from start of calendar year (stable daily featured card). */
function dayOfYearIndex(mod: number) {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86_400_000,
  );
  const i = dayOfYear % mod;
  return ((i % mod) + mod) % mod;
}

function ShuffleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function StatusDot() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/35 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400/90 ring-2 ring-amber-500/25" />
    </span>
  );
}

export default function TodayILearnedMedicine() {
  const cards = MEDICINE_TIL_CARDS;
  const len = cards.length;

  const dailyIndex = useMemo(() => dayOfYearIndex(len), [len]);

  const [index, setIndex] = useState(dailyIndex);

  const card = cards[index] as MedicineTilCard;
  const linkLabel = `Learn more or help — ${card.name} (opens in new tab)`;

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const goRandom = useCallback(() => {
    setIndex((i) => {
      if (len <= 1) return 0;
      let j = Math.floor(Math.random() * len);
      let guard = 0;
      while (j === i && guard < 8) {
        j = Math.floor(Math.random() * len);
        guard += 1;
      }
      return j === i ? (i + 1) % len : j;
    });
  }, [len]);

  return (
    <section
      className="space-y-5"
      aria-labelledby="til-medicine-heading"
    >
      <header className="space-y-2">
        <h3
          id="til-medicine-heading"
          className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl"
        >
          Today I Learned: Medicine
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">
          Small cards on conditions most people never hear about — with links
          to organizations dedicated to curing them.
        </p>
      </header>

      <article
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/75 via-zinc-950/85 to-zinc-950/95 p-5 shadow-[0_0_40px_rgba(245,158,11,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-6"
        aria-live="polite"
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/[0.07] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-cyan-500/[0.05] blur-3xl"
          aria-hidden
        />

        <div key={index} className="til-medicine-card-in space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-2">
              <StatusDot />
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-200/85">
                Today I learned
              </p>
            </div>
            {card.tag ? (
              <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-zinc-400">
                {card.tag}
              </span>
            ) : null}
          </div>

          <div>
            <h4 className="text-balance text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              {card.name}
            </h4>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
              {card.hook}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-amber-500/35 bg-amber-500/10 px-4 py-2.5 text-center text-sm font-medium text-amber-100 transition-colors hover:border-amber-400/50 hover:bg-amber-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/70 sm:flex-initial sm:min-w-[9rem]"
              aria-label={linkLabel}
            >
              Learn / Help
              <span className="ml-1.5 text-amber-200/60" aria-hidden>
                ↗
              </span>
            </a>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:flex-initial sm:min-w-[7.5rem]"
              aria-label="Next card: show the following condition in the list"
            >
              Next card
            </button>
            <button
              type="button"
              onClick={goRandom}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-cyan-500/25 hover:bg-white/[0.07] hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60 sm:flex-initial sm:min-w-[7.5rem]"
              aria-label="Random: show another condition from the deck"
            >
              <ShuffleIcon className="shrink-0 text-cyan-300/80" />
              Shuffle
            </button>
          </div>
        </div>

        <p className="mt-5 border-t border-white/[0.06] pt-4 text-center text-[0.7rem] leading-snug text-zinc-500 sm:text-left sm:text-xs">
          <span className="block sm:inline">Awareness only — not medical advice.</span>
          <span className="mx-1 hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="block sm:inline">External site opens in a new tab.</span>
        </p>
      </article>
    </section>
  );
}
