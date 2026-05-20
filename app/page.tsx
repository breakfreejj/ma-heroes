import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./_components/SiteHeader";
import { SiteFooter } from "./_components/SiteFooter";

export const metadata = {
  title:
    "BreakFree Education — Radically improving education in the juvenile and criminal justice systems",
  description:
    "BreakFree Education partners with juvenile justice agencies across the country to make school relevant and meaningful for students held in confinement.",
};

const DONATE_URL =
  "https://breakfree-ed.networkforgood.com/projects/109483-breakfree-education";

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bf-blue px-7 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1.5px,transparent_1.5px)] [background-size:22px_22px]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 20%, rgba(253,184,44,0.18), transparent 40%), radial-gradient(circle at 88% 80%, rgba(145,213,172,0.22), transparent 42%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="mb-6 inline-block rounded-full bg-bf-yellow px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-bf-blue">
              BreakFree Education
            </span>
            <h1
              className="mb-5 font-display font-extrabold tracking-wide"
              style={{ fontSize: "clamp(44px, 7vw, 84px)", lineHeight: 1.02 }}
            >
              A student's potential{" "}
              <span className="text-bf-yellow">cannot be confined.</span>
            </h1>
            <p
              className="mb-8 max-w-xl opacity-95"
              style={{ fontSize: "clamp(17px, 1.6vw, 20px)" }}
            >
              We believe that all children have the right to learn, grow, and
              dream. Our mission is to radically improve education in the
              juvenile and criminal justice systems by investing in the
              potential and dignity of all its students.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-bf-yellow px-6 py-3 text-[15px] font-bold text-bf-blue transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              >
                More About Us &rarr;
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-white/20"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border-4 border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
              <Image
                src="/brand/landing-page-pic.jpg"
                alt="A young person seated alone at an institutional desk between cell doors at Pueblo Youth Services Center"
                width={2000}
                height={1317}
                priority
                className="h-auto w-full"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-bf-yellow/40 blur-2xl" />
            <div className="pointer-events-none absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-bf-green/40 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Our Work"
            title="Programs that meet students where they are."
            lede="We build curriculum, run schools, train educators, and partner with agencies — so young people in confinement get the kind of education they deserve."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 bg-white p-7 transition hover:border-bf-turquoise hover:shadow-[0_14px_30px_rgba(31,58,147,0.10)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-bf-turquoise">
                For Educators
              </span>
              <h3 className="font-display font-bold text-[26px] tracking-wide text-bf-blue">
                Teacher Resources
              </h3>
              <p className="text-[15px]">
                A year-round library of lessons, monthly competitions, and
                curriculum mini-units built for juvenile justice classrooms.
              </p>
              <div className="mt-auto flex flex-col items-start gap-2 pt-3">
                <a
                  href="/ma/index.html"
                  className="inline-flex items-center gap-2 rounded-lg bg-bf-blue px-4 py-2.5 font-bold text-bf-yellow transition hover:bg-bf-yellow hover:text-bf-blue"
                >
                  Origin Story Unit <span aria-hidden>&rarr;</span>
                </a>
                <a
                  href="/wordsunlocked/index.html"
                  className="inline-flex items-center gap-2 rounded-lg bg-bf-blue px-4 py-2.5 font-bold text-bf-yellow transition hover:bg-bf-yellow hover:text-bf-blue"
                >
                  Words Unlocked <span aria-hidden>&rarr;</span>
                </a>
                <a
                  href="/work/teacher-resources"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-bf-blue px-4 py-2 font-bold text-bf-blue transition hover:bg-bf-blue hover:text-bf-yellow"
                >
                  More Resources <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </div>
            <ProgramCard
              href="/work/cultivate"
              tag="Cultivate Series"
              title="Cultivate"
              body="Monthly learning series for educators: classroom-ready activities, podcasts, and peer connection across ten core practice areas."
              cta="Learn More"
            />
            <ProgramCard
              href="/work/consortium"
              tag="Partners"
              title="Consortium & Friends"
              body="A national network of juvenile justice agencies and their education partners committed to making school work in their spaces."
              cta="Join the Network"
            />
            <ProgramCard
              href="/work/school-management"
              tag="Direct Operations"
              title="School Management"
              body="We operate and support schools inside detention centers — including New Orleans' nationally recognized Travis Hill School."
              cta="See Our Schools"
            />
            <ProgramCard
              href="/work/fellowship"
              tag="18-Month Fellowship"
              title="BreakFree Fellowship"
              body="A paid training fellowship for returning citizens released under DC's Incarceration Reduction Amendment Act."
              cta="Fellowship Details"
            />
            <ProgramCard
              href="/work/podcast"
              tag="Podcast"
              title="Books Over Bars"
              body="Conversations exploring the world of education within the juvenile justice system."
              cta="Listen"
            />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="border-y border-neutral-200 bg-white px-7 py-20">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="Our Impact"
            title="Working in 45 states, alongside the agencies that serve youth in confinement."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard num="2012" label="Founded" accent="bf-turquoise" />
            <StatCard num="50,000+" label="Youth served" accent="bf-green" />
            <StatCard num="57" label="Agency partners" accent="bf-pink" />
            <StatCard num="700+" label="Teachers engaged" accent="bf-orange" />
          </div>
          <div className="mt-8">
            <Link
              href="/about/impact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-bf-blue bg-white px-6 py-3 text-[15px] font-bold text-bf-blue transition hover:bg-bf-blue hover:text-white"
            >
              See Our Impact &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-bf-blue px-7 py-20 text-white">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-bf-yellow">
              Get in Touch
            </div>
            <h2
              className="mb-3 font-display font-extrabold tracking-wide"
              style={{ fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.05 }}
            >
              Stay connected.
            </h2>
            <p className="mb-6 text-lg opacity-90">
              Sign up for our newsletter or reach our team directly.
            </p>
            <form
              action="#"
              method="post"
              className="flex max-w-md flex-col gap-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-white/60"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-white/60"
              />
              <button
                type="submit"
                className="self-start rounded-full bg-bf-yellow px-6 py-3 text-[15px] font-bold text-bf-blue transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              >
                Subscribe &rarr;
              </button>
            </form>
          </div>
          <div className="self-start rounded-2xl border border-white/20 bg-white/5 p-7">
            <h3 className="mb-3.5 font-display font-bold text-2xl tracking-wide text-bf-yellow">
              Washington, DC Office
            </h3>
            <p className="mb-2.5">
              2300 N St., NW, Suite 210
              <br />
              Washington, DC 20037
            </p>
            <p className="mb-1.5">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@breakfree-ed.org"
                className="text-bf-yellow hover:underline"
              >
                info@breakfree-ed.org
              </a>
            </p>
            <p>
              <strong>Donations:</strong>{" "}
              <a
                href="mailto:donate@breakfree-ed.org"
                className="text-bf-yellow hover:underline"
              >
                donate@breakfree-ed.org
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

/* ---------- helpers ---------- */

function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-bf-turquoise">
        {eyebrow}
      </div>
      <h2
        className="mb-4 font-display font-extrabold tracking-wide text-bf-blue"
        style={{ fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {lede ? <p className="text-lg opacity-85">{lede}</p> : null}
    </div>
  );
}

function ProgramCard({
  href,
  tag,
  title,
  body,
  cta,
}: {
  href: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2.5 rounded-2xl border border-neutral-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-bf-turquoise hover:shadow-[0_14px_30px_rgba(31,58,147,0.10)]"
    >
      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-bf-turquoise">
        {tag}
      </span>
      <h3 className="font-display font-bold text-[26px] tracking-wide text-bf-blue">
        {title}
      </h3>
      <p className="text-[15px]">{body}</p>
      <span className="mt-auto pt-2 font-bold text-bf-blue">{cta} &rarr;</span>
    </Link>
  );
}

function StatCard({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent: "bf-turquoise" | "bf-green" | "bf-pink" | "bf-orange";
}) {
  const borderMap = {
    "bf-turquoise": "border-t-bf-turquoise",
    "bf-green": "border-t-bf-green",
    "bf-pink": "border-t-bf-pink",
    "bf-orange": "border-t-bf-orange",
  };
  return (
    <div
      className={`rounded-xl border border-neutral-200 border-t-[6px] ${borderMap[accent]} bg-white p-7`}
    >
      <div
        className="mb-1.5 font-display font-extrabold text-bf-blue"
        style={{ fontSize: 52, lineHeight: 1 }}
      >
        {num}
      </div>
      <div className="text-[15px] font-semibold">{label}</div>
    </div>
  );
}
