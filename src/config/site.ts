export const locales = ["en", "sk", "ru", "uk"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export const pages = [
  "about",
  "projects",
  "experience",
  "education",
  "now",
  "contact",
  "cv",
] as const;
export type Page = "home" | (typeof pages)[number];
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}${path}`;
export const siteUrl = (path: string) =>
  new URL(`${basePath}${path}`, site.url).href;
export const site = {
  name: "Kostiantyn Zaitsev",
  university: "FIIT STU",
  headerAvatar: {
    src: "/images/general/gh0st3r0k-avatar.webp",
    width: 256,
    height: 256,
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "zaitsev.kostiantyn2004@gmail.com" as string | null,
  github: "https://github.com/Gh0st3r0k" as string | null,
  linkedin: "https://www.linkedin.com/in/kostiantyn-zaitsev-77779b311/" as
    string | null,
  cv: assetPath("/cv.pdf") as string | null,
};
