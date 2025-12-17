"use client";

export default function VideoPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        marginBottom: '1.5rem',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        animation: 'glow 1.5s infinite alternate'
      }}>🎥 Видео Microverse</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Смотри анимации, визуализации данных и космические докуфильмы из глубин цифровой реальности.
      </p>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}
      ></iframe>
    </div>
  );
}