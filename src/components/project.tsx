import Link from "next/link";
import { NetworkSymbol } from "./network-symbol";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/i18n";
import type { Project } from "@/content/portfolio";
export function ProjectVisual({
  kind,
  companion,
}: {
  kind: Project["visual"];
  companion?: Project["visual"];
}) {
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
        ) : companion === "switch" || companion === "router" ? (
          <>
            <g transform="translate(-5 40) scale(.62)">
              <NetworkSymbol kind={kind} />
            </g>
            <g transform="translate(165 40) scale(.62)">
              <NetworkSymbol kind={companion} />
            </g>
          </>
        ) : (
          <NetworkSymbol kind={kind} />
        )}
      </svg>
      <span className="visual-cross cross-one">+</span>
      <span className="visual-cross cross-two">+</span>
    </div>
  );
}
export function ProjectCard({
  project,
  related,
  index,
  locale,
  t,
}: {
  project: Project;
  related?: Project;
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
        <ProjectVisual kind={project.visual} companion={related?.visual} />
      </Link>
      <div className="card-body">
        <h3>
          <Link href={`/${locale}/projects/${project.slug}`}>
            {project.name}
          </Link>
          {related && (
            <>
              {" "}
              /{" "}
              <Link href={`/${locale}/projects/${related.slug}`}>
                {related.name}
              </Link>
            </>
          )}
        </h3>
        <p>
          {
            t[
              related && project.featuredDescription
                ? project.featuredDescription
                : project.description
            ]
          }
        </p>
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
