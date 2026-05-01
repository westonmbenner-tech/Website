"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { askMeAboutItems } from "@/data/personalSections";
import {
  PORTFOLIO_NAV_EVENT,
  type PortfolioNavDetail,
} from "@/lib/portfolioNav";

const defaultItem = askMeAboutItems[0]!;

export default function AskMeAbout() {
  const [selectedId, setSelectedId] = useState<string>(defaultItem.id);

  const selected = useMemo(
    () => askMeAboutItems.find((i) => i.id === selectedId) ?? defaultItem,
    [selectedId],
  );

  const onNav = useCallback((event: Event) => {
    const e = event as CustomEvent<PortfolioNavDetail>;
    const d = e.detail;
    if (!d || d.kind !== "ask-chip") return;
    if (askMeAboutItems.some((x) => x.id === d.chipId)) {
      setSelectedId(d.chipId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener(PORTFOLIO_NAV_EVENT, onNav);
    return () => window.removeEventListener(PORTFOLIO_NAV_EVENT, onNav);
  }, [onNav]);

  return (
    <div
      id="ask-me-about"
      className="flex h-full min-h-0 flex-1 flex-col scroll-mt-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Ask Me About…
        </h3>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Clickable threads from the things I keep coming back to.
        </p>
        <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {askMeAboutItems.map((item) => {
          const isOn = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 sm:text-[0.8125rem] ${
                isOn
                  ? "border-cyan-400/45 bg-cyan-500/15 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                  : "border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-cyan-500/25 hover:bg-white/[0.05] hover:text-zinc-200"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 flex min-h-[11rem] flex-1 flex-col">
        <article
          key={selected.id}
          className="ask-me-story flex min-h-0 flex-1 flex-col rounded-xl border border-white/[0.06] bg-zinc-950/40 p-5 sm:p-6"
        >
          <h4 className="text-base font-semibold tracking-tight text-white sm:text-lg">
            {selected.title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">
            {selected.story}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.04] pt-4">
            {selected.relatedTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
