import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  if (!projectId) return new Response("projectId required", { status: 400 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: project } = await supabase
    .from("projects")
    .select("id, current_snapshot_id")
    .eq("id", projectId)
    .single();
  if (!project) return new Response("Project not found", { status: 404 });
  if (!project.current_snapshot_id)
    return Response.json({ snapshot: null });

  const { data: snap } = await supabase
    .from("snapshots")
    .select("id, content, message, created_by, created_at")
    .eq("id", project.current_snapshot_id)
    .single();
  return Response.json({ snapshot: snap });
}
