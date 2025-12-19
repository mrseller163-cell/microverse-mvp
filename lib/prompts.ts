// lib/prompts.ts
import { promptCategories } from "./categories";

export type Prompt = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  avatar: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  tags: string[];
};

export const mockPrompts: Prompt[] = [
  {
    id: 1,
    title: "Промпт для идеального резюме",
    content: "Напиши профессиональное резюме для позиции Product Manager с 5-летним опытом в стартапах. Включи ключевые достижения в формате \"действие → результат\", используй активные глаголы и избегай клише.",
    category: "career",
    author: "Анна",
    avatar: "https://placehold.co/40x40/ec4899/white?text=А",
    likes: 245,
    saves: 189,
    isLiked: false,
    isSaved: false,
    createdAt: "2025-12-10",
    tags: ["резюме", "карьера", "PM"]
  },
  {
    id: 2,
    title: "Объясни квантовую физику как для пятилетнего",
    content: "Объясни принцип суперпозиции и квантовой запутанности так, чтобы это понял ребёнок 5 лет. Используй аналогии из реальной жизни (игрушки, котики) и избегай сложных терминов.",
    category: "study",
    author: "Дмитрий",
    avatar: "https://placehold.co/40x40/8b5cf6/white?text=Д",
    likes: 312,
    saves: 267,
    isLiked: true,
    isSaved: false,
    createdAt: "2025-12-05",
    tags: ["физика", "обучение", "наука"]
  },
  {
    id: 3,
    title: "Промпт для генерации изображения \"оживи фото\"",
    content: "Take this old black-and-white family photo and colorize it realistically. Add subtle ambient lighting, natural skin tones, and gentle background blur. Preserve original details like clothing texture and facial expressions.",
    category: "photo",
    author: "Елена",
    avatar: "https://placehold.co/40x40/10b981/white?text=Е",
    likes: 178,
    saves: 92,
    isLiked: false,
    isSaved: true,
    createdAt: "2025-11-28",
    tags: ["фото", "AI", "colorize"]
  },
  {
    id: 4,
    title: "Финансовый анализ стартапа",
    content: "Проанализируй финансовую модель стартапа в сфере edtech. Оцени CAC, LTV, churn rate и break-even point. Предложи 3 рекомендации по улучшению unit economics.",
    category: "finance",
    author: "Максим",
    avatar: "https://placehold.co/40x40/f59e0b/white?text=М",
    likes: 98,
    saves: 45,
    isLiked: false,
    isSaved: false,
    createdAt: "2025-12-01",
    tags: ["финансы", "стартап", "анализ"]
  }
];
