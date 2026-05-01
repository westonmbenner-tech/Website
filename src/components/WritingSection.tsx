"use client";

import { useId, useState } from "react";
import CollegePoems from "./CollegePoems";
import SectionHeading from "./SectionHeading";
import WritingCard from "./WritingCard";
import { writingPieces } from "@/data/content";

type PersonalTab = "college" | "highschool";

export default function WritingSection() {
  const baseId = useId().replace(/:/g, "");
  const [personalTab, setPersonalTab] = useState<PersonalTab>("college");

  const tabBtn = (active: boolean) =>
    `min-h-[3.25rem] flex-1 rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-colors sm:min-h-[3.5rem] sm:rounded-2xl sm:text-[0.9375rem] ${
      active
        ? "border-cyan-500/40 bg-cyan-500/10 text-white"
        : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-cyan-500/25 hover:bg-white/[0.06] hover:text-white"
    }`;

  return (
    <section id="writing" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          title="Writing & Thinking"
          subtitle="Notes on healthcare systems, AI infrastructure, markets, risk, and public impact."
        />

        <div className="mt-8 space-y-4">
          {writingPieces.map((piece) => (
            <WritingCard key={piece.title} piece={piece} />
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-14">
          <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Personal Writing:
          </h3>

          <div
            className="mt-6 flex gap-2 sm:gap-3"
            role="tablist"
            aria-label="Personal writing"
          >
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-college`}
              aria-selected={personalTab === "college"}
              aria-controls={`${baseId}-panel-personal`}
              tabIndex={personalTab === "college" ? 0 : -1}
              onClick={() => setPersonalTab("college")}
              className={tabBtn(personalTab === "college")}
            >
              College writing
            </button>
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-highschool`}
              aria-selected={personalTab === "highschool"}
              aria-controls={`${baseId}-panel-personal`}
              tabIndex={personalTab === "highschool" ? 0 : -1}
              onClick={() => setPersonalTab("highschool")}
              className={tabBtn(personalTab === "highschool")}
            >
              High school writing
            </button>
          </div>

          <div
            id={`${baseId}-panel-personal`}
            role="tabpanel"
            aria-labelledby={
              personalTab === "college"
                ? `${baseId}-tab-college`
                : `${baseId}-tab-highschool`
            }
            className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-8 sm:px-6"
          >
            {personalTab === "college" ? (
              <CollegePoems />
            ) : (
              <div className="text-center text-sm leading-relaxed text-zinc-400">
                <p>All high school journalism available at:</p>
                <a
                  href="https://threepennypress.org/staff_name/weston-benner/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block max-w-full break-words text-center font-medium text-cyan-400 underline-offset-2 transition-colors hover:text-cyan-300 hover:underline"
                >
                  threepennypress.org/staff_name/weston-benner/
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
