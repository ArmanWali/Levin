@echo off
title Learning Agent Server
color 0A
echo ===============================================
echo     🤖 Learning Agent Server
echo ===============================================
echo.
echo Checking setup...

if not exist .env (
    echo ❌ .env file not found!
    echo.
    echo 📝 Please follow these steps:
    echo    1. Copy .env.example to .env
    echo    2. Edit .env and add your Gemini API key
    echo    3. Get your API key from: https://ai.google.dev
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo ✅ Environment file: Found
echo ✅ Dependencies: Installed
echo.
echo Starting server on: http://localhost:3000
echo Frontend available at: http://localhost:3000/index.html
echo.
echo ⚠️  IMPORTANT: Keep this window open while using the app
echo ⚠️  Press Ctrl+C to stop the server
echo.
echo ===============================================
echo.

node server.js

echo.
echo ===============================================
echo Server has stopped. Press any key to exit.
pause
