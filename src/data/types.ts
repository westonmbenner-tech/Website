export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface TimelineEntry {
  title: string;
  description: string;
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
