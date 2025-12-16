# Setup-DevEnv.ps1
# Создание UI + автоматическая правка старых страниц (перенос "use client" наверх)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "== MICROVERSE-MVP: Автосборка UI + исправление страниц ==" -ForegroundColor Cyan


# =============================================================================
# 1) Гарантируем наличие папок
# =============================================================================
$dirs = @("components", "lib", "pages", "pages/api")
foreach ($d in $dirs) {
  $dirPath = Join-Path $projectRoot $d
  if (-not (Test-Path $dirPath)) {
    New-Item -ItemType Directory -Path $dirPath | Out-Null
    Write-Host "Создана папка: $d" -ForegroundColor Yellow
  }
}


# =============================================================================
# 2) ФУНКЦИЯ: фикс страницы — перенос "use client" в начало
# =============================================================================
function Fix-ClientPage {
  param (
    [string]$path
  )

  if (-not (Test-Path $path)) { return }

  $content = Get-Content $path -Raw

  # Удаляем все существующие use client
  $contentNoClient = $content -replace '"use client";', "" -replace "'use client';", ""

  # Нормализуем (убираем пустые строки в начале)
  $contentNoClient = $contentNoClient.Trim()

  # Добавляем "use client" в начало
  $fixed = "\"use client\";\n`n" + $contentNoClient

  Set-Content -Path $path -Value $fixed -Encoding UTF8
  Write-Host "Исправлено: $(Split-Path $path -Leaf)" -ForegroundColor Green
}


# =============================================================================
# 3) Новые файлы (создаём только если отсутствуют)
# =============================================================================
$files = @{

"components/ConsentBanner.tsx" = @"
"use client";

import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";

const btnStyle = {
  padding: "8px 14px",
  background: "#fff",
  color: "#111",
  borderRadius: 8,
  border: "1px solid #444",
  cursor: "pointer"
};

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const has = localStorage.getItem("consent");
    if (!has) setVisible(true);
  }, []);

  const accept = async () => {
    localStorage.setItem("consent", "true");
    setVisible(false);
    await fetch("/api/consent", { method: "POST" });
  };

  if (!visible) return null;

  return (
    <div style={{position:"fixed", left:0, right:0, bottom:0, background:"#111", color:"#fff", padding:"12px 16px", zIndex:100}}>
      <div style={{maxWidth:960, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
        <span>
          {lang === "ru"
            ? "Мы используем куки и минимальные данные для работы сайта. Продолжая, вы соглашаетесь."
            : "We use cookies and minimal data to operate. By continuing, you consent."}
        </span>
        <button onClick={accept} style={btnStyle}>
          {lang === "ru" ? "ОК" : "OK"}
        </button>
      </div>
    </div>
  );
}
"@;


"components/BackButton.tsx" = @"
"use client";

import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  const style = {
    position:"fixed",
    top:16,
    left:16,
    padding:"8px 12px",
    border:"1px solid #444",
    background:"#fff",
    borderRadius:8,
    zIndex:60,
    cursor:"pointer"
  };

  return (
    <button onClick={() => router.back()} style={style}>
      ← {typeof window !== "undefined" && (localStorage.getItem("lang") === "ru" ? "Назад" : "Back")}
    </button>
  );
}
"@;


"components/LegalNoticeRU.tsx" = @"
"use client";

export default function LegalNoticeRU() {
  return (
    <div style={{padding:"12px 16px", border:"1px solid #e5e7eb", background:"#fffceb", color:"#111", borderRadius:8, marginTop:16}}>
      <strong>Важно для пользователей из России:</strong>
      <p style={{marginTop:8}}>
        Некоторые зарубежные социальные сети и сервисы в 2025 году могут иметь ограниченный или неопределённый статус.
        Мы рекомендуем проявлять осторожность, учитывать местное законодательство и избегать публикации чувствительных данных.
      </p>
    </div>
  );
}
"@;


"pages/my-data.tsx" = @"
"use client";

import { useLang } from "../lib/i18n";

const btn = {
  padding:"10px 16px",
  background:"#fff",
  border:"1px solid #444",
  borderRadius:8,
  cursor:"pointer"
};

export default function MyDataPage() {
  const { lang } = useLang();

  const exportData = async () => {
    const res = await fetch("/api/export", { method: "POST" });
    if (res.ok) {
      alert(lang === "ru" ? "Экспорт запрошен. Проверьте почту." : "Export requested. Check your email.");
    }
  };

  const deleteData = async () => {
    const res = await fetch("/api/delete", { method: "POST" });
    if (res.ok) {
      alert(lang === "ru" ? "Удаление запрошено." : "Deletion requested.");
    }
  };

  return (
    <div style={{padding:"24px"}}>
      <h1>{lang === "ru" ? "Мои данные" : "My Data"}</h1>
      <div style={{display:"flex", gap:12, marginTop:16}}>
        <button style={btn} onClick={exportData}>📤 {lang === "ru" ? "Экспортировать" : "Export"}</button>
        <button style={btn} onClick={deleteData}>🗑️ {lang === "ru" ? "Удалить" : "Delete"}</button>
      </div>
    </div>
  );
}
"@;


"pages/api/consent.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  return res.status(200).json({ ok: true });
}
"@;

"pages/api/export.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  return res.status(200).json({ ok: true });
}
"@;

"pages/api/delete.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  return res.status(200).json({ ok: true });
}
"@;

}

# =============================================================================
# 4) Создание файлов
# =============================================================================
foreach ($relPath in $files.Keys) {
  $fullPath = Join-Path $projectRoot $relPath
  if (-not (Test-Path $fullPath)) {
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
    Set-Content -Path $fullPath -Value $files[$relPath] -Encoding UTF8
    Write-Host "Создан файл: $relPath" -ForegroundColor Green
  } else {
    Write-Host "Пропущено (существует): $relPath" -ForegroundColor DarkGray
  }
}


# =============================================================================
# 5) Автоисправление старых страниц
# =============================================================================
$pagesToFix = @(
  "pages/play.tsx",
  "pages/about.tsx",
  "pages/privacy.tsx",
  "pages/terms.tsx"
)

Write-Host "`n== Исправление старых страниц ==" -ForegroundColor Cyan
foreach ($p in $pagesToFix) {
  $full = Join-Path $projectRoot $p
  Fix-ClientPage -path $full
}


Write-Host "`nГотово." -ForegroundColor Cyan

# =============================================================================
# 6) Автовставка LegalNoticeRU в ключевые страницы
# =============================================================================
function Ensure-LegalNotice {
  param ([string]$path)

  if (-not (Test-Path $path)) { return }

  $content = Get-Content $path -Raw

  # Проверяем, есть ли импорт LegalNoticeRU
  if ($content -notmatch "LegalNoticeRU") {
    $content = $content -replace "(?m)^import", "import LegalNoticeRU from \"../components/LegalNoticeRU\";\nimport"
  }

  # Проверяем, есть ли вызов <LegalNoticeRU />
  if ($content -notmatch "<LegalNoticeRU") {
    # Добавляем перед закрывающим тегом </main>
    $content = $content -replace "</main>", "  <LegalNoticeRU />`n</main>"
  }

  Set-Content -Path $path -Value $content -Encoding UTF8
  Write-Host "LegalNoticeRU вставлен: $(Split-Path $path -Leaf)" -ForegroundColor Green
}

$pagesWithNotice = @(
  "pages/privacy.tsx",
  "pages/terms.tsx",
  "pages/about.tsx"
)

Write-Host "`n== Вставка LegalNoticeRU ==" -ForegroundColor Cyan
foreach ($p in $pagesWithNotice) {
  $full = Join-Path $projectRoot $p
  Ensure-LegalNotice -path $full
}
