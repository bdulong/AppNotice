@echo off
cd /d %~dp0

call npm run gene
if %errorlevel% neq 0 goto :error

call npm run clients
if %errorlevel% neq 0 goto :error

call npm run links
if %errorlevel% neq 0 goto :error

call npm run qr
if %errorlevel% neq 0 goto :error

call npm run build
if %errorlevel% neq 0 goto :error

echo Toutes les commandes ont été exécutées avec succès.
exit /b 0

:error
echo Une erreur s'est produite lors de l'exécution des commandes.
exit /b 1