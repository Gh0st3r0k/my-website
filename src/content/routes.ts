import { pages } from "@/config/site";
import { projects, education, experience } from "./portfolio";
/** Shared list of exported paths for route generation and sitemap. */
export const portfolioPaths = [
  "",
  ...pages,
  ...projects.map((item) => `projects/${item.slug}`),
  ...education.map((item) => `education/${item.slug}`),
  ...experience.map((item) => `experience/${item.slug}`),
];
