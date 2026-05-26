import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    projectId?: string;
    snapshotId?: string;
  };
  const { projectId, snapshotId } = body;
  if (!projectId || !snapshotId) {
    return new Response("projectId and snapshotId required", { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  // RLS will scope this to the user's own projects; verify the snapshot
  // belongs to the project before pointing the project at it.
  const { data: snap } = await supabase
    .from("snapshots")
    .select("id, content, message, project_id")
    .eq("id", snapshotId)
    .single();
  if (!snap || snap.project_id !== projectId) {
    return new Response("Snapshot not found in this project", { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({ current_snapshot_id: snap.id })
    .eq("id", projectId);
  if (updateError) {
    return new Response(`Failed: ${updateError.message}`, { status: 500 });
  }

  return Response.json({
    ok: true,
    snapshot: { id: snap.id, content: snap.content, message: snap.message },
  });
}
