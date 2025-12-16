"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  const [label, setLabel] = useState("Back"); // одинаковый текст на сервере и клиенте

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang === "ru") setLabel("Назад");
  }, []);

  return (
    <button
      onClick={() => router.back()}
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        padding: "8px 12px",
        border: "1px solid #444",
        background: "#fff",
        borderRadius: 8,
        zIndex: 60,
        cursor: "pointer"
      }}
    >
      ← {label}
    </button>
  );
}
