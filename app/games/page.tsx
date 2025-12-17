"use client";

export default function GamesPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        marginBottom: '1.5rem',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        animation: 'glow 1.5s infinite alternate'
      }}>🎮 Игры</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Скоро появятся космические мини-игры!
      </p>
    </div>
  );
}