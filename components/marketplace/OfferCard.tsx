"use client";
import Link from "next/link";
import { Offer, User } from "@/lib/marketplace/types";
import { mockUsers } from "@/lib/marketplace/mockData";

export function OfferCard({ offer }: { offer: Offer }) {
  // Находим автора по authorId
  const author: User | undefined = mockUsers.find(u => u.id === offer.authorId);

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {offer.type === "sell"
            ? "Продаю"
            : offer.type === "buy"
            ? "Покупаю"
            : "Обмен"}
        </span>
        <Link
          href={`/offer/${offer.id}`}
          className="text-purple-600 hover:underline text-sm"
        >
          Смотреть
        </Link>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mb-2">{offer.title}</h3>
      <p className="text-gray-600 mb-4">{offer.description}</p>

      {author && (
        <div className="flex items-center gap-2">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-700">{author.name}</span>
        </div>
      )}
    </div>
  );
}