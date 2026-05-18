# CLAUDE.md

Project context for Claude when working in this directory.

---

## What this project is

**Origin Story** is a cross-curricular project-based learning (PBL) mini-unit themed around superheroes. It is designed for use in juvenile justice schools (secure classrooms) and follows the same structure as the nonprofit's prior unit, *Unspoiled* (themed around U.S. National Parks).

**Audience:** incarcerated youth, middle/high school age. Engagement, identity, and second-chance themes are core — not add-ons.

**Unit shape:**
- 4 subject areas: Math, Science, ELA, Social Studies
- 10 mini-lessons per subject (40 total)
- Each lesson is 30–45 minutes
- Each lesson follows: **Do Now (2 min) → Mini Lesson (teacher) → Activity (students)**
- Culminates in a **Hero Pitch** competition (Shark Tank–style)

---

## Anchor heroes

Four heroes referenced across all 40 lessons. Chosen for cultural resonance with the student population and curricular fit.

| Hero | Role | Curricular doors |
|---|---|---|
| Miles Morales (Spider-Man) | Afro-Latino Brooklyn teen | Physics of motion · Identity / origin writing |
| Shuri | Black Panther universe, engineer-princess of Wakanda | Engineering · Materials science · Afrofuturism |
| Storm (Ororo Munroe) | Black female X-Men leader | Earth science · Civil rights allegory |
| Ms. Marvel (Kamala Khan) | Pakistani-American teen | ELA voice · Global mythology · Identity |

---

## The Hero Pitch — final project

Every student delivers a 3–5 minute pitch of an original hero they design. The pitch is built from four subject-area artifacts:

| Subject | Artifact |
|---|---|
| Math | Hero Stat Sheet & Battle Analysis |
| Science | Power Science Brief |
| ELA | Origin Story (1–2 pages) |
| Social Studies | Civic Mission One-Pager |

Judged on craft of each piece + integration across them. Classroom champion → school-level final.

---

## Files in this directory

- **`index.html`** — pitch website for internal team review. Single-page, self-contained, branded. Covers the big idea, anchor heroes, the 10-day lesson maps with full Do Now/Mini Lesson/Activity for each, the Hero Pitch, and a "why this audience" closing.
- **`math.md`**, **`science.md`**, **`ela.md`**, **`social-studies.md`** — editable markdown source of truth for the 40 lesson outlines, split by subject (10 lessons each). Each file is self-contained (anchor heroes + lesson structure repeated at top) so collaborators can work on different subjects in parallel without merge conflicts. Make changes here when revising lessons.
- **`danielle/`** — collaborator Danielle's parallel version of the unit (her own `index.html`, `superhero-initiative.md`, rubric, bibliography, materials list, prep checklist, README). Treat as a separate source — do not assume root files are canonical for her work or vice versa.
- **`CLAUDE.md`** — this file.

When the lessons are revised, update **both** the relevant subject `.md` file AND the corresponding day block in `index.html` so the two stay in sync. The anchor-hero table is duplicated across the four subject files; if those change, update all four.

---

## Brand colors

Nonprofit brand palette. Use these hex codes when adding visuals or sections.

| Name | Hex | Typical use |
|---|---|---|
| Blue | `#1F3A93` | Primary brand / structural |
| Turquoise | `#00B2A9` | Math subject color |
| Yellow | `#FDB82C` | Accent / highlight |
| Green | `#91D5AC` | Science subject color |
| Pink | `#FF366D` | ELA subject color |
| Orange | `#F57430` | Social Studies subject color |
| Charcoal | `#414143` | Body text / grounding |

Display font: **Bangers** (comic-style headers).
Body font: **Inter**.

---

## Audience-specific guidance

When generating or revising content for this unit:

1. **Lean into identity, redemption, transformation.** These themes resonate with this audience and are the spine of the unit, not subtext.
2. **Be thoughtful with vigilantism and law enforcement framing.** "Heroes vs. criminals" can land differently in a secure school. Center *choice*, *origin*, and *civic mission* over crime-fighting.
3. **Representation matters.** Anchor heroes were chosen deliberately. New examples should continue to reflect the diversity of the student population.
4. **Real-world problems over fantasy.** Civic missions, community heroes, real materials science, real ethics — keep one foot in the world students actually live in.

---

## Working preferences

- The user is a curriculum designer at a nonprofit. They are the subject-matter expert; Claude is a thought partner and drafting collaborator.
- Save substantive deliverables to disk (don't just keep them in conversation) and tell the user where they live.
- When making changes, edit existing files rather than creating parallel versions.
