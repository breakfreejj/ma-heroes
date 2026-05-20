import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../_components/SiteHeader";
import { SiteFooter } from "../_components/SiteFooter";

export const metadata = {
  title: "About — BreakFree Education",
  description:
    "BreakFree Education partners with juvenile justice agencies to make education relevant and meaningful for students held in confinement.",
};

const BOARD = [
  {
    name: "Samantha Buckingham",
    role: "Co-Director, Juvenile Justice Clinic at Loyola Law School Los Angeles",
  },
  {
    name: "James Carter",
    role: "Program Coordinator, Performance & Analytics, City of San Diego",
  },
  { name: "David Domenici", role: "Executive Director, BreakFree Education" },
  {
    name: "Felipe Franco",
    role: "Senior Fellow for Young Adult Practice, Annie E. Casey Foundation",
  },
  {
    name: "David Fries",
    role: "Chief Financial Officer, Orrick Herrington & Sutcliffe",
  },
  { name: "Feroz Khosla", role: "Managing Director, Goldman Sachs" },
  {
    name: "Margaret Kennedy",
    role: "Director of Finance and Administration, Maya Angelou Academy",
  },
  {
    name: "Lucretia Murphy",
    role: "Senior Program Officer, Jobs for the Future",
  },
  {
    name: "Steve Patrick",
    role: "Executive Director, Aspen Forum for Community Solutions, Aspen Institute",
  },
  {
    name: "Tyrone Walker",
    role: "Director of Reentry Services, Georgetown University Prison & Justice Initiative",
  },
];

const TEAM = [
  { name: "David", file: "headshot-david.jpg" },
  { name: "Mi Ji", file: "headshot-mi-ji.jpg" },
  { name: "Christina", file: "headshot-christina.jpg" },
  { name: "Kaylah", file: "headshot-kaylah.jpg" },
  { name: "Danielle", file: "headshot-danielle.jpg" },
  { name: "Jack", file: "headshot-jack.jpg" },
];

const COMMITMENTS = [
  {
    tag: "Partnership",
    title: "Partner with Agencies",
    body: "We partner directly with juvenile justice agencies across the country, providing resources, training, and networks to make school relevant and meaningful.",
  },
  {
    tag: "Curriculum",
    title: "Develop Programs",
    body: "We develop quality educational programs designed to inspire and engage students held in confinement and foster enthusiasm about education.",
  },
  {
    tag: "Policy",
    title: "Shape Policy",
    body: "We collaborate with policymakers to establish a future where young people receive the education and support needed to achieve their full potential.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      {/* Page header */}
      <section className="relative overflow-hidden bg-bf-blue text-white">
        <div className="absolute inset-0">
          <Image
            src="/brand/photo-classroom-circle-richard-ross.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(31,58,147,0.92) 0%, rgba(31,58,147,0.78) 100%)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1.5px,transparent_1.5px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-[1180px] px-7 py-20">
          <span className="mb-5 inline-block rounded-full bg-bf-yellow px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-bf-blue">
            About BreakFree
          </span>
          <h1
            className="mb-3.5 font-display font-extrabold tracking-wide"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05 }}
          >
            Investing in the potential and dignity of every student.
          </h1>
          <p
            className="max-w-2xl opacity-95"
            style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}
          >
            Our mission is to radically improve education in the juvenile and
            criminal justice systems by investing in the potential and dignity
            of all its students.
          </p>
        </div>
      </section>

      {/* Three commitments */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-bf-turquoise">
              What We Do
            </div>
            <h2
              className="mb-4 font-display font-extrabold tracking-wide text-bf-blue"
              style={{ fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.05 }}
            >
              Three connected commitments.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 bg-white p-7"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-bf-turquoise">
                  {c.tag}
                </span>
                <h3 className="font-display font-bold text-[26px] tracking-wide text-bf-blue">
                  {c.title}
                </h3>
                <p className="text-[15px]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-bf-blue/5 px-7 py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-bf-turquoise">
              Our Team
            </div>
            <h2
              className="mb-4 font-display font-extrabold tracking-wide text-bf-blue"
              style={{ fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.05 }}
            >
              Meet the people behind the work.
            </h2>
            <p className="text-lg opacity-85">
              The BreakFree staff team supporting educators, students, and
              agencies every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_24px_rgba(31,58,147,0.12)]">
                  <Image
                    src={`/brand/${p.file}`}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 font-bold text-bf-blue">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="border-y border-neutral-200 bg-white px-7 py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-bf-turquoise">
              Board of Directors
            </div>
            <h2
              className="mb-4 font-display font-extrabold tracking-wide text-bf-blue"
              style={{ fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.05 }}
            >
              Leadership.
            </h2>
            <p className="text-lg opacity-85">
              A board drawn from juvenile justice, education, philanthropy, and
              the private sector.
            </p>
          </div>
          <div className="grid gap-x-9 sm:grid-cols-2">
            {BOARD.map((p) => (
              <div
                key={p.name}
                className="border-b border-neutral-200 py-3.5 last:border-b-0"
              >
                <div className="font-bold text-bf-blue">{p.name}</div>
                <div className="mt-0.5 text-sm opacity-80">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bf-blue px-7 py-18 text-center text-white">
        <div className="mx-auto max-w-[1180px] py-2">
          <h2
            className="mb-3.5 font-display font-extrabold tracking-wide"
            style={{ fontSize: "clamp(34px, 5vw, 54px)" }}
          >
            Want to dig deeper?
          </h2>
          <p className="mx-auto mb-7 max-w-2xl text-lg opacity-90">
            See the numbers behind our work and the stories of the students and
            teachers we serve.
          </p>
          <Link
            href="/about/impact"
            className="inline-flex items-center gap-2 rounded-full bg-bf-yellow px-6 py-3 text-[15px] font-bold text-bf-blue transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
          >
            Our Impact &rarr;
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
