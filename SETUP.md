# BreakFree — Setup Guide

You just got off the plane and you want to bring up the Words Unlocked Customizer end to end. This file walks through every external thing you need to wire up.

If you only edit Markdown + lesson plans and don't run the app: stop here.

---

## 1. What you need to provide

The app needs three secrets and one config value. Set them in **Vercel → Project Settings → Environment Variables** (and locally in a `.env.local` if you run `npm run dev`).

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project → Settings → API | Looks like `https://abcd1234.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page | The `anon` `public` key. Safe to expose in the browser. |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/settings/keys | Server-side only. Do NOT prefix with `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_SITE_URL` | Whatever the deploy is on | Set to `https://<your-vercel-domain>` in prod; `http://localhost:3000` locally. Used for auth callback URLs. |

Copy `.env.example` → `.env.local` and fill it in. Then `npm run dev`.

---

## 2. Supabase setup (one time)

1. Create a free Supabase project at https://supabase.com/dashboard.
2. Note the **Project URL** and **anon key** (above) and save them as Vercel env vars.
3. In the Supabase dashboard, go to **SQL Editor** → **New query** and paste the entire contents of [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql). Hit Run. This creates the 5 tables, RLS policies, and the storage bucket.
4. Go to **Authentication → URL Configuration** and add `https://<your-vercel-domain>/auth/callback` (and `http://localhost:3000/auth/callback` for local dev) to the **Redirect URLs** list.
5. Optional but recommended: under **Authentication → Email Templates**, customize the magic-link email to match the BreakFree brand.

You can re-apply the migration by running it in the SQL editor — it uses `if not exists`-style guards where it matters; for the table `create` statements it will error if they already exist, which is the right behavior to prevent accidental wipes.

---

## 3. Anthropic API key

1. Go to https://console.anthropic.com/settings/keys and create a key.
2. Add as `ANTHROPIC_API_KEY` in Vercel → Project Settings → Environment Variables.
3. The app uses **Claude Sonnet 4.5** (`claude-sonnet-4-5`). The default Anthropic free tier is enough to test; for production traffic, top up.

Cost note: with prompt caching enabled and ~150KB of curriculum context, expect ~$0.50–$1 per teacher session in steady state. The chat endpoint is at `app/api/chat/route.ts` if you want to tune the model or `stopWhen`.

---

## 4. Local dev workflow

```sh
npm install
cp .env.example .env.local   # then fill in the four values above
npm run dev                  # http://localhost:3000
```

Useful scripts:
- `npm run typecheck` — TypeScript strict check, run before pushing.
- `npm run build` — production build (also runs the type checker).
- `npm run ingest` — dumps the source `.docx` files in `public/wordsunlocked/sources/` to plain text under `.tmp/ingest/`. Used when you re-curate the canonical curriculum JSON.

---

## 5. How the app fits together

```
Teacher  →  /wordsunlocked/index.html   (Danielle's landing page, static)
            └── clicks "Customize Here" →  /customize
                                          ├── if not signed in → /login (magic link)
                                          ├── auto-creates a Project on first visit
                                          ├── Two-pane UI:
                                          │   ├── Chat (POST /api/chat — streaming, Anthropic)
                                          │   └── Preview (snapshot rendered live)
                                          └── Download button → POST /api/export
                                                                 → builds .docx zip
                                                                 → uploads to Supabase Storage
                                                                 → returns signed URL
```

Persistence:
- `profiles` — per user (display name, school) — currently not exposed in UI; ready for v2.
- `projects` — one per customized unit. Default is auto-created on first sign-in.
- `snapshots` — append-only. Every agent edit creates a new snapshot. `projects.current_snapshot_id` points at the head.
- `messages` — chat history (not yet persisted in v1 — `useChat` keeps it client-side. v2 should write to this table on each turn for resume-and-continue).
- `bundles` — generated download artifacts in Supabase Storage. Path `{user_id}/{project_id}/{snapshot_id}.zip`.

---

## 6. What's in MVP and what isn't

**MVP shipped (this build):**
- Magic-link auth.
- One project per user, auto-created on first login.
- Chat-with-agent UI (two-pane: chat left, preview right).
- Three customization verbs:
  - Swap a poem in a lesson activity (`swap_poem`).
  - Adjust a lesson's total duration (`update_lesson_duration_target`).
  - Rewrite a Do Now or Exit Ticket prompt (`update_activity`).
- Curated corpus of ~25 poems (mix of public-domain + sample/original; needs rights audit before printing).
- Download a `.docx` zip containing `lesson-plans.docx` + `handouts.docx`.
- Snapshots persisted; download bundles persisted.

**Known deferred (path-to-maximal in the plan):**
- Standards retargeting (TEKS, NY, CA…). Tool stubbed in `lib/agent/tools.ts`; not exposed yet.
- Adding new lessons (Day 8, Day 9, etc.).
- `.pptx` slide deck regeneration. Blocked on Christina providing the source PowerPoint (we currently only have a PDF export).
- Multi-project UI / fork button. Today users get one auto-project; you'd `INSERT INTO projects` manually to fork.
- Chat history persistence across sessions (table exists, not wired up).
- Cost cap per user.
- ToS / IP one-liner for the footer.

**Deviation from the original plan worth flagging:**
- The plan called for **docxtemplater** template substitution against marked-up source `.docx` files. The MVP ships **`docx`-library programmatic generation** instead, because marking up the source files with `{placeholder}` syntax is a manual chore that needs Christina's hands on the templates. The exporter output is clean and branded but does not yet match the visual design of the original docs. Wiring up docxtemplater is a v2 task once Christina has marked the templates.

---

## 7. Smoke test (after env vars + migration)

1. Visit `/` → BreakFree splash.
2. Click "Words Unlocked" → Danielle's landing.
3. Click "Customize Here" → redirected to `/login`.
4. Submit your email → check inbox → click the magic link → back at `/customize`.
5. Project auto-created. Chat UI on the left, empty preview on the right.
6. Send: *"Swap the poem in Lesson 2 for something about resilience."*
   - Expect: agent calls `search_poems` then `swap_poem`, you see the snapshot land in the preview pane.
7. Click "Download bundle" → a zip with `lesson-plans.docx` + `handouts.docx` downloads. Open one to confirm the swap propagated.
