"use client";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { translations } from "../lib/translations";

export default function Gallery() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ru">("en");

  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang") as "en" | "ru" | null;
    if (saved) setLang(saved);
  }, []);

  const t = (key: keyof typeof translations.en) => translations[lang][key];

  const galleryContent = {
    en: {
      title: "GAME GALLERY",
      subtitle: "Explore cyber creations from the matrix",
      comingSoon: "More games coming soon from the digital realm...",
      back: "← BACK TO MATRIX",
    },
    ru: {
      title: "ГАЛЕРЕЯ ИГР",
      subtitle: "Исследуй кибер-творения из матрицы",
      comingSoon: "Больше игр скоро из цифрового пространства...",
      back: "← НАЗАД В МАТРИЦУ",
    },
  };

  const current = galleryContent[lang];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-6 py-12">
        {/* Хедер */}
        <div className="flex justify-between items-center mb-12 border-b border-cyan-400/30 pb-6">
          <div>
            <h1 className="text-4xl font-black text-cyan-400 tracking-wider mb-2">
              {current.title}
            </h1>
            <p className="text-gray-400">{current.subtitle}</p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Контент */}
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🎮</div>
          <p className="text-xl text-gray-300 mb-8">{current.comingSoon}</p>

          {/* Кнопка назад */}
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

<BackButton />;
