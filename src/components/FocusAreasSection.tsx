import SectionHeading from "./SectionHeading";
import { focusAreas } from "@/data/content";

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

export default function FocusAreasSection() {
  return (
    <section id="focus" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Focus Areas"
          subtitle="Recurring themes across my work — each informed by a different combination of experiences."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <div
              key={area.title}
              className={`group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] ${
                i >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Gradient accent at top */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentColors[i]}`}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`h-2 w-2 rounded-full ${accentDots[i]}`}
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {area.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400">
                  {area.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/[0.04]">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                    Connected work
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.connectedExperiences.map((exp) => (
                      <span
                        key={exp}
                        className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-xs text-zinc-500"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
