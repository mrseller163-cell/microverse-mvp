"use client";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");
  
  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang");
    if (saved) setLang(saved);
  }, []);

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("microverse-lang", newLang);
    // Сохраняем язык и перезагружаем для применения
    window.location.reload();
  };

  return (
    <div className="flex items-center space-x-2 bg-black/60 rounded-full p-1 border border-cyan-400/30">
      <button 
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 text-xs rounded-full transition-all ${
          lang === "en" 
            ? "bg-cyan-500 text-black font-bold" 
            : "text-cyan-300 hover:text-cyan-100"
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage("ru")}
        className={`px-3 py-1 text-xs rounded-full transition-all ${
          lang === "ru" 
            ? "bg-pink-500 text-black font-bold" 
            : "text-pink-300 hover:text-pink-100"
        }`}
      >
        RU
      </button>
    </div>
  );
}
