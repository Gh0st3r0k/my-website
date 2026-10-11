"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore, useEffect, useRef } from "react";
import { locales, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n";
const names = {
  en: "English",
  sk: "Slovenčina",
  ru: "Русский",
  uk: "Українська",
};
const subscribeReady = () => () => {};
const subscribe = (callback: () => void) => {
  window.addEventListener("appearance", callback);
  return () => window.removeEventListener("appearance", callback);
};
const snapshot = () => document.documentElement.dataset.preference || "system";
export function Preferences({ locale, t }: { locale: Locale; t: Dictionary }) {
  const hydrated = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  );
  const path = usePathname();
  const router = useRouter();
  const theme = useSyncExternalStore(subscribe, snapshot, () => "system");
  return (
    <div className="preferences">
      <label>
        <span className="sr-only">{t.language}</span>
        <select
          disabled={!hydrated}
          aria-label={t.language}
          value={locale}
          onChange={(event) => {
            const value = event.target.value;
            try {
              localStorage.setItem("locale", value);
            } catch {}
            document.cookie = `locale=${value};path=/;max-age=31536000;SameSite=Lax`;
            router.push(`/${value}${path.replace(/^\/(en|sk|ru|uk)/, "")}`);
          }}
        >
          {locales.map((value) => (
            <option key={value} value={value}>
              {names[value]}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">{t.appearance}</span>
        <select
          disabled={!hydrated}
          aria-label={t.appearance}
          value={theme}
          onChange={(event) => {
            const value = event.target.value;
            try {
              localStorage.setItem("appearance", value);
            } catch {}
            document.documentElement.dataset.preference = value;
            document.documentElement.dataset.theme =
              value === "system"
                ? matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light"
                : value;
            window.dispatchEvent(new Event("appearance"));
          }}
        >
          {(["system", "light", "dark", "contrast"] as const).map((value) => (
            <option key={value} value={value}>
              {t[value]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export function MotionRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const elements =
      ref.current?.querySelectorAll<HTMLElement>("[data-reveal]") || [];
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [pathname]);
  return (
    <div ref={ref} className="page-transition" key={pathname}>
      {children}
    </div>
  );
}
export function PrintButton({ label }: { label: string }) {
  return (
    <button className="button secondary" onClick={() => window.print()}>
      {label} <span aria-hidden="true">↗</span>
    </button>
  );
}
