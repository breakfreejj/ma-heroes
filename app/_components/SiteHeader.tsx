"use client";

import Link from "next/link";
import { useState } from "react";

const DONATE_URL =
  "https://breakfree-ed.networkforgood.com/projects/109483-breakfree-education";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-7 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 whitespace-nowrap font-display text-2xl tracking-wider text-bf-blue"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-bf-blue text-xl text-bf-yellow">
            B
          </span>
          BreakFree
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center text-bf-blue lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            className="h-6 w-6"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav
          className={`${
            open ? "translate-y-0" : "-translate-y-[120%]"
          } fixed inset-x-0 top-16 z-40 flex flex-col gap-1 overflow-y-auto border-t border-neutral-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:p-0`}
        >
          <NavDropdown
            label="About"
            href="/about"
            items={[
              { href: "/about", label: "About BreakFree" },
              { href: "/about/impact", label: "Our Impact" },
              { href: "/about/newsletters", label: "Newsletters" },
            ]}
            onItemClick={() => setOpen(false)}
          />
          <NavDropdown
            label="Our Work"
            href="/work"
            items={[
              { href: "/work/teacher-resources", label: "Teacher Resources" },
              { href: "/work/cultivate", label: "Cultivate" },
              { href: "/work/consortium", label: "Consortium & Friends" },
              { href: "/work/school-management", label: "School Management" },
              { href: "/work/fellowship", label: "Fellowship" },
              { href: "/work/podcast", label: "Podcast" },
            ]}
            onItemClick={() => setOpen(false)}
          />
          <NavLink href="/support" onClick={() => setOpen(false)}>
            Support
          </NavLink>
          <NavLink href="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <Link
            href={DONATE_URL}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-bf-yellow px-5 py-2.5 text-sm font-bold text-bf-blue transition hover:bg-bf-blue hover:text-white lg:mt-0 lg:ml-2"
          >
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-sm font-semibold text-bf-charcoal transition hover:bg-bf-blue/5 hover:text-bf-blue lg:px-3 lg:py-2.5"
    >
      {children}
    </Link>
  );
}

function NavDropdown({
  label,
  href,
  items,
  onItemClick,
}: {
  label: string;
  href: string;
  items: { href: string; label: string }[];
  onItemClick?: () => void;
}) {
  return (
    <div className="group/nav relative">
      <Link
        href={href}
        onClick={onItemClick}
        className="flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-semibold text-bf-charcoal transition hover:bg-bf-blue/5 hover:text-bf-blue"
      >
        {label}
        <span className="ml-0.5 inline-block h-2 w-2 -translate-y-0.5 rotate-45 border-b-[1.5px] border-r-[1.5px] border-current" />
      </Link>
      <div className="hidden min-w-[240px] flex-col gap-0.5 rounded-xl border border-neutral-200 bg-white p-2 shadow-[0_12px_30px_rgba(31,58,147,0.10)] group-hover/nav:flex group-focus-within/nav:flex lg:absolute lg:left-0 lg:top-full">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onClick={onItemClick}
            className="rounded-md px-3 py-2 text-sm font-medium text-bf-charcoal transition hover:bg-bf-turquoise/10 hover:text-bf-turquoise"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
