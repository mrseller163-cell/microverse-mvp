// components/Footer.tsx
export default function Footer() {
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
        <a href="https://t.me/microverse_fun" target="_blank" rel="noopener" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Telegram</a>
        <a href="https://facebook.com/groups/microverse.fun" target="_blank" rel="noopener" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Facebook</a>
        <a href="https://tiktok.com/@microverse" target="_blank" rel="noopener" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>TikTok</a>
        <a href="https://vk.com/microverse" target="_blank" rel="noopener" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>VK</a>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <a href="/privacy" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Privacy</a>
        <a href="/terms" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>Terms</a>
        <a href="/about" style={{ margin: '0 0.5rem', color: '#00f0ff' }}>About</a>
      </div>
    </footer>
  );
}