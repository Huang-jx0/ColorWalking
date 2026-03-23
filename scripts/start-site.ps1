$ErrorActionPreference = 'Stop'
$root = 'd:\English'
$node = Join-Path $root 'tools\node-v20.19.0-win-x64'
$env:Path = "$node;" + $env:Path
$env:COREPACK_HOME = Join-Path $root '.corepack'
$env:TEMP = Join-Path $root '.tmp'
$env:TMP = Join-Path $root '.tmp'
$env:HOME = $root
New-Item -ItemType Directory -Force -Path $env:TEMP | Out-Null

$port = 5173
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  $ownerPid = $listener[0].OwningProcess
  try {
    Stop-Process -Id $ownerPid -Force -ErrorAction Stop
    Start-Sleep -Milliseconds 400
  } catch {
    Write-Host "Port $port is occupied by PID $ownerPid and could not be stopped."
    Write-Host "Please close that process manually, then rerun this script."
    exit 1
  }
}

Set-Location $root
corepack pnpm --filter @colorwalking/site run dev --host 0.0.0.0 --port 5173 --strictPort

