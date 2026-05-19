/**
 * One-shot ingestion: convert wordsunlocked sources (.docx) → canonical JSON.
 *
 * Run with: npx tsx scripts/ingest.ts
 *
 * Current state: the canonical JSON at content/words-unlocked-2026.json was
 * hand-curated for the MVP from the markdown conversions of the source .docx
 * files. This script is the scaffolding for re-ingesting when sources change.
 * Today it dumps each .docx to plain text so you can compare against the
 * canonical JSON and update as needed.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import mammoth from "mammoth";

const SOURCES_DIR = join(
  process.cwd(),
  "public",
  "wordsunlocked",
  "sources",
);
const OUT_DIR = join(process.cwd(), ".tmp", "ingest");

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const files = await readdir(SOURCES_DIR);
  const docxFiles = files.filter((f) => f.endsWith(".docx"));
  if (docxFiles.length === 0) {
    console.error(`No .docx files found in ${SOURCES_DIR}`);
    process.exit(1);
  }

  for (const file of docxFiles) {
    const buf = await readFile(join(SOURCES_DIR, file));
    const result = await mammoth.extractRawText({ buffer: buf });
    const outPath = join(OUT_DIR, file.replace(/\.docx$/, ".txt"));
    await writeFile(outPath, result.value);
    console.log(`✓ ${file} → ${outPath} (${result.value.length} chars)`);
    if (result.messages.length > 0) {
      console.log(
        `  notes: ${result.messages.map((m) => m.message).join("; ")}`,
      );
    }
  }

  console.log(`\nWrote ${docxFiles.length} text dumps to ${OUT_DIR}`);
  console.log(
    "Compare against content/words-unlocked-2026.json and update by hand.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
