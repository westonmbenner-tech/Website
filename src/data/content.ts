import type { Project, TimelineEntry, Interest, WritingPiece, NavLink } from "./types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    title: "EMS Operations Dashboard",
    description:
      "Built an emergency medical services operator dashboard modeling dispatch, field assessment, transport decisions, hospital capacity, and rerouting logic. The project explored how real-time data systems could improve prehospital coordination and decision-making.",
    tags: ["AI", "EMS", "Operations", "Palantir Foundry", "Healthcare"],
    link: "#",
  },
  {
    title: "AI Receptionist for Disability Services",
    description:
      "Designed an AI-powered intake and routing system for a special-needs nonprofit, connecting callers to relevant programs while handling structured data capture, SMS follow-up, and consent workflows.",
    tags: ["Voice AI", "Twilio", "Retell AI", "ElevenLabs", "Nonprofit"],
    link: "#",
  },
  {
    title: "Healthcare Venture Thesis",
    description:
      "Developed an investment thesis around prehospital modernization, AI-first clinical documentation, EMS-hospital integration, and infrastructure that moves emergency response from reactive to proactive.",
    tags: ["Healthcare VC", "EMS", "AI", "Market Research"],
    link: "#",
  },
  {
    title: "Journalism & Public Impact",
    description:
      "Led and contributed to student journalism focused on clear communication, public-interest storytelling, and community engagement.",
    tags: ["Writing", "Journalism", "Leadership", "Public Impact"],
    link: "#",
  },
];

export const timeline: TimelineEntry[] = [
  {
    title: "Stanford University",
    description:
      "Undergraduate studying at the intersection of AI, economics, and systems-level problem solving.",
  },
  {
    title: "Year at Palantir",
    description:
      "Incoming role focused on applied problem-solving, operational software, and real-world deployment.",
  },
  {
    title: "J.P. Morgan CIB Risk Management",
    description:
      "Experience in financial risk, markets, and institutional decision-making.",
  },
  {
    title: "EMT Certification",
    description:
      "Training in emergency care, high-pressure judgment, and patient-centered response.",
  },
  {
    title: "Journalism Leadership",
    description:
      "Experience leading and contributing to high-impact student journalism.",
  },
];

export const interests: Interest[] = [
  {
    title: "AI Systems for Healthcare",
    description:
      "Building intelligent tools that improve clinical workflows, diagnostics, and care delivery.",
  },
  {
    title: "EMS Modernization",
    description:
      "Rethinking emergency medical services with real-time data, better dispatch, and system integration.",
  },
  {
    title: "Venture Capital & Company-Building",
    description:
      "Understanding how capital, timing, and conviction intersect to create lasting companies.",
  },
  {
    title: "Financial Risk & Markets",
    description:
      "Analyzing systemic risk, market structure, and institutional decision-making.",
  },
  {
    title: "Human-Centered AI",
    description:
      "Designing AI that augments human judgment rather than replacing it.",
  },
  {
    title: "Public-Interest Communication",
    description:
      "Using clear writing and storytelling to inform, persuade, and build trust.",
  },
  {
    title: "Biomedical Engineering",
    description:
      "Exploring the intersection of engineering principles and biological systems.",
  },
  {
    title: "Operational Decision-Making",
    description:
      "Building frameworks that help organizations act faster and more clearly under uncertainty.",
  },
];

export const writingPieces: WritingPiece[] = [
  { title: "The Future of Prehospital Care", label: "Coming soon" },
  { title: "AI as Operational Infrastructure", label: "Coming soon" },
  {
    title: "Risk, Resilience, and the Fortress Balance Sheet",
    label: "Coming soon",
  },
  {
    title: "Technology, Medicine, and Human Judgment",
    label: "Coming soon",
  },
];
