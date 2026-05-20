# BreakFree Education — Style Guide

Source of truth for visual design across BreakFree's web properties. Distilled from the official **BreakFree Brand Guide (Fall 2020)**, with implementation notes for the current Next.js + Tailwind v4 codebase.

> A future frontend skill will read this file to enforce consistency — keep sections, headings, and token names stable.

---

## 1. Brand essence

**Mission.** Radically improve education in the juvenile and criminal justice systems by investing in the potential and dignity of all its students.

**Tagline (official).** *"A student's potential cannot be confined."*
Locked up in the primary logo. Reuse it as a hero headline whenever the logo lockup with tagline isn't present.

**Voice.** We see incarcerated youth as **scholars**. Tone is **dignified, optimistic, plain-spoken**. Lean into themes of **identity, transformation, second chance, full potential**. Avoid carceral euphemisms; name what's happening (jail, detention, confinement). Center the *student*, not the system.

**Core narrative beats** (reusable copy):
- "Every day in America, almost 50,000 young people wake up in a jail cell — some as young as eleven."
- "The moment they entered the juvenile justice system, these young people became defined by their past, not their potential."
- "We see these young people as the scholars they are, serving them with equal parts empathy and high expectations."

---

## 2. Logo

### Variants

| Variant | When to use |
|---|---|
| **Primary (lockup with tagline)** | Default. Use almost everywhere. Combines the Books/Bars mark + "BreakFree Education" wordmark + tagline. |
| **Secondary (lockup, no tagline)** | When the tagline would be illegible at small sizes, used separately on the piece, or would be redundant. |
| **Mark only ("Books/Bars")** | Tight spots, favicons, social avatars. The mark = book spines with negative space reading as jail bars. |

### Color treatments

- **Two-color** — preferred. Use CMYK for print, RGB for digital, PMS for offset/apparel.
- **One-color** — when only one ink/color is available.
- **Knockout (white)** — over dark color or photo backgrounds.
- **Black** — last resort; only when color is not available.

### Clear space

Around the logo, leave breathing room equal to **`x` = the height of "BreakFree Education" in the lockup**. Nothing else may enter that zone.

### Minimum size

- Lockup **without** tagline: **1″ wide minimum**.
- Lockup **with** tagline: **1.25″ wide minimum**.

### Co-branding

When BreakFree appears next to a partner logo:
- Keep a clear-space zone (`x` above) between them.
- **BreakFree first** if BreakFree is the dominant partner.
- **BreakFree after, adjacent (never below)** the other logo if BreakFree is subordinate.
- Maintain visual balance — heights should feel equivalent, not literal pixel match.

### Prohibited

- Do not modify, redraw, or recolor outside the approved variants.
- Do not add words or graphic elements to the lockup.
- Do not add drop shadows or other effects.
- Do not place on backgrounds that make the mark illegible.
- Do not stretch — preserve proportions.

### Source files

- `/public/brand/logo.png` — current digital logo asset. This is the **Secondary lockup** (no tagline): the three-bar Books/Bars mark in Cobalt, the wordmark "BreakFree" in Cobalt (Alegreya Sans), and "EDUCATION" below in Charcoal (Adelle Condensed slab serif). Wide aspect ratio (~3.5:1) — use full-width in narrow horizontal slots; pair with a separate tagline treatment if the page calls for one.

> **Missing variants.** The repo does not yet contain: knockout (white-on-dark) logo, primary lockup with tagline, mark-only file. Source these from your designer when needed. See §11.

---

## 3. Color palette

All palette colors are exposed as Tailwind tokens via `@theme` in `app/globals.css`. Use the token names (e.g. `bg-bf-blue`) in components — never paste hex codes inline.

### Primary palette

The two colors that build the logo. Default everything to these.

| Name | Token | Hex | RGB | CMYK | PMS |
|---|---|---|---|---|---|
| Cobalt | `bf-blue` | `#1F3A93` | 31.58.147 | 100.90.5.0 | 661 C / 286 U |
| Charcoal | `bf-charcoal` | `#414143` | 65.65.67 | 68.62.58.45 | 7540 C/U |

Cobalt and Charcoal each have **75% / 50% / 25% / 10% tones** in the official guide. Use them for backgrounds, icons, shapes, charts, and patterns — *not* arbitrary text colors.

| Tone | Cobalt | Charcoal |
|---|---|---|
| 75% | `#566BAD` | `#706F71` |
| 50% | `#8F9CC8` | `#9F9FA0` |
| 25% | `#C6CDE3` | `#CFCFCF` |
| 10% | `#E8EBFA` | `#EBEBEC` |

### Accent palette

Used to **enliven** materials — warmth and energy. Pair with the primary palette; never use as a replacement for it.

| Name | Token | Hex | RGB | CMYK | PMS |
|---|---|---|---|---|---|
| Orange | `bf-orange` | `#F57430` | 245.116.48 | 0.68.91.0 | 165 C/U |
| Green | `bf-green` | `#91D5AC` | 145.213.172 | 43.0.42.0 | 345 C/U |
| Turquoise | `bf-turquoise` | `#00B2A9` | 0.178.169 | 76.4.41.0 | 326 C/U |
| Yellow | `bf-yellow` | `#FDB82C` | 253.184.44 | 0.30.93.0 | 7549 C/U |
| Pink | `bf-pink` | `#FF366D` | 255.54.109 | 0.90.36.0 | 191 C / 1925 U |

Each accent color also has 75/50/25/10% tones — see the brand PDF for full hex builds. Add to `@theme` only as needed.

### Subject-color convention (Origin Story / cross-curricular work)

By convention adopted in the curricular work (see `public/ma/CLAUDE.md`):

- Math → **Turquoise** (`bf-turquoise`)
- Science → **Green** (`bf-green`)
- ELA → **Pink** (`bf-pink`)
- Social Studies → **Orange** (`bf-orange`)
- Accents/highlights → **Yellow** (`bf-yellow`)

### Color rules of thumb

1. **Primary first.** Cobalt + Charcoal should anchor every layout. Accents are seasoning, not entrée.
2. **One accent per surface.** Don't stack three accents in a single section — pick one and let it carry.
3. **Body text** is Charcoal (`text-bf-charcoal`), set on white or a tone-25 background — never a dark hue.
4. **Yellow on Cobalt** is the brand's signature pop — use it for primary CTAs, key callouts, and the eyebrow chip pattern.

---

## 4. Typography

> **✅ Decided.** The marketing site (root Next.js app) follows the **brand-guide system: Raleway (display) + Roboto (body)**. The youth-facing program subsites under `public/` (Origin Story, Words Unlocked) keep their original **Bangers + Inter** — that's the intentional hybrid path described in option 3 below.

### Brand-guide system (Fall 2020)

| Role | Typeface | Notes |
|---|---|---|
| Body / subheads | **Roboto** (Regular, Bold) | Google Fonts |
| Body in tight space | **Roboto Condensed** | Google Fonts |
| Headlines / call-out boxes / sidebars | **Raleway** (Regular, Bold) | Google Fonts |
| Fallback (when Roboto/Raleway unavailable, e.g. Word/PowerPoint) | **Arial** | System font |
| Logo only — **never** use elsewhere | **Alegreya Sans** + **Adelle Condensed** | Logo lockup type |

### Current codebase system (`app/globals.css`)

| Token | Family | Used as |
|---|---|---|
| `--font-display` (`font-display`) | **Raleway** (400/600/700/800) | Headlines, hero, section titles, callouts |
| `--font-body` (`font-body`) | **Roboto** (400/500/700) | Body, UI, default |

If a Roboto Condensed need arises (tight spaces, dense data), add a `--font-condensed` token and load the family in `app/layout.tsx`.

### Recommendation (proposal — confirm with stakeholders)

The brand guide is 5+ years old. The Bangers/Inter system was an intentional choice for the youth-facing curricular work (Origin Story superhero theme, Words Unlocked poetry). Three reasonable paths:

1. **Adopt the brand guide as-is.** Swap Bangers → Raleway, Inter → Roboto across the app. Cleanest brand compliance.
2. **Officially deviate.** Keep Bangers + Inter, update the brand guide as the new BreakFree typography. Best if Bangers/Inter is intentional.
3. **Hybrid.** Use Raleway/Roboto for the BreakFree marketing site (org-level pages), keep Bangers + Inter for the youth-facing program subsites where the comic energy is on-theme.

**Until decided:** continue using `font-display` / `font-body` Tailwind tokens. Don't paste raw font names. When the decision is made, change the token values in one place (`app/globals.css`) and the whole app updates.

---

## 5. Iconography

- **Style:** hand-drawn / doodle, with varied thick-thin line weights.
- **Source library:** Noun Project — `thenounproject.com/rebelsaeful/collection/education-ink/`.
- **Search terms** when sourcing elsewhere: *doodle*, *sketch*, *hand drawn*.
- **Color:** use primary palette and tones; avoid heavy multi-color icons.

Pair icons with **irregular shapes** (see §6) — icon sits on top, off-center.

---

## 6. Shapes & patterns

### Irregular shapes

The brand uses **organic shapes — ovals, circles, jelly-bean blobs** — behind icons, images, or text to add depth and visual interest. The Words Unlocked landing page logo blob is a canonical example.

Use cases:
- Frame a callout or quote
- Sit behind a hand-drawn icon
- Anchor a hero image
- Provide structure within content

### Logo pattern

A repeating texture built from the **Books/Bars mark**, used as a **muted textural element**:
- On 100% Cobalt: pattern at 75% opacity.
- On white: pattern at 10% opacity.

Never use the logo pattern at 100% — it competes with the actual logo.

---

## 7. Image treatment

To make stock or partner photography feel **uniquely BreakFree**:

1. **Monotone in Cobalt.** Apply a duotone or monotone using `bf-blue` as the dominant color.
2. **Overlay an irregular shape** (see §6) on the image using a **Multiply** blend mode to add transparency and highlight a focal area.
3. **Layer thoughtfully.** Background → photo → cobalt monotone → irregular shape (Multiply) → icon or text on top.

Repo brand photo library: `/public/brand/photo-*` and `/public/brand/headshot-*` — use these before bringing in stock.

---

## 8. Tone & voice

- **Dignified, not pitying.** Students are scholars; their work is real.
- **Specific, not abstract.** "50,000 young people wake up in a jail cell" beats "many young people are incarcerated."
- **Hopeful, not naïve.** Acknowledge mistakes; insist on potential.
- **Plain, not jargon-y.** Avoid sector acronyms (JJ, RTC, DJJ) on public-facing pages unless defined.
- **Action verbs.** Build. Run. Train. Partner. Shape.

---

## 9. Implementation notes (current codebase)

- **Color tokens** live in `app/globals.css` under `@theme`. Add tones (e.g., `--color-bf-blue-75: #566BAD;`) here when you need them; never hardcode hex in components.
- **Font tokens**: `font-display` and `font-body` — apply with Tailwind utilities (`className="font-display"`).
- **Shared layout primitives** live in `app/_components/` (`SiteHeader`, `SiteFooter`). Use them on every marketing page so the nav/footer stay consistent.
- **Marketing routes** are under `app/` and follow App Router conventions (folder + `page.tsx` = pretty URL).
- **Brand assets** live in `/public/brand/`. Reference via `/brand/<filename>` — Next.js serves `/public/` at the URL root. See §12 for the full catalog with usage suggestions.
- **The Customizer (`/customize`)** has its own UX needs and is not bound by this marketing-page system 1:1; defer to its own design when in conflict.
- **SiteHeader/SiteFooter currently use a placeholder mark** (a "B" tile in a colored box) instead of the real `/brand/logo.png`. Swap when ready (see §11).

---

## 10. Where to find things

| Asset | Path |
|---|---|
| Official brand guide PDF | `docs/BreakFree Brand Guide 9.15.20 (1).pdf` |
| This document | `docs/style-guide.md` |
| Logo (digital) | `public/brand/logo.png` |
| Brand photos | `public/brand/photo-*` |
| Team headshots | `public/brand/headshot-*` |
| Tailwind tokens | `app/globals.css` (`@theme` block) |
| Shared header/footer | `app/_components/SiteHeader.tsx`, `SiteFooter.tsx` |

---

## 11. Open questions / decisions to resolve

1. ~~**Typography.** Brand-guide Roboto/Raleway vs current Bangers/Inter — see §4 Recommendation.~~ **✅ Resolved** — marketing site uses Raleway + Roboto (brand guide); program subsites keep Bangers + Inter (intentional hybrid). See §4.
2. **Logo on dark backgrounds.** `logo.png` is the Cobalt-on-white secondary lockup. For the dark navy SiteFooter and any photo-overlaid hero, we need the **knockout (white)** version — add as `public/brand/logo-white.png`. Until it exists, the footer will need an off-white panel or the placeholder mark.
3. **Logo with tagline.** Only the secondary (no-tagline) lockup is in the repo. If we want the primary lockup (with *"A student's potential cannot be confined."*) for the homepage hero, source that file and add as `public/brand/logo-tagline.png`.
4. **Mark-only logo file.** We don't have the standalone Books/Bars mark — needed for favicons, social avatars, and tight square slots. Add as `public/brand/mark.svg` or `mark.png`.
5. **Swap the placeholder.** `SiteHeader` and `SiteFooter` use a "B in a box" placeholder. Once we choose a header treatment (logo lockup vs mark-only vs wordmark), swap them across both components.
6. **Tone variants.** Voice guidance (§8) is calibrated for the marketing site. Tone for the youth-facing Words Unlocked / Origin Story sites may legitimately differ (more energetic, second-person). Document those separately if so.
7. **Headshot consistency.** Current team headshots (§12) are inconsistent in framing, background, lighting, and crop. For a unified About → Team grid we'd want consistently-cropped, similarly-lit portraits. Either re-shoot, retouch, or pick a presentation style (e.g., circle crops + duotone) that hides the variance.

---

## 12. Asset catalog

All files live in `/public/brand/` and resolve at `/brand/<filename>` in the app. Sizes shown for reference — use Next.js `<Image>` for responsive serving.

### 12.1 Logo

| File | What it shows | Suggested use |
|---|---|---|
| `logo.png` | Three vertical Cobalt book spines reading as jail bars, plus the wordmark "BreakFree" in Cobalt and "EDUCATION" in Charcoal slab serif. Wide ~3.5:1. White background, no tagline. | Site header on light backgrounds; partner decks; PDFs. **Do not** use on dark or photo backgrounds without a white card behind it (we lack a knockout file — see §11). |

### 12.2 Hero / editorial photography

| File | What it shows | Tone | Suggested use |
|---|---|---|---|
| `photo-travis-hill-students-books.jpg` | Five male students at Travis Hill School, photographed from behind, arms raised triumphantly holding books overhead beneath the school's signage. | Triumph, agency, hope. | **Hero of the homepage** or **School Management page**. The most iconic and brand-aligned image in the library. |
| `photo-classroom-circle-richard-ross.jpg` | Female students in green detention scrubs seated in a circle with notebooks, in a stark white facility with numbered cell doors (501–505). Richard Ross photograph. | Sobering, dignified, documentary. | **About / Mission** section to ground the work in reality. **Cultivate** page. Apply Cobalt monotone overlay per §7 to integrate with the palette. |
| `landing-page-pic.jpg` *(was `photo-student-cell-block-richard-ross.jpg`)* | A single student in teal scrubs alone at a small institutional table between two cell doors (C117/C118), Pueblo Youth Services Center. Richard Ross photograph. | Solitary, stark — the problem we exist to address. | **Homepage hero** (current placement); also fits the **Support / Donate** lead and the **About** narrative section. Use sparingly and with care — pair with strong upward narrative. Cobalt monotone optional. |
| `photo-students-reading-classroom.jpg` | Three female students in maroon scrubs reading books — *Louis Armstrong: Satchmo* and *What Are My Rights?* in frame — against a tie-dye tapestry backdrop. | Engaged, candid, warm. | **Teacher Resources** page header; **Books Over Bars** podcast page; lesson library marketing. |
| `photo-students-reading-just-mercy.jpg` | Top-down shot of student hands at a wooden picnic table, working on papers around copies of *Just Mercy*, water bottles scattered. | Active study, community, outdoor learning. | **Cultivate** page; **Teacher Resources**; book-club or read-along callouts. |
| `photo-student-writing-rights.jpg` | Young Black man in a checkered blazer writing with pencil on legal paper in a library setting, *What Are My Rights?* book visible. | Focused, scholarly, dignified. | **Civic engagement / policy** content; **About** team or program section; **Fellowship** secondary image. |
| `photo-breakfree-ignite-workshop.jpg` | Three educator-aged adults seated at a round workshop table with name tags, BreakFree-branded books, beaded necklaces, and post-its. | Convening, peer learning, professional. | **Consortium & Friends**; **Cultivate** annual gathering callout; **About → Team** workshop. |
| `photo-raa-fellows-certificates.png` | Two men holding *Certificate of Completion* documents in front of a "BreakFree Education / RAA Fellowship" banner. Portrait crop. | Accomplishment, milestone. | **Fellowship** page hero or feature image. The only Fellowship-specific photo in the library. |

### 12.3 Team headshots

Six portraits, varied framing and backgrounds. Use on **About → Team** and individual bio pages. See §11 for consistency notes.

| File | Description | Likely identity |
|---|---|---|
| `headshot-christina.jpg` | Woman with brown hair in a blue floral blouse, smiling, in front of a bookcase with greenery. Studio-warm lighting. | Christina — curriculum designer on the team (the user). |
| `headshot-danielle.jpg` | Woman with long brown hair smiling, wearing a bright orange "TEACHER" graphic tee. Plain wall background. Phone selfie style. | Danielle — collaborator on the Origin Story unit. |
| `headshot-david.jpg` | Man with short brown hair and glasses, white button-down shirt, laughing at a podium with microphones. Action/event shot. | Likely David Domenici — Executive Director, BreakFree Education (also on the Board). |
| `headshot-jack.jpg` | Young man with curly hair and short beard, navy chore jacket over chambray shirt, wood-paneled background. Professional studio style. | Jack — team member. |
| `headshot-kaylah.jpg` | Woman with straight black hair and bangs in a black leather jacket, smiling, seated in a Windsor chair against bookshelves. Bookstore/library aesthetic. | Kaylah — team member. |
| `headshot-mi-ji.jpg` | Woman with bobbed gray hair and dark-rimmed glasses in a black-and-white plaid coat, standing in front of water and modern buildings. Outdoor/urban. | Mi-Ji — team member. |

### 12.4 Asset gaps

Things we **don't** have yet but will need:

- Knockout/white logo (for dark backgrounds — see §11.2)
- Primary lockup with tagline (see §11.3)
- Standalone Books/Bars mark for favicons and avatars (see §11.4)
- BreakFree Fellowship action photos beyond the certificate handoff
- Travis Hill School photos beyond the books-overhead shot
- Photos depicting the Maya Angelou Academy if it's a current property
- Partner-logo strip (Ballmer Group, Annie E. Casey Foundation, AIFCS, Spotify SoundTrap, etc., per the live site footer)
