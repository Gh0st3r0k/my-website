import Link from "next/link";
import Image from "next/image";
import { primaryPhoto } from "@/content/photos";
import { pages, site, assetPath, type Locale, type Page } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { Preferences } from "./preferences";
const navigation: Page[] = ["home", ...pages.filter((page) => page !== "cv")];
export function Header({
  locale,
  t,
  active,
}: {
  locale: Locale;
  t: Dictionary;
  active: Page;
}) {
  const links = navigation.map((page) => (
    <Link
      key={page}
      href={`/${locale}${page === "home" ? "" : `/${page}`}`}
      aria-current={active === page ? "page" : undefined}
    >
      {t[page]}
    </Link>
  ));
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={`/${locale}`}>
            {primaryPhoto ? (
              <Image
                className="brand-avatar"
                src={assetPath(primaryPhoto.src)}
                alt=""
                width={primaryPhoto.width}
                height={primaryPhoto.height}
                sizes="44px"
              />
            ) : (
              <span className="monogram" aria-hidden="true">
                KZ<span>↗</span>
              </span>
            )}
            <span>
              {site.name}
              <small>{t.software}</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label={t.menu}>
            {links}
          </nav>
          <div className="header-tools">
            <Link className="cv-link" href={`/${locale}/cv`}>
              {t.cv} <span aria-hidden="true">↗</span>
            </Link>
            <Preferences locale={locale} t={t} />
          </div>
          <details className="mobile-nav">
            <summary>
              {t.menu} <span aria-hidden="true">+</span>
            </summary>
            <nav aria-label={t.menu}>{links}</nav>
          </details>
        </div>
      </header>
    </>
  );
}
export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <span className="signal" aria-hidden="true" />
          {t.location}
          <p>{t.footer}</p>
        </div>
        <Link href={`/${locale}/contact`}>
          {t.contact} <span aria-hidden="true">↗</span>
        </Link>
        <span className="mono">
          ©{" "}
          {new Intl.NumberFormat(locale, { useGrouping: false }).format(
            new Date().getUTCFullYear(),
          )}{" "}
          {site.name}
        </span>
      </div>
    </footer>
  );
}
