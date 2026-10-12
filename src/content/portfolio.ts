import type { MessageKey } from "@/i18n";
export type Project = {
  slug: string;
  name: string;
  description: MessageKey;
  category: MessageKey;
  technologies: string[];
  visual: "automata" | "audio" | "switch" | "router";
  featured: boolean;
  featuredCompanion?: string;
  featuredDescription?: MessageKey;
  kind?: MessageKey;
  role?: MessageKey;
  status?: MessageKey;
  sections?: { title: MessageKey; body: MessageKey }[];
  screenshots?: {
    src: string;
    alt: Partial<Record<import("@/config/site").Locale, string>>;
  }[];
  links?: { label: MessageKey; href: string }[];
};
export const projects: Project[] = [
  {
    slug: "automata-simulator",
    name: "Automatons Simulator",
    description: "automataDesc",
    category: "thesis",
    technologies: ["Elm", "LocalStorage", "JSON / .fas", "GitHub Pages"],
    kind: "academic",
    role: "projectAuthor",
    status: "automataStatus",
    sections: [
      { title: "problem", body: "automataProblem" },
      { title: "features", body: "automataFeatures" },
      { title: "architectureDetail", body: "automataArchitecture" },
      { title: "learned", body: "automataLearned" },
    ],
    links: [
      { label: "demo", href: "https://gh0st3r0k.github.io/Simulator-FA/#/" },
    ],
    visual: "automata",
    featured: true,
  },
  {
    slug: "trinitypeer",
    name: "trinitypeer",
    description: "trinityDesc",
    category: "audio",
    technologies: ["Rust", "Svelte"],
    kind: "personalProject",
    sections: [{ title: "features", body: "trinityFeatures" }],
    visual: "audio",
    featured: true,
  },
  {
    slug: "switch",
    name: "Switch",
    description: "switchDesc",
    category: "network",
    technologies: ["C#", "ASP.NET Core", "Electron"],
    links: [
      { label: "source", href: "https://github.com/Gh0st3r0k/Switch-SERVER" },
    ],
    kind: "practicalProject",
    role: "projectDeveloper",
    sections: [
      { title: "features", body: "switchFeatures" },
      { title: "architectureDetail", body: "switchArchitecture" },
    ],
    featuredCompanion: "router",
    featuredDescription: "networkPairDesc",
    visual: "switch",
    featured: true,
  },
  {
    slug: "router",
    name: "Router",
    description: "routerDesc",
    category: "network",
    technologies: ["C#", "ASP.NET Core", "Electron"],
    kind: "practicalProject",
    role: "projectDeveloper",
    sections: [
      { title: "features", body: "routerFeatures" },
      { title: "architectureDetail", body: "routerArchitecture" },
    ],
    visual: "router",
    featured: false,
  },
];
export const experience: {
  company: string;
  role: MessageKey;
  description: MessageKey;
  start: string;
  end: string | null;
  technologies: string[];
  examples?: MessageKey;
}[] = [
  {
    company: "Ynet",
    examples: "ynetExamples",
    role: "ynetRole",
    description: "ynetDesc",
    start: "2025-09-01",
    end: null,
    technologies: [],
  },
  {
    company: "PafuPlex",
    examples: "pafuExamples",
    role: "pafuRole",
    description: "pafuDesc",
    start: "2025-01-01",
    end: "2025-05-01",
    technologies: ["NestJS"],
  },
];
export const education: {
  degree: MessageKey;
  start: number;
  end: number | null;
  project?: string;
  expectedEnd?: number;
  thesisTitle?: string;
}[] = [
  { degree: "master", start: 2026, end: null, expectedEnd: 2028 },
  {
    degree: "bachelor",
    start: 2022,
    end: 2026,
    project: "automata-simulator",
    thesisTitle: "Realizácia simulátora konečného automatu v jazyku Elm",
  },
];
export type SkillEntry = string | { key: MessageKey };
export const skills: {
  category: MessageKey;
  entries: SkillEntry[];
  academic?: SkillEntry[];
}[] = [
  {
    category: "software",
    entries: ["C#", "Elm", "Rust"],
    academic: ["C", "C++", "Java", "Assembly", "Python"],
  },
  {
    category: "backend",
    entries: ["ASP.NET Core", "NestJS"],
    academic: ["PostgreSQL"],
  },
  {
    category: "frontend",
    entries: ["JavaScript / TypeScript", "Svelte", "Electron"],
    academic: ["React"],
  },
  {
    category: "networking",
    entries: [{ key: "networkTasks" }, { key: "infrastructureTasks" }],
  },
  {
    category: "systems",
    entries: ["Git / GitHub", "Linux / Bash"],
    academic: ["Docker"],
  },
  {
    category: "architecture",
    entries: [{ key: "debugging" }, { key: "analytical" }],
    academic: ["Enterprise Architect"],
  },
];
export const certifications = [
  "CCNA: Introduction to Networks (CCNA1)",
  "Google AI Essentials",
];
export const nowUpdated = "2026-10-12";
export const now: { category: MessageKey; body: MessageKey }[] = [
  { category: "university", body: "nowUniversity" },
  { category: "ynetRole", body: "nowYnet" },
  { category: "projects", body: "nowProjects" },
  { category: "learning", body: "nowLearning" },
  { category: "goals", body: "nowGoals" },
];
export const about: { title: MessageKey; body: MessageKey }[] = [
  { title: "who", body: "aboutPath" },
  { title: "university", body: "aboutUniversity" },
  { title: "development", body: "aboutSoftware" },
  { title: "infrastructure", body: "aboutNetwork" },
  { title: "workStyle", body: "aboutWork" },
  { title: "outside", body: "aboutOutside" },
];
