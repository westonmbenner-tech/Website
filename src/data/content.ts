import type {
  Project,
  WritingPiece,
  NavLink,
  FocusArea,
  AwardCategory,
} from "./types";

export const navLinks: NavLink[] = [
  { label: "History", href: "#about" },
  { label: "Daily Dispatch", href: "#daily-dispatch" },
  { label: "Field Experience", href: "#work" },
  { label: "Cases", href: "#projects" },
  { label: "Recognition", href: "#awards" },
  { label: "Field Notes", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const focusAreas: FocusArea[] = [
  {
    title: "AI & Technical Systems",
    categoryTag: "Technical Building",
    description:
      "Building data-driven and AI-enabled systems that translate complex inputs into usable decisions.",
    entries: [
      {
        title: "AbilityPath AI Front-Desk Agent",
        role: "Project Lead",
        description:
          "Built a conversational AI front-desk intake and routing system for families seeking disability services, using LLM-based extraction, structured data capture, backend CRM integration, and SMS/consent workflows.",
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
      {
        title: "QuERY Quantum Optimization",
        role: "Research Collaborator",
        description:
          "Python-based research modeling quantum optimization and probabilistic search pathways, developed through collaboration with MIT and Harvard engineering labs.",
      },
    ],
  },
  {
    title: "Healthcare & Emergency Medicine",
    categoryTag: "Healthcare & Research",
    description:
      "Exploring how better systems can improve care delivery, emergency response, and healthcare coordination.",
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
    title: "Venture, Markets & Finance",
    categoryTag: "Venture & Finance",
    description:
      "Studying how capital, risk, and markets shape which ideas scale — especially in healthcare and technical infrastructure.",
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
        role: "Frosh Battalion",
        description:
          "Selected out of 600+ freshmen to participate in leadership training, service, and cohort programming alongside campus peers.",
      },
    ],
  },
  {
    title: "Public Impact & Disability Advocacy",
    categoryTag: "Public Impact & Communication",
    description:
      "Working on systems and communities that expand access, dignity, and support for people with disabilities and underserved families.",
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
    ],
  },
  {
    title: "Communication & Leadership",
    categoryTag: "Public Impact & Communication",
    description:
      "Using writing, storytelling, and team leadership to make complex issues understandable and actionable.",
    entries: [
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
      {
        title: "National German Honor Society",
        role: "President",
        description:
          "Led chapter initiatives and represented high-achieving language students regionally.",
      },
      {
        title: "Geography Club",
        role: "Founder",
        description:
          "Founded and organized a student geography club focused on competitions and global literacy.",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "AbilityPath AI Front-Desk Agent",
    description:
      "A 24/7 AI-powered front-desk intake and routing system helping families navigate disability services through structured voice/text data capture, program matching, CRM integration, and follow-up workflows. Used by 600 families per month. Saves ~$60,000 per year.",
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
    learnMoreDialogText:
      "Call (844) 623-3614 to interact with our agent.",
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
    anchorId: "project-ems",
    learnMoreDialogText:
      "Because of data sharing concerns, the code is not publicly available. However a 7-minute demo is available here:",
    learnMoreDialogLink: {
      href: "https://onedrive.live.com/?qt=allmyphotos&photosData=%2Fshare%2F53FEE5736CE74834%21s187e3a7eca904cdb8b6fcefef6d84cf3%3Fithint%3Dvideo%26e%3Djlb5hJ%26wdOrigin%3DOWA%2ELINK%26wdPreviousSession%3D16287535%2Ddd70%2D4d23%2Da1b9%2D0473e8a5e2a8%26migratedtospo%3Dtrue&cid=53FEE5736CE74834&id=53FEE5736CE74834%21s187e3a7eca904cdb8b6fcefef6d84cf3&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy81M2ZlZTU3MzZjZTc0ODM0L0lRQi1PbjRZa01yYlRJdHZ6djcyMkV6ekFWd2Rmdk9kLVZDN3g4ekNRZzJaT1M4P2U9amxiNWhKJndkT3JpZ2luPU9XQS5MSU5LJndkUHJldmlvdXNTZXNzaW9uPTE2Mjg3NTM1LWRkNzAtNGQyMy1hMWI5LTA0NzNlOGE1ZTJhOA&v=photos",
      label: "Watch 7-minute demo (OneDrive)",
    },
  },
  {
    title: "Healthcare Venture Thesis",
    description:
      "An investment thesis focused on prehospital modernization, AI-first documentation, EMS-hospital integration, and infrastructure for proactive emergency response.",
    tags: ["Healthcare VC", "EMS", "Market Research", "AI Infrastructure"],
    link: "/sensa-vc-building-thesis.pdf",
  },
  {
    title: "Convexity",
    description:
      "A market competition platform using live stock and crypto APIs to score user decisions and create a more dynamic way to learn markets.",
    tags: ["Markets", "APIs", "Product", "Competition Platform", "Finance"],
    link: "#",
    learnMoreDialogText:
      "Convexity is still in stealth mode. Will update as soon as Convexity is live.",
  },
  {
    title: "QuERY Quantum Optimization",
    description:
      "Python-based research modeling quantum optimization and probabilistic search pathways, developed through collaboration with MIT and Harvard engineering labs.",
    tags: ["Python", "Algorithms", "Quantum Optimization", "Research"],
    link: "#",
    learnMorePdfUrls: [
      "/query-research-paper-1.pdf",
      "/query-research-paper-2.pdf",
    ],
  },
];

export const awardCategories: AwardCategory[] = [
  {
    category: "Academic",
    entries: [
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
        detail: "Led students in Gala raising $124,000",
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
        detail: "3rd nationwide (Quill and Scroll)",
      },
      {
        title: "Three Penny Press Rankings",
        detail: "Top 10 internationally (Best of SNO)",
      },
    ],
  },
];

export const writingPieces: WritingPiece[] = [
  {
    title: "The Future of Prehospital Care",
    label: "Research Paper",
    href: "/sensa-vc-building-thesis.pdf",
  },
  {
    title: "Risk, Resilience, and the Fortress Balance Sheet",
    label: "Drafting",
  },
  {
    title: "Technology, Medicine, and Human Judgment",
    label: "Coming soon",
  },
  {
    title: "Building for Families, Not Just Users",
    label: "Drafting",
  },
  {
    title: "Unnatural Disasters: Famine as a Military Tactic",
    label: "Research paper",
    href: "/twq-famine-research-paper.pdf",
  },
];
