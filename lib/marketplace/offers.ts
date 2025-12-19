export interface Offer {
  id: string;
  type: 'buy' | 'sell' | 'swap';
  title: string;
  description: string;
  author: string;
  avatar: string;
  date: string;
  tags: string[];
}

export const mockOffers: Offer[] = [
  {
    id: '1',
    type: 'sell',
    title: 'Промпт для идеального резюме в FAANG',
    description: 'Уже помог 50+ инженерам пройти HR-скрининг. Включает структуру, ключевые слова и примеры.',
    author: 'Алексей',
    avatar: 'https://placehold.co/40x40/8b5cf6/white?text=A',
    date: '15 дек',
    tags: ['карьера', 'резюме', 'AI']
  },
  {
    id: '2',
    type: 'buy',
    title: 'Куплю промпт для Midjourney v7 (винтажный стиль)',
    description: 'Нужен для генерации обложек альбомов. Готов заплатить 15 .',
    author: 'Мария',
    avatar: 'https://placehold.co/40x40/ec4899/white?text=M',
    date: '16 дек',
    tags: ['midjourney', 'арт', 'визуал']
  },
  {
    id: '3',
    type: 'swap',
    title: 'Обменяю промпт для Notion на промпт для Obsidian',
    description: 'Мой промпт автоматизирует базу знаний в Notion. Ищу аналог для Obsidian.',
    author: 'Дмитрий',
    avatar: 'https://placehold.co/40x40/10b981/white?text=Д',
    date: '14 дек',
    tags: ['notion', 'obsidian', 'productivity']
  }
];
