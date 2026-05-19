import poemsData from "@/content/poems.json";
import { PoemSchema, type Poem } from "@/lib/schema";

const corpus: Poem[] = poemsData.poems.map((p) => PoemSchema.parse(p));

export function allPoems(): Poem[] {
  return corpus;
}

export function getPoem(id: string): Poem | undefined {
  return corpus.find((p) => p.id === id);
}

export function searchPoems(opts: {
  query?: string;
  themes?: string[];
  rightsClearedOnly?: boolean;
  limit?: number;
}): Poem[] {
  const { query, themes, rightsClearedOnly, limit = 5 } = opts;
  const q = query?.toLowerCase().trim() ?? "";
  const themeSet = themes?.map((t) => t.toLowerCase()) ?? [];

  const scored = corpus
    .filter((p) => (rightsClearedOnly ? p.rightsCleared : true))
    .map((p) => {
      let score = 0;
      if (q) {
        const hay = (
          p.title +
          " " +
          p.author +
          " " +
          p.lines.join(" ") +
          " " +
          p.themes.join(" ")
        ).toLowerCase();
        if (hay.includes(q)) score += 5;
        for (const word of q.split(/\s+/)) {
          if (word && hay.includes(word)) score += 1;
        }
      }
      for (const t of themeSet) {
        if (p.themes.includes(t)) score += 3;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0 || (!q && themeSet.length === 0))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);

  return scored;
}
