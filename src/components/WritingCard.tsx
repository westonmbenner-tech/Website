import type { WritingPiece } from "@/data/types";

interface WritingCardProps {
  piece: WritingPiece;
}

export default function WritingCard({ piece }: WritingCardProps) {
  const isDrafting = piece.label.toLowerCase() === "drafting";

  return (
    <div className="group flex items-start justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
      <div>
        <h3 className="text-base font-semibold text-white">{piece.title}</h3>
      </div>
      <span
        className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
          isDrafting
            ? "border-cyan-500/15 bg-cyan-500/[0.06] text-cyan-400/70"
            : "border-white/[0.08] bg-white/[0.03] text-zinc-500"
        }`}
      >
        {piece.label}
      </span>
    </div>
  );
}
