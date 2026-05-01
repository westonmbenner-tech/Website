export const PORTFOLIO_NAV_EVENT = "portfolio:nav" as const;

export type PortfolioNavDetail =
  | { kind: "section"; id: string }
  | { kind: "ask-chip"; chipId: string }
  | { kind: "open-travel" };

export function emitPortfolioNav(detail: PortfolioNavDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<PortfolioNavDetail>(PORTFOLIO_NAV_EVENT, { detail }),
  );
}

export function scrollToSectionId(id: string): void {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Run after layout so scroll targets exist */
export function runAfterScroll(
  fn: () => void,
  delayMs = 320,
): ReturnType<typeof setTimeout> {
  return setTimeout(fn, delayMs);
}
