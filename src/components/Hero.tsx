"use client";

import Image from "next/image";

type HeroProps = {
  profileSrc: string;
};

export default function Hero({ profileSrc }: HeroProps) {
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
        {/*
          Mobile: copy first, circular photo below. md+: photo left (order-1), copy right.
          Profile asset is pre-cropped to 800x800 with face framing, smoothing, and border.
        */}
        <div className="flex flex-col gap-8 text-left md:flex-row md:items-center md:justify-center md:gap-4 lg:gap-10">
          <div className="min-w-0 max-w-xl flex-1 pt-0.5 md:order-2">
            <p className="mb-3 text-sm font-medium tracking-widest uppercase text-cyan-400/80 sm:mb-4">
              Stanford CS &middot; Healthcare &middot; Economics
            </p>

            <h1 className="min-w-0 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              <a
                href="https://www.linkedin.com/in/weston-benner/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-400"
              >
                Weston Benner
              </a>
            </h1>

            <p className="mt-3 text-sm font-medium tracking-widest uppercase text-cyan-400/80 sm:mt-4">
              Palantir &middot; J.P. Morgan &middot; MD Anderson
            </p>

            <p className="mt-6 max-w-full text-lg leading-relaxed text-zinc-300 sm:text-xl">
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

          <div className="order-2 flex w-full shrink-0 justify-center md:order-1 md:w-[clamp(10rem,28vw,18rem)]">
            <div className="relative aspect-square w-full max-w-[min(16rem,52svh)] md:max-w-none">
              <Image
                src={profileSrc}
                alt="Weston Benner"
                fill
                priority
                unoptimized
                sizes="(max-width: 767px) min(100vw, 16rem), (max-width: 1024px) 28vw, 288px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
