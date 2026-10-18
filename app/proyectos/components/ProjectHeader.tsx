import Link from "next/link";
import type { NavLink } from "../../data/data";

type ProjectHeaderProps = {
  back: NavLink;
  contact: NavLink;
};

export default function ProjectHeader({ back, contact }: ProjectHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-[clamp(24px,5vw,64px)] py-7">
      <Link
        href={back.href}
        className="py-3 text-[15px] font-semibold text-muted no-underline"
      >
        {back.label}
      </Link>
      <Link
        href={contact.href}
        className="rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white no-underline"
      >
        {contact.label}
      </Link>
    </header>
  );
}
