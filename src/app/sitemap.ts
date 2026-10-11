import type { MetadataRoute } from "next";
import { locales, pages, siteUrl } from "@/config/site";
import { projects } from "@/content/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    " ",
    ...pages,
    ...projects.map((project) => `projects/${project.slug}`),
  ].flatMap((page) => {
    const suffix = page.trim() ? `/${page}` : "";
    return locales.map((locale) => ({
      url: siteUrl(`/${locale}${suffix}/`),
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, siteUrl(`/${lang}${suffix}/`)]),
        ),
      },
    }));
  });
}
export const dynamic = "force-static";
