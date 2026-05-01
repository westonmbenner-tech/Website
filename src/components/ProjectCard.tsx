"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

const learnMoreTriggerClass =
  "mt-5 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300";

export default function ProjectCard({ project }: ProjectCardProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const dialogText = project.learnMoreDialogText;
  const pdfUrls = project.learnMorePdfUrls;
  const dialogMessageId = useId().replace(/:/g, "");

  const openAllPdfs = () => {
    if (!pdfUrls?.length) return;
    for (const href of pdfUrls) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [overlayOpen]);

  const learnMoreArrow = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );

  return (
    <div
      id={project.anchorId}
      className="group relative flex scroll-mt-28 flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent transition-all duration-300 group-hover:via-cyan-500/40" />

      <h3 className="text-lg font-semibold text-white">{project.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {dialogText ? (
        <>
          <button
            type="button"
            onClick={() => setOverlayOpen(true)}
            className={`${learnMoreTriggerClass} text-left`}
          >
            Learn more
            {learnMoreArrow}
          </button>
          {overlayOpen
            ? createPortal(
                <div
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
                  role="presentation"
                  onClick={() => setOverlayOpen(false)}
                >
                  <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={dialogMessageId}
                    className="w-full max-w-[min(calc(100vw-2rem),24rem)] rounded-xl border border-white/10 bg-zinc-900 p-5 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      id={dialogMessageId}
                      className="text-sm leading-relaxed text-zinc-300"
                    >
                      {dialogText}
                    </p>
                    {project.learnMoreDialogLink ? (
                      <a
                        href={project.learnMoreDialogLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex text-sm font-medium text-cyan-400 underline-offset-2 transition-colors hover:text-cyan-300 hover:underline"
                      >
                        {project.learnMoreDialogLink.label}
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setOverlayOpen(false)}
                      className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.06] py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
                    >
                      Close
                    </button>
                  </div>
                </div>,
                document.body,
              )
            : null}
        </>
      ) : pdfUrls && pdfUrls.length > 0 ? (
        <button
          type="button"
          onClick={openAllPdfs}
          className={`${learnMoreTriggerClass} text-left`}
        >
          Learn more
          {learnMoreArrow}
        </button>
      ) : (
        <a
          href={project.link}
          {...(project.link.startsWith("http://") ||
          project.link.startsWith("https://")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`${learnMoreTriggerClass} no-underline`}
        >
          Learn more
          {learnMoreArrow}
        </a>
      )}
    </div>
  );
}
