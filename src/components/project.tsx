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
        ) : kind === "character" ? (
          <>
            <rect x="120" y="25" width="180" height="170" rx="14" />
            <circle cx="210" cy="75" r="22" />
            <path d="M170 125Q210 90 250 125M155 150H265M155 170H235" />
          </>
        ) : kind === "terminal" ? (
          <>
            <rect x="65" y="35" width="290" height="150" rx="10" />
            <path d="M65 65H355M85 50H90M100 50H105M115 50H120" />
            <path className="node-active" d="m90 95 15 15-15 15M120 125H155" />
            <path d="M90 150H225M240 150H285M180 110H310" />
          </>
        ) : kind === "web" ? (
          <>
            <rect x="55" y="30" width="310" height="160" rx="10" />
            <path d="M55 60H365M75 45H80M90 45H95M105 45H110" />
            <rect
              className="node-active"
              x="80"
              y="85"
              width="80"
              height="80"
              rx="6"
            />
            <path d="M185 90H335M185 110H295M185 145H245M260 145H325" />
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
      </div>
      {related ? (
        <ProjectVisual kind={project.visual} companion={related.visual} />
      ) : (
        <Link
          className="visual-link"
          tabIndex={-1}
          aria-hidden="true"
          href={`/${locale}/projects/${project.slug}`}
        >
          <ProjectVisual kind={project.visual} />
        </Link>
      )}
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
        <div className="project-actions">
          {[project, ...(related ? [related] : [])].map((item) => (
            <Link
              key={item.slug}
              className="card-action"
              href={`/${locale}/projects/${item.slug}`}
            >
              {related ? item.name : t.detail}
            </Link>
          ))}
          {!related &&
            project.links?.map((link) => (
              <a className="text-link" key={link.href} href={link.href}>
                {t[link.label]}
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}
