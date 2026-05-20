import { tool } from "ai";
import { z } from "zod";
import {
  CurriculumSchema,
  PoemSchema,
  type Activity,
  type Curriculum,
  type Lesson,
} from "@/lib/schema";
import { allPoems, getPoem, searchPoems as searchCorpus } from "@/lib/poems";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export type AgentContext = {
  curriculum: Curriculum;
  /** Called after any mutating tool to persist a new snapshot. */
  onSnapshot: (
    next: Curriculum,
    message: string,
  ) => Promise<{ snapshotId: string }>;
};

function clone<T>(x: T): T {
  return structuredClone(x);
}

function findActivity(
  lesson: Lesson,
  activityId: string,
): Activity | undefined {
  return lesson.activities.find((a) => a.id === activityId);
}

export function buildTools(ctx: AgentContext) {
  return {
    read_lesson: tool({
      description:
        "Read the full current state of a single lesson by id (e.g., 'lesson-2'). Use this before editing so you see exactly what's there.",
      inputSchema: z.object({
        lesson_id: z.string().describe("e.g. 'lesson-1' through 'lesson-7'"),
      }),
      execute: async ({ lesson_id }) => {
        const lesson = ctx.curriculum.lessons.find((l) => l.id === lesson_id);
        if (!lesson) {
          return { error: `No lesson found with id '${lesson_id}'.` };
        }
        return { lesson };
      },
    }),

    list_corpus: tool({
      description:
        "List the small BreakFree-vetted poem corpus (~25 poems). Only consult this if the teacher specifically asks for a BreakFree-vetted poem; otherwise prefer web_search for fresh poems from Poetry Foundation, poets.org, etc.",
      inputSchema: z.object({}),
      execute: async () => {
        return {
          poems: allPoems().map((p) => ({
            id: p.id,
            title: p.title,
            author: p.author,
            themes: p.themes,
            rightsCleared: p.rightsCleared,
          })),
        };
      },
    }),

    search_corpus: tool({
      description:
        "Search the BreakFree-vetted poem corpus by keyword and/or theme tags. Use this only when the teacher asks specifically for a BreakFree-vetted poem; otherwise prefer web_search for finding poems on poetryfoundation.org or poets.org.",
      inputSchema: z.object({
        query: z
          .string()
          .optional()
          .describe(
            "Free-text query — matches against titles, authors, lines, and themes.",
          ),
        themes: z
          .array(z.string())
          .optional()
          .describe(
            "Theme tags to filter on (e.g., ['letting-go', 'resilience']).",
          ),
        rights_cleared_only: z
          .boolean()
          .optional()
          .describe(
            "If true, only return poems we have rights to reprint in handouts.",
          ),
      }),
      execute: async ({ query, themes, rights_cleared_only }) => {
        const results = searchCorpus({
          query,
          themes,
          rightsClearedOnly: rights_cleared_only,
          limit: 5,
        });
        return { results };
      },
    }),

    swap_poem_from_corpus: tool({
      description:
        "Replace the poem referenced by a specific activity using a poem already in the BreakFree-vetted corpus. Use this only when the teacher specifically asks for a BreakFree-vetted poem; for everything else use place_poem after web search.",
      inputSchema: z.object({
        lesson_id: z.string(),
        activity_id: z.string(),
        new_poem_id: z.string(),
        rationale: z
          .string()
          .describe(
            "Brief explanation (1 sentence) of why this swap fits — surfaced to the teacher.",
          ),
      }),
      execute: async ({ lesson_id, activity_id, new_poem_id, rationale }) => {
        const draft = clone(ctx.curriculum);
        const lesson = draft.lessons.find((l) => l.id === lesson_id);
        if (!lesson) return { error: `No lesson '${lesson_id}'` };
        const activity = findActivity(lesson, activity_id);
        if (!activity)
          return {
            error: `No activity '${activity_id}' in lesson '${lesson_id}'`,
          };
        const newPoem = getPoem(new_poem_id);
        if (!newPoem)
          return {
            error: `No poem with id '${new_poem_id}' in the corpus. Use search_corpus or list_corpus first, or place_poem with a web-sourced poem.`,
          };

        const oldPoemId = activity.poemRefs[0];
        activity.poemRefs = [new_poem_id, ...activity.poemRefs.slice(1)];
        draft.poems[new_poem_id] = newPoem;

        const validated = CurriculumSchema.parse(draft);
        ctx.curriculum = validated;
        const { snapshotId } = await ctx.onSnapshot(
          validated,
          `Swapped poem in ${lesson.id}/${activity.id}: ${oldPoemId ?? "(none)"} → ${new_poem_id}. ${rationale}`,
        );
        return {
          ok: true,
          snapshotId,
          summary: `Swapped to "${newPoem.title}" by ${newPoem.author} in ${lesson.title} → ${activity.title ?? activity.id}.`,
        };
      },
    }),

    place_poem: tool({
      description:
        "Place a poem you've found via web_search + web_fetch into a specific activity. The full poem text is embedded in the curriculum and the source attribution + URL are stored so they render in the preview and downloads. Use this AFTER you've fetched the full poem text from a source URL (typically poetryfoundation.org or poets.org). Do not invent poem text — only use text you've fetched.",
      inputSchema: z.object({
        lesson_id: z.string(),
        activity_id: z.string(),
        poem: z.object({
          title: z.string(),
          author: z.string(),
          lines: z
            .array(z.string())
            .min(1)
            .describe(
              "The poem text, one element per line. Preserve original line breaks and stanza spacing (use empty strings for stanza breaks).",
            ),
          source_name: z
            .string()
            .describe(
              "Where you found this poem (e.g., 'Poetry Foundation', 'poets.org', 'Project Gutenberg').",
            ),
          source_url: z
            .string()
            .url()
            .describe("Direct link to the source page."),
          themes: z
            .array(z.string())
            .optional()
            .describe(
              "Theme tags relevant to the curriculum (e.g., ['resilience', 'letting-go']).",
            ),
        }),
        rationale: z
          .string()
          .describe(
            "Brief explanation (1 sentence) of why this poem fits the activity — surfaced to the teacher.",
          ),
      }),
      execute: async ({ lesson_id, activity_id, poem, rationale }) => {
        const draft = clone(ctx.curriculum);
        const lesson = draft.lessons.find((l) => l.id === lesson_id);
        if (!lesson) return { error: `No lesson '${lesson_id}'` };
        const activity = findActivity(lesson, activity_id);
        if (!activity)
          return {
            error: `No activity '${activity_id}' in lesson '${lesson_id}'`,
          };

        const baseId = `${slugify(poem.title)}-${slugify(poem.author)}`;
        let id = baseId;
        let n = 2;
        while (draft.poems[id]) {
          id = `${baseId}-${n++}`;
        }

        const validatedPoem = PoemSchema.parse({
          id,
          title: poem.title,
          author: poem.author,
          lines: poem.lines,
          themes: poem.themes ?? [],
          rightsCleared: false,
          source: poem.source_name,
          sourceUrl: poem.source_url,
        });

        draft.poems[id] = validatedPoem;
        const oldPoemId = activity.poemRefs[0];
        activity.poemRefs = [id, ...activity.poemRefs.slice(1)];

        const validated = CurriculumSchema.parse(draft);
        ctx.curriculum = validated;
        const { snapshotId } = await ctx.onSnapshot(
          validated,
          `Placed "${poem.title}" by ${poem.author} (from ${poem.source_name}) in ${lesson.id}/${activity.id}; replaced ${oldPoemId ?? "(none)"}. ${rationale}`,
        );
        return {
          ok: true,
          snapshotId,
          summary: `Placed "${poem.title}" by ${poem.author} in ${lesson.title} → ${activity.title ?? activity.id}. Source: ${poem.source_name}.`,
        };
      },
    }),

    update_activity: tool({
      description:
        "Update one or more fields of a single activity. Most commonly used to rewrite a Do Now or Exit Ticket prompt. Only the fields you pass are changed.",
      inputSchema: z.object({
        lesson_id: z.string(),
        activity_id: z.string(),
        fields: z.object({
          title: z.string().optional(),
          prompt: z.string().optional(),
          content: z.string().optional(),
          durationMin: z.number().int().nonnegative().optional(),
        }),
        rationale: z.string(),
      }),
      execute: async ({ lesson_id, activity_id, fields, rationale }) => {
        const draft = clone(ctx.curriculum);
        const lesson = draft.lessons.find((l) => l.id === lesson_id);
        if (!lesson) return { error: `No lesson '${lesson_id}'` };
        const activity = findActivity(lesson, activity_id);
        if (!activity)
          return {
            error: `No activity '${activity_id}' in lesson '${lesson_id}'`,
          };
        const before = clone(activity);
        if (fields.title !== undefined) activity.title = fields.title;
        if (fields.prompt !== undefined) activity.prompt = fields.prompt;
        if (fields.content !== undefined) activity.content = fields.content;
        if (fields.durationMin !== undefined)
          activity.durationMin = fields.durationMin;

        const validated = CurriculumSchema.parse(draft);
        ctx.curriculum = validated;
        const changedFields = Object.keys(fields).join(", ");
        const { snapshotId } = await ctx.onSnapshot(
          validated,
          `Updated ${lesson.id}/${activity.id} (${changedFields}). ${rationale}`,
        );
        return {
          ok: true,
          snapshotId,
          summary: `Updated ${changedFields} on ${activity.title ?? activity.id} in ${lesson.title}.`,
          before,
          after: activity,
        };
      },
    }),

    update_lesson_duration_target: tool({
      description:
        "Scale all activities in a lesson proportionally to fit a target total duration. The 5-minute Do Now and Exit Ticket components are preserved if marked required. Use this when the teacher asks to compress a 45-minute lesson to 30 minutes (or vice versa).",
      inputSchema: z.object({
        lesson_id: z.string(),
        target_min: z
          .number()
          .int()
          .min(15)
          .max(120)
          .describe("Desired total lesson duration in minutes."),
        rationale: z.string(),
      }),
      execute: async ({ lesson_id, target_min, rationale }) => {
        const draft = clone(ctx.curriculum);
        const lesson = draft.lessons.find((l) => l.id === lesson_id);
        if (!lesson) return { error: `No lesson '${lesson_id}'` };

        // Preserve required short activities (do-now, exit-ticket) at their current 5 min.
        const fixed = lesson.activities.filter(
          (a) =>
            a.required &&
            (a.kind === "do-now" || a.kind === "exit-ticket") &&
            a.durationMin <= 5,
        );
        const fixedSum = fixed.reduce((s, a) => s + a.durationMin, 0);
        const flexible = lesson.activities.filter(
          (a) => !fixed.includes(a),
        );
        const flexibleSum = flexible.reduce((s, a) => s + a.durationMin, 0);
        const flexibleTarget = Math.max(0, target_min - fixedSum);

        if (flexibleSum === 0)
          return { error: "No flexible activities to scale." };

        const scale = flexibleTarget / flexibleSum;
        for (const a of flexible) {
          a.durationMin = Math.max(1, Math.round(a.durationMin * scale));
        }

        // Round-error fixup: nudge longest flexible activity to hit target exactly.
        const newTotal = lesson.activities.reduce(
          (s, a) => s + a.durationMin,
          0,
        );
        const drift = target_min - newTotal;
        if (drift !== 0 && flexible.length > 0) {
          flexible.sort((a, b) => b.durationMin - a.durationMin);
          flexible[0].durationMin = Math.max(
            1,
            flexible[0].durationMin + drift,
          );
        }

        const validated = CurriculumSchema.parse(draft);
        ctx.curriculum = validated;
        const { snapshotId } = await ctx.onSnapshot(
          validated,
          `Retimed ${lesson.id} to ${target_min} minutes. ${rationale}`,
        );
        return {
          ok: true,
          snapshotId,
          summary: `${lesson.title} now totals ${target_min} minutes across ${lesson.activities.length} activities.`,
          activities: lesson.activities.map((a) => ({
            id: a.id,
            title: a.title ?? a.id,
            durationMin: a.durationMin,
          })),
        };
      },
    }),
  };
}
