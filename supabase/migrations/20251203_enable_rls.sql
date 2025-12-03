-- РњРёРіСЂР°С†РёСЏ: РІРєР»СЋС‡РµРЅРёРµ RLS Рё РїРѕР»РёС‚РёРєРё
-- Р”Р°С‚Р°: 2025-12-03

-- Р”РѕР±Р°РІР»СЏРµРј user_id, РµСЃР»Рё РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚
do .\Setup-Migrations.ps1
begin
  if not exists (select 1 from information_schema.columns where table_name = 'drafts' and column_name = 'user_id') then
    alter table public.drafts add column user_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'games' and column_name = 'user_id') then
    alter table public.games add column user_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'posts' and column_name = 'user_id') then
    alter table public.posts add column user_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'threads' and column_name = 'user_id') then
    alter table public.threads add column user_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'messages' and column_name = 'user_id') then
    alter table public.messages add column user_id uuid;
  end if;
end .\Setup-Migrations.ps1;

-- Р’РєР»СЋС‡Р°РµРј RLS
alter table public.drafts enable row level security;
alter table public.games enable row level security;
alter table public.posts enable row level security;
alter table public.threads enable row level security;
alter table public.messages enable row level security;

-- РџРѕР»РёС‚РёРєРё: drafts
create policy "Owner read drafts" on public.drafts for select to authenticated using (auth.uid() = user_id);
create policy "Insert drafts" on public.drafts for insert to authenticated with check (auth.uid() = user_id);
create policy "Update drafts" on public.drafts for update to authenticated using (auth.uid() = user_id);
create policy "Delete drafts" on public.drafts for delete to authenticated using (auth.uid() = user_id);

-- РџРѕР»РёС‚РёРєРё: games (РїСѓР±Р»РёС‡РЅРѕРµ С‡С‚РµРЅРёРµ, РѕСЃС‚Р°Р»СЊРЅРѕРµ вЂ” РІР»Р°РґРµР»РµС†)
create policy "Public read games" on public.games for select using (true);
create policy "Insert games" on public.games for insert to authenticated with check (auth.uid() = user_id);
create policy "Update games" on public.games for update to authenticated using (auth.uid() = user_id);
create policy "Delete games" on public.games for delete to authenticated using (auth.uid() = user_id);

-- РџРѕР»РёС‚РёРєРё: posts
create policy "Owner read posts" on public.posts for select to authenticated using (auth.uid() = user_id);
create policy "Insert posts" on public.posts for insert to authenticated with check (auth.uid() = user_id);
create policy "Update posts" on public.posts for update to authenticated using (auth.uid() = user_id);
create policy "Delete posts" on public.posts for delete to authenticated using (auth.uid() = user_id);

-- РџРѕР»РёС‚РёРєРё: threads
create policy "Owner read threads" on public.threads for select to authenticated using (auth.uid() = user_id);
create policy "Insert threads" on public.threads for insert to authenticated with check (auth.uid() = user_id);
create policy "Update threads" on public.threads for update to authenticated using (auth.uid() = user_id);
create policy "Delete threads" on public.threads for delete to authenticated using (auth.uid() = user_id);

-- РџРѕР»РёС‚РёРєРё: messages
create policy "Owner read messages" on public.messages for select to authenticated using (auth.uid() = user_id);
create policy "Insert messages" on public.messages for insert to authenticated with check (auth.uid() = user_id);
create policy "Update messages" on public.messages for update to authenticated using (auth.uid() = user_id);
create policy "Delete messages" on public.messages for delete to authenticated using (auth.uid() = user_id);
