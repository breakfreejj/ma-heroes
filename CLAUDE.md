# CLAUDE.md

Repo-level context for the BreakFree Education web app.

---

## What this repo is

The single Next.js project + single Vercel deployment for everything BreakFree ships on the web. Public marketing/landing pages (including Danielle's Words Unlocked landing) and the authenticated **Words Unlocked Customizer** (a chat-with-an-LLM tool for teachers to customize the Words Unlocked poetry curriculum) live in one app.

BreakFree is a national nonprofit serving teachers in juvenile justice schools.

---

## Stack

- **Next.js 16 App Router** (Turbopack dev) with TypeScript strict
- **Tailwind v4** (CSS-first config in `app/globals.css`)
- **Supabase** for auth (email magic link), Postgres, and Storage — *not yet wired up*
- **Anthropic Claude** via the Vercel AI SDK for the customizer agent — *not yet wired up*
- **docxtemplater** for `.docx` + `.pptx` template substitution at export time — *not yet wired up*

The approved implementation plan with the full architecture lives at `~/.claude/plans/cool-now-make-a-mossy-flurry.md`. Read it before doing any non-trivial work on the customizer.

---

## Repo layout

```
/                          # Next.js app root, Vercel project root
├── app/                   # App Router routes
│   ├── layout.tsx         # Bangers + Inter fonts, global metadata
│   ├── page.tsx           # Root splash (BreakFree, links to /ma + /customize)
│   ├── globals.css        # Tailwind import + BreakFree palette as @theme tokens
│   └── customize/page.tsx # Stub for the Words Unlocked Customizer
├── public/
│   ├── ma/                # Legacy Origin Story static unit (see public/ma/CLAUDE.md)
│   └── wordsunlocked/     # Danielle's WU landing page + curriculum sources
│       ├── CLAUDE.md      # Words Unlocked curriculum context
│       ├── index.html     # Landing page (Customize Here → /customize)
│       ├── design/        # Logo + brand assets
│       └── sources/       # Canonical curriculum source files (.docx + .pdf)
├── next.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.mjs
└── CLAUDE.md              # This file
```

Subdirectory CLAUDE.md files scope context to their tree:
- `public/ma/CLAUDE.md` — Origin Story unit context
- `public/wordsunlocked/CLAUDE.md` — Words Unlocked curriculum context (source materials, theme, contest rules, file map)

---

## Brand

Available as Tailwind color tokens via `@theme` in `app/globals.css`:

| Token | Hex | Use |
|---|---|---|
| `bf-blue` | `#1F3A93` | Primary brand |
| `bf-turquoise` | `#00B2A9` | Math |
| `bf-yellow` | `#FDB82C` | Accent / highlight |
| `bf-green` | `#91D5AC` | Science |
| `bf-pink` | `#FF366D` | ELA |
| `bf-orange` | `#F57430` | Social Studies |
| `bf-charcoal` | `#414143` | Body text |

Fonts: `font-display` = **Bangers** (comic headers), `font-body` = **Inter** (body, default).

---

## Dev workflow

```sh
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

---

## Status

Scaffolding only. Implemented so far:
- Root splash at `/` (Next.js page).
- Stub customizer page at `/customize`.
- Legacy Origin Story unit served at `/ma/*` from `public/ma/`.

Not yet built (next steps from the plan):
- One-shot `scripts/ingest.ts` to convert `wordsunlocked/sources/*.docx` → canonical JSON.
- Zod content schema in `lib/schema.ts`.
- Supabase project, migration `0001_init.sql`, auth, RLS.
- `/api/chat` agent route, tools, prompt caching.
- `/api/export` docxtemplater pipeline.
- Two-pane chat + preview UI under `/customize`.
- Curated poem corpus for `search_poems`.

---

## Working preferences (carry over from prior CLAUDE.md)

- The user (Christina) is a curriculum designer at the nonprofit, not a software engineer. They are the subject-matter expert; Claude is a thought partner and drafting collaborator.
- Audience for the curriculum content itself: youth in secure juvenile justice facilities. Identity, transformation, and second-chance themes are core, not subtext. Be thoughtful with framing around law enforcement, vigilantism, and incarceration.
- Save substantive deliverables to disk; don't keep them only in conversation. Tell the user where files live.
- Edit existing files rather than creating parallel versions.
