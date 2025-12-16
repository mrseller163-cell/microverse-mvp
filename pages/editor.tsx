"use client";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { translations } from "../lib/translations";

export default function Editor() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ru">("en");

  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang") as "en" | "ru" | null;
    if (saved) setLang(saved);
  }, []);

  const t = (key: keyof typeof translations.en) => translations[lang][key];

  const editorContent = {
    en: {
      title: "CYBER EDITOR",
      subtitle: "Create your digital masterpiece",
      comingSoon: "Game editor launching from the matrix soon...",
      back: "← BACK TO REALM",
    },
    ru: {
      title: "КИБЕР-РЕДАКТОР",
      subtitle: "Создай свой цифровой шедевр",
      comingSoon: "Редактор игр запускается из матрицы скоро...",
      back: "← НАЗАД В РЕАЛЬНОСТЬ",
    },
  };

  const current = editorContent[lang];

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
          <div className="text-6xl mb-6">🖥️</div>
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
