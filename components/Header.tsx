// components/Header.tsx
"use client";

import { useLanguage } from '../app/lib/LanguageContext';

export default function Header() {
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