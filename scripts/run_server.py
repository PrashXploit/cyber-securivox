#!/usr/bin/env python3
"""
Cyber Securivox - Simple Server Launcher
Run this file directly in VS Code to start the cybersecurity platform.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import time
from threading import Timer

# Configuration
PORT = 8000
HOST = "localhost"
URL = f"http://{HOST}:{PORT}"

def open_browser():
    """Open the default browser after a short delay"""
    print(f"🌐 Opening browser to: {URL}")
    webbrowser.open(URL)

def start_server():
    """Start the HTTP server"""
    try:
        # Change to the directory containing this script
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        print("=" * 50)
        print("🛡️  CYBER SECURIVOX - CYBERSECURITY PLATFORM")
        print("=" * 50)
        print()
        print(f"🚀 Starting server on {HOST}:{PORT}")
        print(f"📂 Serving files from: {os.getcwd()}")
        print(f"🌐 Access the platform at: {URL}")
        print()
        print("📋 Available Pages:")
        print("   • Home Page: /")
        print("   • Habit Tracker: /tracker.html")
        print("   • Link Checker: /link-checker.html")
        print("   • Password Tester: /password-tester.html")
        print("   • CyberCoach Chatbot: /chatbot.html")
        print("   • Learning Center: /learn.html")
        print("   • Security Scanner: /security-scanner.html")
        print()
        print("⚠️  To stop the server: Press Ctrl+C")
        print("=" * 50)
        print()
        
        # Open browser after 2 seconds
        Timer(2.0, open_browser).start()
        
        # Create and start the server
        with socketserver.TCPServer((HOST, PORT), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully!")
            print(f"🔗 Click here: {URL}")
            print()
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n")
        print("🛑 Server stopped by user")
        print("👋 Thank you for using Cyber Securivox!")
        
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Error: Port {PORT} is already in use!")
            print("💡 Try closing other applications or use a different port")
        else:
            print(f"❌ Error starting server: {e}")
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        
    finally:
        print("\n🔒 Server shutdown complete.")
        input("Press Enter to exit...")

if __name__ == "__main__":
    start_server()
