import type { ProjectFact, ProjectSection } from "../../data/data";

type ProjectBodyProps = {
  sections: ProjectSection[];
  summaryTitle: string;
  summary: ProjectFact[];
};

export default function ProjectBody({
  sections,
  summaryTitle,
  summary,
}: ProjectBodyProps) {
  return (
    <section className="px-[clamp(24px,5vw,64px)] pb-[clamp(48px,6vw,80px)]">
      <div className="mx-auto flex max-w-[1000px] flex-wrap gap-12">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3.5">
              <h2 className="m-0 text-[26px] font-extrabold tracking-[-0.02em]">
                {section.title}
              </h2>
              <p className="m-0 text-[17px] leading-[1.7] text-ink-soft">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="m-0 flex list-disc flex-col gap-2.5 pl-[22px]">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-[17px] leading-[1.6] text-ink-soft"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <aside className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 self-start rounded-card border border-line bg-surface p-6">
          <h3 className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            {summaryTitle}
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {summary.map((fact) => (
              <li
                key={fact.label}
                className="flex flex-col gap-1 border-b border-[#EAE9E4] pb-3.5 last:border-b-0 last:pb-0"
              >
                <span className="text-[13px] text-faint">{fact.label}</span>
                <span className="text-[16px] font-semibold">{fact.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
