$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$safeRepo = $repoRoot -replace "\\", "/"

Set-Location $repoRoot

$dirty = git -c "safe.directory=$safeRepo" status --porcelain
if ($dirty) {
  Write-Host "Working tree is dirty. Commit or stash changes before sync-pull."
  exit 1
}

git -c "safe.directory=$safeRepo" fetch origin main
git -c "safe.directory=$safeRepo" checkout main
git -c "safe.directory=$safeRepo" pull --rebase origin main

$head = git -c "safe.directory=$safeRepo" rev-parse --short HEAD
Write-Host "Synced to latest main: $head"
