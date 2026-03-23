$ErrorActionPreference = 'Stop'
$root = 'd:\English'
$pidFile = Join-Path $root 'site-dev.pid'
if (-not (Test-Path $pidFile)) {
  Write-Host 'No background site process found.'
  exit 0
}
$pid = Get-Content $pidFile
if ($pid) {
  try {
    Stop-Process -Id ([int]$pid) -Force -ErrorAction Stop
    Write-Host "Stopped site process: $pid"
  } catch {
    Write-Host "Process $pid is already stopped."
  }
}
Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
