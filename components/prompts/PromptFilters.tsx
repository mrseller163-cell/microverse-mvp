// components/prompts/PromptFilters.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { promptCategories } from "@/lib/categories";

export function PromptFilters({
  onSearch,
  onCategoryChange
}: {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleCategory = (catId: string) => {
    setActiveCategory(catId);
    onCategoryChange(catId);
  };

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Поиск промптов..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Категории */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Категории</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Все
          </button>
          {promptCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 ${
                activeCategory === cat.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
