// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'microverse.fun',
  description: 'Твоя кибер-игровая вселенная',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
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
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(255, 0, 240, 0.5)'
        }}>MICROVERSE</h1>
      </div>
      <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
        <button style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '15px',
          background: '#00f0ff',
          color: '#0c0c14',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite'
        }}>EN</button>
        <button style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '15px',
          background: '#ff00f0',
          color: '#0c0c14',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite 1s'
        }}>RU</button>
        <a href="/gallery" style={{ color: '#00f0ff', animation: 'glow 1s infinite alternate' }}>ГАЛЕРЕЯ</a>
        <a href="/create" style={{ color: '#00f0ff', animation: 'glow 1s infinite alternate 0.5s' }}>СОЗДАТЬ</a>
        <a href="/about" style={{ color: '#00f0ff', animation: 'glow 1s infinite alternate 1s' }}>О НАС</a>
      </nav>
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
      background: 'linear-gradient(135deg, #0a021e, #0c0c14)',
      boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <a href="/privacy" style={{ margin: '0 0.5rem', color: '#00f0ff', animation: 'glow 1s infinite alternate' }}>КОНФИДЕНЦИАЛЬНОСТЬ</a>
        <a href="/terms" style={{ margin: '0 0.5rem', color: '#00f0ff', animation: 'glow 1s infinite alternate 0.5s' }}>УСЛОВИЯ</a>
        <a href="/about" style={{ margin: '0 0.5rem', color: '#00f0ff', animation: 'glow 1s infinite alternate 1s' }}>О НАС</a>
      </div>
      <p>© 2025 Microverse. Твоя кибер-игровая вселенная.</p>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {['Telegram', 'Facebook', 'TikTok', 'YouTube', 'X', 'VK', 'Instagram'].map(platform => (
          <a key={platform} href="#" style={{ color: '#ffffff', whiteSpace: 'nowrap', animation: 'glow 1s infinite alternate' }}>{platform}</a>
        ))}
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.625rem', color: '#666' }}>
        © 2025 MICROVERSE • <a href="/privacy" style={{ color: '#666' }}>Privacy</a> • <a href="/about" style={{ color: '#666' }}>About</a>
      </div>
    </footer>
  );
}