type AboutProps = {
  title: string;
  paragraphs: string[];
  toolsTitle: string;
  tools: string[];
};

export default function About({
  title,
  paragraphs,
  toolsTitle,
  tools,
}: AboutProps) {
  return (
    <section
      id="sobre-mi"
      className="px-[clamp(24px,5vw,64px)] pb-[clamp(64px,8vw,112px)]"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap gap-12 border-t border-line pt-6">
        <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-5">
          <h2 className="text-[28px] font-extrabold tracking-[-0.02em]">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[17px] leading-[1.7] text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
          <h3 className="font-mono text-[12px] font-medium tracking-[0.14em] text-subtle uppercase">
            {toolsTitle}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {tools.map((tool) => (
              <li
                key={tool}
                className="border-b border-[#EAE9E4] pb-2.5 text-[15px] text-ink-soft last:border-b-0"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
