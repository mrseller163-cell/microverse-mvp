// components/layout/Footer.tsx
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderAddress = (label: string, address: string) => (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div
        onClick={() => handleCopy(address)}
        className="cursor-pointer inline-flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
      >
        <code className="break-all">{address}</code>
        {copied === address ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </div>
      {copied === address && (
        <p className="text-green-400 text-xs mt-1">Скопировано!</p>
      )}
    </div>
  );

  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Microverse
            </h3>
            <p className="text-gray-400 text-sm">
              Каталог лучших AI-инструментов 2025 года
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-purple-300 transition-colors">
                  Инструменты
                </Link>
              </li>
              <li>
                <Link href="/grokmusic" className="hover:text-white transition-colors">
                  GrokMusic
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-purple-300 transition-colors">
                  Категории
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-purple-300 transition-colors">
                  Промпты
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-purple-300 transition-colors">
                  Добавить
                </Link>
              </li>
            </ul>
          </div>

          {/* Сообщество */}
          <div>
            <h4 className="font-semibold mb-4">Сообщество</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Discord</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/privacy" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-purple-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Блок донатов */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              ❤️ Каталог полностью бесплатный. Если он тебе полезен — поддержи проект чашкой кофе
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {renderAddress("Ethereum (ERC20)", "0xYourETHAddressHere1234567890abcdef")}
              {renderAddress("Solana", "YourSolanaAddressHere1234567890abcdef")}
              {renderAddress("Bitcoin", "bc1YourBTCAddressHere1234567890abcdef")}
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Все донаты идут на развитие Microverse и новые фичи ❤️
            </p>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          © 2025 Microverse. Все права защищены.
        </div>
      </div>
    </footer>
  );
}