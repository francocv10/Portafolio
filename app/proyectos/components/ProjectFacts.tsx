import type { SocialLink } from "../../data/data";

type ProjectFactsProps = {
  labels: { role: string; period: string; stack: string; links: string };
  role: string;
  period: string;
  stack: string;
  links: SocialLink[];
};

const labelClass =
  "m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-faint";
const columnClass = "flex min-w-0 flex-[1_1_180px] flex-col gap-2";

export default function ProjectFacts({
  labels,
  role,
  period,
  stack,
  links,
}: ProjectFactsProps) {
  const facts = [
    { label: labels.role, value: role },
    { label: labels.period, value: period },
    { label: labels.stack, value: stack },
  ];

  return (
    <section className="px-[clamp(24px,5vw,64px)] pb-[clamp(48px,6vw,80px)]">
      <div className="mx-auto flex max-w-[1000px] flex-wrap gap-8 border-y border-line py-7">
        {facts.map((fact) => (
          <div key={fact.label} className={columnClass}>
            <p className={labelClass}>{fact.label}</p>
            <p className="m-0 text-[16px] font-semibold">{fact.value}</p>
          </div>
        ))}
        <div className={columnClass}>
          <p className={labelClass}>{labels.links}</p>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-1.5 text-[16px] font-semibold text-accent no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
