create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 320),
  phone text not null check (char_length(trim(phone)) between 6 and 30),
  company text not null check (char_length(trim(company)) between 2 and 160),
  monthly_revenue text not null check (
    monthly_revenue in (
      'Up to AUD 30k',
      'AUD 30k to AUD 80k',
      'AUD 80k to AUD 150k',
      'Above AUD 150k'
    )
  ),
  source text not null default 'brandupadvisory.com',
  status text not null default 'new' check (
    status in ('new', 'contacted', 'qualified', 'closed', 'archived')
  )
);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads
for insert
to anon, authenticated
with check (
  status = 'new'
  and source = 'brandupadvisory.com'
);
