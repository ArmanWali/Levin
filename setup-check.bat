@echo off
title Learning Agent - Setup Verification
color 0B
echo ===============================================
echo   🔍 Learning Agent - Setup Verification
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 📥 Please install Node.js from: https://nodejs.org
    echo.
    goto :error
) else (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js: %%i
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available
    goto :error
) else (
    for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm: %%i
)

REM Check if dependencies are installed
if not exist node_modules (
    echo ❌ Dependencies not installed
    echo 📦 Run: npm install
    goto :error
) else (
    echo ✅ Dependencies: Installed
)

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found
    echo 📝 Please copy .env.example to .env and add your API key
    goto :error
) else (
    echo ✅ Environment file: Found
)

REM Check if .gitignore exists
if not exist .gitignore (
    echo ⚠️  .gitignore file not found
    echo 🔐 Your API key might be exposed if you push to GitHub
) else (
    echo ✅ Git ignore: Configured
)

echo.
echo ===============================================
echo   🎉 Setup verification complete!
echo ===============================================
echo.
echo 🚀 You can now start the server with:
echo    • Double-click start-server.bat
echo    • Or run: node server.js
echo.
echo 🌐 Then open: http://localhost:3000/index.html
echo.
goto :end

:error
echo.
echo ===============================================
echo   ❌ Setup issues found
echo ===============================================
echo.
echo Please fix the issues above and run this script again.
echo.

:end
echo Press any key to exit...
pause >nul
