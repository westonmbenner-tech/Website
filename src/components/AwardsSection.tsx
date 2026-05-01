import SectionHeading from "./SectionHeading";
import { awardCategories } from "@/data/content";

const categoryIcons: Record<string, string> = {
  Academic: "bg-cyan-500/10 text-cyan-400",
  Technical: "bg-violet-500/10 text-violet-400",
  "Leadership & Public Impact": "bg-amber-500/10 text-amber-400",
  Communication: "bg-rose-400/10 text-rose-400",
};

export default function AwardsSection() {
  return (
    <section id="awards" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Awards & Recognition"
        />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {awardCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className={`inline-flex h-6 items-center rounded-full px-3 text-xs font-medium ${
                    categoryIcons[cat.category] ??
                    "bg-white/5 text-zinc-400"
                  }`}
                >
                  {cat.category}
                </span>
              </div>

              <ul className="space-y-2.5">
                {cat.entries.map((award) => (
                  <li
                    key={award.title}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.015] px-4 py-3 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.03]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {award.title}
                      </p>
                      {award.detail && (
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {award.detail}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
