import type { NavLink } from "../../data/data";

type HeaderProps = {
  name: string;
  nav: NavLink[];
  cv: NavLink;
};

export default function Header({ name, nav, cv }: HeaderProps) {
  return (
    <header className="flex leading-[normal] flex-wrap items-center justify-between gap-4 border-b border-line px-[clamp(24px,5vw,64px)] py-7">
      <a
        href="#inicio"
        className="py-2.5 text-[18px] font-extrabold tracking-[-0.02em] text-ink"
      >
        {name}
      </a>
      <nav className="flex flex-wrap items-center gap-1">
        {nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navlink px-3.5 py-3 text-[15px] font-medium text-muted"
          >
            {link.label}
          </a>
        ))}
        <a
          href={cv.href}
          className="cta ml-2 rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white"
        >
          {cv.label}
        </a>
      </nav>
    </header>
  );
}
