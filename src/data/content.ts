import type {
  Project,
  Interest,
  WritingPiece,
  NavLink,
  FocusArea,
  ExperienceCategory,
  AwardCategory,
} from "./types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const focusAreas: FocusArea[] = [
  {
    title: "AI & Technical Systems",
    description:
      "Building data-driven and AI-enabled systems that translate complex inputs into usable decisions.",
    connectedExperiences: [
      "AbilityPath AI receptionist",
      "EMS Operations Dashboard in Palantir Foundry",
      "Convexity",
      "QuERY",
      "TensorFlow / Python / SQL / C / Java",
    ],
  },
  {
    title: "Healthcare & Emergency Medicine",
    description:
      "Exploring how better systems can improve care delivery, emergency response, and healthcare coordination.",
    connectedExperiences: [
      "Santa Clara County EMT",
      "Houston Methodist Caring Teens Ambassador",
      "MD Anderson Research Assistant",
      "EMS Operations Dashboard",
      "Healthcare venture thesis on prehospital modernization",
    ],
  },
  {
    title: "Venture, Markets & Finance",
    description:
      "Studying how capital, risk, and markets shape which ideas scale — especially in healthcare and technical infrastructure.",
    connectedExperiences: [
      "J.P. Morgan CIB Risk Management",
      "Bank of America Investment Intern",
      "SENSA VC",
      "BASES",
      "BayMed Ventures healthcare investment thesis",
      "Convexity",
    ],
  },
  {
    title: "Public Impact & Disability Advocacy",
    description:
      "Working on systems and communities that expand access, dignity, and support for people with disabilities and underserved families.",
    connectedExperiences: [
      "Best Buddies Texas Student Advisory Board / Texas Ambassador",
      "AbilityPath AI receptionist",
      "Transform Tutoring",
      "Nonprofit investment analysis at Bank of America",
    ],
  },
  {
    title: "Communication & Leadership",
    description:
      "Using writing, storytelling, and team leadership to make complex issues understandable and actionable.",
    connectedExperiences: [
      "Three Penny Press editor",
      'TED Speaker: "Students in Generation AI"',
      "National German Honor Society president",
      "Quizbowl vice president",
      "Geography Club founder",
      "Cardinal Crew leader",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "AbilityPath AI Receptionist",
    description:
      "An AI-powered intake and routing system helping families navigate disability services through structured voice/text data capture, program matching, CRM integration, and follow-up workflows.",
    tags: [
      "Voice AI",
      "LLMs",
      "Disability Services",
      "Twilio",
      "Retell AI",
      "ElevenLabs",
      "Nonprofit",
    ],
    link: "#",
  },
  {
    title: "EMS Operations Dashboard",
    description:
      "A Palantir Foundry dashboard modeling dispatch, patient status, hospital capacity, and rerouting decisions to explore the future of prehospital coordination.",
    tags: [
      "Palantir Foundry",
      "EMS",
      "Healthcare Operations",
      "Data Systems",
      "Decision Support",
    ],
    link: "#",
  },
  {
    title: "Healthcare Venture Thesis",
    description:
      "An investment thesis focused on prehospital modernization, AI-first documentation, EMS-hospital integration, and infrastructure for proactive emergency response.",
    tags: ["Healthcare VC", "EMS", "Market Research", "AI Infrastructure"],
    link: "#",
  },
  {
    title: "Convexity",
    description:
      "A market competition platform using live stock and crypto APIs to score user decisions and create a more dynamic way to learn markets.",
    tags: ["Markets", "APIs", "Product", "Competition Platform", "Finance"],
    link: "#",
  },
  {
    title: "QuERY Quantum Optimization",
    description:
      "Python-based research modeling quantum optimization and probabilistic search pathways, developed through collaboration with MIT and Harvard engineering labs.",
    tags: ["Python", "Algorithms", "Quantum Optimization", "Research"],
    link: "#",
  },
];

export const experienceCategories: ExperienceCategory[] = [
  {
    category: "Technical Building",
    entries: [
      {
        title: "AbilityPath AI Receptionist",
        role: "Project Lead",
        description:
          "Built a conversational AI intake and routing system for families seeking disability services, using LLM-based extraction, structured data capture, backend CRM integration, and SMS/consent workflows.",
      },
      {
        title: "EMS Operations Dashboard",
        role: "Builder",
        description:
          "Created a Palantir Foundry operations system integrating dispatch, hospital, and patient data to model emergency response and rerouting decisions.",
      },
      {
        title: "Convexity",
        role: "Founder",
        description:
          "Created a competition platform integrating continuous market APIs across stocks and crypto to score user decision-making.",
      },
    ],
  },
  {
    category: "Healthcare & Research",
    entries: [
      {
        title: "Santa Clara County",
        role: "Emergency Medical Technician",
        description:
          "Delivered nationally licensed emergency care and rapid triage for a large student population.",
      },
      {
        title: "MD Anderson",
        role: "Research Assistant",
        description:
          "Studied JAK/STAT pathway biology in resistant cutaneous T-cell lymphomas and presented research to senior researchers.",
      },
      {
        title: "Houston Methodist",
        role: "Caring Teens Ambassador",
        description:
          "Supported hospital operations and patient care in clinical settings.",
      },
    ],
  },
  {
    category: "Venture & Finance",
    entries: [
      {
        title: "J.P. Morgan Commercial/Investment Banking",
        role: "Incoming Summer Analyst",
        description:
          "Incoming role focused on financial risk, markets, and institutional decision-making.",
      },
      {
        title: "Bank of America",
        role: "Investment Intern",
        description:
          "Conducted fundamental analysis of mission-related nonprofits for philanthropic investment.",
      },
      {
        title: "SENSA VC / BayMed Ventures",
        role: "Healthcare Investment Research",
        description:
          "Built healthcare investment thesis work around emergency medicine and prehospital care.",
      },
      {
        title: "BASES",
        role: "Member",
        description:
          "Participated in Stanford's entrepreneurship ecosystem through venture creation, mentorship, and market validation.",
      },
    ],
  },
  {
    category: "Public Impact & Communication",
    entries: [
      {
        title: "Best Buddies",
        role: "Texas Student Advisory Board / Texas Ambassador",
        description:
          "Represented thousands of disabled students and helped lead advocacy, inclusion, and fundraising efforts.",
      },
      {
        title: "Transform Tutoring",
        role: "Educational Consultant",
        description:
          "Tutored students with Down syndrome, autism, ADHD, and dyslexia.",
      },
      {
        title: "Three Penny Press",
        role: "Editor",
        description:
          "Led and contributed to award-winning student journalism.",
      },
      {
        title: "TED Speaker",
        role: '"Students in Generation AI"',
        description:
          "Spoke publicly on students and generative AI.",
      },
    ],
  },
];

export const awardCategories: AwardCategory[] = [
  {
    category: "Academic",
    entries: [
      { title: "Stanford University Scholarship Recipient" },
      { title: "4.0 / 4.0 GPA at Stanford" },
      { title: "IB Diploma Recipient", detail: "43/45" },
      { title: "National Merit Finalist" },
      { title: "National German Exam Gold Medal" },
      { title: "International History Olympiad Qualifier" },
    ],
  },
  {
    category: "Technical",
    entries: [
      {
        title: "AP Computer Science Exam — Perfect Score",
        detail: "Top 0.15% nationwide",
      },
      {
        title: "Tech for Good Hackathon — Most Innovative Solution",
        detail: "Youngest winner among 130+ industry software engineers",
      },
      {
        title: "QuERY Research Presentations",
        detail: "MIT and Harvard Engineering",
      },
    ],
  },
  {
    category: "Leadership & Public Impact",
    entries: [
      { title: "Bank of America Student Leader" },
      {
        title: "Stanford Abundance Fellow",
        detail: "Inaugural class",
      },
      {
        title: "Best Buddies Champion of the Year Gala",
        detail: "Student leadership, $124,000 raised",
      },
      {
        title: "Texas Student Advisory Board / Texas Ambassador",
        detail: "Best Buddies",
      },
    ],
  },
  {
    category: "Communication",
    entries: [
      {
        title: 'TED Speaker — "Students in Generation AI"',
      },
      { title: "Three Penny Press Senior Editor" },
      {
        title: "Individual Journalism Recognition",
        detail: "4th in Texas for Design and Features",
      },
      {
        title: "Three Penny Press Rankings",
        detail: "Top 10 in Texas, Top 75 nationwide",
      },
    ],
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
  {
    title: "Why Emergency Response Is an Information Problem",
    label: "Drafting",
  },
  {
    title: "Building for Families, Not Just Users",
    label: "Drafting",
  },
];
