# One-time setup for Windows (run setup.cmd, which calls this).
# Downloads Node 14.21.3 (the exam's Node) into runtime\node14, then installs the puppeteer runtime,
# the React runtime and the IDE with the exact versions in their package-lock.json files.
# Nothing is installed system-wide. Safe to run again.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'   # Invoke-WebRequest is very slow with the progress bar on
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Set-Location $PSScriptRoot

$NodeVersion = '14.21.3'
$Runtime = Join-Path $PSScriptRoot 'runtime'
$NodeDir = Join-Path $Runtime 'node14'

if (-not (Test-Path (Join-Path $NodeDir 'node.exe'))) {
  $name = "node-v$NodeVersion-win-x64"
  $zip = Join-Path $Runtime "$name.zip"
  Write-Host "==> Downloading $name"
  Invoke-WebRequest "https://nodejs.org/dist/v$NodeVersion/$name.zip" -OutFile $zip
  Write-Host "==> Unpacking"
  Expand-Archive $zip -DestinationPath $Runtime -Force
  if (Test-Path $NodeDir) { Remove-Item $NodeDir -Recurse -Force }
  Rename-Item (Join-Path $Runtime $name) 'node14'
  Remove-Item $zip
}
$env:PATH = "$NodeDir;$env:PATH"
Write-Host "==> Using node $(& node.exe -v), npm $(& npm.cmd -v)"

foreach ($dir in 'runtime\puppeteer', 'runtime\react', 'ide') {
  Write-Host "==> Installing $dir (this can take a few minutes)"
  Push-Location $dir
  & npm.cmd ci --no-audit --no-fund
  $code = $LASTEXITCODE
  Pop-Location
  if ($code -ne 0) { throw "npm ci failed in $dir (exit code $code)" }
}

Write-Host "==> Checking: one puppeteer task and one React task"
& node.exe runtime\run-test.js tests\w7-cy\solution --test tests\w7-cy\code\puppeteer\test.js | Select-Object -Last 1
& node.exe runtime\run-test.js tests\w10-cod1\solution --test tests\w10-cod1\code\react\tests\App.test.js | Select-Object -Last 1

Write-Host ''
Write-Host 'Setup done. Start the IDE by double-clicking ide.cmd, then open http://localhost:4000'
