"use client";

import { lessonDurationMin, type Curriculum, type Lesson } from "@/lib/schema";

export function Preview({ curriculum }: { curriculum: Curriculum | null }) {
  if (!curriculum) {
    return (
      <section className="flex h-full flex-col items-center justify-center bg-gray-50 p-10 text-center text-gray-500">
        <p className="font-display text-3xl text-bf-blue">Preview</p>
        <p className="mt-3 max-w-md text-sm">
          Once you send your first message, the customized curriculum will
          appear here. The agent edits the materials and you&apos;ll see changes
          land in this pane.
        </p>
      </section>
    );
  }

  return (
    <section className="h-full overflow-y-auto bg-white px-6 py-6">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="font-display text-4xl text-bf-blue">
          {curriculum.meta.title}
        </h1>
        {curriculum.meta.subtitle && (
          <p className="mt-1 text-sm text-gray-600">
            {curriculum.meta.subtitle}
          </p>
        )}
        <div className="mt-3 rounded-md border border-bf-yellow bg-bf-yellow/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-bf-blue">
            Theme · {curriculum.meta.theme.name}
          </p>
          <p className="mt-1 text-sm text-bf-charcoal">
            {curriculum.meta.theme.definition}
          </p>
        </div>
      </header>

      <div className="space-y-8 py-6">
        {curriculum.lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            curriculum={curriculum}
          />
        ))}
      </div>
    </section>
  );
}

function LessonCard({
  lesson,
  curriculum,
}: {
  lesson: Lesson;
  curriculum: Curriculum;
}) {
  return (
    <article
      id={lesson.id}
      className="rounded-lg border border-gray-200 p-5"
    >
      <header className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-bf-blue">
          Day {lesson.day} — {lesson.title}
        </h2>
        <span className="text-xs text-gray-500">
          {lessonDurationMin(lesson)} min total
        </span>
      </header>

      {lesson.objectives.length > 0 && (
        <div className="mt-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-bf-charcoal">
            Objectives
          </h3>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-bf-charcoal">
            {lesson.objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-bf-charcoal">
          Activities
        </h3>
        <ul className="mt-2 space-y-2">
          {lesson.activities.map((a) => (
            <li
              key={a.id}
              className="flex gap-3 rounded-md bg-gray-50 px-3 py-2"
            >
              <span className="w-12 shrink-0 text-xs font-medium text-bf-blue">
                {a.durationMin} min
              </span>
              <div className="flex-1 text-sm">
                <div className="font-medium text-bf-charcoal">
                  {a.title ?? a.id}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    · {a.kind}
                  </span>
                </div>
                {(a.prompt || a.content) && (
                  <p className="mt-0.5 text-gray-700">
                    {a.prompt ?? a.content}
                  </p>
                )}
                {a.poemRefs.length > 0 && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    Poems:{" "}
                    {a.poemRefs
                      .map((id) => {
                        const p = curriculum.poems[id];
                        return p ? `"${p.title}" — ${p.author}` : id;
                      })
                      .join(", ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
