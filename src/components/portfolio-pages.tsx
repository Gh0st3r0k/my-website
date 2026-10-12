import Link from "next/link";
import Image from "next/image";
import { site, assetPath, type Locale, type Page } from "@/config/site";
import type { Dictionary } from "@/i18n";
import {
  projects,
  experience,
  education,
  certifications,
  nowUpdated,
  skills,
  now,
  about,
  type Project,
} from "@/content/portfolio";
import { ProjectCard, ProjectVisual } from "./project";
import { PrintButton } from "./preferences";
export function Section({
  title,
  index,
  action,
  children,
}: {
  title: string;
  index?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="section" data-reveal>
      <div className="section-heading">
        <div>
          {index && <span className="eyebrow">[{index}]</span>}
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
export function Timeline({
  locale,
  t,
  compact = false,
}: {
  locale: Locale;
  t: Dictionary;
  compact?: boolean;
}) {
  const date = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  return (
    <div className={`timeline ${compact ? "compact" : ""}`}>
      {experience.map((item) => (
        <article className="timeline-item" key={item.company} data-reveal>
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-date mono">
            <time dateTime={item.start}>{date(item.start)}</time> —{" "}
            {item.end ? (
              <time dateTime={item.end}>{date(item.end)}</time>
            ) : (
              t.present
            )}
          </div>
          <div>
            <span className="eyebrow">{item.company}</span>
            <h3>{t[item.role]}</h3>
            <p>{t[item.description]}</p>
            {!compact && item.examples && (
              <>
                <h4>{t.workExamples}</h4>
                <p>{t[item.examples]}</p>
              </>
            )}
            {item.technologies.length > 0 && (
              <div className="tags">
                {item.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export function Education({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div className="education-list">
      {education.map((item) => (
        <article className="education-card" key={item.degree} data-reveal>
          <div className="education-icon" aria-hidden="true">
            ↗
          </div>
          <div>
            <span className="eyebrow">{site.university}</span>
            <h3>{t[item.degree]}</h3>
            <p className="mono">
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(
                item.start,
              )}{" "}
              —{" "}
              {item.end
                ? new Intl.NumberFormat(locale, { useGrouping: false }).format(
                    item.end,
                  )
                : t.present}
            </p>
            {item.expectedEnd && (
              <p>
                {t.expectedGraduation}:{" "}
                {new Intl.NumberFormat(locale, { useGrouping: false }).format(
                  item.expectedEnd,
                )}
              </p>
            )}
            {item.thesisTitle && <p lang="sk">{item.thesisTitle}</p>}
            {item.project && (
              <Link href={`/${locale}/projects/${item.project}`}>
                {t.thesis}: Automatons Simulator{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export function Skills({
  t,
  compact = false,
}: {
  t: Dictionary;
  compact?: boolean;
}) {
  return (
    <div className="skills-grid">
      {skills.map((item) => (
        <article className="skill-card" key={item.category} data-reveal>
          <h3>{t[item.category]}</h3>
          {!compact && <span className="eyebrow">{t.skillPractice}</span>}
          <div className="tags">
            {item.entries.map((entry, index) => (
              <span key={index}>
                {typeof entry === "string" ? entry : t[entry.key]}
              </span>
            ))}
          </div>
          {!compact && item.academic?.length && (
            <>
              <span className="eyebrow">{t.skillAcademic}</span>
              <div className="tags">
                {item.academic.map((entry, index) => (
                  <span key={index}>
                    {typeof entry === "string" ? entry : t[entry.key]}
                  </span>
                ))}
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
export function ContactLinks({ t }: { t: Dictionary }) {
  return (
    <div className="contact-grid">
      {(["email", "github", "linkedin"] as const).map((kind) => (
        <article className="contact-card" key={kind}>
          <span className="eyebrow">{t[kind]}</span>
          {site[kind] ? (
            <a href={kind === "email" ? `mailto:${site[kind]}` : site[kind]!}>
              {site[kind]} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p>{t.notProvided}</p>
          )}
        </article>
      ))}
      <article className="contact-card">
        <span className="eyebrow">{t.contact}</span>
        <p>{t.location}</p>
      </article>
    </div>
  );
}
function ContactCTA({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="contact-cta" data-reveal>
      <div>
        <span className="eyebrow">{t.contact}</span>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactIntro}</p>
      </div>
      <Link className="button" href={`/${locale}/contact`}>
        {t.contact} <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
export function Home({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <>
      <div className="page-meta mono">
        <span>{t.location}</span>
        <span>
          {site.university} / {t.software}
        </span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="signal" aria-hidden="true" />
            {t.homeIntro}
          </span>
          <h1>
            Kostiantyn
            <br />
            <span>Zaitsev</span>
          </h1>
          <p className="position">{t.position}</p>
          <p className="hero-intro">{t.intro}</p>
          <div className="actions">
            <Link className="button" href={`/${locale}/projects`}>
              {t.explore}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button secondary" href={`/${locale}/about`}>
              {t.aboutAction}
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href={`/${locale}/cv`}>
              {t.cv}
              <span aria-hidden="true">↓</span>
            </Link>
            {site.github ? (
              <a className="text-link" href={site.github}>
                {t.github} ↗
              </a>
            ) : (
              <span className="unavailable" title={t.githubPending}>
                {t.github} · {t.notProvided}
              </span>
            )}
          </div>
        </div>
        <aside className="hero-dossier">
          <div className="dossier-top mono">
            <span>{t.overview}</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="hero-diagram" aria-hidden="true">
            <svg viewBox="0 0 360 260" fill="none">
              <path d="M60 130 180 60 300 130 180 200 60 130ZM180 60V200M60 130H300M120 95V165M240 95V165" />
              <path
                className="diagram-orbit"
                d="M60 130 180 60 300 130 180 200 60 130"
              />
              <circle cx="180" cy="130" r="35" />
              <circle cx="180" cy="130" r="24" />
              <circle cx="60" cy="130" r="6" />
              <circle cx="300" cy="130" r="6" />
              <circle cx="180" cy="60" r="6" />
              <circle cx="180" cy="200" r="6" />
            </svg>
            <span className="diagram-initials">KZ</span>
          </div>
          <div className="dossier-row">
            <span className="eyebrow">{t.university}</span>
            <strong>{site.university}</strong>
            <small>{t.master}</small>
          </div>
          <div className="dossier-row">
            <span className="eyebrow">{t.experience}</span>
            <strong>Ynet</strong>
            <small>{t.ynetRole}</small>
          </div>
        </aside>
      </section>
      <div className="now-strip">
        <span className="mono">
          <span className="signal" aria-hidden="true" />
          {t.now}
        </span>
        <p>{t.nowPreview}</p>
        <Link href={`/${locale}/now`} aria-label={t.now}>
          {t.readMore} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <section className="about-preview" data-reveal>
        <div>
          <span className="eyebrow">{t.shortAbout}</span>
          <h2>{t.aboutIntro}</h2>
        </div>
        <div>
          <p>{t.homeAbout}</p>
          <Link className="text-link" href={`/${locale}/about`}>
            {t.aboutAction} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <Section
        title={t.selected}
        index="01"
        action={
          <Link className="text-link" href={`/${locale}/projects`}>
            {t.allProjects} <span aria-hidden="true">↗</span>
          </Link>
        }
      >
        <div className="project-grid">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                related={projects.find(
                  (item) => item.slug === project.featuredCompanion,
                )}
                index={index}
                locale={locale}
                t={t}
              />
            ))}
        </div>
      </Section>
      <div className="home-columns">
        <Section title={t.experience} index="02">
          <Timeline locale={locale} t={t} compact />
          <Link className="text-link" href={`/${locale}/experience`}>
            {t.experience} <span aria-hidden="true">→</span>
          </Link>
        </Section>
        <Section title={t.skills} index="03">
          <Skills t={t} compact />
        </Section>
      </div>
      <ContactCTA locale={locale} t={t} />
    </>
  );
}
export function PageIntro({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: string;
}) {
  return (
    <header className="page-intro">
      <span className="eyebrow">
        [{index}] / {site.name}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
export function PortfolioPage({
  page,
  locale,
  t,
}: {
  page: Page;
  locale: Locale;
  t: Dictionary;
}) {
  if (page === "home") return <Home locale={locale} t={t} />;
  const descriptions = {
    about: t.aboutIntro,
    projects: t.projectsIntro,
    experience: t.experienceIntro,
    education: t.educationIntro,
    now: t.nowIntro,
    contact: t.contactIntro,
    cv: t.cvIntro,
  };
  return (
    <>
      <PageIntro
        title={t[page]}
        description={descriptions[page]}
        index={String(
          [
            "about",
            "projects",
            "experience",
            "education",
            "now",
            "contact",
            "cv",
          ].indexOf(page) + 1,
        ).padStart(2, "0")}
      />
      {page === "about" && (
        <div className="editorial-list">
          {about.map((item, index) => (
            <section key={item.title} data-reveal>
              <span className="mono">
                {new Intl.NumberFormat(locale, {
                  minimumIntegerDigits: 2,
                }).format(index + 1)}
              </span>
              <h2>{t[item.title]}</h2>
              <p>{t[item.body]}</p>
            </section>
          ))}
        </div>
      )}
      {page === "projects" && (
        <div className="project-grid collection">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      )}
      {page === "experience" && (
        <>
          <Timeline locale={locale} t={t} />
          <Section title={t.skills}>
            <Skills t={t} />
          </Section>
        </>
      )}
      {page === "education" && (
        <>
          <Education locale={locale} t={t} />
          <Section title={t.learning}>
            <p className="prose">{t.educationInterests}</p>
          </Section>
          <Section title={t.certifications}>
            <ul>
              {certifications.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Section>
        </>
      )}
      {page === "now" && (
        <>
          <p className="mono">
            {t.lastUpdated}:{" "}
            <time dateTime={nowUpdated}>
              {new Intl.DateTimeFormat(locale, {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(nowUpdated))}
            </time>
          </p>
          <div className="now-grid">
            {now.map((item) => (
              <section className="now-card" key={item.category} data-reveal>
                <span className="signal" aria-hidden="true" />
                <h2>{t[item.category]}</h2>
                <p>{t[item.body]}</p>
              </section>
            ))}
          </div>
        </>
      )}
      {page === "contact" && (
        <>
          {!site.email && !site.github && !site.linkedin && (
            <p className="content-note">{t.contactUnavailable}</p>
          )}
          <ContactLinks t={t} />
        </>
      )}
      {page === "cv" && (
        <div className="web-cv">
          <div className="actions no-print">
            <PrintButton label={t.print} />
            {site.cv && (
              <a
                className="button secondary"
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.viewOriginalCv} ↗
              </a>
            )}
            {site.cv ? (
              <a className="button" href={site.cv} download>
                {t.downloadCv}
              </a>
            ) : (
              <div className="cv-unavailable">
                <button className="button secondary" disabled>
                  {t.downloadCv}
                </button>
                <p>{t.cvMissing}</p>
              </div>
            )}
          </div>
          <p className="content-note">{t.cvNote}</p>
          <h2>{site.name}</h2>
          <p>{t.position}</p>
          <p>{t.location}</p>
          <Section title={t.experience}>
            <Timeline locale={locale} t={t} />
          </Section>
          <Section title={t.education}>
            <Education locale={locale} t={t} />
          </Section>
          <Section title={t.projects}>
            <div className="cv-projects">
              {projects.map((project) => (
                <div key={project.slug}>
                  <h3>{project.name}</h3>
                  <p>{t[project.description]}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
      {page !== "contact" && page !== "cv" && (
        <ContactCTA locale={locale} t={t} />
      )}
    </>
  );
}
export function ProjectDetail({
  project,
  locale,
  t,
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <>
      <Link className="text-link back-link" href={`/${locale}/projects`}>
        <span aria-hidden="true">←</span>
        {t.backProjects}
      </Link>
      <PageIntro
        title={project.name}
        description={t[project.description]}
        index="P"
      />
      <div className="project-detail-grid">
        <figure className="detail-visual">
          <ProjectVisual kind={project.visual} />
          <figcaption>{t.illustration}</figcaption>
        </figure>
        <aside className="project-facts">
          <span className="eyebrow">{t.category}</span>
          <p>{t[project.category]}</p>
          {project.kind && (
            <>
              <span className="eyebrow">{t.projectKind}</span>
              <p>{t[project.kind]}</p>
            </>
          )}
          {project.role && (
            <>
              <span className="eyebrow">{t.projectRole}</span>
              <p>{t[project.role]}</p>
            </>
          )}
          {project.status && (
            <>
              <span className="eyebrow">{t.projectStatus}</span>
              <p>{t[project.status]}</p>
            </>
          )}
          <span className="eyebrow">{t.technologies}</span>
          <div className="tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </aside>
      </div>
      <Section title={t.overview}>
        <p className="prose">{t[project.description]}</p>
      </Section>
      {project.sections?.map((section) => (
        <Section key={section.title} title={t[section.title]}>
          <p className="prose">{t[section.body]}</p>
        </Section>
      ))}
      {project.screenshots?.length ? (
        <Section title={t.screenshots}>
          <div className="screenshot-grid">
            {project.screenshots.map((image) => (
              <figure key={image.src}>
                <Image
                  src={assetPath(image.src)}
                  alt={image.alt[locale] || ""}
                  width={1280}
                  height={720}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 60vw"
                />
              </figure>
            ))}
          </div>
        </Section>
      ) : null}
      {project.links?.length ? (
        <Section title={t.links}>
          <div className="actions">
            {project.links.map((link) => (
              <a className="text-link" key={link.href} href={link.href}>
                {t[link.label]} ↗
              </a>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
