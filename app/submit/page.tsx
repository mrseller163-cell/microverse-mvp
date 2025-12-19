"use client";
import { useState } from "react";

export default function SubmitTool() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    link: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо! Мы рассмотрим ваш инструмент в ближайшее время.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Добавить инструмент</h1>
      <p className="text-gray-400 mb-12">Поделитесь своим AI-инструментом с сообществом</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Название инструмента</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Краткое описание</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Категория</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          >
            <option value="">Выберите категорию</option>
            <option>Продуктивность</option>
            <option>Видео & Анимация</option>
            <option>Генерация изображений</option>
            <option>Текст и контент</option>
            <option>Аудио & Музыка</option>
            <option>Код и разработка</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ссылка на инструмент</label>
          <input
            type="url"
            required
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Теги (через запятую)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="AI, видео, генерация, бесплатно"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform"
        >
          Отправить на модерацию
        </button>
      </form>
    </div>
  );
}