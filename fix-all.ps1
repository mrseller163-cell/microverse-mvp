# fix-all.ps1 — стабильная версия (PowerShell-safe)
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

function Log($m,$c="White"){ Write-Host $m -ForegroundColor $c }
function Timestamp { (Get-Date).ToString("yyyyMMdd_HHmmss") }

function Backup {
    param($path)
    if (Test-Path $path) {
        $bak = "$path.bak.$(Timestamp)"
        Copy-Item $path $bak -Force
        Log "backup: $bak" DarkCyan
    }
}

# --------------------------------------------------------
# 1. Игровые страницы → вставка BackButton
# --------------------------------------------------------
$gamePages = @(
    "pages/play.tsx",
    "pages/editor.tsx",
    "pages/gallery.tsx"
)

foreach ($rel in $gamePages) {
    $p = Join-Path $root $rel
    if (-not (Test-Path $p)) { continue }

    $c = Get-Content $p -Raw

    if ($c -notmatch "BackButton") {
        Backup $p

        $import = @"
import BackButton from "../components/BackButton";
"@

        # prepend import
        $c = $import + "`r`n" + $c

        # insert component after return(
        $c = $c -replace 'return\s*\(', "return(`r`n    <BackButton />`r`n"

        Set-Content $p $c -Encoding UTF8
        Log "BackButton вставлен → $rel" Green
    }
}

# --------------------------------------------------------
# 2. _app.tsx → вставка ConsentBanner
# --------------------------------------------------------
$p = Join-Path $root "pages/_app.tsx"

if (Test-Path $p) {
    $c = Get-Content $p -Raw
    if ($c -notmatch "ConsentBanner") {
        Backup $p

        $import = @"
import ConsentBanner from "../components/ConsentBanner";
"@

        $c = $import + "`r`n" + $c

        # вставка после </Component ... />
        $c = $c -replace '(<Component[\s\S]*?\/>)', "`$1`r`n      <ConsentBanner />"

        Set-Content $p $c -Encoding UTF8
        Log "ConsentBanner вставлен → _app.tsx" Green
    }
}

# --------------------------------------------------------
# 3. Полная перестройка terms.tsx
# --------------------------------------------------------
$p = Join-Path $root "pages/terms.tsx"

if (Test-Path $p) {
    Backup $p

$fixed = @"
"use client";
import { useLang } from "../lib/i18n";
import LegalNoticeRU from "../components/LegalNoticeRU";
import BackButton from "../components/BackButton";

export default function TermsPage() {
  const { lang } = useLang();
  return (
    <>
      <BackButton />
      <main style={{ padding: "32px", maxWidth: "640px", margin: "0 auto" }}>
        {lang === "ru" ? (
          <>
            <h1>Условия использования</h1>
            <p>Никакого незаконного контента, спама или вреда. Мы можем удалить всё, что нарушает правила.</p>
          </>
        ) : (
          <>
            <h1>Terms of Service</h1>
            <p>No illegal content, no spam, no harm. We can delete anything that violates this.</p>
          </>
        )}
        <LegalNoticeRU />
      </main>
    </>
  );
}
"@

    Set-Content $p $fixed -Encoding UTF8
    Log "terms.tsx обновлён" Magenta
}

# --------------------------------------------------------
# 3b. about.tsx / privacy.tsx → вставка LegalNoticeRU
# --------------------------------------------------------
$infoPages = @("pages/privacy.tsx", "pages/about.tsx")

foreach ($rel in $infoPages) {
    $p = Join-Path $root $rel
    if (-not (Test-Path $p)) { continue }

    $c = Get-Content $p -Raw

    if ($c -notmatch "LegalNoticeRU") {
        Backup $p

        $import = @"
import LegalNoticeRU from "../components/LegalNoticeRU";
"@

        $c = $import + "`r`n" + $c

        if ($c -match "</main>") {
            $c = $c -replace "</main>", "  <LegalNoticeRU />`r`n</main>"
        }
        elseif ($c -match "</div>\s*$") {
            $c = $c -replace "(</div>\s*$)", "  <LegalNoticeRU />`r`n`$1"
        }
        else {
            $c += "`r`n<LegalNoticeRU />"
        }

        Set-Content $p $c -Encoding UTF8
        Log "LegalNoticeRU вставлен → $rel" Magenta
    }
}

# --------------------------------------------------------
# 4. play.tsx → fix dynamic()
# --------------------------------------------------------
$p = Join-Path $root "pages/play.tsx"

if (Test-Path $p) {
    $c = Get-Content $p -Raw

    if ($c -match "require\.e") {
        Backup $p

        $fixed = 'dynamic(() => import("../lib/phaser/GameEditor"), { ssr: false })'
        $c = $c -replace "require\.e[\s\S]*?\}", $fixed

        Set-Content $p $c -Encoding UTF8
        Log "dynamic import исправлен → play.tsx" Green
    }
}

# --------------------------------------------------------
# 5. Prettier
# --------------------------------------------------------
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Log "Запуск Prettier…" Cyan
    npx prettier --write "$root/pages/**/*.tsx" --log-level warn
}

Log "`nГОТОВО: все фиксы применены" Cyan
