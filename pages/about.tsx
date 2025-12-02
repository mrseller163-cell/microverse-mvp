"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SocialLinks from "../components/SocialLinks";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { translations } from "../lib/translations";

export default function About() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ru">("en");

  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang") as "en" | "ru" | null;
    if (saved) setLang(saved);
  }, []);

  const t = (key: keyof typeof translations.en) => translations[lang][key];

  const aboutContent = {
    en: {
      title: "ABOUT MICROVERSE",
      cyberPlatform: "CYBER CREATION PLATFORM",
      cyberText: "Microverse - digital realm for game creators. Build, share, play in neon matrix.",
      techStack: "TECH STACK", 
      techText: "Next.js • Phaser3 • Supabase • Redis • AI-powered tools",
      joinMatrix: "JOIN THE MATRIX",
      joinText: "Connect with cyber creators across digital dimensions.",
      digitalConnections: "DIGITAL CONNECTIONS",
      back: "← RETURN TO MATRIX"
    },
    ru: {
      title: "О MICROVERSE",
      cyberPlatform: "КИБЕРПАНК-ПЛАТФОРМА",
      cyberText: "Microverse - цифровое пространство для создателей игр. Создавай, делись, играй в неоновой матрице.",
      techStack: "СТЕК ТЕХНОЛОГИЙ",
      techText: "Next.js • Phaser3 • Supabase • Redis • AI-инструменты", 
      joinMatrix: "ПРИСОЕДИНЯЙСЯ К МАТРИЦЕ",
      joinText: "Общайся с кибер-создателями через цифровые измерения.",
      digitalConnections: "ЦИФРОВЫЕ КОННЕКТЫ",
      back: "← ВЕРНУТЬСЯ В МАТРИЦУ"
    }
  };

  const current = aboutContent[lang];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Хедер */}
        <div className="flex justify-between items-center mb-12 border-b border-cyan-400/30 pb-6">
          <h1 className="text-4xl font-black text-cyan-400 tracking-wider">{current.title}</h1>
          <LanguageSwitcher />
        </div>

        {/* Контент */}
        <div className="space-y-8 mb-12">
          <div className="bg-black/60 rounded-xl p-8 border border-cyan-400/30">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">{current.cyberPlatform}</h2>
            <p className="text-gray-300 leading-relaxed">
              {current.cyberText}
            </p>
          </div>

          <div className="bg-black/60 rounded-xl p-8 border border-pink-400/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">{current.techStack}</h2>
            <p className="text-gray-300 leading-relaxed">
              {current.techText}
            </p>
          </div>

          <div className="bg-black/60 rounded-xl p-8 border border-yellow-400/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{current.joinMatrix}</h2>
            <p className="text-gray-300 leading-relaxed">
              {current.joinText}
            </p>
          </div>
        </div>

        {/* Соцсети */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-green-400 mb-6 text-center tracking-wide">{current.digitalConnections}</h3>
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
