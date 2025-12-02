"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const translations = {
  en: {
    gallery: "GALLERY",
    create: "CREATE", 
    about: "ABOUT",
    code_now: "CODE NOW",
    view_games: "VIEW GAMES",
    privacy: "PRIVACY",
    back: "RETURN",
    about_title: "ABOUT MICROVERSE",
    cyber_platform: "CYBER CREATION PLATFORM",
    tech_stack: "TECH STACK", 
    join_matrix: "JOIN THE MATRIX",
  },
  ru: {
    gallery: "ГАЛЕРЕЯ",
    create: "СОЗДАТЬ",
    about: "О НАС", 
    code_now: "КОД СЕЙЧАС",
    view_games: "СМОТРЕТЬ ИГРЫ",
    privacy: "КОНФИДЕНЦИАЛЬНОСТЬ",
    back: "НАЗАД",
    about_title: "О MICROVERSE",
    cyber_platform: "КИБЕРПАНК-ПЛАТФОРМА ДЛЯ СОЗДАНИЯ ИГР",
    tech_stack: "СТЕК ТЕХНОЛОГИЙ",
    join_matrix: "ПРИСОЕДИНЯЙСЯ К МАТРИЦЕ",
  },
};

type Lang = "en" | "ru";

interface LanguageContextType {
  lang: Lang;
  t: (key: keyof typeof translations.en) => string;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  t: () => "",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  const t = (key: keyof typeof translations.en) => translations[lang][key] || key;

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("microverse-lang", newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
