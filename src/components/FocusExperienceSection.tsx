import SectionHeading from "./SectionHeading";
import { focusAreas } from "@/data/content";
import NetworkGraph from "./NetworkGraph";

const accentColors = [
  "from-cyan-500/20 to-cyan-500/0 border-cyan-500/10",
  "from-emerald-500/20 to-emerald-500/0 border-emerald-500/10",
  "from-violet-500/20 to-violet-500/0 border-violet-500/10",
  "from-amber-500/20 to-amber-500/0 border-amber-500/10",
  "from-rose-400/20 to-rose-400/0 border-rose-400/10",
];

const accentDots = [
  "bg-cyan-400",
  "bg-emerald-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-rose-400",
];

const categoryAccents: Record<string, string> = {
  "Technical Building": "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  "Healthcare & Research": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "Venture & Finance": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "Public Impact & Communication":
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

/**
 * lg 3-column layout: row1 AI | Healthcare | Venture; row2 (empty) | Communication | Public Impact.
 * Public Impact sits in the right column, offset down so it reads between Venture and Communication.
 */
const lgGridCell: readonly string[] = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2 lg:mt-[clamp(2.75rem,7vw,5.5rem)]",
  "lg:col-start-2 lg:row-start-2",
];

export default function FocusExperienceSection() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Focus & Experience"
          subtitle="Recurring themes across my work and the experiences behind them. Expand a section to see roles and projects in that area."
        />

        <div className="mt-10 grid auto-rows-min items-start content-start gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <details
              key={area.title}
              className={`group relative w-full self-start flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 open:border-white/[0.1] open:bg-white/[0.03] open:shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:col-span-1 ${lgGridCell[i] ?? ""}`}
            >
              <summary className="relative cursor-pointer list-none rounded-2xl p-6 [&::-webkit-details-marker]:hidden">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-open:opacity-100 ${accentColors[i]}`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${accentDots[i]}`} />
                      <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                    </div>
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${
                        categoryAccents[area.categoryTag] ??
                        "border-white/10 bg-white/5 text-zinc-300"
                      }`}
                    >
                      {area.categoryTag}
                    </span>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-1 shrink-0 text-zinc-500 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </summary>

              <div className="border-t border-white/[0.06] px-6 pb-6 pt-0">
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{area.description}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-1">
                  {area.entries.map((entry) => (
                    <div
                      key={entry.title}
                      className="rounded-xl border border-white/[0.06] bg-black/20 p-4 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
                    >
                      <h4 className="text-sm font-semibold text-white">{entry.title}</h4>
                      <p className="mt-0.5 text-xs font-medium text-zinc-500">{entry.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{entry.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>

        <NetworkGraph />
      </div>
    </section>
  );
}
