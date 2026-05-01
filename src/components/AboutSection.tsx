"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AskMeAbout from "@/components/AskMeAbout";
import NarrativeTimeline from "@/components/NarrativeTimeline";
import SectionHeading from "./SectionHeading";
import {
  PORTFOLIO_NAV_EVENT,
  type PortfolioNavDetail,
} from "@/lib/portfolioNav";

const TravelGlobe = dynamic(
  () =>
    import("@/components/travel/TravelGlobe").then((m) => ({
      default: m.TravelGlobe,
    })),
  { ssr: false, loading: () => null },
);

const DailyTossup = dynamic(() => import("@/components/DailyTossup"), {
  ssr: false,
  loading: () => null,
});

const TodayILearnedMedicine = dynamic(
  () => import("@/components/TodayILearnedMedicine"),
  { ssr: false, loading: () => null },
);

export default function AboutSection() {
  const [travelOpen, setTravelOpen] = useState(false);
  const [tossupOpen, setTossupOpen] = useState(false);
  const [tilMedicineOpen, setTilMedicineOpen] = useState(false);

  useEffect(() => {
    const onNav = (event: Event) => {
      const e = event as CustomEvent<PortfolioNavDetail>;
      if (e.detail?.kind === "open-travel") setTravelOpen(true);
    };
    window.addEventListener(PORTFOLIO_NAV_EVENT, onNav);
    return () => window.removeEventListener(PORTFOLIO_NAV_EVENT, onNav);
  }, []);

  return (
    <section id="about" className="scroll-mt-24 pt-10 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="About" />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="flex min-h-0 min-w-0 flex-col space-y-5 text-base leading-relaxed text-zinc-400 lg:h-full">
            <p>
              I&rsquo;m a student at Stanford exploring where technology meets
              real-world consequence: healthcare delivery, emergency response,
              financial systems, and the organizations that hold them all
              together. I spend most of my time thinking about how intelligent
              systems can make complex decisions clearer and more actionable.
            </p>
            <p>
              Before arriving at Stanford, I built a broad foundation across
              emergency medicine, computer science, journalism, and biomedical
              inquiry. Those experiences taught me that the hardest problems are
              rarely technical alone; they involve communication, judgment under
              pressure, and deep respect for the people a system is meant to
              serve. I&rsquo;m especially drawn to problems that sit between
              disciplines: where venture thinking meets clinical reality, where
              market structure meets policy, and where software meets the messy,
              high-stakes environments it needs to operate in.
            </p>
          </div>
          <div className="flex min-h-0 min-w-0 flex-col lg:h-full lg:border-l lg:border-white/[0.06] lg:pl-10">
            <AskMeAbout />
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <NarrativeTimeline embedded />
        </div>

        <div
          id="daily-dispatch"
          className="scroll-mt-24 mt-10 space-y-6 border-t border-white/[0.06] pt-10 lg:mt-12"
        >
          <div className="text-center">
            <h2
              id="daily-dispatch-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Daily Dispatch
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Quiz Bowl, travel map, and a medicine micro-card — same row of
              controls; open any panel below.
            </p>
          </div>

          <div
            className="grid w-full grid-cols-3 gap-1.5 sm:gap-2"
            role="group"
            aria-labelledby="daily-dispatch-heading"
          >
            <button
              type="button"
              id="about-daily-tossup-trigger"
              onClick={() => setTossupOpen((o) => !o)}
              aria-expanded={tossupOpen}
              aria-controls="about-daily-tossup-panel"
              aria-label={
                tossupOpen
                  ? "Hide daily Quiz Bowl tossup"
                  : "Open daily Quiz Bowl tossup"
              }
              className={`flex min-h-[4.25rem] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center text-[clamp(0.5625rem,1.85vw,0.8125rem)] font-medium leading-tight transition-colors sm:min-h-[4.5rem] sm:rounded-2xl sm:px-2 ${
                tossupOpen
                  ? "border-amber-500/45 bg-amber-500/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-amber-500/30 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="px-0.5">Daily Quiz Bowl Tossup</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 opacity-70 transition-transform ${tossupOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              id="about-daily-globe-trigger"
              onClick={() => setTravelOpen((o) => !o)}
              aria-expanded={travelOpen}
              aria-controls="about-daily-globe-panel"
              aria-label={
                travelOpen ? "Hide travel map" : "Open travel map"
              }
              className={`flex min-h-[4.25rem] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center text-[clamp(0.5625rem,1.85vw,0.8125rem)] font-medium leading-tight transition-colors sm:min-h-[4.5rem] sm:rounded-2xl sm:px-2 ${
                travelOpen
                  ? "border-cyan-500/40 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-cyan-500/30 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="px-0.5">Travel Map</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 opacity-70 transition-transform ${travelOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              id="about-daily-medicine-trigger"
              onClick={() => setTilMedicineOpen((o) => !o)}
              aria-expanded={tilMedicineOpen}
              aria-controls="about-daily-medicine-panel"
              aria-label={
                tilMedicineOpen
                  ? "Hide Daily Disease medicine card"
                  : "Open Daily Disease medicine card"
              }
              className={`flex min-h-[4.25rem] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center text-[clamp(0.5625rem,1.85vw,0.8125rem)] font-medium leading-tight transition-colors sm:min-h-[4.5rem] sm:rounded-2xl sm:px-2 ${
                tilMedicineOpen
                  ? "border-emerald-500/35 bg-emerald-500/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-emerald-500/25 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="px-0.5">Daily Disease</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 opacity-70 transition-transform ${tilMedicineOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {tossupOpen ? (
            <div id="about-daily-tossup-panel" className="w-full">
              <DailyTossup />
            </div>
          ) : null}
          {travelOpen ? (
            <div
              id="about-daily-globe-panel"
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/40"
            >
              <TravelGlobe embedded />
            </div>
          ) : null}
          {tilMedicineOpen ? (
            <div id="about-daily-medicine-panel" className="w-full">
              <TodayILearnedMedicine />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
