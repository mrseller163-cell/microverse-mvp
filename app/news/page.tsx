"use client";

export default function NewsPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        marginBottom: '1.5rem',
        textShadow: '0 0 10px rgba(255, 255, 0, 0.5)',
        animation: 'glow 1.5s infinite alternate'
      }}>📰 Новости Microverse</h1>
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.6, color: '#cccccc' }}>
        <li>• <strong>17.12.2025</strong> — Запущена космическая тема оформления</li>
        <li>• <strong>16.12.2025</strong> — Добавлены разделы: Игры, Музыка, Видео, Чат, Новости</li>
        <li>• <strong>15.12.2025</strong> — В команду вступил Qwen — полнокомпонентный агент</li>
        <li>• <strong>Скоро</strong> — Реальный чат и первая мини-игра</li>
      </ul>
    </div>
  );
}