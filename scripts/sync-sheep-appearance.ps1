param(
  [string]$BrandSource = "apps/site/public/brand-logo.svg",
  [string]$BrandTarget = "assets/brand-logo.svg"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $BrandSource)) {
  throw "Brand logo source not found: $BrandSource"
}

$targetDir = Split-Path -Parent $BrandTarget
if (-not (Test-Path $targetDir)) {
  New-Item -ItemType Directory -Path $targetDir | Out-Null
}

Copy-Item $BrandSource $BrandTarget -Force

Write-Host "[sync] done"
Write-Host "1) Desktop pet + garden pet: apps/site/src/PixelSheepSprite.tsx (shared source)"
Write-Host "2) Site brand logo: $BrandSource"
Write-Host "3) Design asset logo: $BrandTarget"
