export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Interest {
  title: string;
  description: string;
}

export interface WritingPiece {
  title: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FocusArea {
  title: string;
  description: string;
  connectedExperiences: string[];
}

export interface ExperienceEntry {
  title: string;
  role: string;
  description: string;
}

export interface ExperienceCategory {
  category: string;
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
