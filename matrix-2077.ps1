# 🌀 МАТРИЦА 2077 — ВСЁ В ОДНОЙ КОМАНДЕ (App Router Edition)
# Выполни в корне microverse-mvp

Set-Location "C:\Users\31057\Documents\microverse\microverse-mvp"

# 1. Живой фон + пульсация → В app/globals.css
Add-Content -Path "app/globals.css" -Value @'

@keyframes pulse-bg {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(255, 0, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.9), 0 0 40px rgba(255, 0, 255, 0.8); }
}

body {
  background: linear-gradient(-45deg, #000000, #0f0f1e, #1a0033, #000000);
  background-size: 400% 400%;
  animation: pulse-bg 20s ease infinite;
  min-height: 100vh;
  margin: 0;
  font-family: 'Orbitron', monospace;
  color: #e0f0ff;
  overflow-x: hidden;
}
'@ -Encoding UTF8

# 2. Живые карточки
Add-Content -Path "app/globals.css" -Value @'

.live-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.live-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.6);
}
'@ -Encoding UTF8

# 3. Неоновые кнопки
Add-Content -Path "app/globals.css" -Value @'

.btn-neon {
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  color: #0c0c14;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  animation: neon-pulse 2s infinite;
}

.btn-neon:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.9);
}
'@ -Encoding UTF8

# 4. Живой курсор — создаём компонент
$cursorCode = @'
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
'@
Set-Content -Path "components/LiveCursor.tsx" -Value $cursorCode -Encoding UTF8

# 5. Добавляем курсор в layout.tsx
$layoutPath = "app/layout.tsx"
$layoutContent = Get-Content $layoutPath -Raw
if ($layoutContent -notmatch "LiveCursor") {
  $newLayout = $layoutContent -replace 'import \{ ReactNode \} from ''react'';', "import { ReactNode } from 'react';`nimport LiveCursor from '../components/LiveCursor';"
  $newLayout = $newLayout -replace '<LanguageProvider>', "<LanguageProvider>`n        <LiveCursor />"
  Set-Content -Path $layoutPath -Value $newLayout -Encoding UTF8
}

Write-Host "✅ МАТРИЦА 2077 АКТИВИРОВАНА" -ForegroundColor Magenta
Write-Host "🚀 Запускай: npm run dev" -ForegroundColor Green
Write-Host "🌌 Ты теперь в microverse.fun" -ForegroundColor Cyan