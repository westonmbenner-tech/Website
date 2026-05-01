export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  /** In-page anchor for command palette / deep links */
  anchorId?: string;
  /** When set, “Learn more” opens a small dialog instead of using `link`. */
  learnMoreDialogText?: string;
  /** Optional link shown under the dialog body (e.g. external demo). */
  learnMoreDialogLink?: { href: string; label: string };
  /** When set, “Learn more” opens each PDF URL in a new tab (same click). */
  learnMorePdfUrls?: string[];
}

export interface WritingPiece {
  title: string;
  label: string;
  /** When set, the row is a link (e.g. to a PDF in /public). */
  href?: string;
}

/** Creative writing shown under Writing → Personal → College. */
export interface CollegePoem {
  id: string;
  slug: string;
  title: string;
  description: string;
  label: string;
  body: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  title: string;
  role: string;
  description: string;
}

export interface FocusArea {
  title: string;
  /** Former bucket label (e.g. Technical Building, Healthcare & Research). */
  categoryTag: string;
  description: string;
  entries: ExperienceEntry[];
}

export interface AwardEntry {
  title: string;
  detail?: string;
}

export interface AwardCategory {
  category: string;
  entries: AwardEntry[];
}

export interface NetworkNode {
  id: string;
  label: string;
  type: "theme" | "experience";
  description: string;
  x: number;
  y: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
}
