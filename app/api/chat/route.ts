import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createClient } from "@/lib/supabase/server";
import { CurriculumSchema, type Curriculum } from "@/lib/schema";
import { buildSystemPrompt } from "@/lib/agent/system-prompt";
import { buildTools } from "@/lib/agent/tools";
import { loadBaseCurriculum } from "@/lib/curriculum";

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    messages: UIMessage[];
    projectId?: string;
  };
  const messages = body.messages ?? [];
  const projectId = body.projectId;
  if (!projectId) {
    return new Response("projectId required", { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  // Load project + current snapshot, scoped by RLS to this user.
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, current_snapshot_id, user_id")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    return new Response("Project not found", { status: 404 });
  }

  let curriculum: Curriculum;
  if (project.current_snapshot_id) {
    const { data: snapshot } = await supabase
      .from("snapshots")
      .select("content")
      .eq("id", project.current_snapshot_id)
      .single();
    curriculum = CurriculumSchema.parse(snapshot?.content ?? {});
  } else {
    // First turn — seed from base curriculum and write the seed snapshot.
    curriculum = loadBaseCurriculum();
    const { data: seed } = await supabase
      .from("snapshots")
      .insert({
        project_id: project.id,
        content: curriculum,
        created_by: "seed",
        message: "Base Words Unlocked 2026 curriculum",
      })
      .select("id")
      .single();
    if (seed) {
      await supabase
        .from("projects")
        .update({ current_snapshot_id: seed.id })
        .eq("id", project.id);
    }
  }

  const localTools = buildTools({
    curriculum,
    async onSnapshot(next, message) {
      const { data: snap, error } = await supabase
        .from("snapshots")
        .insert({
          project_id: project.id,
          parent_id: project.current_snapshot_id,
          content: next,
          created_by: "agent",
          message,
        })
        .select("id")
        .single();
      if (error || !snap) {
        throw new Error(`Failed to persist snapshot: ${error?.message}`);
      }
      await supabase
        .from("projects")
        .update({ current_snapshot_id: snap.id })
        .eq("id", project.id);
      project.current_snapshot_id = snap.id;
      return { snapshotId: snap.id };
    },
  });

  // Anthropic-hosted server tools: real web search + fetch so the agent can
  // pull poems straight from Poetry Foundation, poets.org, etc.
  const tools = {
    ...localTools,
    web_search: anthropic.tools.webSearch_20260209({
      maxUses: 5,
    }),
    web_fetch: anthropic.tools.webFetch_20260209({
      maxUses: 5,
    }),
  };

  const system = buildSystemPrompt(curriculum);

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system,
    messages: modelMessages,
    tools,
    stopWhen: ({ steps }) => steps.length >= 12,
    providerOptions: {
      anthropic: {
        cacheControl: { type: "ephemeral" },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
