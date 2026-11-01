-- Additive only: existing leads, statuses, memberships and policies are preserved.
begin;
alter table public.leads
  add column if not exists offer text check (char_length(offer) <= 300),
  add column if not exists placement text check (char_length(placement) <= 300),
  add column if not exists partner text check (char_length(partner) <= 300),
  add column if not exists link_id text check (char_length(link_id) <= 100);

create table if not exists public.lead_links (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  fields jsonb not null check (jsonb_typeof(fields) = 'object' and octet_length(fields::text) <= 6000),
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.lead_links enable row level security;
revoke all on public.lead_links from anon, authenticated;
grant select, insert on public.lead_links to authenticated;
-- Parameters of a published link are immutable. Archive rather than delete.
grant update (archived) on public.lead_links to authenticated;
create policy "Agency admins read links" on public.lead_links for select to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Agency admins create links" on public.lead_links for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "Agency admins archive links" on public.lead_links for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create index if not exists leads_link_id_idx on public.leads (link_id) where link_id is not null;
commit;
