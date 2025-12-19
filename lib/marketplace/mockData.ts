import { User, Offer } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Анна",
    avatar: "https://placehold.co/40x40/ec4899/white?text=A",
    role: "user",
    reputation: 120,
    escrowBalance: 50,
  },
  {
    id: "2",
    name: "Дмитрий",
    avatar: "https://placehold.co/40x40/8b5cf6/white?text=D",
    role: "user",
    reputation: 200,
    escrowBalance: 75,
  },
];

export const mockOffers: Offer[] = [
  {
    id: "1",
    type: "sell",
    title: "Промпт для идеального резюме",
    description: "Напиши профессиональное резюме для позиции Product Manager...",
    price: 100,
    tags: ["резюме", "карьера", "PM"],
    status: "active",
    authorId: "1",
    createdAt: new Date().toISOString(), // ✅ добавлено
  },
  {
    id: "2",
    type: "buy",
    title: "Объясни квантовую физику как для пятилетнего",
    description: "Объясни принцип суперпозиции и квантовой запутанности...",
    price: 0,
    tags: ["физика", "наука"],
    status: "active",
    authorId: "2",
    createdAt: new Date().toISOString(), // ✅ добавлено
  },
];