// app/page.tsx
"use client";

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Анимация фона
    const body = document.body;
    let hue = 0;
    const animateBackground = () => {
      hue = (hue + 0.5) % 360;
      body.style.background = `linear-gradient(135deg, hsl(${hue}, 50%, 10%), hsl(${(hue + 30) % 360}, 50%, 10%))`;
      requestAnimationFrame(animateBackground);
    };
    animateBackground();
  }, []);

  return (
    <>
      {/* Hero */}
      <section style={{
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}>
        <h1 style={{
          fontSize: '4rem',
          lineHeight: '1.1',
          marginBottom: '1rem',
          textShadow: '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(255, 0, 240, 0.5)',
          animation: 'glow 1s infinite alternate'
        }}>
          <span style={{ color: '#00f0ff' }}>КИБЕР</span><br/>
          <span style={{ color: '#ff00f0' }}>ИГРЫ</span><br/>
          <span style={{ color: '#ffff00' }}>ВСЕЛЕННАЯ</span>
        </h1>
        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto',
          color: '#cccccc'
        }}>
          Войди в цифровое измерение. Создавай, играй, делись — всё в неоновой матрице.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #00f0ff, #0090ff)',
            color: '#0c0c14',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
            animation: 'pulse 2s infinite'
          }}>
            💻 КОДИРОВАТЬ →
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid #ff00f0',
            color: '#ff00f0',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(255, 0, 240, 0.5)',
            animation: 'pulse 2s infinite 1s'
          }}>
            🎮 СМОТРЕТЬ ИГРЫ
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { value: '500+', label: 'КОДЕРОВ ОНЛАЙН' },
          { value: '2K+', label: 'НЕОНОВЫХ ИГР' },
          { value: '50K+', label: 'ИГРОВЫХ СЕССИЙ' }
        ].map((stat, i) => (
          <div key={i} style={{
            border: '1px solid #2a2a40',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'center',
            minWidth: '200px',
            background: 'rgba(22, 22, 37, 0.5)',
            backdropFilter: 'blur(10px)',
            animation: 'glow 1s infinite alternate',
            animationDelay: `${i * 0.5}s`
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: i === 0 ? '#00f0ff' : i === 1 ? '#ff00f0' : '#ffff00'
            }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#aaaaaa' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Game Cards */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          color: '#00f0ff',
          textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
          animation: 'glow 1s infinite alternate'
        }}>ТОП КИБЕРПАНК ИГРЫ</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { name: 'Neon Hack', author: 'Ry0', players: 247, color: 'linear-gradient(45deg, #ff00f0, #9000ff)' },
            { name: 'Data Storm', author: 'N3K0', players: 189, color: 'linear-gradient(45deg, #00f0ff, #0090ff)' },
            { name: 'Void Runner', author: 'A1X', players: 93, color: 'linear-gradient(45deg, #00ff00, #ffff00)' }
          ].map((game, i) => (
            <div key={i} className="game-card">
              <div style={{
                height: '150px',
                background: game.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🕹️
              </div>
              <div className="info">
                <h3>{game.name}</h3>
                <p>Автор: {game.author}</p>
                <div className="stats">
                  <div>
                    <span>🎮</span> {game.players}
                  </div>
                  <button>ИГРАТЬ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}