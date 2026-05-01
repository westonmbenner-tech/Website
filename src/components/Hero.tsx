"use client";

import Image from "next/image";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[min(100svh,840px)] items-center justify-center overflow-hidden pb-12 pt-28">
      {/* Curved grid + ambient (light gray mesh on white; invert + screen reads as subtle mesh on dark) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.42] mix-blend-screen invert"
          style={{ backgroundImage: "url(/hero/curved-grid.png)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/80" />
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <div className="flex flex-row items-start justify-center gap-4 text-left sm:gap-10">
          <Image
            src="/hero/profile.png"
            alt="Weston Benner"
            width={220}
            height={400}
            priority
            className="h-[min(36svh,14rem)] w-[4.75rem] shrink-0 rounded-lg object-cover object-[50%_58%] shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-2 ring-white/15 sm:h-[min(40svh,16rem)] sm:w-[5.25rem] lg:h-[min(42svh,17.5rem)] lg:w-24"
          />

          <div className="min-w-0 max-w-xl flex-1 pt-0.5">
            <p className="mb-4 text-sm font-medium tracking-widest uppercase text-cyan-400/80">
              Stanford CS + Math &middot; Healthcare &middot; Economics
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              <a
                href="https://www.linkedin.com/in/weston-benner/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-400"
              >
                Weston Benner
              </a>
            </h1>

            <p className="mt-4 text-sm font-medium tracking-widest uppercase text-cyan-400/80">
              Palantir | J.P. Morgan | MD Anderson
            </p>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Building at the intersection of AI, markets, medicine, and public
              impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
              <button
                type="button"
                onClick={() => scrollTo("#projects")}
                className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 active:scale-[0.97]"
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition-all hover:border-white/20 hover:bg-white/10 active:scale-[0.97]"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
