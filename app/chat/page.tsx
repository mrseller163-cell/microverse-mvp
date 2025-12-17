"use client";

export default function ChatPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        marginBottom: '1.5rem',
        textShadow: '0 0 10px rgba(255, 0, 240, 0.5)',
        animation: 'glow 1.5s infinite alternate'
      }}>💬 Чат Microverse</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Общайся с другими путешественниками микровселенной в реальном времени. Квантовая связь активируется при запуске чата.
      </p>
      <div style={{
        background: 'rgba(22, 22, 37, 0.5)',
        border: '1px solid #2a2a40',
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center',
        color: '#ff00f0',
        animation: 'pulse 2s infinite'
      }}>
        ⚠️ Чат в разработке. Реальная версия появится в ближайшем обновлении.
      </div>
    </div>
  );
}