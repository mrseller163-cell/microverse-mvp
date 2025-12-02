'use client';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const GameEditor = dynamic(() => import('../lib/phaser/GameEditor'), { ssr: false });

export default function PlayPage() {
  const router = useRouter();
  const { game } = router.query;

  return (
    <div className="min-h-screen bg-cosmic-black stars flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-12 animate-bounce">
        🚀 Запуск игры {game}
      </h1>
      <div className="canvas-wrap">
        <GameEditor data={{ title: 'Игра ' + game, objects: [], meta: { background: '#0b0014' } }} />
      </div>
    </div>
  );
}
