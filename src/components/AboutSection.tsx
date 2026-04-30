import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading title="About" />

        <div className="space-y-5 text-base leading-relaxed text-zinc-400">
          <p>
            I&rsquo;m a student at Stanford exploring the places where
            technology meets real-world consequence&mdash;healthcare delivery,
            emergency response, financial systems, and the organizations that
            hold them together. My work sits at the intersection of AI,
            economics, and operations, and I spend most of my time thinking
            about how intelligent systems can make complex decisions clearer
            and more actionable.
          </p>
          <p>
            Before arriving at Stanford, I built a foundation across
            journalism, EMT training, and biomedical inquiry. Those experiences
            taught me that the hardest problems are rarely technical alone;
            they involve communication, judgment under pressure, and deep
            respect for the people a system is meant to serve. Whether
            I&rsquo;m modeling an EMS dispatch workflow, writing an investment
            thesis, or designing an AI tool for a nonprofit, I try to stay
            close to the human layer.
          </p>
          <p>
            I&rsquo;m especially drawn to problems that sit between
            disciplines&mdash;where venture thinking meets clinical reality,
            where market structure meets policy, and where software meets the
            messy, high-stakes environments it needs to operate in. I&rsquo;m
            building toward work that is analytical, entrepreneurial, and
            grounded in impact.
          </p>
        </div>
      </div>
    </section>
  );
}
