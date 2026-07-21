create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists admin_users_email_idx on public.admin_users (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.admin_users enable row level security;

revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

drop policy if exists "Admins can read their own membership" on public.admin_users;
create policy "Admins can read their own membership"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

grant select on table public.leads to authenticated;
grant update (status) on table public.leads to authenticated;

drop policy if exists "Agency admins can view leads" on public.leads;
create policy "Agency admins can view leads"
on public.leads
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Agency admins can update lead status" on public.leads;
create policy "Agency admins can update lead status"
on public.leads
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);
