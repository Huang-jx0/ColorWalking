$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$safeRepo = $repoRoot -replace "\\", "/"

Set-Location $repoRoot

function Invoke-Git {
  param([Parameter(Mandatory = $true)][string[]]$Args)
  & git @Args
  if ($LASTEXITCODE -ne 0) {
    throw "git command failed: git $($Args -join ' ')"
  }
}

$dirty = & git -c "safe.directory=$safeRepo" status --porcelain
if ($dirty) {
  Write-Host "Working tree is dirty. Commit or stash changes before sync-pull."
  exit 1
}

Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "fetch", "origin", "main")
Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "checkout", "main")
Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "pull", "--rebase", "origin", "main")

$head = & git -c "safe.directory=$safeRepo" rev-parse --short HEAD
Write-Host "Synced to latest main: $head"
