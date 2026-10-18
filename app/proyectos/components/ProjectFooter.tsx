import Link from "next/link";
import type { NavLink } from "../../data/data";

type ProjectFooterProps = {
  title: string;
  cta: NavLink;
};

export default function ProjectFooter({ title, cta }: ProjectFooterProps) {
  return (
    <footer className="mt-auto bg-ink px-[clamp(24px,5vw,64px)] py-[clamp(48px,6vw,80px)] text-page">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-6">
        <h2 className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.025em]">
          {title}
        </h2>
        <Link
          href={cta.href}
          className="rounded-full border border-[#3A3A42] px-6 py-3.5 text-[16px] font-semibold text-page no-underline"
        >
          {cta.label}
        </Link>
      </div>
    </footer>
  );
}
