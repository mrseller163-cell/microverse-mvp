"use client";

import { useEffect } from 'react';

export default function LiveCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.background = "radial-gradient(circle, #00ffff, transparent)";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.mixBlendMode = "difference";
    cursor.style.transition = "transform 0.1s ease";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = (e.clientX - 10) + "px";
      cursor.style.top = (e.clientY - 10) + "px";
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}
