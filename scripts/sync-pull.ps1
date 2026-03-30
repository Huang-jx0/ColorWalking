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

function Invoke-GitWithRetry {
  param(
    [Parameter(Mandatory = $true)][string[]]$Args,
    [int]$MaxAttempts = 3,
    [int]$DelaySeconds = 2
  )

  $attempt = 1
  while ($attempt -le $MaxAttempts) {
    try {
      Invoke-Git -Args $Args
      return
    } catch {
      if ($attempt -ge $MaxAttempts) {
        throw
      }
      Write-Host "Git command failed (attempt $attempt/$MaxAttempts). Retrying in $DelaySeconds seconds..."
      Start-Sleep -Seconds $DelaySeconds
      $attempt++
    }
  }
}

function Get-DirtyStatus {
  $status = & git -c "safe.directory=$safeRepo" status --porcelain
  return @($status | Where-Object { $_ -and $_.Trim() -ne "" })
}

$stashed = $false
$stashMessage = "sync-pull:auto-stash:$(Get-Date -Format 'yyyy-MM-dd-HHmmss')"

try {
  $dirtyStatus = Get-DirtyStatus
  if ($dirtyStatus.Count -gt 0) {
    Write-Host "Working tree is dirty. Auto-stashing local changes before pull..."
    Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "stash", "push", "-u", "-m", $stashMessage)
    $stashed = $true
  }

  Invoke-GitWithRetry -Args @("-c", "safe.directory=$safeRepo", "fetch", "origin", "main")
  Invoke-Git -Args @("-c", "safe.directory=$safeRepo", "checkout", "main")
  Invoke-GitWithRetry -Args @("-c", "safe.directory=$safeRepo", "pull", "--rebase", "origin", "main")

  $head = & git -c "safe.directory=$safeRepo" rev-parse --short HEAD
  Write-Host "Synced to latest main: $head"
}
finally {
  if ($stashed) {
    Write-Host "Restoring stashed local changes..."
    & git -c "safe.directory=$safeRepo" stash pop
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Failed to auto-restore changes cleanly. Resolve conflicts manually and run: git stash list"
      exit 1
    }
  }
}
