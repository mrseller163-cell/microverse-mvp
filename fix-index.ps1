Set-Content -Path "pages\index.tsx" -Value @'
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [games] = useState([
    { id: '1', title: 'Кликер', author: 'Олег', plays: 123 },
    { id: '2', title: 'Space Runner', author: 'Anna', plays: 87 },
    { id: '3', title: 'Neon Blocks', author: 'Ivan', plays: 45 },
  ]);

  return (
    <div className="min-h-screen bg-cosmic-black stars flex flex-col items-center justify-center p-12">
      <h1 className="text-6xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-8">
        Microverse
      </h1>
      <p className="text-xl text-gray-300 mb-12">
        Создай игру за 60 секунд — и весь мир уже играет
      </p>

      <div className="flex gap-6 mb-12">
        <Link href="/editor">
          <button className="px-12 py-6 bg-cosmic-gradient text-3xl font-bold rounded-full shadow-2xl hover:scale-110 transition-all pulse-neon">
            Создать игру
          </button>
        </Link>
        <a href="#gallery">
          <button className="px-8 py-6 glass text-xl rounded-full hover:scale-105 transition-all">
            Галерея игр
          </button>
        </a>
      </div>

      <h2 id="gallery" className="text-4xl font-bold text-white mb-6">Галерея игр</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {games.map((game) => (
          <div key={game.id} className="glass rounded-2xl p-6 shadow-xl hover:scale-105 transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
            <p className="text-gray-400">Автор: {game.author}</p>
            <p className="text-gray-400">Игроков: {game.plays}</p>
            <Link href={`/play?game=${game.id}`}>
              <button className="mt-4 px-6 py-2 bg-cosmic-gradient rounded-xl text-white font-bold hover:scale-105 transition-all">
                Играть
              </button>
            </Link>
          </div>
        ))}
      </div>

      <p className="text-gray-400 mt-12">Всего игр: {games.length}</p>
    </div>
  );
}
'@ -Encoding UTF8

Write-Host "✅ pages/index.tsx — готово"
