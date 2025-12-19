"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { Search, Filter, Star, Heart } from "lucide-react";
import { useState } from "react";

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "Все" || tool.category === selectedCategory)
  );

  const categories = ["Все", ...Array.from(new Set(tools.map(t => t.category)))];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">AI-инструменты</h1>
        <p className="text-gray-400">Найди идеальный инструмент для твоей задачи</p>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск инструментов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? "bg-purple-500 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Список */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link href={`/tool/${tool.id}`} key={tool.id} className="group">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg" />
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {tool.rating}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 3 && <span className="text-xs text-gray-500">+{tool.tags.length - 3}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
