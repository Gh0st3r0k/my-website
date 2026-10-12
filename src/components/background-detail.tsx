import Link from "next/link";
import { site, type Locale } from "@/config/site";
import { education, experience } from "@/content/portfolio";
import type { Dictionary } from "@/i18n";
import { PageIntro, Section } from "./portfolio-pages";

type Props = { locale: Locale; t: Dictionary } & (
  | { kind: "education"; item: (typeof education)[number] }
  | { kind: "experience"; item: (typeof experience)[number] }
);
export function BackgroundDetail(props: Props) {
  const { locale, t, item, kind } = props;
  const title =
    props.kind === "education"
      ? t[props.item.degree]
      : `${props.item.company} · ${t[props.item.role]}`;
  const description = t[item.description];
  const formatYear = (value: number) =>
    new Intl.NumberFormat(locale, { useGrouping: false }).format(value);
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  return (
    <>
      <Link className="text-link back-link" href={`/${locale}/${kind}`}>
        <span aria-hidden="true">←</span>
        {kind === "education" ? t.backEducation : t.backExperience}
      </Link>
      <PageIntro
        title={title}
        description={description}
        index={kind === "education" ? "ED" : "EX"}
      />
      <section className="background-facts" aria-label={t.overview}>
        <span className="eyebrow">
          {props.kind === "education" ? site.university : props.item.company}
        </span>
        <dl>
          <dt>{kind === "education" ? t.studyPeriod : t.workPeriod}</dt>
          <dd>
            {props.kind === "education" ? (
              <>
                <span>{formatYear(props.item.start)}</span> —{" "}
                {props.item.end ? (
                  <span>{formatYear(props.item.end)}</span>
                ) : (
                  t.present
                )}
              </>
            ) : (
              <>
                <time dateTime={props.item.start}>
                  {formatDate(props.item.start)}
                </time>{" "}
                —{" "}
                {props.item.end ? (
                  <time dateTime={props.item.end}>
                    {formatDate(props.item.end)}
                  </time>
                ) : (
                  t.present
                )}
              </>
            )}
          </dd>
          {props.kind === "education" && props.item.expectedEnd && (
            <>
              <dt>{t.expectedGraduation}</dt>
              <dd>{formatYear(props.item.expectedEnd)}</dd>
            </>
          )}
        </dl>
        {props.kind === "experience" && props.item.technologies.length > 0 && (
          <div className="tags">
            {props.item.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        )}
        {props.kind === "education" && props.item.thesisTitle && (
          <p lang="sk">{props.item.thesisTitle}</p>
        )}
      </section>
      {item.sections.map((section) => (
        <Section key={section.title} title={t[section.title]}>
          <p className="prose">{t[section.body]}</p>
        </Section>
      ))}
      {props.kind === "education" && props.item.project && (
        <Link
          className="button"
          href={`/${locale}/projects/${props.item.project}`}
        >
          {t.thesis}: Automatons Simulator
        </Link>
      )}
      {props.kind === "education" && props.item.slug === "master" && (
        <Link className="text-link" href={`/${locale}/now`}>
          {t.now}
        </Link>
      )}
    </>
  );
}
