"use client";
import { usePathname } from "next/navigation";
import {
  useSyncExternalStore,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useId,
} from "react";
import { basePath, locales, type Locale } from "@/config/site";
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
function changeLocale(value: string, path: string, locale: Locale) {
  if (value === locale) return;
  try {
    localStorage.setItem("locale", value);
  } catch {}
  document.cookie = `locale=${value};path=/;max-age=31536000;SameSite=Lax`;
  // Reload the locale document to restore its root theme before paint.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Locale root initialization requires a document navigation.
  window.location.assign(
    `${basePath}/${value}${path.replace(/^\/(en|sk|ru|uk)/, "")}${window.location.search}${window.location.hash}`,
  );
}
function changeTheme(value: string) {
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
}

export function Preferences({ locale, t }: { locale: Locale; t: Dictionary }) {
  const hydrated = useSyncExternalStore(
    subscribeReady,
    () => true,
    () => false,
  );
  const path = usePathname();
  const theme = useSyncExternalStore(subscribe, snapshot, () => "system");
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="preferences">
      <button
        className="settings-trigger"
        disabled={!hydrated}
        aria-haspopup="dialog"
        aria-controls={id}
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M4 7h16M4 17h16" />
          <circle cx="9" cy="7" r="3" />
          <circle cx="15" cy="17" r="3" />
        </svg>
        <span>{t.settings}</span>
      </button>
      <dialog
        ref={dialog}
        id={id}
        className="settings-dialog"
        aria-labelledby={`${id}-title`}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <div className="settings-heading">
          <div>
            <span className="eyebrow">{t.settingsDescription}</span>
            <h2 id={`${id}-title`}>{t.settings}</h2>
          </div>
          <button
            className="settings-close"
            aria-label={t.closeSettings}
            onClick={() => dialog.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <fieldset className="settings-group">
          <legend>{t.language}</legend>
          <div className="settings-options">
            {locales.map((value) => (
              <label className="settings-option" key={value}>
                <input
                  type="radio"
                  name={`${id}-locale`}
                  value={value}
                  checked={locale === value}
                  onChange={() => changeLocale(value, path, locale)}
                />
                <span lang={value}>{names[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="settings-group">
          <legend>{t.appearance}</legend>
          <div className="settings-options">
            {(["system", "light", "dark", "contrast"] as const).map((value) => (
              <label className="settings-option" key={value}>
                <input
                  type="radio"
                  name={`${id}-appearance`}
                  value={value}
                  checked={theme === value}
                  onChange={() => changeTheme(value)}
                />
                <span>{t[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </dialog>
    </div>
  );
}
export function MotionRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useLayoutEffect(() => {
    // Route navigation always begins at the top; explicit anchors keep their target.
    if (window.location.hash) return;
    const reset = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    // Run after the router's own layout scroll handling as well.
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  useEffect(() => {
    const onRestore = (event: PageTransitionEvent) => {
      if (event.persisted && !window.location.hash)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("pageshow", onRestore);
    return () => window.removeEventListener("pageshow", onRestore);
  }, []);
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
