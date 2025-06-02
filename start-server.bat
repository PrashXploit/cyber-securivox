@echo off
echo ========================================
echo    CYBER SECURIVOX - Quick Launcher
echo ========================================
echo.
echo Starting Python HTTP Server on port 8000...
echo.
echo The server will start automatically.
echo Your browser will open to: http://localhost:8000
echo.
echo To stop the server: Press Ctrl+C
echo.

REM Start Python HTTP server
echo [INFO] Starting server...
python -m http.server 8000

echo.
echo [INFO] Server stopped.
pause
