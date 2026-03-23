$ErrorActionPreference = 'Stop'
$root = 'd:\English'
$outLog = Join-Path $root 'site-dev.out.log'
$errLog = Join-Path $root 'site-dev.err.log'
$pidFile = Join-Path $root 'site-dev.pid'

if (Test-Path $pidFile) {
  $oldPid = Get-Content $pidFile -ErrorAction SilentlyContinue
  if ($oldPid) {
    try { Stop-Process -Id ([int]$oldPid) -Force -ErrorAction SilentlyContinue } catch {}
  }
  Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
}

$port = 5173
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  try { Stop-Process -Id $listener[0].OwningProcess -Force -ErrorAction Stop } catch {}
}

$cmd = "`$env:Path='d:\English\tools\node-v20.19.0-win-x64;'+`$env:Path; `$env:COREPACK_HOME='d:\English\.corepack'; `$env:TEMP='d:\English\.tmp'; `$env:TMP='d:\English\.tmp'; `$env:HOME='d:\English'; Set-Location 'd:\English'; corepack pnpm --filter @colorwalking/site run dev --host 0.0.0.0 --port 5173 --strictPort"
$p = Start-Process -FilePath powershell -ArgumentList @('-NoProfile','-Command',$cmd) -RedirectStandardOutput $outLog -RedirectStandardError $errLog -WindowStyle Hidden -PassThru
$p.Id | Set-Content -Encoding ASCII $pidFile

Start-Sleep -Seconds 2
Write-Host "Site started in background."
Write-Host "Local:   http://127.0.0.1:5173"
Write-Host "Network: http://192.168.149.196:5173"
Write-Host "Logs:    $outLog"
