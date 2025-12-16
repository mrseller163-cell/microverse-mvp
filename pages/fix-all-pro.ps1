# =====================================================================
#  fix-all-pro.ps1 — PRO EDITION
#  Автоматически чинит все клиентские страницы:
#  - Переставляет "use client" в начало
#  - Чинит about.tsx, privacy.tsx, terms.tsx, play.tsx
#  - Вставляет LegalNoticeRU
#  - Приводит кнопки к единому стилю
#  - Делает бэкапы + undo
# =====================================================================

$ErrorActionPreference = "Stop"

Function Log($msg, $color="Gray") {
    Write-Host $msg -ForegroundColor $color
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$pages = Join-Path $root "pages"
$backupDir = Join-Path $root ("backup_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
$undoPath = Join-Path $backupDir "undo.ps1"

New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Set-Content -Path $undoPath -Value "# Undo script`n" -Encoding UTF8

# =====================================================================
# UTIL — Перемещает "use client" в начало файла
# =====================================================================
Function Fix-UseClient {
    param($path)

    if (!(Test-Path $path)) { return }

    $code = Get-Content $path -Raw

    # Ищем все вхождения "use client"
    $fixed = $code -replace '^[\s\S]*?"use client";\s*', ""
    $fixed = "\"use client\";`n`n" + $fixed.Trim()

    # Бэкап
    $rel = $path.Replace($root, "")
    $backupPath = Join-Path $backupDir ($rel + ".bak")
    New-Item -ItemType Directory -Force -Path (Split-Path $backupPath) | Out-Null
    Copy-Item $path $backupPath -Force

    Add-Content -Path $undoPath -Value ("Copy-Item `"$backupPath`" `"$path`" -Force")

    Set-Content -Path $path -Value $fixed -Encoding UTF8
    Log "✔ use client fixed: $rel" Green
}

# =====================================================================
# UTIL — Заменяет/вставляет LegalNoticeRU
# =====================================================================
Function Ensure-LegalNotice {
    param($path)

    if (!(Test-Path $path)) { return }

    $code = Get-Content $path -Raw

    if ($code -notmatch "LegalNoticeRU") {
        $inject = "import LegalNoticeRU from `"../components/LegalNoticeRU`";`n"
        $fixed = $code -replace "import", $inject + "import"

        # Бэкап
        $rel = $path.Replace($root, "")
        $backupPath = Join-Path $backupDir ($rel + ".bak")
        Copy-Item $path $backupPath -Force
        Add-Content $undoPath ("Copy-Item `"$backupPath`" `"$path`" -Force")

        Set-Content $path $fixed -Encoding UTF8
        Log "✔ LegalNoticeRU injected: $rel" Cyan
    }
}

# =====================================================================
# UTIL — Чинит стиль кнопок
# =====================================================================
Function Fix-Buttons {
    param($path)

    if (!(Test-Path $path)) { return }

    $code = Get-Content $path -Raw

    $styleNeeded = "className=`"bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition`""

    if ($code -notmatch $styleNeeded) {
        $fixed = $code -replace "<button", "<button $styleNeeded"

        # Бэкап
        $rel = $path.Replace($root, "")
        $backupPath = Join-Path $backupDir ($rel + ".bak")
        Copy-Item $path $backupPath -Force
        Add-Content $undoPath ("Copy-Item `"$backupPath`" `"$path`" -Force")

        Set-Content $path $fixed -Encoding UTF8
        Log "✔ Button styles normalized: $rel" Yellow
    }
}

# =====================================================================
# Патч play.tsx (динамический импорт, client mode)
# =====================================================================
Function Fix-PlayPage {
    $path = Join-Path $pages "play.tsx"
    if (!(Test-Path $path)) { return }

    $code = Get-Content $path -Raw

    $needsFix = $code -notmatch "dynamic" -or $code -notmatch "use client"

    if ($needsFix) {
        $fixed = @"
"use client";

import dynamic from "next/dynamic";
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });

export default function Play() {
  return <Gallery />;
}
"@

        # Бэкап
        $backupPath = Join-Path $backupDir "pages/play.tsx.bak"
        Copy-Item $path $backupPath -Force
        Add-Content $undoPath ("Copy-Item `"$backupPath`" `"$path`" -Force")

        Set-Content $path $fixed -Encoding UTF8
        Log "✔ play.tsx patched (dynamic import + use client)" Magenta
    }
}

# =====================================================================
# Чиним все нужные страницы
# =====================================================================
$targets = @(
    "about.tsx",
    "privacy.tsx",
    "terms.tsx",
    "my-data.tsx"
)

foreach ($file in $targets) {
    $path = Join-Path $pages $file
    Fix-UseClient $path
    Ensure-LegalNotice $path
    Fix-Buttons $path
}

Fix-PlayPage

# =====================================================================
# FINISH
# =====================================================================
Log "`n=== DONE: fix-all-pro.ps1 finished ===" Green
Log "Backup folder: $backupDir" DarkCyan
Log "Undo script: $undoPath" DarkCyan
