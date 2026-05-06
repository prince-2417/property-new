@echo off
setlocal
echo ==========================================
echo    LUXE ESTATE - AUTO SETUP & START
echo ==========================================
echo.

:: Check for Node.js
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed! 
    echo Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/2] Installing Next.js and other dependencies...
echo (This will fix the 'next is not recognized' error)
echo.
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Installation failed. Check your internet.
    pause
    exit /b 1
)

echo.
echo [2/2] Starting the website...
echo Once it starts, open http://localhost:3000 in your browser.
echo.
call npm run dev

pause
