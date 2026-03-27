$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')
$mobileDir = Join-Path $root 'apps\mobile'
$nodeModulesExpo = Join-Path $mobileDir 'node_modules\.bin\expo.cmd'

if (-not (Test-Path $mobileDir)) {
  throw "Mobile app directory not found: $mobileDir"
}

if (-not (Test-Path $nodeModulesExpo)) {
  throw "Expo CLI not found: $nodeModulesExpo. Please run 'pnpm install' first."
}

$tmpDir = Join-Path $root '.tmp'
$env:TEMP = $tmpDir
$env:TMP = $tmpDir
$env:HOME = $root
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

Set-Location $mobileDir
& $nodeModulesExpo start --offline
