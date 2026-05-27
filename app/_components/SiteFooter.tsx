import Image from "next/image";
import Link from "next/link";

const DONATE_URL =
  "https://breakfree-ed.networkforgood.com/projects/109483-breakfree-education";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#121F4A] px-7 pb-7 pt-14 text-white/85">
      <div className="mx-auto grid max-w-[1180px] gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="mb-4 inline-flex rounded-lg bg-white p-3"
            aria-label="BreakFree Education home"
          >
            <Image
              src="/brand/logo.png"
              alt="BreakFree Education"
              width={1411}
              height={421}
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-xs text-sm opacity-75">
            Radically improving education in the juvenile and criminal justice
            systems since 2012.
          </p>
          <div className="mt-3 flex gap-2.5">
            <SocialLink
              href="https://twitter.com/BreakFree_Ed"
              label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M22 5.8a8.4 8.4 0 0 1-2.36.65 4.13 4.13 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7.1 3.74A11.65 11.65 0 0 1 3.4 4.74a4.1 4.1 0 0 0 1.27 5.48 4.1 4.1 0 0 1-1.86-.52v.05a4.1 4.1 0 0 0 3.3 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67v-.53A8.3 8.3 0 0 0 22 5.8z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://facebook.com/BreakFreeEd"
              label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M13.5 22v-9h3l.5-3.5h-3.5V7c0-1 .3-1.7 1.7-1.7H17V2.2c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.7H6.5V13H9.5v9h4z" />
              </svg>
            </SocialLink>
          </div>
        </div>

        <FooterCol title="About">
          <FooterLink href="/about">About BreakFree</FooterLink>
          <FooterLink disabled>Our Impact</FooterLink>
          <FooterLink disabled>Newsletters</FooterLink>
        </FooterCol>
        <FooterCol title="Our Work">
          <FooterLink disabled>Teacher Resources</FooterLink>
          <FooterLink disabled>Cultivate</FooterLink>
          <FooterLink disabled>Consortium &amp; Friends</FooterLink>
          <FooterLink disabled>School Management</FooterLink>
          <FooterLink disabled>Fellowship</FooterLink>
          <FooterLink disabled>Podcast</FooterLink>
        </FooterCol>
        <FooterCol title="Get Involved">
          <FooterLink disabled>Support</FooterLink>
          <FooterLink href={DONATE_URL} external>
            Donate
          </FooterLink>
          <FooterLink disabled>Contact</FooterLink>
        </FooterCol>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1180px] flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-70">
        <span>
          &copy; {year} BreakFree Education. 501(c)(3) &middot; EIN 46-0757820
        </span>
        <span>2300 N St., NW, Suite 210, Washington, DC 20037</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-3.5 font-display font-bold text-xl tracking-wide text-bf-yellow">
        {title}
      </h4>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

type FooterLinkProps =
  | { disabled: true; href?: never; external?: never; children: React.ReactNode }
  | {
      disabled?: false;
      href: string;
      external?: boolean;
      children: React.ReactNode;
    };

function FooterLink(props: FooterLinkProps) {
  if (props.disabled) {
    return (
      <span
        aria-disabled="true"
        className="cursor-not-allowed py-1 text-sm text-white/35"
      >
        {props.children}
      </span>
    );
  }
  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener"
        className="py-1 text-sm text-white/85 transition hover:text-bf-yellow"
      >
        {props.children}
      </a>
    );
  }
  return (
    <Link
      href={props.href}
      className="py-1 text-sm text-white/85 transition hover:text-bf-yellow"
    >
      {props.children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-bf-yellow hover:text-bf-blue"
    >
      {children}
    </a>
  );
}
