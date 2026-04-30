import type { Interest } from "@/data/types";

interface InterestCardProps {
  interest: Interest;
}

export default function InterestCard({ interest }: InterestCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
      <h3 className="text-sm font-semibold text-white">{interest.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {interest.description}
      </p>
    </div>
  );
}
