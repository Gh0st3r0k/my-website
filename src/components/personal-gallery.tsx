import Image from "next/image";
import { assetPath, type Locale } from "@/config/site";
import { personalPhotos } from "@/content/photos";
import type { Dictionary } from "@/i18n";

export function PersonalGallery({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  if (!personalPhotos.length) return null;
  return (
    <section
      className="section personal-gallery"
      aria-labelledby="personal-gallery-title"
      data-reveal
    >
      <div className="section-heading">
        <h2 id="personal-gallery-title">{t.personalPhotos}</h2>
      </div>
      <div className="personal-photo-grid">
        {personalPhotos.map((photo) => (
          <figure className="personal-photo" key={photo.src}>
            <a
              href={assetPath(photo.src)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.viewPhoto}: ${photo.alt[locale]}`}
            >
              <Image
                src={assetPath(photo.src)}
                alt={photo.alt[locale]}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, (max-width: 850px) 50vw, 66vw"
                loading="lazy"
              />
            </a>
            {photo.caption && <figcaption>{photo.caption[locale]}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
