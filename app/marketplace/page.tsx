"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, MessageCircle } from "lucide-react";
import { mockOffers } from "@/lib/marketplace/mockData";
import { OfferCard } from "@/components/marketplace/OfferCard";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");

  const filteredOffers = mockOffers.filter(offer =>
    offer.title.toLowerCase().includes(search.toLowerCase()) ||
    offer.description.toLowerCase().includes(search.toLowerCase()) ||
    offer.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            Marketplace
          </h1>
          <p className="text-gray-600">Покупайте, продавайте и обменивайтесь промптами с гарантией</p>
        </div>
        <Link
          href="/offer/new"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4" />
          Создать оффер
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Поиск офферов..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredOffers.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600">Офферы не найдены</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
