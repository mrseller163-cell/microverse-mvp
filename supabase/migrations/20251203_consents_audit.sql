create table if not exists public.consents (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    consent_type text not null,
    consent_given boolean not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create or replace function public.update_consents_timestamp()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger set_consents_timestamp
before update on public.consents
for each row execute function public.update_consents_timestamp();

create table if not exists public.audit_log (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    action text not null,
    table_name text not null,
    record_id uuid,
    created_at timestamptz default now(),
    metadata jsonb
);

create or replace function public.log_action()
returns trigger as $$
declare uid uuid;
begin
  uid := auth.uid();
  insert into public.audit_log(user_id, action, table_name, record_id, metadata)
  values (uid, TG_OP, TG_TABLE_NAME, coalesce(new.id, old.id), '{}'::jsonb);
  if (TG_OP = 'DELETE') then
    return old;
  end if;
  return new;
end;
$$ language plpgsql security definer;
