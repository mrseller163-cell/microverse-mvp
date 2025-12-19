import { notFound } from "next/navigation";
import { GrokChat } from "@/components/chat/GrokChat";
import { mockPrompts } from "@/lib/prompts";
import { Heart, Bookmark } from "lucide-react";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const promptId = parseInt(id);
  const prompt = mockPrompts.find((p) => p.id === promptId);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Шапка с автором, аватаром и активностью */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={prompt.avatar}
              alt={prompt.author}
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Чат для промпта:</h1>
              <p className="text-gray-600 mt-1">
                "{prompt.title}" — автор {prompt.author}
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">{prompt.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{prompt.saves}</span>
            </div>
          </div>
        </div>

        {/* Сам чат */}
        <GrokChat initialPrompt={prompt.content} />
      </div>
    </div>
  );
}