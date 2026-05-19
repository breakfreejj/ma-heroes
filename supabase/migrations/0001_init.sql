-- BreakFree / Words Unlocked Customizer — initial schema

-- ============================================================================
-- profiles: one row per auth user
-- ============================================================================
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  school text,
  role text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: self select"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles: self insert"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "profiles: self update"
  on public.profiles for update
  using (auth.uid() = user_id);

-- ============================================================================
-- projects: one row per customized curriculum
-- ============================================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'My Words Unlocked',
  base_curriculum text not null default 'words-unlocked-2026',
  current_snapshot_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_user_id_idx on public.projects (user_id);

alter table public.projects enable row level security;

create policy "projects: self select"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "projects: self insert"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "projects: self update"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "projects: self delete"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- snapshots: append-only history of curriculum states
-- ============================================================================
create table public.snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  parent_id uuid references public.snapshots(id) on delete set null,
  content jsonb not null,
  created_by text not null check (created_by in ('user', 'agent', 'seed')),
  message text,
  created_at timestamptz not null default now()
);

create index snapshots_project_id_idx on public.snapshots (project_id, created_at desc);

alter table public.snapshots enable row level security;

create policy "snapshots: self select via project"
  on public.snapshots for select
  using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

create policy "snapshots: self insert via project"
  on public.snapshots for insert
  with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

-- ============================================================================
-- messages: chat history per project
-- ============================================================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'tool', 'system')),
  content jsonb not null,
  snapshot_id uuid references public.snapshots(id) on delete set null,
  created_at timestamptz not null default now()
);

create index messages_project_id_idx on public.messages (project_id, created_at);

alter table public.messages enable row level security;

create policy "messages: self select via project"
  on public.messages for select
  using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

create policy "messages: self insert via project"
  on public.messages for insert
  with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

-- ============================================================================
-- bundles: generated download artifacts
-- ============================================================================
create table public.bundles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  snapshot_id uuid not null references public.snapshots(id) on delete cascade,
  storage_path text not null,
  format text not null default 'docx-zip',
  created_at timestamptz not null default now()
);

create index bundles_project_id_idx on public.bundles (project_id, created_at desc);

alter table public.bundles enable row level security;

create policy "bundles: self select via project"
  on public.bundles for select
  using (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

create policy "bundles: self insert via project"
  on public.bundles for insert
  with check (exists (select 1 from public.projects p where p.id = project_id and p.user_id = auth.uid()));

-- ============================================================================
-- updated_at trigger for projects
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Storage bucket for generated bundles
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('bundles', 'bundles', false)
on conflict (id) do nothing;

create policy "bundles bucket: self read"
  on storage.objects for select
  using (
    bucket_id = 'bundles'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "bundles bucket: self write"
  on storage.objects for insert
  with check (
    bucket_id = 'bundles'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
