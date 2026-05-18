# CLAUDE.md — Working in `danielle/`

Project context for Claude when working inside this subfolder.

## What's here

`danielle/` holds the 5-week Superheroes Initiative curriculum and supporting materials. See `README.md` for the full project overview.

## Slidedeck conventions — read this before drafting any new deck

The `slidedeck-exemplars/` subfolder contains past slidedecks from BreakFree-Ed that should be used as **style and structure references** whenever a new slidedeck is requested.

**When asked to create a slidedeck:**

1. **First, list the files** in `slidedeck-exemplars/` to see what's available.
2. **Read at least 2 exemplars** end-to-end before drafting. Match their:
   - Slide count and pacing (how much content per slide)
   - Section structure (e.g., opener → context → main content → CTA)
   - Voice and tone (formal / conversational / mission-driven)
   - Visual conventions if visible (color palette, header style, image placement)
3. **Then draft the new deck.** Default output format: markdown with `---` separating slides, unless the user specifies PowerPoint, Google Slides, or another format.
4. **Cite which exemplar(s) you modeled** at the top of your draft so the user can sanity-check.

## File formats accepted in `slidedeck-exemplars/`

In order of preference for what I can read:

| Format | Can Claude read it? | Notes |
|---|---|---|
| `.pdf` | ✅ Yes (up to 20 pages per read; specify pages for larger) | **Preferred** — exports cleanly from PowerPoint/Google Slides |
| `.png`, `.jpg` of each slide | ✅ Yes (multimodal) | Useful if visual design is essential |
| `.md` (notes-only) | ✅ Yes | Fine for content-only exemplars |
| `.pptx` | ⚠️ Binary — content not directly readable | Acceptable, but pair with a PDF export for me to read |
| `.key` (Keynote) | ⚠️ Binary — content not directly readable | Pair with a PDF export |

## How to add a new exemplar

1. Drop the file into `slidedeck-exemplars/` (PDF preferred).
2. Optional: add a sibling `.md` file named the same way with a 2–3 line note about *why this deck is exemplar-worthy* (e.g., "Used at 2024 family showcase — strongest opening sequence we've made").
3. Commit to the repo so the convention persists.

## Other working notes

- This subfolder is one of two parallel curriculum approaches in the repo. The root-level `Origin Story` PBL mini-unit is a separate project by the coworker (see root `CLAUDE.md`). Don't conflate them — different lesson lengths, capstone, structure.
- When updating curriculum content, edit `superhero-initiative.md` (source of truth) AND update the corresponding lesson object in `index.html` to keep both in sync.
- Audience is justice-involved youth ages 12–19. See the "Design philosophy" section in `README.md` before generating new content.
