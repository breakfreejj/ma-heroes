import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bf-blue text-white">
      <h1
        className="m-0 font-display tracking-wide"
        style={{ fontSize: "clamp(4rem, 18vw, 14rem)" }}
      >
        BreakFree
      </h1>
      <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg">
        <Link
          href="/ma/index.html"
          className="text-bf-yellow hover:underline"
        >
          Origin Story unit &rarr;
        </Link>
        <Link
          href="/wordsunlocked/index.html"
          className="text-bf-yellow hover:underline"
        >
          Words Unlocked &rarr;
        </Link>
      </nav>
    </main>
  );
}
