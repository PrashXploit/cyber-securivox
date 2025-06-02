#!/usr/bin/env node
/**
 * Cyber Securivox - Simple Node.js Server Launcher
 * Run this file directly in VS Code to start the cybersecurity platform.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const URL = `http://${HOST}:${PORT}`;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

function openBrowser() {
    console.log(`🌐 Opening browser to: ${URL}`);
    
    // Cross-platform browser opening
    const command = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';
    
    exec(`${command} ${URL}`, (error) => {
        if (error) {
            console.log('💡 Please manually open your browser to:', URL);
        }
    });
}

function serveFile(req, res) {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

function startServer() {
    console.log('='.repeat(50));
    console.log('🛡️  CYBER SECURIVOX - CYBERSECURITY PLATFORM');
    console.log('='.repeat(50));
    console.log();
    console.log(`🚀 Starting Node.js server on ${HOST}:${PORT}`);
    console.log(`📂 Serving files from: ${__dirname}`);
    console.log(`🌐 Access the platform at: ${URL}`);
    console.log();
    console.log('📋 Available Pages:');
    console.log('   • Home Page: /');
    console.log('   • Habit Tracker: /tracker.html');
    console.log('   • Link Checker: /link-checker.html');
    console.log('   • Password Tester: /password-tester.html');
    console.log('   • CyberCoach Chatbot: /chatbot.html');
    console.log('   • Learning Center: /learn.html');
    console.log('   • Security Scanner: /security-scanner.html');
    console.log();
    console.log('⚠️  To stop the server: Press Ctrl+C');
    console.log('='.repeat(50));
    console.log();
    
    const server = http.createServer(serveFile);
    
    server.listen(PORT, HOST, () => {
        console.log('✅ Server started successfully!');
        console.log(`🔗 Click here: ${URL}`);
        console.log();
        
        // Open browser after 2 seconds
        setTimeout(openBrowser, 2000);
    });
    
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`❌ Error: Port ${PORT} is already in use!`);
            console.log('💡 Try closing other applications or change the PORT variable');
        } else {
            console.log(`❌ Server error: ${error.message}`);
        }
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Server stopped by user');
        console.log('👋 Thank you for using Cyber Securivox!');
        server.close(() => {
            console.log('🔒 Server shutdown complete.');
            process.exit(0);
        });
    });
}

// Start the server
startServer();
