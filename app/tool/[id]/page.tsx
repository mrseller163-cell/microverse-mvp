import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { Heart, Share2, ExternalLink, Star } from "lucide-react";

interface Props {
  params: { id: string };
}

export default function ToolDetail({ params }: Props) {
  const tool = tools.find((t) => t.id === parseInt(params.id));

  if (!tool) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/tools"
        className="inline-block mb-8 text-purple-400 hover:text-purple-300 transition-colors"
      >
        ← Назад к инструментам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-20 h-20 rounded-xl"
                />
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      {tool.rating} ({tool.reviews} отзывов)
                    </span>
                    <span>{tool.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">{tool.longDescription}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {tool.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              {/* Кнопка перехода к инструменту */}
              <Link
                href={tool.link}
                target="_blank"
                className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Перейти к инструменту
                <ExternalLink className="w-5 h-5" />
              </Link>

              {/* Новая кнопка — GrokMusic */}
              <Link
                href="/grokmusic"
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                <span>Слушать саундтрек для работы</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Статистика</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Добавлен</span>
                <span>{tool.added}</span>
              </div>
              <div className="flex justify-between">
                <span>Просмотры</span>
                <span>{tool.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Лайки</span>
                <span>{tool.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}