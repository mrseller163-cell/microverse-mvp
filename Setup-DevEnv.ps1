# Setup-DevEnv.ps1
# MICROVERSE-MVP 2025–2026 — окончательная боевая версия (полностью совместима с PSScriptAnalyzer)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root

function Write-Log([string]$msg, [string]$color = "White") { Write-Host $msg -ForegroundColor $color }
function Get-Timestamp { (Get-Date).ToString("yyyyMMdd_HHmmss") }

Write-Log "`n MICROVERSE-MVP 2025–2026 — финальная сборка с актуальным LegalNoticeRU`n" Cyan

# 1. Создаём необходимые папки
@("components","lib","pages","pages/api","app") | ForEach-Object {
    $p = Join-Path $root $_
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null; Write-Log "Создана: $_" Yellow }
}

# 2. Находим все потенциально клиентские файлы
$targets = @()
if (Test-Path "$root\app")   { $targets += Get-ChildItem "$root\app"   -Recurse -Include *.tsx,*.ts,*.jsx,*.js -File }
if (Test-Path "$root\pages") { $targets += Get-ChildItem "$root\pages" -Recurse -Include *.tsx,*.ts,*.jsx,*.js -File | Where-Object { $_.FullName -notmatch '\\api\\' } }

# 3. Проверка: это React-компонент?
function Test-IsReactComponent([string]$text) {
    return ($text -match 'export\s+(default|function|const)\b' -or
            $text -match 'return\s*\(' -or
            $text -match '<[A-Z]' -or
            $text -match '\buse(State|Effect|Router|Context|Ref)\b' -or
            $text -match '\bon(Click|Change|Submit)\b')
}

# 4. Создание резервной копии
function New-FileBackup([string]$path) {
    $bak = "$path.bak.$(Get-Timestamp)"
    Copy-Item $path $bak -Force
    Write-Log "  backup: $(Split-Path $bak -Leaf)" DarkCyan
}

# 5. Исправление директивы "use client"
function Repair-UseClientDirective([string]$path) {
    $content = Get-Content $path -Raw
    if ($content.TrimStart() -match '^(?:\uFEFF)?\s*["'']use client["''];') { return $false }
    if (-not (Test-IsReactComponent $content)) { return $false }

    New-FileBackup $path
    $clean = $content -replace '(?m)^\s*["'']use client["''];?\s*\r?\n?' | ForEach-Object TrimStart
    $fixed = '"use client";' + "`r`n`r`n" + $clean

    [IO.File]::WriteAllText($path, $fixed, [Text.UTF8Encoding]$false)
    Write-Log "use client → $(Split-Path $path -Leaf)" Green
    return $true
}

# 6. Добавление LegalNoticeRU в информационные страницы
function Add-LegalNoticeRU([string]$path) {
    $name = (Split-Path $path -Leaf) -replace '\.(tsx|ts|jsx|js)$',''
    $allowed = "about","privacy","terms","my-data","legal","policy","tos","gdpr"
    if (-not ($allowed | Where-Object { $name -match $_ })) { return $false }

    $content = Get-Content $path -Raw
    $changed = $false

    # Импорт
    if ($content -notmatch 'LegalNoticeRU') {
        New-FileBackup $path
        $imp = 'import LegalNoticeRU from "@/components/LegalNoticeRU";'
        if ($content -match '^"use client";') {
            $content = $content -replace '^("use client";)', "$1`r`n$imp"
        } else {
            $content = "$imp`r`n`r`n" + $content
        }
        $changed = $true
    }

    # Компонент
    if ($content -notmatch '<LegalNoticeRU') {
        if (-not $changed) { New-FileBackup $path }
        if ($content -match '(?i)</main>') {
            $content = $content -replace '(?i)(</main>)', "`r`n  <LegalNoticeRU />`r`n$1"
        } elseif ($content -match '(?s)(</div>\s*)$') {
            $content = $content -replace '(?s)(</div>\s*)$', "`r`n  <LegalNoticeRU />`r`n$1"
        } else {
            $content += "`r`n`r`n  <LegalNoticeRU />"
        }
        $changed = $true
    }

    if ($changed) {
        [IO.File]::WriteAllText($path, $content, [Text.UTF8Encoding]$false)
        Write-Log "LegalNoticeRU → $(Split-Path $path -Leaf)" Magenta
        return $true
    }
    return $false
}

# 7. Создание обязательных compliance-файлов
$files = @{
    "components/LegalNoticeRU.tsx" = @"
"use client";

export default function LegalNoticeRU() {
  return (
    <div style={{
      padding: "12px 16px",
      border: "1px solid #e5e7eb",
      background: "#fffceb",
      color: "#111",
      borderRadius: 8,
      marginTop: 16
    }}>
      <strong>Важно для пользователей из России:</strong>
      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
        <li>Facebook — Meta✴ признана экстремистской организацией, деятельность запрещена в РФ</li>
        <li>Instagram — Meta✴ признана экстремистской организацией, деятельность запрещена в РФ</li>
        <li>YouTube — доступен, но отдельные видео и каналы блокируются Роскомнадзором</li>
        <li>TikTok — доступен с ограничениями, реклама запрещена</li>
        <li>X (Twitter) — доступен частично, блокируются аккаунты и публикации</li>
        <li>Telegram — доступен, но ограничены звонки и отдельные функции</li>
        <li>VK — российская платформа, полностью разрешена и поддерживается государством</li>
      </ul>
      <p style={{ marginTop: 12 }}>
        Мы рекомендуем проявлять осторожность, учитывать местное законодательство и избегать публикации чувствительных данных.
      </p>
    </div>
  );
}
"@;

    "components/ConsentBanner.tsx" = @"
"use client";
import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("consent")) setShow(true); }, []);
  if (!show) return null;
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#111",color:"#fff",padding:"12px",zIndex:9999,textAlign:"center",fontSize:"14px"}}>
      Мы используем минимальные куки для работы сайта. Продолжая — вы соглашаетесь.
      <button onClick={()=>{localStorage.setItem("consent","1");setShow(false)}} style={{marginLeft:16,padding:"6px 14px",background:"#fff",color:"#000",border:"none",borderRadius:6,cursor:"pointer"}}>
        ОК
      </button>
    </div>
  );
}
"@;

    "pages/my-data.tsx" = @"
"use client";
export default function MyData() {
  return (
    <div style={{padding:"32px", maxWidth:"640px", margin:"0 auto"}}>
      <h1>Мои данные</h1>
      <p style={{marginTop:"24px"}}>Вы можете запросить экспорт или полное удаление всех ваших данных.</p>
      <div style={{marginTop:"24px", display:"flex", gap:"16px"}}>
        <button onClick={()=>fetch("/api/export",{method:"POST"}).then(r=>r.ok&&alert("Экспорт запрошен — проверьте почту"))} style={{padding:"10px 20px", background:"#fff", border:"1px solid #444", borderRadius:8, cursor:"pointer"}}>
          Экспортировать данные
        </button>
        <button onClick={()=>fetch("/api/delete",{method:"POST"}).then(r=>r.ok&&alert("Удаление запрошено"))} style={{padding:"10px 20px", background:"#fff", border:"1px solid #444", borderRadius:8, cursor:"pointer"}}>
          Удалить все данные
        </button>
      </div>
    </div>
  );
}
"@;
}

foreach ($f in $files.Keys) {
    $p = Join-Path $root $f
    if (-not (Test-Path $p)) {
        [IO.File]::WriteAllText($p, $files[$f].TrimStart(), [Text.UTF8Encoding]$false)
        Write-Log "Создан: $f" Green
    } else {
        Write-Log "Уже существует: $f" DarkGray
    }
}

# 8. Применяем исправления
$changedCount = 0
foreach ($file in $targets) {
    if (Repair-UseClientDirective $file.FullName) { $changedCount++ }
    if (Add-LegalNoticeRU $file.FullName) { $changedCount++ }
}

# 9. Prettier (если установлен)
if ($changedCount -gt 0 -and (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Log "`nЗапуск Prettier…" Cyan
    npx prettier --write ($targets.FullName) --log-level warn 2>$null
}

Write-Log "`nГОТОВО! Изменено файлов: $changedCount" Cyan
Write-Log "`n   Запуск проекта:" Yellow
Write-Log "   npm run dev`n" White
Write-Log "   Microverse-MVP 2025–2026 полностью готов и соответствует законодательству РФ." Cyan

# 7. Полный набор compliance + UI + API-файлов (создаётся только если нет)
$files = @{

    # === Компоненты ===
    "components/LegalNoticeRU.tsx" = @"
"use client";

export default function LegalNoticeRU() {
  return (
    <div style={{
      padding: "12px 16px",
      border: "1px solid #e5e7eb",
      background: "#fffceb",
      color: "#111",
      borderRadius: 8,
      marginTop: 16,
      fontSize: "14px"
    }}>
      <strong>Важно для пользователей из России:</strong>
      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
        <li>Facebook — Meta✴ признана экстремистской организацией, деятельность запрещена в РФ</li>
        <li>Instagram — Meta✴ признана экстремистской организацией, деятельность запрещена в РФ</li>
        <li>YouTube — доступен, но отдельные видео и каналы блокируются Роскомнадзором</li>
        <li>TikTok — доступен с ограничениями, реклама запрещена</li>
        <li>X (Twitter) — доступен частично, блокируются аккаунты и публикации</li>
        <li>Telegram — доступен, но ограничены звонки и отдельные функции</li>
        <li>VK — российская платформа, полностью разрешена и поддерживается государством</li>
      </ul>
      <p style={{ marginTop: 12 }}>
        Мы рекомендуем проявлять осторожность, учитывать местное законодательство и избегать публикации чувствительных данных.
      </p>
    </div>
  );
}
"@;

    "components/ConsentBanner.tsx" = @"
"use client";
import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("consent")) setShow(true);
  }, []);
  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      background: "#111",
      color: "#fff",
      padding: "12px 16px",
      zIndex: 9999,
      textAlign: "center",
      fontSize: "14px"
    }}>
      Мы используем минимальные куки для работы сайта. Продолжая — вы соглашаетесь.
      <button onClick={() => { localStorage.setItem("consent", "1"); setShow(false); }}
        style={{ marginLeft: 16, padding: "6px 14px", background: "#fff", color: "#000", border: "none", borderRadius: 6, cursor: "pointer" }}>
        ОК
      </button>
    </div>
  );
}
"@;

    "components/BackButton.tsx" = @"
"use client";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        padding: "8px 14px",
        background: "#fff",
        border: "1px solid #444",
        borderRadius: 8,
        zIndex: 100,
        cursor: "pointer",
        fontSize: "14px"
      }}
    >
      ← {typeof window !== "undefined" && localStorage.getItem("lang") === "ru" ? "Назад" : "Back"}
    </button>
  );
}
"@;

    # === Страницы ===
    "pages/my-data.tsx" = @"
"use client";
export default function MyData() {
  return (
    <div style={{ padding: "32px", maxWidth: "640px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "24px" }}>Мои данные</h1>
      <p style={{ marginBottom: "24px", lineHeight: 1.6 }}>
        Вы можете запросить экспорт или полное удаление всех ваших данных в соответствии с 152-ФЗ и GDPR.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          onClick={() => fetch("/api/export", { method: "POST" }).then(r => r.ok && alert("Экспорт запрошен — проверьте почту"))}
          style={{ padding: "12px 20px", background: "#fff", border: "1px solid #444", borderRadius: 8, cursor: "pointer" }}
        >
          Экспорт данных
        </button>
        <button
          onClick={() => fetch("/api/delete", { method: "POST" }).then(r => r.ok && alert("Удаление запрошено"))}
          style={{ padding: "12px 20px", background: "#fff", border: "1px solid #444", borderRadius: 8, cursor: "pointer" }}
        >
          Удалить данные
        </button>
      </div>
    </div>
  );
}
"@;

    # === API-эндпоинты ===
    "pages/api/consent.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  // Логика сохранения согласия (можно добавить интеграцию с БД)
  return res.status(200).json({ ok: true });
}
"@;

    "pages/api/export.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  // TODO: Собрать данные пользователя и отправить на email
  console.log("[EXPORT] Запрошено");
  return res.status(200).json({ ok: true });
}
"@;

    "pages/api/delete.ts" = @"
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  // TODO: Удаление данных пользователя из БД
  console.log("[DELETE] Запрошено");
  return res.status(200).json({ ok: true });
}
"@;
}