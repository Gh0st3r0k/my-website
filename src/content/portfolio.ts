import type { MessageKey } from "@/i18n";
export type Project = {
  slug: string;
  name: string;
  description: MessageKey;
  category: MessageKey;
  technologies: string[];
  visual:
    | "automata"
    | "audio"
    | "switch"
    | "router"
    | "character"
    | "terminal"
    | "web";
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
      { title: "limitations", body: "automataLimits" },
    ],
    links: [
      { label: "demo", href: "https://gh0st3r0k.github.io/Simulator-FA/#/" },
      { label: "source", href: "https://github.com/Gh0st3r0k/Simulator-FA" },
    ],
    visual: "automata",
    featured: true,
  },
  {
    slug: "trinitypeer",
    name: "trinitypeer",
    description: "trinityDesc",
    category: "audio",
    technologies: ["Rust", "Svelte", "Tauri"],
    kind: "academic",
    sections: [
      { title: "features", body: "trinityFeatures" },
      { title: "architectureDetail", body: "trinityArchitecture" },
    ],
    links: [
      {
        label: "serverSource",
        href: "https://github.com/linearrain/trinitypeer",
      },
      {
        label: "clientSource",
        href: "https://github.com/linearrain/trinitypeer-clientside",
      },
    ],
    visual: "audio",
    featured: true,
  },
  {
    slug: "switch",
    name: "Switch",
    description: "switchDesc",
    category: "network",
    technologies: [
      "C#",
      "ASP.NET Core",
      "Electron",
      "SharpPcap",
      "PacketDotNet",
    ],
    links: [
      {
        label: "serverSource",
        href: "https://github.com/Gh0st3r0k/Switch-SERVER",
      },
      {
        label: "clientSource",
        href: "https://github.com/Gh0st3r0k/Switch-CLIENT",
      },
    ],
    kind: "academic",
    role: "projectDeveloper",
    sections: [
      { title: "features", body: "switchFeatures" },
      { title: "architectureDetail", body: "switchArchitecture" },
      { title: "limitations", body: "switchLimits" },
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
    technologies: [
      "C#",
      "ASP.NET Core",
      "Electron",
      "SharpPcap",
      "PacketDotNet",
    ],
    kind: "practicalProject",
    role: "projectDeveloper",
    sections: [
      { title: "features", body: "routerFeatures" },
      { title: "architectureDetail", body: "routerArchitecture" },
      { title: "limitations", body: "routerLimits" },
    ],
    links: [
      {
        label: "serverSource",
        href: "https://github.com/Gh0st3r0k/Router-Server",
      },
      {
        label: "clientSource",
        href: "https://github.com/Gh0st3r0k/ROUTER-CLIENT",
      },
    ],
    visual: "router",
    featured: false,
  },
  {
    slug: "dnd-player",
    name: "D&D Player",
    description: "dndDesc",
    category: "personalProject",
    technologies: ["JavaScript", "Node.js", "Express", "JSON"],
    kind: "personalProject",
    sections: [
      { title: "features", body: "dndFeatures" },
      { title: "architectureDetail", body: "dndArchitecture" },
    ],
    visual: "character",
    featured: false,
    links: [
      { label: "source", href: "https://github.com/Gh0st3r0k/D-D-player" },
    ],
  },
  {
    slug: "ascii-analyzer",
    name: "SPAASM · ASCII Analyzer",
    description: "asciiDesc",
    category: "systemsProgramming",
    technologies: ["x86-64 Assembly", "NASM", "Linux", "ELF64"],
    kind: "academic",
    role: "projectAuthor",
    sections: [
      { title: "features", body: "asciiFeatures" },
      { title: "architectureDetail", body: "asciiArchitecture" },
      { title: "limitations", body: "asciiLimits" },
    ],
    links: [
      {
        label: "source",
        href: "https://github.com/Gh0st3r0k/FIIT-STU-SPAASM-Zadanie1",
      },
    ],
    visual: "terminal",
    featured: false,
  },
  {
    slug: "socket-shell",
    name: "SPAASM · Socket Shell",
    description: "socketDesc",
    category: "systemsProgramming",
    technologies: ["C", "POSIX", "TCP sockets", "Linux", "Make"],
    kind: "academic",
    role: "projectAuthor",
    sections: [
      { title: "features", body: "socketFeatures" },
      { title: "architectureDetail", body: "socketArchitecture" },
      { title: "limitations", body: "socketLimits" },
    ],
    links: [
      {
        label: "source",
        href: "https://github.com/Gh0st3r0k/FIIt-STU-SPAASM-Zadanie2",
      },
    ],
    visual: "terminal",
    featured: false,
  },
  {
    slug: "portfolio",
    name: "Kostiantyn Zaitsev · Portfolio",
    description: "portfolioDesc",
    category: "webDevelopment",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "Playwright"],
    kind: "personalProject",
    sections: [
      { title: "features", body: "portfolioFeatures" },
      { title: "architectureDetail", body: "portfolioArchitecture" },
    ],
    links: [
      { label: "source", href: "https://github.com/Gh0st3r0k/my-website" },
      { label: "demo", href: "https://gh0st3r0k.github.io/my-website/" },
    ],
    visual: "web",
    featured: false,
  },
];
export type BackgroundSection = { title: MessageKey; body: MessageKey };
export const experience: {
  slug: string;
  sections: BackgroundSection[];
  company: string;
  role: MessageKey;
  description: MessageKey;
  start: string;
  end: string | null;
  technologies: string[];
}[] = [
  {
    slug: "ynet",
    sections: [
      { title: "roleResponsibilities", body: "ynetResponsibilities" },
      { title: "workExamples", body: "ynetExamples" },
      { title: "learning", body: "ynetLearning" },
    ],
    company: "Ynet",
    role: "ynetRole",
    description: "ynetDesc",
    start: "2025-09-01",
    end: null,
    technologies: [],
  },
  {
    slug: "pafuplex",
    sections: [
      { title: "roleResponsibilities", body: "pafuResponsibilities" },
      { title: "workExamples", body: "pafuExamples" },
    ],
    company: "PafuPlex",
    role: "pafuRole",
    description: "pafuDesc",
    start: "2025-01-01",
    end: "2025-05-01",
    technologies: ["NestJS"],
  },
];
export const education: {
  slug: string;
  description: MessageKey;
  sections: BackgroundSection[];
  degree: MessageKey;
  start: number;
  end: number | null;
  project?: string;
  expectedEnd?: number;
  thesisTitle?: string;
}[] = [
  {
    slug: "master",
    description: "masterOverview",
    sections: [
      { title: "studiedTopics", body: "masterTopics" },
      { title: "goals", body: "nowGoals" },
    ],
    degree: "master",
    start: 2026,
    end: null,
    expectedEnd: 2028,
  },
  {
    slug: "bachelor",
    description: "bachelorOverview",
    sections: [
      { title: "studiedTopics", body: "bachelorFoundation" },
      { title: "thesis", body: "automataArchitecture" },
      { title: "learned", body: "automataLearned" },
    ],
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
