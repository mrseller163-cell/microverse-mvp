"use client";

import { motion } from "framer-motion";
import { mockOffers } from "@/lib/marketplace/offers";
import { OfferCard } from "@/components/marketplace/OfferCard";
import { MarketplaceChat } from "@/components/chat/MarketplaceChat";

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
          Marketplace
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Покупайте, продавайте и обменивайтесь промптами. Все сделки — с гарантией.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список офферов */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {mockOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </motion.div>
        </div>

        {/* Общий чат */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MarketplaceChat />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
