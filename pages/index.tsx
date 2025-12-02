"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { translations } from "../lib/translations";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const [games] = useState([
    { id: "1", title: "Neon Hack", author: "Ry0", plays: 247, color: "from-pink-500 to-purple-600" },
    { id: "2", title: "Data Storm", author: "N3K0", plays: 189, color: "from-blue-400 to-cyan-500" },
    { id: "3", title: "Void Runner", author: "A1X", plays: 93, color: "from-green-400 to-yellow-500" }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("microverse-lang") as "en" | "ru" | null;
    if (saved) setLang(saved);
  }, []);

  const t = (key: keyof typeof translations.en) => translations[lang][key];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <nav className="relative bg-black/80 border-b border-cyan-400/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
              <span className="text-black font-black text-2xl">MV</span>
            </div>
            <span className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              MICROVERSE
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <LanguageSwitcher />
            <div className="flex space-x-6 text-sm font-light uppercase tracking-wider">
              <Link href="/gallery" className="text-cyan-300 hover:text-pink-400 transition-colors duration-300">{t("gallery")}</Link>
              <Link href="/editor" className="text-cyan-300 hover:text-pink-400 transition-colors duration-300">{t("create")}</Link>
              <Link href="/about" className="text-cyan-300 hover:text-pink-400 transition-colors duration-300">{t("about")}</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="container mx-auto px-6 py-36 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="block text-cyan-400 animate-pulse">{t("heroTitle1")}</span>
            <span className="block text-pink-400">{t("heroTitle2")}</span>
            <span className="block text-yellow-400">{t("heroTitle3")}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed tracking-wide">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link href="/editor">
              <button className="group px-14 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-xl font-bold rounded-xl transition-all duration-500 shadow-lg hover:shadow-cyan-500/40 hover:scale-105 border border-cyan-400/50">
                <span className="flex items-center space-x-3">
                  <span>🖥️</span>
                  <span>{t("codeNow")}</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-12 py-4 bg-black/70 hover:bg-black/50 text-lg rounded-xl transition-all duration-300 border border-pink-400/50 backdrop-blur-md text-pink-300 hover:text-pink-100">
                🎮 {t("viewGames")}
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-black/60 rounded-lg border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-4xl font-black text-cyan-400 mb-2 animate-pulse">500+</div>
              <div className="text-gray-400 text-sm tracking-wide">{t("codersOnline")}</div>
            </div>
            <div className="text-center p-6 bg-black/60 rounded-lg border border-pink-400/30 hover:border-pink-400/70 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-4xl font-black text-pink-400 mb-2 animate-pulse">2K+</div>
              <div className="text-gray-400 text-sm tracking-wide">{t("neonGames")}</div>
            </div>
            <div className="text-center p-6 bg-black/60 rounded-lg border border-yellow-400/30 hover:border-yellow-400/70 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-4xl font-black text-yellow-400 mb-2 animate-pulse">50K+</div>
              <div className="text-gray-400 text-sm tracking-wide">{t("playSessions")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-center mb-12 tracking-wider text-cyan-400">
          {t("topGames")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game) => (
            <div key={game.id} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-800/80 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm">
                <div className={`h-48 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-8xl opacity-80 filter drop-shadow-2xl">🎯</div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">{game.title}</h3>
                  <p className="text-gray-300 mb-4 text-lg">{t("author")}: {game.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-semibold text-lg">🎮 {game.plays}</span>
                    <Link href={`/play?game=${game.id}`}>
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                        {t("play")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black/40 border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="flex justify-center space-x-10 mb-6 text-lg">
            <Link href="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors font-medium">{t("privacy")}</Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors font-medium">{t("terms")}</Link>
            <Link href="/about" className="text-gray-400 hover:text-cyan-300 transition-colors font-medium">{t("about")}</Link>
          </div>
          <p className="text-gray-500 text-lg">{t("copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
