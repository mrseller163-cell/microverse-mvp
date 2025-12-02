"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialLinks from "../components/SocialLinks";

export default function Privacy() {
  const [lang, setLang] = useState("en");
  const router = useRouter();

  const content = {
    en: {
      title: "PRIVACY & DATA",
      lastUpdated: "Last updated: December 2023",
      sections: [
        "We collect: email (registration), game data, analytics",
        "Data stored in EU/USA clouds. By using - you agree",
        "Third-party: Facebook, TikTok, Telegram, YouTube, Twitter, VK, Instagram",
        "Delete data: Settings → Delete Account",
        "Contact: privacy@microverse.fun"
      ],
      back: "← RETURN"
    },
    ru: {
      title: "КОНФИДЕНЦИАЛЬНОСТЬ",
      lastUpdated: "Обновлено: Декабрь 2023", 
      sections: [
        "Собираем: email (регистрация), данные игр, аналитику",
        "Данные в EU/USA облаках. Используя - соглашаетесь",
        "Соцсети: Facebook, TikTok, Telegram, YouTube, Twitter, VK, Instagram",
        "Удалить данные: Настройки → Удалить аккаунт",
        "Контакты: privacy@microverse.fun"
      ],
      back: "← НАЗАД"
    }
  };

  const current = content[lang as keyof typeof content];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Хедер */}
        <div className="flex justify-between items-center mb-12 border-b border-cyan-400/30 pb-6">
          <h1 className="text-4xl font-black text-cyan-400 tracking-wider">{current.title}</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-lg border text-sm ${
                lang === "en" 
                  ? "bg-cyan-500 text-black border-cyan-500 font-bold" 
                  : "border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang("ru")}
              className={`px-4 py-2 rounded-lg border text-sm ${
                lang === "ru" 
                  ? "bg-pink-500 text-black border-pink-500 font-bold" 
                  : "border-pink-400/50 text-pink-300 hover:bg-pink-400/20"
              }`}
            >
              RU
            </button>
          </div>
        </div>

        {/* Контент */}
        <div className="space-y-6 mb-12">
          <p className="text-gray-400 text-sm">{current.lastUpdated}</p>
          
          {current.sections.map((text, index) => (
            <p key={index} className="text-gray-300 leading-relaxed border-l-4 border-cyan-400/50 pl-4 py-2">
              {text}
            </p>
          ))}
        </div>

        {/* Соцсети */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-pink-400 mb-6 text-center tracking-wide">
            {lang === "ru" ? "МЫ В СОЦСЕТЯХ" : "OUR SOCIALS"}
          </h3>
          <SocialLinks />
        </div>

        {/* Кнопка назад */}
        <div className="text-center">
          <button 
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-xl font-bold transition-all duration-300 hover:scale-105 border border-cyan-400/50"
          >
            {current.back}
          </button>
        </div>
      </div>
    </div>
  );
}
