Set-Content -Path "pages\editor.tsx" -Value @'
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GameEditor = dynamic(() => import('../lib/phaser/GameEditor'), { ssr: false });

export default function Editor() {
  const [gameData, setGameData] = useState({
    title: 'Кликер',
    objects: [{ id: '1', type: 'sprite', key: 'cookie', x: 320, y: 220, scale: 2 }],
    meta: { background: '#0b0014' }
  });

  const playSound = () => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(() => {});
  };

  const addObject = () => {
    playSound();
    const id = String(Date.now());
    setGameData((prev) => ({
      ...prev,
      objects: [...prev.objects, { id, type: 'sprite', key: 'cookie', x: 100, y: 100, scale: 1.5 }]
    }));
  };

  const publish = async () => {
    playSound();
    alert('Публикация скоро будет! Сейчас — drag-and-drop и космический UI 🚀');
  };

  return (
    <div className="min-h-screen bg-cosmic-black stars flex">
      <aside className="w-96 glass m-8 rounded-3xl p-8 space-y-6 shadow-xl">
        <h2 className="text-5xl font-black bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Объекты</h2>
        <button onClick={addObject} className="w-full p-6 bg-cosmic-gradient rounded-2xl text-2xl font-bold hover:scale-105 transition-all pulse-neon">
          + Добавить объект
        </button>
        <p className="text-gray-400">Всего: {gameData.objects.length}</p>
      </aside>

      <main className="flex-1 flex items-center justify-center">
        <div className="canvas-wrap">
          <GameEditor data={gameData}/>
        </div>
      </main>

      <aside className="w-96 glass m-8 rounded-3xl p-8 shadow-xl">
        <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Свойства</h2>
        <p className="text-xl text-gray-300 mt-20">Выбери объект ← перетащи на поле</p>
      </aside>

      <button
        onClick={publish}
        className="fixed bottom-10 right-10 px-10 py-6 bg-cosmic-gradient text-2xl font-black rounded-full shadow-2xl hover:scale-110 transition-all pulse-neon"
      >
        Опубликовать в космос!
      </button>
    </div>
  );
}
'@ -Encoding UTF8

Write-Host "✅ pages/editor.tsx — готово"
