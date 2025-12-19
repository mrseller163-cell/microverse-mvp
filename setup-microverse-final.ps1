# setup-microverse-final.ps1
Write-Host "🚀 MICROVERSE-MVP: Final Setup" -ForegroundColor Cyan

# 1. Создаём недостающие папки
$pages = @("about", "terms", "privacy", "games", "music", "video", "chat", "news")
foreach ($page in $pages) {
    $dir = "app/$page"
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "📁 Created $dir"
    }
}

# 2. Компонент BackButton
$backButtonCode = @'
"use client";

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()}
      style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        background: 'linear-gradient(45deg, #00f0ff, #0090ff)',
        color: '#0c0c14',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      ← Назад
    </button>
  );
}
'@
Set-Content -Path "components/BackButton.tsx" -Value $backButtonCode
Write-Host "✅ BackButton.tsx created"

# 3. Language Context
$contextCode = @'
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
}>({
  lang: 'ru',
  setLang: () => {}
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('ru');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
'@
Set-Content -Path "app/lib/LanguageContext.tsx" -Value $contextCode
Write-Host "✅ LanguageContext.tsx created"

# 4. i18n
$i18nCode = @'
export const translations = {
  ru: {
    heroTitle: "КИБЕР\ИГРЫ\ВСЕЛЕННАЯ",
    heroDesc: "Войди в цифровое измерение. Создавай, играй, делись — всё в неоновой матрице.",
    codeBtn: "💻 КОДИРОВАТЬ →",
    playBtn: "🎮 СМОТРЕТЬ ИГРЫ",
    games: "Игры", music: "Музыка", video: "Видео", chat: "Чат", news: "Новости",
    privacy: "Конфиденциальность", terms: "Условия", about: "О нас"
  },
  en: {
    heroTitle: "CYBER\GAMES\UNIVERSE",
    heroDesc: "Enter the digital dimension. Code, play, share — all in a neon matrix.",
    codeBtn: "💻 CODE →",
    playBtn: "🎮 VIEW GAMES",
    games: "Games", music: "Music", video: "Video", chat: "Chat", news: "News",
    privacy: "Privacy", terms: "Terms", about: "About"
  }
};

export type Language = 'ru' | 'en';

export const t = (key: string, lang: Language) => {
  return translations[lang][key as keyof typeof translations.ru] || key;
};
'@
Set-Content -Path "app/lib/i18n.ts" -Value $i18nCode
Write-Host "✅ i18n.ts created"

# 5. Шаблон страницы
$pageTemplate = @'
"use client";

import BackButton from '../../components/BackButton';
import { useLanguage } from '../lib/LanguageContext';
import { t, Language } from '../lib/i18n';

export default function PAGE_NAME() {
  const { lang } = useLanguage();
  return (
    <>
      <BackButton />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>{t('KEY', lang as Language)}</h1>
        <p>{t('heroDesc', lang as Language)}</p>
      </div>
    </>
  );
}
'@

# 6. Генерируем страницы
$pageMap = @{
  "games" = "🎮 Игры"; "music" = "🎧 Музыка"; "video" = "🎥 Видео";
  "chat" = "💬 Чат"; "news" = "📰 Новости"; "about" = "ℹ️ О нас";
  "terms" = "📜 Условия"; "privacy" = "🔒 Конфиденциальность"
}

foreach ($page in $pageMap.Keys) {
  $key = switch ($page) {
    "games" { "games"; break } "music" { "music"; break } "video" { "video"; break }
    "chat" { "chat"; break } "news" { "news"; break } "about" { "about"; break }
    "terms" { "terms"; break } "privacy" { "privacy"; break }
  }
  $content = $pageTemplate.Replace("PAGE_NAME", "$($page.Substring(0,1).ToUpper() + $page.Substring(1))Page").Replace("KEY", $key)
  Set-Content -Path "app/$page/page.tsx" -Value $content
  Write-Host "📄 app/$page/page.tsx generated"
}

# 7. Обновляем layout.tsx (минималистичная версия с LanguageProvider и Header/Footer)
$layoutCode = @'
import './globals.css';
import { ReactNode } from 'react';
import { LanguageProvider } from './lib/LanguageContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

function Header() {
  const { lang, setLang } = useLanguage();
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #2a2a40',
      background: 'linear-gradient(135deg, #0a021e, #0c0c14)',
      boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #00f0ff, #ff00f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>MV</div>
        <h1 style={{ 
          margin: 0,
          fontSize: '1.5rem',
          background: 'linear-gradient(45deg, #00f0ff, #ff00f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>MICROVERSE</h1>
      </div>
      <div>
        <button onClick={() => setLang('en')} style={{ padding: '0.25rem 0.5rem', background: lang === 'en' ? '#00f0ff' : 'transparent', border: '1px solid #00f0ff', color: lang === 'en' ? '#0c0c14' : '#00f0ff', borderRadius: '15px' }}>EN</button>
        <button onClick={() => setLang('ru')} style={{ padding: '0.25rem 0.5rem', background: lang === 'ru' ? '#ff00f0' : 'transparent', border: '1px solid #ff00f0', color: lang === 'ru' ? '#0c0c14' : '#ff00f0', borderRadius: '15px', marginLeft: '0.5rem' }}>RU</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: '4rem',
      borderTop: '1px solid #2a2a40',
      padding: '2rem',
      textAlign: 'center',
      fontSize: '0.75rem',
      color: '#aaaaaa',
      background: 'linear-gradient(135deg, #0a021e, #0c0c14)'
    }}>
      <div>
        <a href="https://t.me/microverse_fun" target="_blank" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Telegram</a>
        <a href="https://facebook.com/groups/microverse.fun" target="_blank" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Facebook</a>
        <a href="https://tiktok.com/@microverse" target="_blank" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>TikTok</a>
        <a href="https://vk.com/microverse" target="_blank" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>VK</a>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <a href="/privacy" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Privacy</a>
        <a href="/terms" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Terms</a>
        <a href="/about" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>About</a>
      </div>
    </footer>
  );
}

import { useLanguage } from './lib/LanguageContext';
'@
Set-Content -Path "app/layout.tsx" -Value $layoutCode
Write-Host "✅ app/layout.tsx updated"

# 8. Убираем дублирование футера из page.tsx (если есть)
if (Test-Path "app/page.tsx") {
  $mainPage = Get-Content "app/page.tsx" -Raw
  # Удаляем всё после последнего </section> если есть footer
  if ($mainPage -match "(.*</section>)(.*)") {
    $cleanPage = $matches[1]
    Set-Content -Path "app/page.tsx" -Value $cleanPage
    Write-Host "🧹 app/page.tsx cleaned (footer removed)"
  }
}

Write-Host "✅ Готово! Запускай: npm run dev" -ForegroundColor Green