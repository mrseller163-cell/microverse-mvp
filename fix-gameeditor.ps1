Set-Content -Path "lib\phaser\GameEditor.tsx" -Value @'
'use client';
import Phaser from 'phaser';
import { useEffect, useRef } from 'react';

export default function GameEditor({ data }: { data: any }) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 960;
    const height = 600;

    const scene: Phaser.Types.Scenes.SettingsConfig = {
      key: "EditorScene"
    };

    class EditorScene extends Phaser.Scene {
      constructor() { super(scene); }

      preload() {
        // Простая текстура для cookie (если реального ассета нет)
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x22dd88, 1);
        g.fillRect(0, 0, 64, 64);
        g.lineStyle(4, 0x113355, 1);
        g.lineBetween(0, 0, 64, 64);
        g.generateTexture('cookie', 64, 64);
      }

      create() {
        // Заголовок
        this.add.text(20, 20, data?.title || 'Новая игра', { color: '#ffffff', fontSize: '24px' });

        // Добавляем объекты и включаем drag
        data?.objects?.forEach((obj: any) => {
          const sprite = this.add.sprite(obj.x, obj.y, obj.key || 'cookie').setScale(obj.scale || 1);
          sprite.setInteractive({ draggable: true });
          this.input.setDraggable(sprite);

          this.input.on('dragstart', (_p: any, go: any) => {
            go.setTint(0xff66aa);
          });

          this.input.on('drag', (_p: any, go: any, x: number, y: number) => {
            go.x = x; go.y = y;
          });

          this.input.on('dragend', (_p: any, go: any) => {
            go.clearTint();
          });
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      backgroundColor: (data?.meta?.background as string) || '#0b0014',
      parent: containerRef.current,
      scene: [EditorScene],
    };

    gameRef.current = new Phaser.Game(config);
    return () => { gameRef.current?.destroy(true); gameRef.current = null; };
  }, [data]);

  return <div ref={containerRef} style={{ width: 960, height: 600 }} />;
}
'@ -Encoding UTF8

Write-Host "✅ lib/phaser/GameEditor.tsx — готово (drag-and-drop)"
