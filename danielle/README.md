# Superheroes: A 5-Week Cross-Curricular Initiative

A summer educational initiative for Massachusetts juvenile justice schools, designed by **BreakFree-Ed**. Trauma-informed, MA Curriculum Framework-aligned, built for students ages 12–19.

## What's in this project

| File | What it is |
|---|---|
| `index.html` | **Interactive teacher-facing website.** Open in any browser. Filter lessons by subject, week, day, or keyword. Print individual lessons. |
| `superhero-initiative.md` | **Source curriculum document.** All Week 1 lesson plans in editable markdown. |
| `materials-list.md` | Aggregate shopping list across all 20 lessons. Hand this to admins or paste into a Donors Choose project. |
| `capstone-rubric.md` | 4-criteria, 4-level rubric for grading the Hero Codex Trifold. |
| `bibliography.md` | Full citations for every text, comic, primary source, and film referenced. |
| `teacher-prep-checklist.md` | Pre-program timeline: what to do 2 weeks before, 1 week before, and day-of. |
| `README.md` | This file. |

## How to use the website

1. **Double-click `index.html`** to open it in your default browser. No internet, server, or install required.
2. Use the dropdowns at the top to filter:
   - **Subject** (ELA, Math, Science, History)
   - **Week** (1–5)
   - **Day** (1–5; Day 5 is Codex Build Day)
   - **Search box** for keywords or specific MA standards
3. **Click any lesson** to expand and read the full plan.
4. **"Print this lesson"** button on each card produces a clean printable version.
5. **"Expand all"** opens every visible lesson at once — useful for printing a whole week.

## The Initiative at a Glance

### 5-Week Hero's Journey Arc

| Week | Stage | Theme Question |
|---|---|---|
| 1 | The Ordinary World & The Call | Who counts as a hero? Who decides? |
| 2 | Crossing the Threshold & Trials | Where does power come from? |
| 3 | The Abyss & Transformation | What makes a hero different from a villain? |
| 4 | Allies, Mentors & The Team | Why does no hero stand alone? |
| 5 | Return with the Elixir | How do I bring something back to my community? |

### Class structure (50–55 minutes)

| Segment | Time |
|---|---|
| Do Now | 5 min |
| Mini-lesson | 10–12 min |
| Activity | 25–30 min |
| Exit Ticket | 5 min |

### Capstone: The Hero Codex Trifold

A cardboard trifold (one per student) that grows across the 5 weeks. By Week 5, each trifold holds six panels representing every subject's contribution. Trifolds are presented at a community showcase. See `capstone-rubric.md` for grading.

## Current status

- **Week 1 (20 lessons) — complete and live in the website.**
- Weeks 2–5 — framework established (arc, themes, Codex panel structure), lessons not yet written.

## Adding Weeks 2–5

To add more lessons to the website:

1. Open `index.html` in a text editor.
2. Find the `const LESSONS = [...]` array (near line 540).
3. Add new lesson objects using the same structure as existing Week 1 entries. Required fields:
   - `subject` (`'ela'`, `'math'`, `'science'`, or `'history'`)
   - `week`, `day` (numbers)
   - `title`, `themeQuestion`
   - `standards` (array of `{ code, text }`)
   - `objectives` (array of strings)
   - `materials`, `doNow`, `miniLesson`, `activity`, `exitTicket`
   - `differentiation` (`{ younger, older }`)
   - `codexPrep` (optional)
4. Save. Refresh the browser. New lessons appear automatically with all filters working.

## Design philosophy

This curriculum is built specifically for justice-involved youth. Four principles:

1. **Position students as heroes, not as those waiting to be saved.** They've been on the receiving end of "saving" systems. The hero in this curriculum is them.
2. **Villain analysis is intentional.** Treating students as capable of moral nuance (Killmonger, Magneto in Week 3) respects them as adults.
3. **Real heroes anchor Week 4.** Community speakers — formerly incarcerated mentors, organizers, EMTs — model the "return" stage.
4. **Trauma-informed by design.** The abyss stage is included, not skipped, but students choose how much of their own story they share.

## Contact

BreakFree-Ed
initiatives@breakfree-ed.org
