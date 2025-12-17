"use client";

export default function MusicPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        marginBottom: '1.5rem',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        animation: 'glow 1.5s infinite alternate'
      }}>🎧 Музыка Microverse</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Погрузись в саундтреки цифровой вселенной. Здесь звучат треки из космоса, синтвейвы и атмосферные лоу-фай композиции.
      </p>
      <iframe
        width="100%"
        height="166"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%2300f0ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"
        frameBorder="0"
        allow="autoplay"
        style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}
      ></iframe>
    </div>
  );
}