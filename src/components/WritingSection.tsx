import SectionHeading from "./SectionHeading";
import WritingCard from "./WritingCard";
import { writingPieces } from "@/data/content";

export default function WritingSection() {
  return (
    <section id="writing" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          title="Writing & Thinking"
          subtitle="Notes on healthcare systems, AI infrastructure, markets, risk, and public impact."
        />

        <div className="space-y-4">
          {writingPieces.map((piece) => (
            <WritingCard key={piece.title} piece={piece} />
          ))}
        </div>
      </div>
    </section>
  );
}
