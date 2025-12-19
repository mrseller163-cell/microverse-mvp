// app/prompts/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { mockPrompts, Prompt } from "@/lib/prompts";
import { promptCategories } from "@/lib/categories";
import { PromptCard } from "@/components/prompts/PromptCard";
import { PromptFilters } from "@/components/prompts/PromptFilters";

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPrompts = useMemo(() => {
    return mockPrompts.filter(prompt => {
      const matchesCategory = activeCategory === "all" || prompt.category === activeCategory;
      const matchesSearch = searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Заголовок + CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Каталог промптов</h1>
          <p className="text-gray-600">Готовые шаблоны для любых задач — от учёбы до бизнеса</p>
        </div>
        <Link
          href="/prompts/submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4" />
          Добавить промпт
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Фильтры */}
        <div className="lg:col-span-1">
          <PromptFilters
            onSearch={setSearchQuery}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Список промптов */}
        <div className="lg:col-span-3">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 text-gray-300 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m10-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0V9a2 2 0 012-2h1v2m-1 2h-1m-8 0H7a2 2 0 01-2-2V9a2 2 0 012-2h1m8 8V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-600">Промпты не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить запрос или категорию</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
