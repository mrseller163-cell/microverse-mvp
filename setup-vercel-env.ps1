cd "C:\Users\31057\Documents\microverse\microverse-mvp"

echo "https://microverse-mvp.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "sb_publishable_KpO0nHjrbsO5Zbk2141GDw__yCyr54l" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo "sb_secret_cmlEHU07KShnhhdgClfm9A_86Tx2qUM" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "https://microverse-mvp.supabase.co" | vercel env add SUPABASE_URL production

Write-Host "✅ Все переменные окружения добавлены в Vercel (production)" -ForegroundColor Green

vercel env ls
