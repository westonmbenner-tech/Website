"use client";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm font-medium tracking-widest uppercase text-cyan-400/80">
          Stanford University &middot; AI &middot; Economics &middot;
          Healthcare &middot; Venture
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Weston Benner
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-zinc-300 sm:text-xl">
          Stanford undergraduate building at the intersection of AI, markets,
          medicine, and public impact.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
          I&rsquo;m interested in using technology, analysis, and operational
          systems to solve problems in healthcare, emergency response, finance,
          and human-centered AI.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("#projects")}
            className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 active:scale-[0.97]"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 active:scale-[0.97]"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
