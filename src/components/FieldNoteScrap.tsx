"use client";

import type { CSSProperties } from "react";
import { useId, useState } from "react";
import type { FieldNote } from "@/data/personalSections";
import { emitPortfolioNav, scrollToSectionId } from "@/lib/portfolioNav";

const paperClipPath =
  "polygon(0 2%, 3% 0, 12% 1%, 22% 0, 35% 1.5%, 52% 0, 68% 1%, 82% 0, 94% 2%, 100% 5%, 99% 14%, 100% 28%, 98% 44%, 100% 58%, 99% 72%, 100% 86%, 97% 96%, 88% 100%, 72% 99%, 55% 100%, 38% 98%, 22% 100%, 8% 98%, 0 94%, 1% 78%, 0 62%, 1% 46%, 0 30%, 1% 14%)";

/** Fixed width so end-aligned notes do not slide horizontally when folded vs open. */
const scrapShellClass =
  "pointer-events-auto flex w-[min(100%,19rem)] max-w-[min(100%,19rem)] shrink-0 flex-col items-stretch rounded-sm border border-amber-900/25 bg-[#f2efe6] px-3.5 py-2.5 text-left shadow-[1px_2px_0_rgba(15,15,20,0.1),0_10px_22px_rgba(0,0,0,0.3)] ring-1 ring-black/5 hover:border-amber-800/35 hover:shadow-[2px_3px_0_rgba(15,15,20,0.12)]";

const scrapCtaClass =
  "mt-1.5 w-full shrink-0 rounded-md border border-amber-900/30 bg-amber-900/[0.06] px-2 py-2 text-center font-mono text-[0.68rem] font-semibold uppercase tracking-wide text-amber-950 hover:border-amber-800/45 hover:bg-amber-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2efe6] sm:text-[0.72rem]";

/** UA styles on <button> often clip multi-line content and impose a min-height; reset both. */
const toggleButtonClass =
  "flex min-h-0 w-full min-w-0 appearance-none flex-col overflow-visible bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2efe6]";

const labelClass =
  "hyphens-auto shrink-0 break-words font-mono text-[0.68rem] font-bold uppercase leading-snug tracking-wide text-amber-900/70 sm:text-[0.72rem]";

const quoteClass =
  "mt-2 break-words text-pretty font-serif text-[0.9375rem] leading-snug text-stone-900 sm:text-[1rem] sm:leading-snug";

const bodyClass =
  "mt-2 break-words font-serif text-[0.875rem] leading-snug text-stone-800 sm:text-[0.9375rem] sm:leading-relaxed";

const hintClass =
  "mt-2 shrink-0 font-mono text-[0.62rem] text-amber-900/50 sm:text-[0.65rem]";

type FieldNoteScrapProps = {
  note: FieldNote;
  /** Tilt (degrees); rotation origin follows `align` so height changes do not drift the scrap. */
  rotationDeg?: number;
  /** Horizontal placement in the strip; sets transform-origin for stable rotate + expand. */
  align?: "start" | "center" | "end";
  className?: string;
};

const originForAlign = (
  align: FieldNoteScrapProps["align"],
): CSSProperties["transformOrigin"] => {
  if (align === "end") return "top right";
  if (align === "center") return "top center";
  return "top left";
};

const staticBlockClass =
  "flex min-h-0 w-full min-w-0 flex-col overflow-visible text-left";

export default function FieldNoteScrap({
  note,
  rotationDeg = 0,
  align = "start",
  className = "",
}: FieldNoteScrapProps) {
  const expandable = note.expandable !== false;
  const [open, setOpen] = useState(false);
  const uid = useId().replace(/:/g, "");
  const controlId = `field-note-${note.id}-${uid}`;
  const nav = note.primary?.kind === "navigate" ? note.primary : undefined;

  const openTravelMap = () => {
    if (!nav) return;
    if (nav.thenEmit) emitPortfolioNav(nav.thenEmit);
    scrollToSectionId(nav.scrollToId);
  };

  const rotateStyle: CSSProperties = {
    transform: `rotate(${rotationDeg}deg)`,
    transformOrigin: originForAlign(align),
  };

  return (
    <div
      className={`pointer-events-none self-start ${className}`}
      style={rotateStyle}
    >
      <div
        className={scrapShellClass}
        style={{ clipPath: paperClipPath }}
        lang="en"
      >
        {!expandable ? (
          <>
            <div
              id={controlId}
              role="note"
              aria-label={`Field note: ${note.label}`}
              className={staticBlockClass}
            >
              <p className={labelClass}>Field note · {note.label}</p>
              <p className={quoteClass}>{note.quote}</p>
            </div>
            {nav ? (
              <button
                type="button"
                onClick={openTravelMap}
                className={scrapCtaClass}
              >
                {nav.ctaLabel}
              </button>
            ) : null}
          </>
        ) : (
          <>
            <button
              type="button"
              id={controlId}
              aria-expanded={open}
              aria-label={
                open
                  ? `Fold field note: ${note.label}`
                  : `Unfold field note: ${note.label}`
              }
              onClick={() => setOpen((v) => !v)}
              className={toggleButtonClass}
            >
              <p className={labelClass}>Field note · {note.label}</p>
              {/*
                Single grid cell so row height is max(quote, body): no layout shift when toggling.
                Inactive block is opacity-0 + pointer-events-none; aria-hidden mirrors visibility.
              */}
              <div className="grid min-w-0 grid-cols-1">
                <p
                  className={`${quoteClass} col-start-1 row-start-1 max-w-full self-start ${open ? "pointer-events-none opacity-0" : ""}`}
                  aria-hidden={open}
                >
                  {note.quote}
                </p>
                <div
                  className={`${bodyClass} col-start-1 row-start-1 max-w-full min-h-0 self-start ${!open ? "pointer-events-none opacity-0" : ""}`}
                  aria-hidden={!open}
                >
                  {note.body}
                </div>
              </div>
              <p className={hintClass}>Tap to {open ? "fold" : "unfold"}</p>
            </button>

            {nav ? (
              <button
                type="button"
                onClick={openTravelMap}
                className={scrapCtaClass}
              >
                {nav.ctaLabel}
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
