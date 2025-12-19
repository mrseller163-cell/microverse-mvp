"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GlobalChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Общий чат
      </h1>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-md h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2 p-2 rounded bg-purple-100 text-purple-800 text-sm"
          >
            {msg}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Напиши сообщение..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}