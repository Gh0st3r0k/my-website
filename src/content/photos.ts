import type { Locale } from "@/config/site";

export type PersonalPhoto = {
  /** Public path, e.g. /images/personal/portrait.webp (without basePath). */
  src: string;
  /** Actual pixel dimensions reserve space before the image loads. */
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption?: Record<Locale, string>;
};

/** First photo is the main portrait. Remaining photos form a static grid.
 * Add only photos intended for public display. An empty list hides the gallery.
 */
export const personalPhotos: PersonalPhoto[] = [
  {
    src: "/images/personal/k-zaitsev.png",
    width: 1122,
    height: 1402,
    alt: {
      en: "Portrait of Kostiantyn Zaitsev",
      sk: "Portrét Kostiantyna Zaitseva",
      ru: "Портрет Kostiantyn Zaitsev",
      uk: "Портрет Kostiantyn Zaitsev",
    },
  },
];

/** Main real portrait for the hero and personal gallery. Header artwork is configured separately in site.ts. */
export const primaryPhoto = personalPhotos[0];
