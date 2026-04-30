import type { NetworkNode, NetworkEdge } from "./types";

export const networkNodes: NetworkNode[] = [
  // Theme nodes (central, larger)
  { id: "ai-systems", label: "AI Systems", type: "theme", description: "Data-driven and AI-enabled systems that translate complex inputs into usable decisions.", x: 50, y: 30 },
  { id: "healthcare", label: "Healthcare", type: "theme", description: "Improving care delivery, clinical operations, and health system coordination.", x: 20, y: 55 },
  { id: "emergency-medicine", label: "Emergency Medicine", type: "theme", description: "Prehospital care, rapid triage, and emergency response systems.", x: 80, y: 55 },
  { id: "venture-markets", label: "Venture & Markets", type: "theme", description: "Capital allocation, risk analysis, and scaling ideas in healthcare and technology.", x: 15, y: 20 },
  { id: "public-impact", label: "Public Impact", type: "theme", description: "Expanding access, dignity, and support for underserved communities.", x: 85, y: 20 },
  { id: "communication", label: "Communication", type: "theme", description: "Using writing, storytelling, and public speaking to make complex issues actionable.", x: 50, y: 75 },

  // Experience nodes
  { id: "abilitypath", label: "AbilityPath AI", type: "experience", description: "AI-powered intake and routing system for families seeking disability services.", x: 38, y: 18 },
  { id: "ems-dashboard", label: "EMS Dashboard", type: "experience", description: "Palantir Foundry operations system for emergency medical services.", x: 65, y: 42 },
  { id: "scc-emt", label: "Santa Clara EMT", type: "experience", description: "Nationally licensed emergency care and rapid triage.", x: 88, y: 42 },
  { id: "houston-methodist", label: "Houston Methodist", type: "experience", description: "Patient care and hospital operations support.", x: 10, y: 42 },
  { id: "md-anderson", label: "MD Anderson", type: "experience", description: "JAK/STAT pathway research in resistant cutaneous T-cell lymphomas.", x: 8, y: 68 },
  { id: "baymed", label: "BayMed Ventures", type: "experience", description: "Healthcare investment thesis on prehospital modernization.", x: 30, y: 42 },
  { id: "sensa-vc", label: "SENSA VC", type: "experience", description: "Social impact venture capital with healthcare focus.", x: 12, y: 32 },
  { id: "bases", label: "BASES", type: "experience", description: "Stanford's entrepreneurship and venture creation ecosystem.", x: 25, y: 12 },
  { id: "jpmorgan", label: "J.P. Morgan CIB", type: "experience", description: "Financial risk, markets, and institutional decision-making.", x: 8, y: 12 },
  { id: "bofa", label: "Bank of America", type: "experience", description: "Fundamental analysis of nonprofits for philanthropic investment.", x: 92, y: 12 },
  { id: "best-buddies", label: "Best Buddies", type: "experience", description: "Texas Student Advisory Board / Texas Ambassador for disability advocacy.", x: 78, y: 12 },
  { id: "transform", label: "Transform Tutoring", type: "experience", description: "Educational consulting for students with Down syndrome, autism, ADHD, and dyslexia.", x: 92, y: 32 },
  { id: "tpp", label: "Three Penny Press", type: "experience", description: "Award-winning student journalism, senior editor.", x: 40, y: 85 },
  { id: "ted", label: "TED Speaker", type: "experience", description: '"Students in Generation AI" — public speaking on AI and education.', x: 60, y: 85 },
  { id: "query", label: "QuERY", type: "experience", description: "Quantum optimization and probabilistic search pathway research.", x: 62, y: 18 },
  { id: "convexity", label: "Convexity", type: "experience", description: "Market competition platform using live stock and crypto APIs.", x: 30, y: 28 },
];

export const networkEdges: NetworkEdge[] = [
  // AbilityPath
  { source: "abilitypath", target: "ai-systems" },
  { source: "abilitypath", target: "healthcare" },
  { source: "abilitypath", target: "public-impact" },

  // EMS Dashboard
  { source: "ems-dashboard", target: "ai-systems" },
  { source: "ems-dashboard", target: "healthcare" },
  { source: "ems-dashboard", target: "emergency-medicine" },

  // Santa Clara EMT
  { source: "scc-emt", target: "emergency-medicine" },
  { source: "scc-emt", target: "healthcare" },

  // Houston Methodist
  { source: "houston-methodist", target: "healthcare" },

  // MD Anderson
  { source: "md-anderson", target: "healthcare" },

  // BayMed Ventures
  { source: "baymed", target: "venture-markets" },
  { source: "baymed", target: "healthcare" },
  { source: "baymed", target: "emergency-medicine" },

  // SENSA VC
  { source: "sensa-vc", target: "venture-markets" },
  { source: "sensa-vc", target: "public-impact" },

  // BASES
  { source: "bases", target: "venture-markets" },

  // J.P. Morgan
  { source: "jpmorgan", target: "venture-markets" },

  // Bank of America
  { source: "bofa", target: "venture-markets" },
  { source: "bofa", target: "public-impact" },

  // Best Buddies
  { source: "best-buddies", target: "public-impact" },
  { source: "best-buddies", target: "communication" },

  // Transform Tutoring
  { source: "transform", target: "public-impact" },

  // Three Penny Press
  { source: "tpp", target: "communication" },

  // TED Speaker
  { source: "ted", target: "communication" },
  { source: "ted", target: "ai-systems" },

  // QuERY
  { source: "query", target: "ai-systems" },

  // Convexity
  { source: "convexity", target: "venture-markets" },
  { source: "convexity", target: "ai-systems" },
];
