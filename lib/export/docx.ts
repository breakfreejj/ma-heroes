import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";
import { lessonDurationMin, type Curriculum, type Lesson } from "@/lib/schema";

const BRAND_BLUE = "1F3A93";
const BRAND_CHARCOAL = "414143";

function p(text: string, opts: { bold?: boolean; size?: number } = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: opts.bold,
        size: opts.size,
        color: BRAND_CHARCOAL,
      }),
    ],
  });
}

type HeadingValue = (typeof HeadingLevel)[keyof typeof HeadingLevel];

function h(text: string, level: HeadingValue) {
  return new Paragraph({
    heading: level,
    children: [new TextRun({ text, bold: true, color: BRAND_BLUE })],
    spacing: { before: 200, after: 120 },
  });
}

function bulletList(items: string[]): Paragraph[] {
  return items.map(
    (item) =>
      new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: item, color: BRAND_CHARCOAL })],
      }),
  );
}

function activityTable(lesson: Lesson): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: ["Time", "Activity", "Details"].map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text,
                  bold: true,
                  color: "FFFFFF",
                }),
              ],
            }),
          ],
          shading: { fill: BRAND_BLUE },
        }),
    ),
  });

  const rows = lesson.activities.map(
    (a) =>
      new TableRow({
        children: [
          new TableCell({
            children: [p(`${a.durationMin} min`)],
            width: { size: 12, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [p(`${a.title ?? a.id} (${a.kind})`, { bold: true })],
            width: { size: 28, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              p(a.prompt ?? a.content ?? ""),
              ...(a.poemRefs.length > 0
                ? [p(`Poems referenced: ${a.poemRefs.join(", ")}`)]
                : []),
              ...(a.materials.length > 0
                ? [p(`Materials: ${a.materials.join(", ")}`)]
                : []),
            ],
            width: { size: 60, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
  );

  return new Table({
    rows: [headerRow, ...rows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
    },
  });
}

function lessonSection(lesson: Lesson, curriculum: Curriculum): unknown[] {
  const out: unknown[] = [];
  out.push(
    h(
      `Day ${lesson.day} — ${lesson.title}`,
      HeadingLevel.HEADING_2,
    ),
  );
  out.push(p(`Total duration: ${lessonDurationMin(lesson)} minutes`));
  out.push(new Paragraph({ children: [new TextRun({ text: "" })] }));

  out.push(h("Objectives", HeadingLevel.HEADING_3));
  out.push(...bulletList(lesson.objectives));

  if (lesson.keyPoints.length > 0) {
    out.push(h("Key Points", HeadingLevel.HEADING_3));
    out.push(...bulletList(lesson.keyPoints));
  }

  out.push(h("Activities", HeadingLevel.HEADING_3));
  out.push(activityTable(lesson));

  if (lesson.standards.length > 0) {
    out.push(h("Standards", HeadingLevel.HEADING_3));
    out.push(
      ...bulletList(
        lesson.standards.map(
          (s) => `${s.framework} ${s.code}${s.description ? ` — ${s.description}` : ""}`,
        ),
      ),
    );
  }

  if (lesson.differentiation.length > 0) {
    out.push(h("Differentiation", HeadingLevel.HEADING_3));
    out.push(...bulletList(lesson.differentiation));
  }

  // Poems featured in this lesson
  const poemIds = new Set(
    lesson.activities.flatMap((a) => a.poemRefs).filter(Boolean),
  );
  if (poemIds.size > 0) {
    out.push(h("Poems Featured", HeadingLevel.HEADING_3));
    for (const id of poemIds) {
      const poem = curriculum.poems[id];
      if (!poem) continue;
      out.push(p(`"${poem.title}" — ${poem.author}`, { bold: true }));
      for (const line of poem.lines) {
        out.push(p(line));
      }
      if (poem.source || poem.sourceUrl) {
        const attribution =
          poem.source && poem.sourceUrl
            ? `Source: ${poem.source} — ${poem.sourceUrl}`
            : poem.source
              ? `Source: ${poem.source}`
              : `Source: ${poem.sourceUrl}`;
        out.push(p(attribution));
      }
      out.push(new Paragraph({ children: [new TextRun({ text: "" })] }));
    }
  }

  return out;
}

export async function generateLessonPlansDocx(
  curriculum: Curriculum,
): Promise<Uint8Array> {
  const children: unknown[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: curriculum.meta.title,
          bold: true,
          size: 56,
          color: BRAND_BLUE,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: curriculum.meta.subtitle ?? "Lesson Plans",
          color: BRAND_CHARCOAL,
          size: 24,
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Theme: "${curriculum.meta.theme.name}"`,
          bold: true,
          color: BRAND_BLUE,
          size: 28,
        }),
      ],
      spacing: { before: 100, after: 100 },
    }),
    p(curriculum.meta.theme.definition),
    new Paragraph({ children: [new TextRun({ text: "" })] }),
  ];

  for (const lesson of curriculum.lessons) {
    children.push(...lessonSection(lesson, curriculum));
  }

  const doc = new Document({
    sections: [{ properties: {}, children: children as Paragraph[] }],
  });

  const buf = await Packer.toBuffer(doc);
  return new Uint8Array(buf);
}

export async function generateHandoutsDocx(
  curriculum: Curriculum,
): Promise<Uint8Array> {
  const children: unknown[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${curriculum.meta.title} — Student Handouts`,
          bold: true,
          size: 48,
          color: BRAND_BLUE,
        }),
      ],
      spacing: { after: 200 },
    }),
  ];

  for (const lesson of curriculum.lessons) {
    children.push(
      h(`Day ${lesson.day} — ${lesson.title}`, HeadingLevel.HEADING_2),
    );

    // Do Now
    const doNow = lesson.activities.find((a) => a.kind === "do-now");
    if (doNow) {
      children.push(h("Do Now", HeadingLevel.HEADING_3));
      children.push(p(doNow.prompt ?? doNow.content ?? ""));
      children.push(p(" "));
    }

    // Featured poems with full text
    const poemIds = Array.from(
      new Set(lesson.activities.flatMap((a) => a.poemRefs).filter(Boolean)),
    );
    for (const id of poemIds) {
      const poem = curriculum.poems[id];
      if (!poem) continue;
      children.push(h(`"${poem.title}"`, HeadingLevel.HEADING_3));
      children.push(p(`— ${poem.author}`, { bold: true }));
      for (const line of poem.lines) {
        children.push(p(line));
      }
      if (poem.source || poem.sourceUrl) {
        const attribution =
          poem.source && poem.sourceUrl
            ? `Source: ${poem.source} — ${poem.sourceUrl}`
            : poem.source
              ? `Source: ${poem.source}`
              : `Source: ${poem.sourceUrl}`;
        children.push(p(attribution));
      }
      children.push(p(" "));
    }

    // Exit Ticket
    const exit = lesson.activities.find((a) => a.kind === "exit-ticket");
    if (exit) {
      children.push(h("Exit Ticket", HeadingLevel.HEADING_3));
      children.push(p(exit.prompt ?? exit.content ?? ""));
      children.push(p(" "));
    }

    // Custom handout body if available
    const handouts = curriculum.handouts.filter((h) => h.lessonId === lesson.id);
    for (const ho of handouts) {
      if (ho.id.startsWith("do-now")) continue; // already rendered
      children.push(h(ho.title, HeadingLevel.HEADING_3));
      children.push(p(ho.body));
    }

    children.push(p(" "));
  }

  const doc = new Document({
    sections: [{ properties: {}, children: children as Paragraph[] }],
  });

  const buf = await Packer.toBuffer(doc);
  return new Uint8Array(buf);
}
