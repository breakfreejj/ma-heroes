# CLAUDE.md

Repo-level context for the BreakFree Education web app.

---

## What this repo is

The single Next.js project + single Vercel deployment for everything BreakFree ships on the web. Public marketing/landing pages (including Danielle's Words Unlocked landing) and the authenticated **Words Unlocked Customizer** (a chat-with-an-LLM tool for teachers to customize the Words Unlocked poetry curriculum) live in one app.

BreakFree is a national nonprofit serving teachers in juvenile justice schools.

Setup is documented in [`SETUP.md`](./SETUP.md). The approved implementation plan with the full architecture is at `~/.claude/plans/cool-now-make-a-mossy-flurry.md` — read it before doing any non-trivial customizer work.

---

## Stack

- **Next.js 16 App Router** (Turbopack dev) with TypeScript strict
- **Tailwind v4** (CSS-first config in `app/globals.css`)
- **Supabase** for auth (email magic link), Postgres (5 tables + RLS), and Storage (`bundles` bucket)
- **Anthropic Claude (Sonnet 4.5)** via the **Vercel AI SDK v6** for the customizer agent — tool-using single-loop, prompt caching enabled
- **docx** npm library for programmatic `.docx` generation (MVP deviates from the plan's docxtemplater; see SETUP.md §6)
- **JSZip** for packaging download bundles

---

## Repo layout

```
/                              # Next.js app + Vercel project root
├── app/                       # App Router routes
│   ├── layout.tsx             # Bangers + Inter fonts, global metadata
│   ├── globals.css            # Tailwind import + BreakFree palette as @theme tokens
│   ├── page.tsx               # Root BreakFree splash
│   ├── login/page.tsx         # Magic-link sign-in
│   ├── auth/
│   │   ├── callback/route.ts  # Supabase OAuth code → session exchange
│   │   └── signout/route.ts   # Clears session
│   ├── customize/             # The customizer (authenticated)
│   │   ├── page.tsx           # Server: auth check + project find-or-create
│   │   ├── Customizer.tsx     # Client root, holds snapshot state + download button
│   │   ├── Chat.tsx           # Client: useChat against /api/chat
│   │   └── Preview.tsx        # Client: rendered curriculum snapshot
│   └── api/
│       ├── chat/route.ts      # Streaming chat with Anthropic + tools
│       ├── export/route.ts    # Snapshot → .docx zip → Supabase Storage → signed URL
│       └── snapshot/route.ts  # GET current snapshot for the preview pane
├── lib/
│   ├── schema.ts              # Zod types for Curriculum, Lesson, Poem, Activity
│   ├── curriculum.ts          # loadBaseCurriculum() helper
│   ├── poems.ts               # Corpus access + search
│   ├── agent/
│   │   ├── system-prompt.ts   # System prompt builder
│   │   └── tools.ts           # read_lesson, search_poems, swap_poem, update_activity, update_lesson_duration_target
│   ├── export/docx.ts         # generateLessonPlansDocx / generateHandoutsDocx
│   └── supabase/
│       ├── server.ts          # Server (RSC + route handler) client
│       ├── client.ts          # Browser client
│       └── middleware.ts      # Session refresh + /customize gating
├── content/
│   ├── words-unlocked-2026.json  # Canonical curriculum JSON (source of truth for the agent)
│   └── poems.json                # Curated poem corpus
├── supabase/migrations/0001_init.sql  # 5 tables + RLS + storage bucket
├── scripts/ingest.ts          # docx → text dumps (re-ingestion helper)
├── middleware.ts              # Next.js middleware: delegates to lib/supabase/middleware
├── public/
│   ├── ma/                    # Legacy Origin Story static unit (see public/ma/CLAUDE.md)
│   └── wordsunlocked/         # Danielle's WU landing page + curriculum sources
│       ├── CLAUDE.md          # Words Unlocked curriculum context
│       ├── index.html         # Landing page (Customize Here → /customize)
│       ├── design/            # Logo + brand assets
│       └── sources/           # Curriculum source files (.docx + .pdf)
├── .env.example
├── SETUP.md                   # Operator setup (env vars, Supabase, smoke test)
├── next.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.mjs
└── CLAUDE.md                  # This file
```

Subdirectory CLAUDE.md files scope context to their tree:
- `public/ma/CLAUDE.md` — Origin Story unit context
- `public/wordsunlocked/CLAUDE.md` — Words Unlocked curriculum context (theme, contest rules, source files)

---

## Data model (Supabase)

`profiles` · `projects` · `snapshots` · `messages` · `bundles`. All RLS-scoped by `auth.uid()` (parent rows by `user_id`; children by join through their parent project). `snapshots` is append-only — every agent edit creates a new row, `projects.current_snapshot_id` points at the head. Storage bucket `bundles` keyed by `{user_id}/{project_id}/{snapshot_id}.zip`. Migration: `supabase/migrations/0001_init.sql`.

---

## Agent design

`POST /api/chat` loads the current snapshot, hydrates an in-memory `Curriculum`, and runs `streamText` with five tools (`read_lesson`, `list_poems`, `search_poems`, `swap_poem`, `update_activity`, `update_lesson_duration_target`). Mutating tools call `ctx.onSnapshot(next, message)` which inserts a new `snapshots` row and bumps `projects.current_snapshot_id`. Prompt caching is enabled via `providerOptions.anthropic.cacheControl`. Model: `claude-sonnet-4-5`.

The MVP supports three customization verbs: swap a poem, adjust lesson length, rewrite a Do Now or Exit Ticket. See the plan for the path-to-maximal (standards retargeting, add-new-lessons, slide regeneration).

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
cp .env.example .env.local   # then fill in 4 values — see SETUP.md
npm run dev                  # http://localhost:3000
npm run typecheck            # tsc --noEmit
npm run build                # production build
npm run ingest               # dump .docx sources to .tmp/ingest/ for re-curation
```

Deploys are triggered by `git push origin main` (Vercel auto-deploys from GitHub). Do not run `vercel deploy` manually.

---

## Working preferences (carry over)

- The user (Christina) is a curriculum designer at the nonprofit, not a software engineer. They are the subject-matter expert; Claude is a thought partner and drafting collaborator.
- Audience for the curriculum content: youth in secure juvenile justice facilities. Identity, transformation, and second-chance themes are core, not subtext. Be thoughtful with framing around law enforcement, vigilantism, and incarceration.
- Save substantive deliverables to disk; don't keep them only in conversation. Tell the user where files live.
- Edit existing files rather than creating parallel versions.
