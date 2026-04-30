import SectionHeading from "./SectionHeading";
import InterestCard from "./InterestCard";
import { interests } from "@/data/content";

export default function InterestsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Areas I'm Exploring"
          subtitle="Topics and fields I actively think about and build toward."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest) => (
            <InterestCard key={interest.title} interest={interest} />
          ))}
        </div>
      </div>
    </section>
  );
}
