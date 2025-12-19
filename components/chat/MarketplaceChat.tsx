"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

type ChatMessage = {
  id: string;
  user: string;
  text: string;
  avatar: string;
};

export function MarketplaceChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Алексей', text: 'Выложил промпт для резюме — кто купит?', avatar: 'https://placehold.co/32x32/8b5cf6/white?text=A' },
    { id: '2', user: 'Мария', text: 'Ищу промпт для Midjourney! Готова обменяться.', avatar: 'https://placehold.co/32x32/ec4899/white?text=M' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'Вы',
      text: input,
      avatar: 'https://placehold.co/32x32/4f46e5/white?text=Я'
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-5">
      <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
        🌐 Общий чат Marketplace
      </h3>
      
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-medium text-sm text-gray-800">{msg.user}</div>
                <div className="text-gray-600 text-sm">{msg.text}</div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Напишите сообщение..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
