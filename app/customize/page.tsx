export default function CustomizePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bf-blue p-8 text-center text-white">
      <h1
        className="font-display tracking-wide"
        style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
      >
        Customize
      </h1>
      <p className="mt-4 max-w-xl text-lg text-bf-yellow">
        Words Unlocked Customizer — coming soon.
      </p>
      <p className="mt-2 max-w-xl text-sm opacity-80">
        Sign in, chat with the agent, and download a custom .docx + .pptx
        bundle.
      </p>
    </main>
  );
}
