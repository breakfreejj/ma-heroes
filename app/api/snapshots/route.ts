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

  const { data: snapshots, error } = await supabase
    .from("snapshots")
    .select("id, parent_id, created_by, message, created_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  if (error) {
    return new Response(`Failed: ${error.message}`, { status: 500 });
  }

  return Response.json({
    current_snapshot_id: project.current_snapshot_id,
    snapshots: snapshots ?? [],
  });
}
