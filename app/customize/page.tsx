import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Customizer from "./Customizer";

export default async function CustomizePage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-bf-blue p-8 text-center text-white">
        <h1 className="font-display text-5xl">Almost there</h1>
        <p className="mt-4 max-w-lg text-bf-yellow">
          The customizer needs Supabase to store your projects. Add the
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment
          variables (see SETUP.md), then redeploy.
        </p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Find-or-create a default project for this user.
  let { data: projects } = await supabase
    .from("projects")
    .select("id, title, current_snapshot_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  let project = projects?.[0];
  if (!project) {
    const { data: created, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        title: "My Words Unlocked",
      })
      .select("id, title, current_snapshot_id, created_at")
      .single();
    if (error) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-bf-blue p-8 text-white">
          <h1 className="font-display text-5xl">Setup issue</h1>
          <p className="mt-4 max-w-lg text-bf-yellow">
            Couldn&apos;t create your project. This usually means the Supabase
            migration hasn&apos;t been applied. Error: {error.message}
          </p>
        </main>
      );
    }
    project = created!;
  }

  // Load the current snapshot, if any.
  let initialSnapshot: {
    id: string;
    content: unknown;
    message: string | null;
  } | null = null;
  if (project.current_snapshot_id) {
    const { data: snap } = await supabase
      .from("snapshots")
      .select("id, content, message")
      .eq("id", project.current_snapshot_id)
      .single();
    initialSnapshot = snap ?? null;
  }

  return (
    <Customizer
      projectId={project.id}
      projectTitle={project.title}
      userEmail={user.email ?? ""}
      initialSnapshot={initialSnapshot}
    />
  );
}
