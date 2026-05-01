import type { WritingPiece } from "@/data/types";

interface WritingCardProps {
  piece: WritingPiece;
}

const cardClassName =
  "group flex items-start justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]";

export default function WritingCard({ piece }: WritingCardProps) {
  const isDrafting = piece.label.toLowerCase() === "drafting";
  const isLinked = Boolean(piece.href);

  const inner = (
    <>
      <div>
        <h3 className="text-base font-semibold text-white">{piece.title}</h3>
      </div>
      <span
        className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
          isLinked
            ? "border-cyan-500/20 bg-cyan-500/[0.08] text-cyan-400/90"
            : isDrafting
              ? "border-cyan-500/15 bg-cyan-500/[0.06] text-cyan-400/70"
              : "border-white/[0.08] bg-white/[0.03] text-zinc-500"
        }`}
      >
        {piece.label}
      </span>
    </>
  );

  if (piece.href) {
    // Same-tab for PDFs: target="_blank" + PDF viewers/extensions often spawns multiple tabs.
    const openInNewTab =
      piece.href.startsWith("http://") || piece.href.startsWith("https://");
    return (
      <a
        href={piece.href}
        {...(openInNewTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`${cardClassName} cursor-pointer no-underline`}
      >
        {inner}
      </a>
    );
  }

  return <div className={cardClassName}>{inner}</div>;
}
