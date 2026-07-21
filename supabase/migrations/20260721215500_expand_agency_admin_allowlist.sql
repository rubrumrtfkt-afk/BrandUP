create or replace function public.register_allowed_agency_admin()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if lower(new.email) = any (
    array[
      'rubrumartifact@gmail.com',
      'pedrovferonatto@hotmail.com',
      'iagocrispim.mkt@gmail.com',
      'victorchalhub@gmail.com'
    ]
  ) then
    insert into public.admin_users (user_id, email)
    values (new.id, lower(new.email))
    on conflict (email) do update
      set user_id = excluded.user_id;
  end if;

  return new;
end;
$$;

revoke all on function public.register_allowed_agency_admin() from public;
