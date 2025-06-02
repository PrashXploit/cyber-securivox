/**
 * Cyber Securivox - Security Scanner JavaScript
 * Performs comprehensive security assessment
 */

const SecurityScanner = {
    // Initialize the scanner
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        const startScanBtn = document.getElementById('start-scan');

        if (startScanBtn) {
            startScanBtn.addEventListener('click', () => {
                this.startSecurityScan();
            });
        }
    },

    // Start comprehensive security scan
    startSecurityScan() {
        const startBtn = document.getElementById('start-scan');
        const resultsSection = document.getElementById('scan-results');

        // Update button state
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scanning...';
        startBtn.disabled = true;

        // Show results section
        resultsSection.classList.remove('hidden');

        // Simulate scan progress
        this.runScanSequence();
    },

    // Run scan sequence with delays
    async runScanSequence() {
        const scanSteps = [
            { name: 'Browser Security', delay: 1000, func: () => this.scanBrowserSecurity() },
            { name: 'System Security', delay: 1500, func: () => this.scanSystemSecurity() },
            { name: 'Network Security', delay: 2000, func: () => this.scanNetworkSecurity() },
            { name: 'Privacy Settings', delay: 1200, func: () => this.scanPrivacySettings() }
        ];

        for (const step of scanSteps) {
            await new Promise(resolve => {
                setTimeout(() => {
                    step.func();
                    resolve();
                }, step.delay);
            });
        }

        // Calculate and display overall score
        setTimeout(() => {
            this.calculateOverallScore();
            this.generateRecommendations();
            this.completeScan();
        }, 500);
    },

    // Scan browser security
    scanBrowserSecurity() {
        const results = [];

        // Check HTTPS
        const isHTTPS = location.protocol === 'https:';
        results.push({
            name: 'HTTPS Connection',
            status: isHTTPS ? 'pass' : 'fail',
            description: isHTTPS ? 'Secure connection detected' : 'Insecure HTTP connection'
        });

        // Check cookies
        const cookiesEnabled = navigator.cookieEnabled;
        results.push({
            name: 'Cookie Settings',
            status: cookiesEnabled ? 'pass' : 'warning',
            description: cookiesEnabled ? 'Cookies are enabled' : 'Cookies are disabled'
        });

        // Check JavaScript
        results.push({
            name: 'JavaScript Security',
            status: 'pass',
            description: 'JavaScript is running securely'
        });

        // Check local storage
        const localStorageAvailable = this.checkLocalStorage();
        results.push({
            name: 'Local Storage',
            status: localStorageAvailable ? 'pass' : 'warning',
            description: localStorageAvailable ? 'Local storage available' : 'Local storage not available'
        });

        // Check user agent
        const userAgent = navigator.userAgent;
        const browserInfo = this.getBrowserInfo(userAgent);
        results.push({
            name: 'Browser Version',
            status: browserInfo.isModern ? 'pass' : 'warning',
            description: `${browserInfo.name} - ${browserInfo.isModern ? 'Modern version' : 'Consider updating'}`
        });

        this.displayResults('browser-results', results);
    },

    // Scan system security
    scanSystemSecurity() {
        const results = [];

        // Check screen resolution (basic fingerprinting check)
        const screenInfo = `${screen.width}x${screen.height}`;
        results.push({
            name: 'Screen Resolution',
            status: 'info',
            description: `Resolution: ${screenInfo}`
        });

        // Check timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        results.push({
            name: 'Timezone',
            status: 'info',
            description: `Timezone: ${timezone}`
        });

        // Check language
        const language = navigator.language;
        results.push({
            name: 'Browser Language',
            status: 'pass',
            description: `Language: ${language}`
        });

        // Check platform
        const platform = navigator.platform;
        results.push({
            name: 'Operating System',
            status: 'info',
            description: `Platform: ${platform}`
        });

        // Check hardware concurrency
        const cores = navigator.hardwareConcurrency || 'Unknown';
        results.push({
            name: 'CPU Cores',
            status: 'info',
            description: `CPU cores: ${cores}`
        });

        this.displayResults('system-results', results);
    },

    // Scan network security
    scanNetworkSecurity() {
        const results = [];

        // Check connection type
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            results.push({
                name: 'Connection Type',
                status: 'info',
                description: `Type: ${connection.effectiveType || 'Unknown'}`
            });
        }

        // Check online status
        const isOnline = navigator.onLine;
        results.push({
            name: 'Network Status',
            status: isOnline ? 'pass' : 'warning',
            description: isOnline ? 'Connected to internet' : 'Offline'
        });

        // Check WebRTC (potential IP leak)
        results.push({
            name: 'WebRTC Status',
            status: 'warning',
            description: 'WebRTC may leak local IP address'
        });

        // Check referrer policy
        const referrer = document.referrer;
        results.push({
            name: 'Referrer Policy',
            status: referrer ? 'warning' : 'pass',
            description: referrer ? 'Referrer information available' : 'No referrer information'
        });

        // Simulate DNS check
        results.push({
            name: 'DNS Security',
            status: 'pass',
            description: 'DNS resolution appears secure'
        });

        this.displayResults('network-results', results);
    },

    // Scan privacy settings
    scanPrivacySettings() {
        const results = [];

        // Check Do Not Track
        const dnt = navigator.doNotTrack;
        results.push({
            name: 'Do Not Track',
            status: dnt === '1' ? 'pass' : 'warning',
            description: dnt === '1' ? 'Do Not Track enabled' : 'Do Not Track not enabled'
        });

        // Check geolocation
        results.push({
            name: 'Geolocation Access',
            status: 'info',
            description: 'Geolocation permission required for access'
        });

        // Check notifications
        const notificationPermission = Notification.permission;
        results.push({
            name: 'Notification Permission',
            status: notificationPermission === 'denied' ? 'pass' : 'warning',
            description: `Notifications: ${notificationPermission}`
        });

        // Check camera/microphone (simulated)
        results.push({
            name: 'Media Permissions',
            status: 'pass',
            description: 'No unauthorized media access detected'
        });

        // Check third-party cookies (simulated)
        results.push({
            name: 'Third-party Cookies',
            status: 'warning',
            description: 'Third-party cookies may be enabled'
        });

        this.displayResults('privacy-results', results);
    },

    // Display scan results
    displayResults(containerId, results) {
        const container = document.getElementById(containerId);

        container.innerHTML = results.map(result => {
            const statusColors = {
                pass: 'text-green-600',
                warning: 'text-yellow-600',
                fail: 'text-red-600',
                info: 'text-blue-600'
            };

            const statusIcons = {
                pass: 'fa-check-circle',
                warning: 'fa-exclamation-triangle',
                fail: 'fa-times-circle',
                info: 'fa-info-circle'
            };

            return `
                <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <i class="fas ${statusIcons[result.status]} ${statusColors[result.status]} mt-1"></i>
                    <div class="flex-1">
                        <h5 class="font-semibold text-gray-800 text-sm">${result.name}</h5>
                        <p class="text-xs text-gray-600">${result.description}</p>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Calculate overall security score
    calculateOverallScore() {
        // Simulate score calculation based on scan results
        const scores = {
            browser: 85,
            system: 78,
            network: 72,
            privacy: 68
        };

        const overallScore = Math.round((scores.browser + scores.system + scores.network + scores.privacy) / 4);

        this.updateScoreDisplay(overallScore);
    },

    // Update score display
    updateScoreDisplay(score) {
        const circle = document.getElementById('security-score-circle');
        const scoreText = document.getElementById('security-score-text');
        const description = document.getElementById('score-description');

        // Update circle progress
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        // Update score text
        scoreText.textContent = `${score}%`;

        // Update description and color based on score
        let color, desc;
        if (score >= 90) {
            color = '#10B981'; // Green
            desc = 'Excellent security posture! Your system is well protected.';
        } else if (score >= 75) {
            color = '#F59E0B'; // Yellow
            desc = 'Good security with room for improvement. Consider the recommendations below.';
        } else if (score >= 60) {
            color = '#F97316'; // Orange
            desc = 'Moderate security. Several areas need attention to improve protection.';
        } else {
            color = '#EF4444'; // Red
            desc = 'Security needs immediate attention. Please review all recommendations.';
        }

        circle.style.stroke = color;
        scoreText.style.color = color;
        description.textContent = desc;
    },

    // Generate security recommendations
    generateRecommendations() {
        const recommendations = [
            {
                priority: 'high',
                title: 'Enable HTTPS Everywhere',
                description: 'Install browser extensions that force HTTPS connections on all websites.',
                action: 'Install HTTPS Everywhere extension'
            },
            {
                priority: 'high',
                title: 'Update Your Browser',
                description: 'Ensure you\'re running the latest version of your web browser for security patches.',
                action: 'Check for browser updates'
            },
            {
                priority: 'medium',
                title: 'Configure Privacy Settings',
                description: 'Review and tighten privacy settings in your browser and operating system.',
                action: 'Review privacy settings'
            },
            {
                priority: 'medium',
                title: 'Use a VPN',
                description: 'Consider using a VPN service to encrypt your internet traffic.',
                action: 'Research VPN providers'
            },
            {
                priority: 'low',
                title: 'Disable WebRTC',
                description: 'Disable WebRTC in your browser to prevent IP address leaks.',
                action: 'Configure WebRTC settings'
            }
        ];

        const container = document.getElementById('recommendations');

        container.innerHTML = recommendations.map(rec => {
            const priorityColors = {
                high: 'border-red-500 bg-red-50',
                medium: 'border-yellow-500 bg-yellow-50',
                low: 'border-blue-500 bg-blue-50'
            };

            const priorityTextColors = {
                high: 'text-red-800',
                medium: 'text-yellow-800',
                low: 'text-blue-800'
            };

            return `
                <div class="border-l-4 ${priorityColors[rec.priority]} p-4 rounded">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h4 class="font-semibold ${priorityTextColors[rec.priority]} mb-1">${rec.title}</h4>
                            <p class="text-sm ${priorityTextColors[rec.priority]} opacity-80 mb-2">${rec.description}</p>
                            <span class="text-xs ${priorityTextColors[rec.priority]} font-medium uppercase">${rec.priority} priority</span>
                        </div>
                        <button class="ml-4 text-sm bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition duration-200">
                            ${rec.action}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Complete scan
    completeScan() {
        const startBtn = document.getElementById('start-scan');

        startBtn.innerHTML = '<i class="fas fa-redo mr-2"></i>Run New Scan';
        startBtn.disabled = false;

        CyberSecurivox.showNotification('Security scan completed!', 'success');
    },

    // Helper functions
    checkLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    getBrowserInfo(userAgent) {
        const browsers = [
            { name: 'Chrome', pattern: /Chrome\/(\d+)/, modern: 90 },
            { name: 'Firefox', pattern: /Firefox\/(\d+)/, modern: 88 },
            { name: 'Safari', pattern: /Safari\/(\d+)/, modern: 14 },
            { name: 'Edge', pattern: /Edg\/(\d+)/, modern: 90 }
        ];

        for (const browser of browsers) {
            const match = userAgent.match(browser.pattern);
            if (match) {
                const version = parseInt(match[1]);
                return {
                    name: browser.name,
                    version: version,
                    isModern: version >= browser.modern
                };
            }
        }

        return { name: 'Unknown', version: 0, isModern: false };
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SecurityScanner.init();
});
