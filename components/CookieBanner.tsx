"use client";
import { useEffect } from "react";
export default function CookieBanner() {
  useEffect(() => {
    if (localStorage.getItem("cookie-ok")) return;
    const div = document.createElement("div");
    div.className = "fixed bottom-0 left-0 right-0 bg-black/95 text-white p-6 text-center z-50 border-t-4 border-cyan-500 shadow-2xl";
    div.innerHTML = `
      Мы используем cookie для работы сайта • 
      <a href="/privacy" class="underline hover:text-cyan-400">Политика</a>
      <button onclick="localStorage.setItem('cookie-ok','1');this.parentElement.parentElement.remove()" 
              class="ml-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-bold hover:scale-105 transition-all">
        Принять
      </button>
    `;
    document.body.appendChild(div);
  }, []);
  return null;
}
