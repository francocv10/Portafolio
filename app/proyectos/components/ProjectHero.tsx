type ProjectHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

export default function ProjectHero({ eyebrow, title, lead }: ProjectHeroProps) {
  return (
    <section className="px-[clamp(24px,5vw,64px)] pt-[clamp(56px,7vw,104px)] pb-[clamp(40px,5vw,64px)]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-7">
        <p className="m-0 font-mono text-[12px] uppercase tracking-[0.14em] text-subtle">
          {eyebrow}
        </p>
        <h1 className="m-0 max-w-[18ch] text-[clamp(40px,6vw,76px)] leading-[1.04] font-extrabold tracking-[-0.035em]">
          {title}
        </h1>
        <p className="m-0 max-w-[60ch] text-[clamp(17px,1.6vw,21px)] leading-[1.6] text-muted">
          {lead}
        </p>
      </div>
    </section>
  );
}
