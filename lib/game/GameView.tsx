import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import type { RoomChannel, RoomEvent } from '../realtime/room';

interface GameViewProps {
  room: RoomChannel;
}

type PlayerState = {
  id: string;
  name?: string;
  x: number;
  y: number;
  score: number;
  sprite?: Phaser.GameObjects.Ellipse;
  label?: Phaser.GameObjects.Text;
};

export default function GameView({ room }: GameViewProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // безопасная проверка контейнера
    if (!mountRef.current) return;

    const players: Record<string, PlayerState> = {};
    const meId = 'me';
    let timerText: Phaser.GameObjects.Text | undefined;
    let scoreText: Phaser.GameObjects.Text | undefined;
    let countdownInterval: number | undefined;
    let remaining = 0;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: mountRef.current ?? undefined, // корректный parent
      backgroundColor: '#0d0d0d',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 } // Vector2Like: заданы x и y
        }
      },
      scene: {
        preload() {
          // загрузка ассетов при необходимости
        },
        create() {
          const scene = this as Phaser.Scene;

          // UI
          timerText = scene.add.text(10, 10, 'Timer: --', { color: '#ffffff', fontSize: '18px' });
          scoreText = scene.add.text(10, 34, 'Score: 0', { color: '#00e676', fontSize: '18px' });

          // мой игрок по центру
          ensurePlayer(scene, meId, { x: 400, y: 300, name: 'Me' });

          // входящие события комнаты
          room.onEvent((e: RoomEvent) => {
            switch (e.type) {
              case 'start': {
                remaining = e.timer ?? 60;
                updateTimerUI();
                if (countdownInterval) clearInterval(countdownInterval);
                countdownInterval = window.setInterval(() => {
                  remaining = Math.max(remaining - 1, 0);
                  updateTimerUI();
                  if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    room.send({ type: 'end' });
                  }
                }, 1000);
                break;
              }
              case 'move': {
                const x = e.x ?? 0; // гарантируем наличие x
                const y = e.y ?? 0; // и y
                applyMove(scene, e.id, x, y);
                break;
              }
              case 'hit': {
                bumpScore(scene, e.attacker, +1);
                bumpScore(scene, e.target, -1);
                break;
              }
              case 'score': {
                bumpScore(scene, e.id, e.delta ?? 0);
                break;
              }
              case 'end': {
                const endText = scene.add.text(400, 300, 'Match End', {
                  color: '#ffd54f',
                  fontSize: '32px'
                }).setOrigin(0.5);
                scene.tweens.add({
                  targets: endText,
                  alpha: { from: 1, to: 0 },
                  duration: 1500,
                  yoyo: true
                });
                if (countdownInterval) clearInterval(countdownInterval);
                break;
              }
            }
          });

          // ввод с клавиатуры с безопасной проверкой
          if (scene.input?.keyboard) {
            scene.input.keyboard.on('keydown', (ev: KeyboardEvent) => {
              let dx = 0;
              let dy = 0;
              if (ev.key === 'ArrowRight') dx = 10;
              if (ev.key === 'ArrowLeft') dx = -10;
              if (ev.key === 'ArrowDown') dy = 10;
              if (ev.key === 'ArrowUp') dy = -10;
              if (dx !== 0 || dy !== 0) {
                room.send({ type: 'move', id: meId, x: dx, y: dy }); // всегда есть x и y
              }
              if (ev.key === ' ') {
                room.send({ type: 'score', id: meId, delta: 1 });
              }
            });
          }
        },
        update() {
          // игровой цикл при необходимости
        }
      }
    };

    const game = new Phaser.Game(config);

    function ensurePlayer(scene: Phaser.Scene, id: string, opts?: Partial<PlayerState>) {
      if (!players[id]) {
        const x = opts?.x ?? 100 + Math.random() * 600;
        const y = opts?.y ?? 100 + Math.random() * 400;
        const color = id === meId ? 0x00e5ff : 0xff6f00;

        const sprite = scene.add.ellipse(x, y, 24, 24, color, 1);
        const label = scene.add.text(x, y - 22, opts?.name ?? id, {
          color: '#ffffff',
          fontSize: '12px'
        }).setOrigin(0.5);

        players[id] = { id, x, y, score: 0, sprite, label, name: opts?.name };
        if (id === meId) updateMyScoreUI();
      }
    }

    function applyMove(scene: Phaser.Scene, id: string, dx: number, dy: number) {
      ensurePlayer(scene, id);
      const p = players[id];
      p.x = clamp(p.x + dx, 12, 788);
      p.y = clamp(p.y + dy, 12, 588);
      p.sprite?.setPosition(p.x, p.y);
      p.label?.setPosition(p.x, p.y - 22);
    }

    function bumpScore(scene: Phaser.Scene, id: string, delta: number) {
      ensurePlayer(scene, id);
      const p = players[id];
      p.score += delta;

      // визуальная обратная связь
      if (p.sprite) {
        const originalAlpha = p.sprite.alpha;
        p.sprite.setAlpha(0.6);
        scene.time.delayedCall(120, () => p.sprite?.setAlpha(originalAlpha));
      }
      if (id === meId) updateMyScoreUI();
    }

    function updateTimerUI() {
      if (timerText) timerText.setText(`Timer: ${remaining}s`);
    }

    function updateMyScoreUI() {
      const my = players[meId];
      if (scoreText && my) scoreText.setText(`Score: ${my.score}`);
    }

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
      game.destroy(true);
    };
  }, [room]);

  return <div ref={mountRef} className="mt-6 border rounded-lg shadow" />;
}
