import Link from "next/link";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/i18n";
import type { Project } from "@/content/portfolio";
export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  return (
    <div className={`project-visual ${kind}`} aria-hidden="true">
      <svg viewBox="0 0 420 220" fill="none">
        {kind === "automata" ? (
          <>
            <path d="M40 110H95M145 110H265M315 110H380M120 82C120 20 290 20 290 82" />
            <circle cx="120" cy="110" r="28" />
            <circle className="node-active" cx="290" cy="110" r="28" />
            <circle cx="290" cy="110" r="21" />
            <path d="m254 103 10 7-10 7M85 103l10 7-10 7" />
            <text x="110" y="116">
              q₀
            </text>
            <text x="280" y="116">
              q₁
            </text>
            <text x="200" y="96">
              a, b
            </text>
            <text x="196" y="40">
              a
            </text>
          </>
        ) : kind === "audio" ? (
          <>
            {Array.from({ length: 33 }, (_, i) => (
              <path
                key={i}
                className={i % 3 === 0 ? "node-active" : ""}
                d={`M${50 + i * 10} ${110 - Math.sin(i * 0.6) ** 2 * 55 - 8}v${Math.sin(i * 0.6) ** 2 * 110 + 16}`}
              />
            ))}
          </>
        ) : (
          <>
            <path d="M95 60H325V160H95ZM130 85H155V110H130ZM175 85H200V110H175ZM220 85H245V110H220ZM265 85H290V110H265ZM210 160V195M95 110H45M325 110H375" />
            <circle className="node-active" cx="140" cy="138" r="3" />
            <circle className="node-active" cx="160" cy="138" r="3" />
            {kind === "router" && (
              <path d="m70 50 20-20 20 20M90 30V60M310 185l20 20 20-20M330 205V160" />
            )}
          </>
        )}
      </svg>
      <span className="visual-cross cross-one">+</span>
      <span className="visual-cross cross-two">+</span>
    </div>
  );
}
export function ProjectCard({
  project,
  index,
  locale,
  t,
}: {
  project: Project;
  index: number;
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <article className="project-card" data-reveal>
      <div className="card-meta">
        <span>
          {new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(
            index + 1,
          )}{" "}
          / {t[project.category]}
        </span>
        <span aria-hidden="true">↗</span>
      </div>
      <Link
        className="visual-link"
        tabIndex={-1}
        aria-hidden="true"
        href={`/${locale}/projects/${project.slug}`}
      >
        <ProjectVisual kind={project.visual} />
      </Link>
      <div className="card-body">
        <h3>
          <Link href={`/${locale}/projects/${project.slug}`}>
            {project.name}
          </Link>
        </h3>
        <p>{t[project.description]}</p>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <Link
          className="card-action"
          href={`/${locale}/projects/${project.slug}`}
        >
          {t.detail}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
