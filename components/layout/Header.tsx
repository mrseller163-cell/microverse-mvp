"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Microverse
            </Link>
            {/* Десктопное меню */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-gray-700 hover:text-purple-600 font-medium">
                Marketplace
              </Link>
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
                Главная
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-purple-600 font-medium">
                Инструменты
              </Link>
              <Link href="/grokmusic" className="text-gray-700 hover:text-purple-600 font-medium">
                GrokMusic
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-purple-600 font-medium">
                Категории
              </Link>
              <Link href="/prompts" className="text-gray-700 hover:text-purple-600 font-medium">
                Промпты
              </Link>
              <Link href="/submit" className="text-gray-700 hover:text-purple-600 font-medium">
                Добавить
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-950/95 backdrop-blur-md border-r border-white/10">
            <div className="p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              <nav className="mt-16 space-y-4">
                <Link href="/marketplace" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Marketplace
                </Link>
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Главная
                </Link>
                <Link href="/tools" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Инструменты
                </Link>
                <Link href="/grokmusic" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  GrokMusic
                </Link>
                <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Категории
                </Link>
                <Link href="/prompts" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Промпты
                </Link>
                <Link href="/submit" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-700">
                  Добавить инструмент
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}