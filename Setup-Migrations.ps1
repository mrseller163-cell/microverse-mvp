# === Setup-Migrations.ps1 ===
# Автоматизация миграций Supabase: создание файлов, коммит и пуш

# 1. Создаём папку миграций, если её нет
New-Item -ItemType Directory -Force -Path "supabase\migrations" | Out-Null

# 2. Создаём файл миграции для RLS и политик
$rlsFile = "supabase\migrations\20251203_enable_rls.sql"
@"
-- Миграция: включение RLS и политики
-- Дата: 2025-12-03

-- Добавляем user_id, если отсутствует
do $$
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
end $$;

-- Включаем RLS
alter table public.drafts enable row level security;
alter table public.games enable row level security;
alter table public.posts enable row level security;
alter table public.threads enable row level security;
alter table public.messages enable row level security;

-- Политики: drafts
create policy "Owner read drafts" on public.drafts for select to authenticated using (auth.uid() = user_id);
create policy "Insert drafts" on public.drafts for insert to authenticated with check (auth.uid() = user_id);
create policy "Update drafts" on public.drafts for update to authenticated using (auth.uid() = user_id);
create policy "Delete drafts" on public.drafts for delete to authenticated using (auth.uid() = user_id);

-- Политики: games (публичное чтение, остальное — владелец)
create policy "Public read games" on public.games for select using (true);
create policy "Insert games" on public.games for insert to authenticated with check (auth.uid() = user_id);
create policy "Update games" on public.games for update to authenticated using (auth.uid() = user_id);
create policy "Delete games" on public.games for delete to authenticated using (auth.uid() = user_id);

-- Политики: posts
create policy "Owner read posts" on public.posts for select to authenticated using (auth.uid() = user_id);
create policy "Insert posts" on public.posts for insert to authenticated with check (auth.uid() = user_id);
create policy "Update posts" on public.posts for update to authenticated using (auth.uid() = user_id);
create policy "Delete posts" on public.posts for delete to authenticated using (auth.uid() = user_id);

-- Политики: threads
create policy "Owner read threads" on public.threads for select to authenticated using (auth.uid() = user_id);
create policy "Insert threads" on public.threads for insert to authenticated with check (auth.uid() = user_id);
create policy "Update threads" on public.threads for update to authenticated using (auth.uid() = user_id);
create policy "Delete threads" on public.threads for delete to authenticated using (auth.uid() = user_id);

-- Политики: messages
create policy "Owner read messages" on public.messages for select to authenticated using (auth.uid() = user_id);
create policy "Insert messages" on public.messages for insert to authenticated with check (auth.uid() = user_id);
create policy "Update messages" on public.messages for update to authenticated using (auth.uid() = user_id);
create policy "Delete messages" on public.messages for delete to authenticated using (auth.uid() = user_id);
"@ | Out-File -FilePath $rlsFile -Encoding utf8

# 3. Создаём файл миграции для триггеров
$triggersFile = "supabase\migrations\20251203_triggers_set_user_id.sql"
@"
-- Триггеры: автоматическое проставление user_id = auth.uid()
-- Дата: 2025-12-03

create or replace function public.set_user_id()
returns trigger as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger set_user_id_drafts before insert on public.drafts
for each row execute function public.set_user_id();

create trigger set_user_id_games before insert on public.games
for each row execute function public.set_user_id();

create trigger set_user_id_posts before insert on public.posts
for each row execute function public.set_user_id();

create trigger set_user_id_threads before insert on public.threads
for each row execute function public.set_user_id();

create trigger set_user_id_messages before insert on public.messages
for each row execute function public.set_user_id();
"@ | Out-File -FilePath $triggersFile -Encoding utf8

# 4. Добавляем файлы в Git
git add $rlsFile
git add $triggersFile

# 5. Делаем коммит
git commit -m "Add RLS policies and triggers for user_id"

# 6. Пушим в GitHub (в основную ветку main)
git push origin main
