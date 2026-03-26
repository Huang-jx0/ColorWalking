param(
  [string]$Message = "chore: sync update"
)

$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$safeRepo = $repoRoot -replace "\\", "/"

Set-Location $repoRoot

$dirty = git -c "safe.directory=$safeRepo" status --porcelain
if (-not $dirty) {
  Write-Host "No local changes to commit."
  exit 0
}

git -c "safe.directory=$safeRepo" add -A
git -c "safe.directory=$safeRepo" commit -m $Message
git -c "safe.directory=$safeRepo" push origin main

$head = git -c "safe.directory=$safeRepo" rev-parse --short HEAD
Write-Host "Committed and pushed: $head"
