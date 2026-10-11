import type { MessageKey } from "@/i18n";
export type Project = {
  slug: string;
  name: string;
  description: MessageKey;
  category: MessageKey;
  technologies: string[];
  visual: "automata" | "audio" | "switch" | "router";
  featured: boolean;
  sections?: Partial<
    Record<
      | "problem"
      | "solution"
      | "features"
      | "architecture"
      | "challenges"
      | "learned",
      Partial<Record<import("@/config/site").Locale, string>>
    >
  >;
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
    technologies: ["Elm"],
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
    links: [
      { label: "source", href: "https://github.com/linearrain/trinitypeer" },
    ],
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
    visual: "switch",
    featured: true,
  },
  {
    slug: "router",
    name: "Router",
    description: "routerDesc",
    category: "network",
    technologies: ["C#", "ASP.NET Core", "Electron"],
    links: [
      { label: "source", href: "https://github.com/Gh0st3r0k/Router-Server" },
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
}[] = [
  {
    company: "Ynet",
    role: "ynetRole",
    description: "ynetDesc",
    start: "2025-09-01",
    end: null,
    technologies: [],
  },
  {
    company: "PafuPlex",
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
}[] = [
  { degree: "master", start: 2026, end: null },
  { degree: "bachelor", start: 2022, end: 2026, project: "automata-simulator" },
];
export const skills: {
  category: MessageKey;
  entries: (string | { key: MessageKey })[];
}[] = [
  { category: "software", entries: ["Elm", "Rust", "C#"] },
  { category: "backend", entries: ["NestJS", "ASP.NET Core"] },
  { category: "frontend", entries: ["Svelte", "Electron"] },
  { category: "networking", entries: [{ key: "ynetDesc" }] },
  { category: "systems", entries: [{ key: "infrastructure" }] },
  { category: "architecture", entries: [{ key: "pending" }] },
];
export const now: { category: MessageKey; body: MessageKey }[] = [
  { category: "university", body: "nowUniversity" },
  { category: "ynetRole", body: "nowYnet" },
  { category: "projects", body: "projectPending" },
  { category: "learning", body: "pending" },
  { category: "goals", body: "pending" },
];
export const about: { title: MessageKey; body: MessageKey }[] = [
  { title: "who", body: "intro" },
  { title: "university", body: "aboutUniversity" },
  { title: "development", body: "aboutSoftware" },
  { title: "infrastructure", body: "aboutNetwork" },
  { title: "workStyle", body: "pending" },
  { title: "outside", body: "pending" },
];
