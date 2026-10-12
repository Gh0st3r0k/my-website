import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  pages,
  site,
  siteUrl,
  type Page,
} from "@/config/site";
import { messages } from "@/i18n";
import { BackgroundDetail } from "@/components/background-detail";
import { portfolioPaths } from "@/content/routes";
import { projects, education, experience } from "@/content/portfolio";
import { Header, Footer } from "@/components/shell";
import { PortfolioPage, ProjectDetail } from "@/components/portfolio-pages";
import { MotionRoot } from "@/components/preferences";
type Props = { params: Promise<{ locale: string; path?: string[] }> };
function resolve(locale: string, path: string[] = []) {
  if (!isLocale(locale)) return null;
  const t = messages(locale);
  if (path.length === 2 && path[0] === "education") {
    const item = education.find((item) => item.slug === path[1]);
    return item
      ? {
          locale,
          t,
          page: "education" as const,
          project: undefined,
          background: { kind: "education" as const, item },
          title: t[item.degree],
          description: t[item.description],
        }
      : null;
  }
  if (path.length === 2 && path[0] === "experience") {
    const item = experience.find((item) => item.slug === path[1]);
    return item
      ? {
          locale,
          t,
          page: "experience" as const,
          project: undefined,
          background: { kind: "experience" as const, item },
          title: `${item.company} · ${t[item.role]}`,
          description: t[item.description],
        }
      : null;
  }
  if (path.length === 2 && path[0] === "projects") {
    const project = projects.find((project) => project.slug === path[1]);
    return project
      ? {
          locale,
          t,
          page: "projects" as Page,
          project,
          background: undefined,
          title: project.name,
          description: t[project.description],
        }
      : null;
  }
  if (
    path.length > 1 ||
    (path.length === 1 && !pages.some((page) => page === path[0]))
  )
    return null;
  const page = (path[0] || "home") as Page;
  const descriptions = {
    home: t.intro,
    about: t.aboutIntro,
    projects: t.projectsIntro,
    experience: t.experienceIntro,
    education: t.educationIntro,
    now: t.nowIntro,
    contact: t.contactIntro,
    cv: t.cvIntro,
  };
  return {
    locale,
    t,
    page,
    project: undefined,
    background: undefined,
    title: t[page],
    description: descriptions[page],
  };
}
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    portfolioPaths.map((path) => ({
      locale,
      path: path ? path.split("/") : [],
    })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path = [] } = await params;
  const route = resolve(locale, path);
  if (!route) return {};
  const suffix = path.length ? `/${path.join("/")}` : "";
  const canonical = siteUrl(`/${locale}${suffix}/`);
  const title = `${route.title} — ${site.name}`;
  return {
    metadataBase: new URL(site.url),
    title,
    description: route.description,
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ...locales.map((lang) => [lang, siteUrl(`/${lang}${suffix}/`)]),
        ["x-default", siteUrl(`/en${suffix}/`)],
      ]),
    },
    openGraph: {
      title,
      description: route.description,
      url: canonical,
      type: "website",
      locale: { en: "en_US", sk: "sk_SK", ru: "ru_RU", uk: "uk_UA" }[
        route.locale
      ],
      siteName: site.name,
    },
    twitter: { card: "summary", title, description: route.description },
  };
}
export default async function Page({ params }: Props) {
  const { locale, path } = await params;
  const route = resolve(locale, path);
  if (!route) notFound();
  return (
    <>
      <Header locale={route.locale} t={route.t} active={route.page} />
      <main id="main" tabIndex={-1} className="container">
        <MotionRoot>
          {route.background ? (
            <BackgroundDetail
              {...route.background}
              locale={route.locale}
              t={route.t}
            />
          ) : route.project ? (
            <ProjectDetail
              project={route.project}
              locale={route.locale}
              t={route.t}
            />
          ) : (
            <PortfolioPage
              page={route.page}
              locale={route.locale}
              t={route.t}
            />
          )}
        </MotionRoot>
      </main>
      <Footer locale={route.locale} t={route.t} />
    </>
  );
}
