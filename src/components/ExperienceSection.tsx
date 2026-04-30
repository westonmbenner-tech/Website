import SectionHeading from "./SectionHeading";
import { experienceCategories } from "@/data/content";

const categoryAccents: Record<string, string> = {
  "Technical Building": "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  "Healthcare & Research": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "Venture & Finance": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  "Public Impact & Communication": "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Key Experiences"
          subtitle="Grouped by narrative — not chronology."
        />

        <div className="space-y-12">
          {experienceCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    categoryAccents[cat.category] ??
                    "border-white/10 bg-white/5 text-zinc-300"
                  }`}
                >
                  {cat.category}
                </span>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {cat.entries.map((entry) => (
                  <div
                    key={entry.title}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <h3 className="text-sm font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-zinc-500">
                      {entry.role}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
