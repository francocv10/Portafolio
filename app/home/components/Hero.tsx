type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  stack: string[];
};

export default function Hero({ eyebrow, title, description, stack }: HeroProps) {
  return (
    <section
      id="inicio"
      className="px-[clamp(24px,5vw,64px)] pt-[clamp(64px,9vw,128px)] pb-[clamp(56px,7vw,96px)]"
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8">
        <p className="rise d1 font-mono text-[12px] tracking-[0.14em] text-subtle uppercase">
          {eyebrow}
          <span className="caret ml-1.5 inline-block h-3.5 w-2 bg-accent align-[-2px]" />
        </p>
        <h1 className="mask-line max-w-[16ch] text-[clamp(44px,7vw,92px)] leading-[1.02] font-extrabold tracking-[-0.035em]">
          {title}
        </h1>
        <p className="rise d3 max-w-[62ch] text-[clamp(17px,1.6vw,21px)] leading-[1.6] text-muted">
          {description}
        </p>
        <div className="rise d4 flex flex-wrap gap-2.5 pt-2">
          {stack.map((item) => (
            <span
              key={item}
              className="chip rounded-full border border-[#DEDDD7] px-3.5 py-2 font-mono text-[13px] text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
