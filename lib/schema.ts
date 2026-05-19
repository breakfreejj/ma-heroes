import { z } from "zod";

export const PoemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  lines: z.array(z.string()),
  themes: z.array(z.string()).default([]),
  rightsCleared: z.boolean().default(false),
  source: z.string().optional(),
});
export type Poem = z.infer<typeof PoemSchema>;

export const ActivityKind = z.enum([
  "do-now",
  "mini-lesson",
  "guided-practice",
  "independent-practice",
  "closing",
  "exit-ticket",
]);
export type ActivityKind = z.infer<typeof ActivityKind>;

export const ActivitySchema = z.object({
  id: z.string(),
  kind: ActivityKind,
  title: z.string().optional(),
  durationMin: z.number().int().nonnegative(),
  prompt: z.string().optional(),
  content: z.string().optional(),
  poemRefs: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  required: z.boolean().default(false),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const StandardSchema = z.object({
  framework: z.string(),
  code: z.string(),
  description: z.string().optional(),
});
export type Standard = z.infer<typeof StandardSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  day: z.number().int().positive(),
  title: z.string(),
  objectives: z.array(z.string()).default([]),
  keyPoints: z.array(z.string()).default([]),
  activities: z.array(ActivitySchema),
  standards: z.array(StandardSchema).default([]),
  differentiation: z.array(z.string()).default([]),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const HandoutSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  title: z.string(),
  body: z.string(),
});
export type Handout = z.infer<typeof HandoutSchema>;

export const CurriculumSchema = z.object({
  meta: z.object({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    theme: z.object({
      name: z.string(),
      definition: z.string(),
    }),
    submissionDeadline: z.string().optional(),
  }),
  poems: z.record(z.string(), PoemSchema),
  lessons: z.array(LessonSchema),
  handouts: z.array(HandoutSchema).default([]),
});
export type Curriculum = z.infer<typeof CurriculumSchema>;

export function lessonDurationMin(lesson: Lesson): number {
  return lesson.activities.reduce((sum, a) => sum + a.durationMin, 0);
}
