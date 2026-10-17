import type { SocialLink } from "../../data/data";

type FooterProps = {
  eyebrow: string;
  title: string;
  email: string;
  socials: SocialLink[];
};

export default function Footer({
  eyebrow,
  title,
  email,
  socials,
}: FooterProps) {
  return (
    <footer
      id="contacto"
      className="mt-auto bg-ink leading-[normal] px-[clamp(24px,5vw,64px)] py-[clamp(56px,7vw,96px)] text-page"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-end justify-between gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
          <p className="font-mono text-[12px] tracking-[0.14em] text-[#A3A3AC] uppercase">
            {eyebrow}
          </p>
          <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
            {title}
          </h2>
          <a
            href={`mailto:${email}`}
            className="py-2.5 text-[20px] text-page underline underline-offset-[6px]"
          >
            {email}
          </a>
        </div>
        <nav className="flex flex-wrap gap-2">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              className="social rounded-full border border-[#3A3A42] px-[22px] py-[13px] text-[15px] font-semibold text-page"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
