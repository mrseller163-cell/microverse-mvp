"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-white hover:text-purple-400 transition">
          Microverse
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/marketplace" className="hover:text-purple-400 transition">Marketplace</Link>
          <Link href="/chat" className="hover:text-purple-400 transition">Chat</Link>
          <Link href="/categories" className="hover:text-purple-400 transition">Категории</Link>
          <Link href="/prompts" className="hover:text-purple-400 transition">Промпты</Link>
          <Link href="/add" className="hover:text-purple-400 transition">Добавить</Link>
        </div>
      </nav>
    </header>
  );
}
