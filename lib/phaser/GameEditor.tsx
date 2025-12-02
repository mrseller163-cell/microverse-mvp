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

    class EditorScene extends Phaser.Scene {
      constructor() { super("EditorScene"); }

      preload() {
        const g = this.make.graphics({ x: 0, y: 0 });
        g.fillStyle(0x22dd88, 1);
        g.fillRect(0, 0, 64, 64);
        g.lineStyle(4, 0x113355, 1);
        g.lineBetween(0, 0, 64, 64);
        g.generateTexture('cookie', 64, 64);
      }

      create() {
        this.add.text(20, 20, data?.title || 'Новая игра', { color: '#ffffff', fontSize: '24px' });

        data?.objects?.forEach((obj: any) => {
          const sprite = this.add.sprite(obj.x, obj.y, obj.key || 'cookie').setScale(obj.scale || 1);
          sprite.setInteractive({ draggable: true });
          this.input.setDraggable(sprite);

          this.input.on('drag', (_p: any, go: any, x: number, y: number) => {
            go.x = x; go.y = y;
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
