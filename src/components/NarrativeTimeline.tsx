"use client";

import { useCallback, useMemo, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { timelineItems } from "@/data/personalSections";

type NarrativeTimelineProps = {
  /** Lighter chrome when nested under About. */
  embedded?: boolean;
};

export default function NarrativeTimeline({
  embedded = false,
}: NarrativeTimelineProps) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);

  const openId = hoverId ?? lockedId;
  const openItem = useMemo(
    () => timelineItems.find((t) => t.id === openId) ?? null,
    [openId],
  );

  const onNodeEnter = useCallback((id: string) => {
    setHoverId(id);
  }, []);

  const onNodeLeave = useCallback(() => {
    setHoverId(null);
  }, []);

  const toggleLock = useCallback((id: string) => {
    setLockedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="narrative-timeline"
      className={
        embedded
          ? "scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-white/[0.012] to-transparent pt-14 pb-16 sm:pt-16 sm:pb-20"
          : "scroll-mt-24 border-y border-white/[0.04] bg-gradient-to-b from-white/[0.015] to-transparent py-24"
      }
      aria-labelledby="narrative-timeline-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          titleId="narrative-timeline-heading"
          title="Where I’ve Been / Where I’m Going"
          subtitle="A path through storytelling, systems, medicine, and technology."
        />

        {/* Desktop: horizontal arc */}
        <div className="relative mt-16 hidden md:block">
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-[0.65rem] h-px bg-gradient-to-r from-cyan-500/0 via-cyan-400/35 to-violet-500/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-[0.65rem] h-px blur-sm bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            aria-hidden
          />

          <div className="relative flex justify-between gap-1">
            {timelineItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="flex min-w-0 flex-1 flex-col items-center"
                  onMouseEnter={() => onNodeEnter(item.id)}
                  onMouseLeave={onNodeLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`timeline-detail-${item.id}`}
                    onClick={() => toggleLock(item.id)}
                    className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c] rounded-xl px-1 pb-2"
                  >
                    <span
                      className={`relative z-10 h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                        item.openEnded
                          ? "border-violet-400/50 bg-violet-500/25 shadow-[0_0_22px_rgba(139,92,246,0.45)]"
                          : "border-cyan-400/40 bg-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                      } ${isOpen ? "scale-110" : "group-hover:scale-105"}`}
                    />
                    <span
                      className={`mt-4 max-w-[9.5rem] text-center text-xs font-semibold leading-snug tracking-tight transition-colors ${
                        isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className="relative mx-auto mt-10 min-h-[8.5rem] max-w-3xl px-2"
            role="region"
            aria-live="polite"
          >
            {openItem ? (
              <article
                key={openItem.id}
                id={`timeline-detail-${openItem.id}`}
                className={`timeline-detail-card rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors duration-300 ${
                  openItem.openEnded
                    ? "border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-transparent"
                    : ""
                }`}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-400/85">
                  {openItem.openEnded ? "Open chapter" : "Chapter"}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {openItem.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {openItem.description}
                </p>
              </article>
            ) : (
              <p className="text-center text-sm text-zinc-500">
                Hover or click a node to read the thread.
              </p>
            )}
          </div>
        </div>

        {/* Mobile: vertical path */}
        <div className="relative mt-10 md:hidden">
          <div
            className="absolute bottom-3 left-[0.6rem] top-3 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-400/20 to-violet-500/30"
            aria-hidden
          />
          <ul className="relative space-y-6 pl-8">
            {timelineItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setLockedId((prev) => (prev === item.id ? null : item.id))
                    }
                    className="flex w-full flex-col rounded-xl border border-transparent py-1 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c] hover:border-white/[0.06]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 h-3 w-3 shrink-0 rounded-full border ${
                          item.openEnded
                            ? "border-violet-400/50 bg-violet-500/25 shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                            : "border-cyan-400/45 bg-cyan-500/25 shadow-[0_0_14px_rgba(34,211,238,0.35)]"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">
                          {item.label}
                        </span>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
