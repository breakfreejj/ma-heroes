# CLAUDE.md — Words Unlocked

Project context for Claude when working in `wordsunlocked/`.

---

## What this is

**Words Unlocked** is BreakFree Education's National Poetry Month (April) initiative — a 7-lesson poetry curriculum that culminates in a national poetry contest for incarcerated and court-involved youth (age 21 and under, in locked juvenile/adult facilities or court-mandated programs).

This directory holds the **source materials** for the existing 2025–2026 program. We are working *from* these materials — likely to refresh, adapt, port, or build alongside them. Treat them as the canonical reference, not the finished product we're shipping.

**2026 theme: "To Let Go"** — making peace with what we can't change, forgiveness, opening space for growth. Tagline from the contest guide: *"It's not giving up, it's growing up. It's learning that freedom often starts with an open hand."*

**Key dates:** Submission window opens 04/20/26, closes midnight 04/30/26.

---

## Lesson arc

Mirrors the Do Now → Mini Lesson → Practice → Exit Ticket shape used across BreakFree units.

| # | Topic |
|---|---|
| 1 | Unit Launch & Poetry Introduction (literature circles) |
| 2 | Metaphor & Simile |
| 3 | Personification |
| 4 | Alliteration & Symbolism |
| 5 | Onomatopoeia & Imagery |
| 6 | Spoken Word |
| 7 | Poetry Recital / Poetry Slam (culminating event) |

Plus optional lessons (concrete poems, ode, elegy, rhyme scheme, etc.) for facilities that have more time.

---

## Files in `sources/`

| File | What it is |
|---|---|
| `8 APR Words Unlocked Facilitation Guide.docx` | Master doc — calendar, lesson outline table, standards, AI policy, FAQs, differentiation, contest policies. Start here. |
| `WU Lesson Plans ALL.docx` | Teacher-facing lesson plans: objectives, key points, teacher/student actions, materials, differentiation, Common Core + National Core Arts standards per lesson. |
| `WU Handouts .docx` | Printable student worksheets — Do Nows, poems for analysis, exit tickets, literature-circle role sheets. |
| `Words Unlocked Lesson Slides 25-26.pdf` | 114-page student-facing slide deck spanning all 7 lessons. |
| `Words Unlocked Optional Lessons.pdf` | 82-page deck of extra/optional lessons. |
| `WU Poetic Devices Glossary.docx` | Fill-in glossary template (metaphor, simile, personification, alliteration, symbolism, onomatopoeia, imagery, spoken word; optional: rhyme scheme, elegy, ode, concrete poems). |
| `Virtual Poetry Cafe_ Poetry Slam Guide.docx` | How to run Lesson 7 as an in-person or virtual Poetry Café, including using it to pick the facility's contest submission. |
| `WU Poetry Contest Guidelines 2025-2026.docx` | Contest rules (see below). |
| `WU Rubric 25-26.docx` | Judging rubric (see below). |
| `WU Weekly Challenges (1) (1).pdf` | Side-channel mini-contests run weekly during April; submissions to initiatives@breakfree-ed.org. Week 3 = concrete poem, due 4/24. |

---

## Contest constraints (anything we build has to fit these)

- **Eligibility:** ≤21 years old as of 04/01/26, in a locked juvenile/adult facility or court-mandated program.
- **Poem must be:** ≤50 lines (title + stanza breaks don't count), English (non-English phrases OK with translation), previously unpublished, sole work of the student(s), submitted as a Word document.
- **One winning poem per facility** (ratio: 1 poem per 25 eligible poets, capped at 5 per facility).
- **AI policy:** allowed for *idea generation and brainstorming only* — not for drafting, phrasing, or refining. Wording and structure must be the student's own.
- **Prizes:** 1st place — Chromebook or $100 Amazon gift card + BreakFree website publication. 2nd/3rd — prize bundles + publication. Group winners ≤3 get Chromebooks; larger groups get an alternate prize.

---

## Rubric

Five-point scale per dimension (Beginning 1 → Exemplary 5):

| Dimension | What it measures |
|---|---|
| **Message** | Clarity, engagement, integration of the year's theme |
| **Spelling/Grammar** | Conventions — with explicit allowance for purposeful unconventional use as a poetic device |
| **Technique** | Vocabulary, figurative language, sensory detail, poetic devices, response evoked |
| **Originality** | Distinct voice, perspective, creative approach |

---

## Working with these materials

- The `.docx` files are converted to markdown in `/tmp/wu_md/` for reading. Re-run `pandoc -f docx -t markdown` to refresh if the sources change.
- The two large PDFs (slides + optional lessons) need `brew install poppler` for me to read them directly; without it, I can only see filenames and page counts. The .docx content covers most of what's in them in text form.
- Audience overlap with the Origin Story unit: justice-involved youth. Same guardrails apply — center identity, transformation, voice; be thoughtful with framing around crime and law enforcement; representation matters.
