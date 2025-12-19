"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Volume2, Save, Mic, Send, Copy } from "lucide-react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function GrokChat({ initialPrompt }: { initialPrompt: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Привет! Я помогу улучшить ваш промпт. Вставьте текст или опишите задачу.",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "Вот улучшенная версия:\n\n— Добавлены конкретные действия\n— Убраны расплывчатые формулировки\n— Усилен call-to-action",
        "Попробуйте этот вариант:\n\nс фокусом на результат и измеримые метрики.",
        "Рекомендую структуру:\n1. Контекст\n2. Задача\n3. Формат ответа\n\nВаш промпт: \"\"",
      ];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImprove = () => {
    if (messages.length < 2) return;
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    if (lastUserMsg) {
      setInput("Улучши этот промпт:");
    }
  };

  const handleSave = () => {
    if (messages.length < 2) return;
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    if (lastUserMsg && !savedPrompts.includes(lastUserMsg.content)) {
      setSavedPrompts((prev) => [...prev, lastUserMsg.content]);
      alert("Промпт сохранён в библиотеку!");
    }
  };

  const handleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInput("Напиши промпт для генерации изображения кота в космосе");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            GrokChat
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-1.5 bg-white/20 rounded-full hover:bg-white/30"
              title="Сохранить промпт"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 bg-white/20 rounded-full hover:bg-white/30"
              title="GrokMusic"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-purple-100 text-sm mt-1">
          AI-ассистент для создания идеальных промптов
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4 flex">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white shadow">
              <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
              {msg.role === "user" && (
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={handleImprove}
                    className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30"
                  >
                    Улучшить
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(msg.content)}
                    className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <button
            onClick={handleVoice}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200"
            title={isListening ? "Остановить запись" : "Голосовой ввод"}
          >
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Опишите задачу или вставьте промпт..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          GrokChat поможет вам создать промпт, который даст идеальный результат
          в ChatGPT, Claude или Midjourney
        </div>
      </div>
    </div>
  );
}
