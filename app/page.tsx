"use client";

import Link from "next/link";
import { Search, Plus, Filter, ChevronRight } from "lucide-react";

const categories = [
  { name: "Продуктивность", count: 142, color: "from-purple-500 to-pink-500" },
  { name: "Видео & Анимация", count: 98, color: "from-blue-500 to-cyan-500" },
  { name: "Генерация изображений", count: 87, color: "from-green-500 to-emerald-500" },
  { name: "Текст и контент", count: 134, color: "from-orange-500 to-red-500" },
  { name: "Аудио & Музыка", count: 67, color: "from-indigo-500 to-purple-500" },
  { name: "Код и разработка", count: 112, color: "from-yellow-500 to-amber-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Microverse
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Открой лучшие AI-инструменты 2025 года. От генерации контента до автоматизации бизнеса — всё в одном месте.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
                Исследовать инструменты
              </Link>
              <Link href="/submit" className="border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors">
                <Plus className="inline w-5 h-5 mr-2" />
                Добавить инструмент
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* БЕГУЩАЯ ЛЕНТА — В АКТИВНОЙ РАЗРАБОТКЕ */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 py-3">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-white font-bold text-lg mx-8">
            🛠 В активной разработке — следи за обновлениями! Скоро: персональный AI-куратор, маркетплейс промптов и генератор workflow!
          </span>
          <span className="text-white font-bold text-lg mx-8">
            🛠 В активной разработке — следи за обновлениями! Скоро: персональный AI-куратор, маркетплейс промптов и генератор workflow!
          </span>
          <span className="text-white font-bold text-lg mx-8">
            🛠 В активной разработке — следи за обновлениями! Скоро: персональный AI-куратор, маркетплейс промптов и генератор workflow!
          </span>
        </div>
      </div>

      {/* Анимация бегущей строки */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* Категории */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Популярные категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href={`/categories?cat=${cat.name}`} key={cat.name} className="group">
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${cat.color} p-8 hover:scale-105 transition-transform`}>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-white/80">{cat.count} инструментов</p>
                </div>
                <ChevronRight className="absolute bottom-4 right-4 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}