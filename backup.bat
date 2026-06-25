@echo off
REM Script de Backup para MongoDB Atlas en Windows

REM Variables
set BACKUP_DIR=resguardos_tpi
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (set DATE=%%d-%%b-%%a)
set BACKUP_PATH=%BACKUP_DIR%\%DATE%

REM MongoDB Atlas Connection String
set MONGODB_URI=mongodb+srv://agusfrancodb_user:OqLfxBG3MFQhws1P@cluster0.z3fqqmq.mongodb.net/techstore?retryWrites=true&w=majority
REM Crear directorios
if not exist "%BACKUP_PATH%" mkdir "%BACKUP_PATH%"

echo.
echo ============================================
echo Iniciando backup en: %BACKUP_PATH%
echo ============================================
echo.

REM Ejecutar mongodump
mongodump --uri "%MONGODB_URI%" --out "%BACKUP_PATH%"

REM Verificar si se complet?
if %ERRORLEVEL% equ 0 (
    echo.
    echo ============================================
    echo [OK] Backup completado exitosamente
    echo Ruta: %BACKUP_PATH%
    echo ============================================
    echo.
    dir /s "%BACKUP_PATH%"
) else (
    echo.
    echo ============================================
    echo [ERROR] Fallo durante el backup
    echo ============================================
    echo.
    pause
    exit /b 1
)

pause
