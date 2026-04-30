import SectionHeading from "./SectionHeading";
import { timeline } from "@/data/content";

export default function Timeline() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading title="Experience" />

        <div className="relative ml-4 border-l border-white/[0.08] pl-8">
          {timeline.map((entry, i) => (
            <div key={entry.title} className={`relative ${i !== 0 ? "mt-10" : ""}`}>
              {/* Dot */}
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cyan-500/60 bg-zinc-950" />

              <h3 className="text-base font-semibold text-white">
                {entry.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
