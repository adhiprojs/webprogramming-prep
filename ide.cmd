@echo off
rem Starts the practice IDE on http://localhost:4000. Close this window to stop it.
cd /d "%~dp0"
if not exist runtime\node14\node.exe goto notsetup
if not exist ide\node_modules goto notsetup
runtime\node14\node.exe ide\server.js
pause
exit /b
:notsetup
echo Not set up yet. Double-click setup.cmd first.
pause
exit /b 1
