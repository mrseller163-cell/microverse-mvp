// components/prompts/PromptCard.tsx
"use client";

import { useState } from "react";
import { Heart, Bookmark, Share2, Copy, Check } from "lucide-react";
import { Prompt } from "@/lib/prompts";
import { promptCategories } from "@/lib/categories";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const [isLiked, setIsLiked] = useState(prompt.isLiked);
  const [isSaved, setIsSaved] = useState(prompt.isSaved);
  const [copied, setCopied] = useState(false);
  const category = promptCategories.find(c => c.id === prompt.category);

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{category?.icon}</span>
          <span className="text-sm font-medium text-gray-600">{category?.name}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleLike}
            className={`p-1.5 rounded-lg ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleSave}
            className={`p-1.5 rounded-lg ${isSaved ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mb-2">{prompt.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{prompt.content}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {prompt.tags.map(tag => (
          <span key={tag} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={prompt.avatar} alt={prompt.author} className="w-6 h-6 rounded-full" />
          <span className="text-sm text-gray-700">{prompt.author}</span>
        </div>
        <button
          onClick={copyPrompt}
          className="flex items-center gap-1 text-gray-500 hover:text-purple-600"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span className="text-xs">Копировать</span>
        </button>
      </div>
    </div>
  );
}
