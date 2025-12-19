"use client";

import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, RotateCcw } from "lucide-react";
import { Offer } from "@/lib/marketplace/offers";

const typeConfig = {
  sell: {
    icon: <ShoppingCart className="w-4 h-4" />,
    bg: "bg-green-500/10",
    text: "Продаю",
    color: "text-green-600",
  },
  buy: {
    icon: <MessageCircle className="w-4 h-4" />,
    bg: "bg-blue-500/10",
    text: "Покупаю",
    color: "text-blue-600",
  },
  swap: {
    icon: <RotateCcw className="w-4 h-4" />,
    bg: "bg-purple-500/10",
    text: "Обмен",
    color: "text-purple-600",
  },
};

export function OfferCard({ offer }: { offer: Offer }) {
  const config = typeConfig[offer.type];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.bg} ${config.color}`}
        >
          {config.icon} {config.text}
        </span>
        <span className="text-xs text-gray-500">{offer.date}</span>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mb-2">{offer.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {offer.tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <img
          src={offer.avatar}
          alt={offer.author}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm font-medium text-gray-800">{offer.author}</span>
      </div>
    </motion.div>
  );
}