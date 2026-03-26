param(
  [string]$Message = "chore: sync update"
)

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
if (-not $dirty) {
  Write-Host "No local changes to commit."
  exit 0
}

Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "add", "-A")
Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "commit", "-m", $Message)
Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "push", "origin", "main")

$head = & git -c "safe.directory=$safeRepo" rev-parse --short HEAD
Write-Host "Committed and pushed: $head"
