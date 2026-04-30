"use client";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get in Touch
        </h2>
        <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          I&rsquo;m always interested in thoughtful conversations around AI,
          healthcare, venture, markets, and public-impact technology.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:your.email@example.com"
            className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 active:scale-[0.97]"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href="mailto:your.email@example.com"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Email
          </a>
          <span className="h-4 w-px bg-white/10" />
          <a
            href="#"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <span className="h-4 w-px bg-white/10" />
          <a
            href="#"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
