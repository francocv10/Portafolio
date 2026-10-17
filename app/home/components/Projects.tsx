import type { Project } from "../../data/data";

type ProjectsProps = {
  title: string;
  countLabel: string;
  captureLabel: string;
  caseLabel: string;
  items: Project[];
};

const FIRST_DELAY = 5;
const LAST_DELAY = 8;

export default function Projects({
  title,
  countLabel,
  captureLabel,
  caseLabel,
  items,
}: ProjectsProps) {
  const count = String(items.length).padStart(2, "0");

  return (
    <section
      id="proyectos"
      className="px-[clamp(24px,5vw,64px)] pb-[clamp(64px,8vw,112px)]"
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
        <div className="rise d5 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
          <h2 className="text-[28px] font-extrabold tracking-[-0.02em]">
            {title}
          </h2>
          <p className="font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">
            {count} {countLabel}
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {items.map((project, i) => (
            <article
              key={project.title}
              className={`card rise d${Math.min(FIRST_DELAY + i, LAST_DELAY)} min-w-0 flex-[1_1_440px] flex-col gap-[18px] rounded-card border border-line bg-surface p-[18px] flex`}
            >
              <div className="h-[240px] overflow-hidden rounded-shot">
                <div className="shot-inner flex h-full w-full items-center justify-center bg-surface-sunken">
                  <span className="font-mono text-[12px] tracking-[0.12em] text-faint">
                    {captureLabel}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 px-1.5 pb-1.5">
                <h3 className="text-[22px] font-bold tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-muted">
                  {project.summary}
                </p>
                <p className="font-mono text-[12px] text-faint">
                  {project.meta}
                </p>
                <a
                  href={project.href}
                  className="mt-1 self-start py-3 text-[15px] font-semibold text-accent"
                >
                  <span className="case">{caseLabel}</span>{" "}
                  <span className="arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
