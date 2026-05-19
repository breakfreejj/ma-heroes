import baseCurriculumData from "@/content/words-unlocked-2026.json";
import {
  CurriculumSchema,
  lessonDurationMin,
  type Curriculum,
  type Lesson,
} from "@/lib/schema";

const cached: Curriculum = CurriculumSchema.parse(baseCurriculumData);

export function loadBaseCurriculum(): Curriculum {
  return structuredClone(cached);
}

export function findLesson(
  curriculum: Curriculum,
  lessonId: string,
): Lesson | undefined {
  return curriculum.lessons.find((l) => l.id === lessonId);
}

export function summarizeLesson(lesson: Lesson): string {
  return `Day ${lesson.day} — ${lesson.title} (${lessonDurationMin(lesson)} min)`;
}
