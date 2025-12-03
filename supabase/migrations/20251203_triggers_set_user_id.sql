-- РўСЂРёРіРіРµСЂС‹: Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРµ РїСЂРѕСЃС‚Р°РІР»РµРЅРёРµ user_id = auth.uid()
-- Р”Р°С‚Р°: 2025-12-03

create or replace function public.set_user_id()
returns trigger as .\Setup-Migrations.ps1
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
.\Setup-Migrations.ps1 language plpgsql security definer;

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
