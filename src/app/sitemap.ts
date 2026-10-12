import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/config/site";
import { portfolioPaths } from "@/content/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  return portfolioPaths.flatMap((page) => {
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
