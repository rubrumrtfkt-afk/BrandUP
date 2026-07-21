create or replace function public.register_allowed_agency_admin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(new.email) = 'rubrumartifact@gmail.com' then
    insert into public.admin_users (user_id, email)
    values (new.id, lower(new.email))
    on conflict (email) do update
      set user_id = excluded.user_id;
  end if;

  return new;
end;
$$;

revoke all on function public.register_allowed_agency_admin() from public;

drop trigger if exists register_allowed_agency_admin_after_signup on auth.users;
create trigger register_allowed_agency_admin_after_signup
after insert on auth.users
for each row
execute function public.register_allowed_agency_admin();
