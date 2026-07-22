# Cyber Securivox - PowerShell Server Launcher
# Run this file directly in VS Code to start the cybersecurity platform.

param(
    [int]$Port = 8000,
    [string]$Host = "localhost"
)

$URL = "http://$Host`:$Port"

function Show-Banner {
    Write-Host "=" * 50 -ForegroundColor Cyan
    Write-Host "🛡️  CYBER SECURIVOX - CYBERSECURITY PLATFORM" -ForegroundColor Yellow
    Write-Host "=" * 50 -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 Starting Python HTTP server on $Host`:$Port" -ForegroundColor Green
    Write-Host "📂 Serving files from: $(Get-Location)" -ForegroundColor Gray
    Write-Host "🌐 Access the platform at: $URL" -ForegroundColor Blue
    Write-Host ""
    Write-Host "📋 Available Pages:" -ForegroundColor White
    Write-Host "   • Home Page: /" -ForegroundColor Gray
    Write-Host "   • Habit Tracker: /tracker.html" -ForegroundColor Gray
    Write-Host "   • Link Checker: /link-checker.html" -ForegroundColor Gray
    Write-Host "   • Password Tester: /password-tester.html" -ForegroundColor Gray
    Write-Host "   • CyberCoach Chatbot: /chatbot.html" -ForegroundColor Gray
    Write-Host "   • Learning Center: /learn.html" -ForegroundColor Gray
    Write-Host "   • Security Scanner: /security-scanner.html" -ForegroundColor Gray
    Write-Host ""
    Write-Host "⚠️  To stop the server: Press Ctrl+C" -ForegroundColor Red
    Write-Host "=" * 50 -ForegroundColor Cyan
    Write-Host ""
}

function Open-Browser {
    param([string]$Url)
    
    Write-Host "🌐 Opening browser to: $Url" -ForegroundColor Green
    
    try {
        Start-Process $Url
    }
    catch {
        Write-Host "💡 Please manually open your browser to: $Url" -ForegroundColor Yellow
    }
}

function Test-PythonInstalled {
    try {
        $pythonVersion = python --version 2>&1
        if ($pythonVersion -match "Python") {
            Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "❌ Python not found!" -ForegroundColor Red
        Write-Host "💡 Please install Python from https://python.org" -ForegroundColor Yellow
        return $false
    }
    return $false
}

function Start-CyberSecurivoxServer {
    # Change to script directory
    Set-Location $PSScriptRoot
    
    Show-Banner
    
    # Check if Python is installed
    if (-not (Test-PythonInstalled)) {
        Write-Host "❌ Cannot start server without Python" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        return
    }
    
    # Open browser after 3 seconds
    Start-Job -ScriptBlock {
        param($url)
        Start-Sleep 3
        Start-Process $url
    } -ArgumentList $URL | Out-Null
    
    try {
        Write-Host "✅ Server starting..." -ForegroundColor Green
        Write-Host "🔗 Click here: $URL" -ForegroundColor Blue
        Write-Host ""
        
        # Start Python HTTP server
        python -m http.server $Port
    }
    catch {
        Write-Host "❌ Error starting server: $($_.Exception.Message)" -ForegroundColor Red
    }
    finally {
        Write-Host ""
        Write-Host "🛑 Server stopped" -ForegroundColor Yellow
        Write-Host "👋 Thank you for using Cyber Securivox!" -ForegroundColor Green
        Write-Host "🔒 Server shutdown complete." -ForegroundColor Gray
        Read-Host "Press Enter to exit"
    }
}

# Main execution
try {
    Start-CyberSecurivoxServer
}
catch {
    Write-Host "❌ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
