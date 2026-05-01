import type { PortfolioNavDetail } from "@/lib/portfolioNav";

export interface TimelineItem {
  id: string;
  label: string;
  description: string;
  /** Final / future-facing node */
  openEnded?: boolean;
}

export type CommandAction =
  | { type: "section"; targetId: string }
  | { type: "ask-chip"; chipId: string }
  | { type: "section-then"; targetId: string; then: PortfolioNavDetail };

export interface CommandItem {
  id: string;
  label: string;
  keywords: string[];
  action: CommandAction;
}

export interface AskMeAboutItem {
  id: string;
  title: string;
  story: string;
  relatedTags: string[];
}

export interface FieldNote {
  id: string;
  label: string;
  /** Short line on the “scrap” (folded). */
  quote: string;
  /** Longer continuation shown when the note is unfolded. */
  body: string;
  /** When false, the scrap shows only the quote (no tap-to-expand). Default true. */
  expandable?: boolean;
  /**
   * Optional footer CTA (e.g. travel map): emits `thenEmit` then scrolls to `scrollToId`.
   */
  primary?: {
    kind: "navigate";
    scrollToId: string;
    thenEmit?: PortfolioNavDetail;
    ctaLabel: string;
  };
}

export const timelineItems: TimelineItem[] = [
  {
    id: "bellaire",
    label: "Bellaire",
    description:
      "Where I first learned to connect curiosity with community through journalism, Quiz Bowl, German, geography, Best Buddies, and hospital volunteering.",
  },
  {
    id: "stanford",
    label: "Stanford",
    description:
      "Where I’m exploring AI, economics, cognitive science, emergency medicine, venture, and the systems that shape real-world decisions.",
  },
  {
    id: "jp-morgan",
    label: "JP Morgan Investment Banking",
    description:
      "Where I’m exploring risk management, making decisions under uncertainty, and what it means to lead teams.",
  },
  {
    id: "palantir-nyc",
    label: "Palantir NYC",
    description:
      "Where I’ll work closer to operational software, high-stakes data systems, and tools designed for real-world deployment.",
  },
  {
    id: "future",
    label: "Med / AI / Systems ?",
    description:
      "The open question: how to build technology that improves care, coordination, and judgment in the moments where decisions matter most.",
    openEnded: true,
  },
];

export const commandItems: CommandItem[] = [
  {
    id: "ems-dashboard",
    label: "EMS dashboard",
    keywords: ["ems", "operations", "foundry", "dispatch", "prehospital"],
    action: { type: "section", targetId: "project-ems" },
  },
  {
    id: "quiz-bowl",
    label: "Quiz Bowl",
    keywords: ["quizbowl", "nac", "trivia"],
    action: { type: "ask-chip", chipId: "quiz-bowl" },
  },
  {
    id: "travel",
    label: "Travel",
    keywords: ["map", "globe", "countries"],
    action: {
      type: "section-then",
      targetId: "about",
      then: { kind: "open-travel" },
    },
  },
  {
    id: "writing",
    label: "Writing",
    keywords: ["essays", "notes", "thinking"],
    action: { type: "section", targetId: "writing" },
  },
  {
    id: "contact",
    label: "Contact",
    keywords: ["email", "touch", "linkedin"],
    action: { type: "section", targetId: "contact" },
  },
  {
    id: "stanford",
    label: "Stanford",
    keywords: ["school", "university"],
    action: { type: "section", targetId: "narrative-timeline" },
  },
  {
    id: "palantir",
    label: "Palantir",
    keywords: ["nyc", "foundry", "software"],
    action: { type: "section", targetId: "narrative-timeline" },
  },
  {
    id: "awards",
    label: "Awards",
    keywords: ["recognition", "honors", "prizes"],
    action: { type: "section", targetId: "awards" },
  },
  {
    id: "healthcare",
    label: "Healthcare",
    keywords: ["medicine", "clinical", "emt", "hospital"],
    action: { type: "section", targetId: "work" },
  },
  {
    id: "venture",
    label: "Venture",
    keywords: ["vc", "capital", "investment", "bases", "frosh", "battalion"],
    action: { type: "section", targetId: "work" },
  },
  {
    id: "ai-systems",
    label: "AI systems",
    keywords: ["ai", "machine learning", "llm", "technical"],
    action: { type: "section", targetId: "work" },
  },
  {
    id: "rock-climbing",
    label: "Rock climbing",
    keywords: ["climb", "boulder", "outdoor"],
    action: { type: "ask-chip", chipId: "rock-climbing" },
  },
  {
    id: "public-health",
    label: "Public health",
    keywords: ["population", "policy", "systems health"],
    action: { type: "section", targetId: "work" },
  },
];

export const askMeAboutItems: AskMeAboutItem[] = [
  {
    id: "ems-systems",
    title: "EMS systems",
    story:
      "I’m interested in emergency medicine as an information problem: fragmented signals, limited time, and decisions that have to become action quickly. That’s what drew me to EMT work and to building EMS operations tools.",
    relatedTags: ["EMT", "EMS Operations Dashboard", "Prehospital care"],
  },
  {
    id: "ai-nonprofits",
    title: "AI for nonprofits",
    story:
      "I like AI most when it reduces friction for people who already face too much of it. My AbilityPath work focused on helping families navigate disability services through better intake, routing, and follow-up.",
    relatedTags: ["AbilityPath", "Voice AI", "Disability services"],
  },
  {
    id: "medical-history",
    title: "Medical history",
    story:
      "I’m fascinated by how disease, institutions, and public trust shape each other. Medical history feels like a way to understand not just what happened, but why systems respond the way they do.",
    relatedTags: ["Institutions", "Public trust", "Systems"],
  },
  {
    id: "venture-capital",
    title: "Venture capital",
    story:
      "I’m drawn to venture as a way of studying which ideas become infrastructure. I’m especially interested in healthcare, emergency response, and technical systems that move from niche tools to default platforms.",
    relatedTags: ["Healthcare VC", "BASES", "Frosh Battalion", "Company-building"],
  },
  {
    id: "quiz-bowl",
    title: "Quiz Bowl",
    story:
      "Quiz Bowl trained me to love connections: literature to history, science to culture, geography to memory. It also made curiosity feel competitive in the best possible way.",
    relatedTags: ["Geography", "Memory", "Interdisciplinary curiosity"],
  },
  {
    id: "rock-climbing",
    title: "Rock climbing",
    story:
      "Climbing taught me that hard problems are often solved through patience, body awareness, and trust. After a knee injury and reconstruction, it also changed how I think about recovery and resilience.",
    relatedTags: ["Patience", "Recovery", "Resilience"],
  },
  {
    id: "stanford",
    title: "Stanford",
    story:
      "Stanford feels like a place where my interests can collide productively: AI, economics, medicine, ethics, systems, and people building things before they have perfect definitions.",
    relatedTags: ["CS + Math", "Economics", "Cognitive science"],
  },
  {
    id: "cpp-debugging",
    title: "C/C++ debugging",
    story:
      "I like debugging because it forces precision. C and C++ make invisible assumptions visible: memory, pointers, boundaries, and the cost of being almost right.",
    relatedTags: ["Systems", "Precision", "Low-level"],
  },
  {
    id: "public-health",
    title: "Public health",
    story:
      "Public health interests me because it connects individual care to systems-level design. The question is not only what helps one patient, but what changes outcomes across a population.",
    relatedTags: ["Population health", "Care delivery", "Policy"],
  },
  {
    id: "disability-advocacy",
    title: "Disability advocacy",
    story:
      "My work with Best Buddies and disability-focused projects shaped how I think about access. Good technology should not just be powerful; it should be reachable, understandable, and dignifying.",
    relatedTags: ["Best Buddies", "AbilityPath", "Access"],
  },
  {
    id: "travel",
    title: "Travel",
    story:
      "Travel makes the world feel both larger and more connected. Every place becomes a memory node — a geography lesson with texture, people, and story attached.",
    relatedTags: ["Geography", "Culture", "Memory"],
  },
  {
    id: "journalism",
    title: "Journalism",
    story:
      "Journalism taught me that clarity is a public service. The best writing does not just report information; it helps people understand what matters.",
    relatedTags: ["Three Penny Press", "Storytelling", "Clarity"],
  },
];

export const fieldNotes: FieldNote[] = [
  {
    id: "fn-ems",
    label: "EMS",
    quote:
      "In emergency care, intelligence only matters if it becomes action.",
    body:
      "Dispatch, crews, hospitals, and families all run on partial information. I keep returning to the gap between what we know and what we can do in the next minute — and how software can narrow that gap without adding noise.",
  },
  {
    id: "fn-ai",
    label: "AI",
    quote:
      "The best AI tools don’t replace human judgment; they compress the time between need and response.",
    body:
      "That is why I care about structured intake, clear handoffs, and interfaces that frontline people can trust. Models are only as good as the workflows they sit inside — especially in healthcare and nonprofit settings where stakes are personal.",
  },
  {
    id: "fn-travel",
    label: "Travel",
    quote: "Every map is also a memory system.",
    body:
      "Places stick as stories: a wrong turn in Rome, humidity in Singapore, and missing a train there — what should have been a headache turned into the best conversation of the trip. Geography is not just coordinates; it is how I remember why context matters when building for people I will never meet in a single room.",
    expandable: false,
    primary: {
      kind: "navigate",
      scrollToId: "daily-dispatch",
      thenEmit: { kind: "open-travel" },
      ctaLabel: "Open travel map",
    },
  },
  {
    id: "fn-markets",
    label: "Markets",
    quote:
      "Risk is not just what might go wrong; it is what you choose to preserve the ability to do.",
    body:
      "Balance sheets, liquidity, and tail events are really about optionality — who can still act when conditions break. I like markets as a discipline for thinking about resilience under uncertainty, not only returns.",
  },
  {
    id: "fn-writing",
    label: "Writing",
    quote:
      "Good writing makes complexity feel navigable without making it smaller.",
    body:
      "Whether in journalism or technical notes, the goal is the same: respect the reader’s time, signal what matters, and leave enough scaffolding that someone can disagree intelligently. Clarity is a form of care.",
  },
  {
    id: "fn-systems",
    label: "Systems",
    quote: "The most important systems are often invisible until they fail.",
    body:
      "Pipelines, incentives, and maintenance windows shape outcomes more than any single feature. I try to design with operators in mind — the person on call, the analyst refreshing a dashboard, the family waiting on a callback.",
  },
  {
    id: "fn-contact",
    label: "Correspondence",
    quote: "I read what you send.",
    body:
      "Thoughtful notes about AI, EMS, venture, or work at the intersection of those themes tend to get a substantive reply when time allows — especially if you share what you are building or questioning.",
  },
  {
    id: "fn-awards",
    label: "Recognition",
    quote: "Awards are lagging indicators.",
    body:
      "They mostly reflect teachers, teammates, and programs who believed in me before outcomes were obvious. I list them as gratitude — and as proof that encouragement can change what someone attempts next.",
  },
];

export function getFieldNote(id: string): FieldNote | undefined {
  return fieldNotes.find((n) => n.id === id);
}
