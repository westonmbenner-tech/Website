"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [paletteHint, setPaletteHint] = useState("Ctrl+K");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mac =
      typeof navigator !== "undefined" &&
      /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setPaletteHint(mac ? "⌘K" : "Ctrl+K");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort(
          (a, b) =>
            (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        );
        const id = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (id) setActiveSection(id);
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: [0, 0.1, 0.25, 0.45, 0.65, 0.85, 1],
      },
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left text-sm font-semibold tracking-tight text-white transition-colors hover:text-cyan-400 sm:text-base"
        >
          Weston Benner
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 lg:gap-x-5">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`text-sm transition-colors relative pb-0.5 ${
                activeSection === href.slice(1)
                  ? "text-cyan-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
              {activeSection === href.slice(1) && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}
          <span
            className="hidden select-none items-center gap-1.5 border-l border-white/10 pl-6 text-[0.7rem] text-zinc-500 lg:flex"
            title="Open command palette"
          >
            Press{" "}
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-zinc-400">
              {paletteHint}
            </kbd>
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/5 px-6 pb-4">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`block w-full text-left py-2.5 text-sm transition-colors ${
                activeSection === href.slice(1)
                  ? "text-cyan-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
