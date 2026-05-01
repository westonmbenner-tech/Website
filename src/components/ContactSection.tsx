"use client";

const EMAIL = "westonmbenner@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const LINKEDIN = "https://www.linkedin.com/in/weston-benner/";
const GITHUB = "https://github.com/westonmbenner-tech";
const INSTAGRAM = "https://www.instagram.com/westonbenner/";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <a
          href={MAILTO}
          className="inline-block text-3xl font-bold tracking-tight text-white transition-colors hover:text-cyan-400 sm:text-4xl"
        >
          Get in Touch
        </a>
        <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          I&rsquo;m always interested in thoughtful conversations around AI,
          healthcare, venture, markets, and public-impact technology.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={MAILTO}
            className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 active:scale-[0.97]"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <a
            href={MAILTO}
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Email
          </a>
          <span className="hidden h-4 w-px bg-white/10 sm:inline" aria-hidden />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <span className="hidden h-4 w-px bg-white/10 sm:inline" aria-hidden />
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <span className="hidden h-4 w-px bg-white/10 sm:inline" aria-hidden />
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
