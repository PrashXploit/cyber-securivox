/**
 * Cyber Securivox - Link Checker JavaScript
 * Analyzes URLs for potential security threats
 */

const LinkChecker = {
    // Suspicious patterns and domains
    suspiciousPatterns: {
        domains: [
            'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
            'phishing-example.com', 'malware-test.com', 'suspicious-site.net'
        ],
        keywords: [
            'urgent', 'verify', 'suspended', 'click-here', 'limited-time',
            'congratulations', 'winner', 'free-money', 'act-now', 'confirm-account'
        ],
        fileExtensions: [
            '.exe', '.scr', '.bat', '.com', '.pif', '.vbs', '.jar'
        ],
        ipAddresses: /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
    },

    // Initialize the link checker
    init() {
        this.setupEventListeners();
        this.loadRecentScans();
    },

    // Setup event listeners
    setupEventListeners() {
        const checkBtn = document.getElementById('check-link-btn');
        const linkInput = document.getElementById('link-input');
        const testLinks = document.querySelectorAll('.test-link');
        const clearHistoryBtn = document.getElementById('clear-history');

        // Check button click
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                const url = linkInput.value.trim();
                if (url) {
                    this.checkLink(url);
                } else {
                    CyberSecurivox.showNotification('Please enter a URL to check', 'warning');
                }
            });
        }

        // Enter key in input
        if (linkInput) {
            linkInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const url = linkInput.value.trim();
                    if (url) {
                        this.checkLink(url);
                    }
                }
            });

            // Real-time validation
            linkInput.addEventListener('input', () => {
                this.validateUrlFormat(linkInput.value);
            });
        }

        // Test link buttons
        testLinks.forEach(button => {
            button.addEventListener('click', () => {
                const testUrl = button.getAttribute('data-url');
                linkInput.value = testUrl;
                this.checkLink(testUrl);
            });
        });

        // Clear history button
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                this.clearScanHistory();
            });
        }
    },

    // Validate URL format
    validateUrlFormat(url) {
        const linkInput = document.getElementById('link-input');
        if (!url) return;

        try {
            new URL(url);
            linkInput.classList.remove('border-red-500');
            linkInput.classList.add('border-green-500');
        } catch {
            linkInput.classList.remove('border-green-500');
            linkInput.classList.add('border-red-500');
        }
    },

    // Main link checking function
    checkLink(url) {
        // Show loading state
        this.showLoadingState();

        // Simulate analysis delay
        setTimeout(() => {
            const analysis = this.analyzeUrl(url);
            this.displayResults(url, analysis);
            this.saveToHistory(url, analysis);
            this.loadRecentScans();
        }, 1500);
    },

    // Analyze URL for threats
    analyzeUrl(url) {
        const analysis = {
            url: url,
            timestamp: new Date().toISOString(),
            riskLevel: 'low',
            riskScore: 0,
            warnings: [],
            details: {}
        };

        try {
            const urlObj = new URL(url);

            // Check domain
            this.checkDomain(urlObj, analysis);

            // Check for suspicious patterns
            this.checkSuspiciousPatterns(url, analysis);

            // Check protocol
            this.checkProtocol(urlObj, analysis);

            // Check for IP addresses
            this.checkIpAddress(url, analysis);

            // Check file extensions
            this.checkFileExtension(urlObj, analysis);

            // Calculate final risk level
            this.calculateRiskLevel(analysis);

        } catch (error) {
            analysis.warnings.push('Invalid URL format');
            analysis.riskLevel = 'high';
            analysis.riskScore = 80;
        }

        return analysis;
    },

    // Check domain reputation
    checkDomain(urlObj, analysis) {
        const domain = urlObj.hostname.toLowerCase();
        analysis.details.domain = domain;

        // Check against suspicious domains
        if (this.suspiciousPatterns.domains.includes(domain)) {
            analysis.warnings.push('Domain is on suspicious list');
            analysis.riskScore += 40;
        }

        // Check for URL shorteners
        if (this.suspiciousPatterns.domains.some(d => domain.includes(d))) {
            analysis.warnings.push('URL shortener detected - destination unknown');
            analysis.riskScore += 25;
        }

        // Check for misspelled popular domains
        const popularDomains = ['google.com', 'facebook.com', 'amazon.com', 'microsoft.com'];
        popularDomains.forEach(popular => {
            if (this.isTyposquatting(domain, popular)) {
                analysis.warnings.push(`Possible typosquatting of ${popular}`);
                analysis.riskScore += 35;
            }
        });
    },

    // Check for suspicious patterns in URL
    checkSuspiciousPatterns(url, analysis) {
        const lowerUrl = url.toLowerCase();

        this.suspiciousPatterns.keywords.forEach(keyword => {
            if (lowerUrl.includes(keyword)) {
                analysis.warnings.push(`Contains suspicious keyword: "${keyword}"`);
                analysis.riskScore += 15;
            }
        });

        // Check for excessive subdomains
        const urlObj = new URL(url);
        const subdomains = urlObj.hostname.split('.');
        if (subdomains.length > 4) {
            analysis.warnings.push('Excessive subdomains detected');
            analysis.riskScore += 20;
        }
    },

    // Check protocol security
    checkProtocol(urlObj, analysis) {
        analysis.details.protocol = urlObj.protocol;

        if (urlObj.protocol === 'http:') {
            analysis.warnings.push('Insecure HTTP connection (not HTTPS)');
            analysis.riskScore += 15;
        }
    },

    // Check for IP address instead of domain
    checkIpAddress(url, analysis) {
        if (this.suspiciousPatterns.ipAddresses.test(url)) {
            analysis.warnings.push('Uses IP address instead of domain name');
            analysis.riskScore += 30;
        }
    },

    // Check file extension
    checkFileExtension(urlObj, analysis) {
        const path = urlObj.pathname.toLowerCase();

        this.suspiciousPatterns.fileExtensions.forEach(ext => {
            if (path.endsWith(ext)) {
                analysis.warnings.push(`Potentially dangerous file type: ${ext}`);
                analysis.riskScore += 35;
            }
        });
    },

    // Check for typosquatting
    isTyposquatting(domain, legitimate) {
        // Simple Levenshtein distance check
        const distance = this.levenshteinDistance(domain, legitimate);
        return distance > 0 && distance <= 2 && domain !== legitimate;
    },

    // Calculate Levenshtein distance
    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    },

    // Calculate final risk level
    calculateRiskLevel(analysis) {
        if (analysis.riskScore >= 60) {
            analysis.riskLevel = 'high';
        } else if (analysis.riskScore >= 30) {
            analysis.riskLevel = 'medium';
        } else {
            analysis.riskLevel = 'low';
        }
    },

    // Show loading state
    showLoadingState() {
        const resultsSection = document.getElementById('results-section');
        const scanResults = document.getElementById('scan-results');

        resultsSection.classList.remove('hidden');
        scanResults.innerHTML = `
            <div class="text-center py-8">
                <div class="loading-spinner mx-auto mb-4"></div>
                <p class="text-gray-600">Analyzing link security...</p>
            </div>
        `;
    },

    // Display analysis results
    displayResults(url, analysis) {
        const scanResults = document.getElementById('scan-results');

        const riskColors = {
            low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'fa-check-circle' },
            medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'fa-exclamation-triangle' },
            high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'fa-times-circle' }
        };

        const colors = riskColors[analysis.riskLevel];

        scanResults.innerHTML = `
            <div class="space-y-4">
                <!-- Risk Level -->
                <div class="${colors.bg} ${colors.border} border-l-4 p-4 rounded">
                    <div class="flex items-center">
                        <i class="fas ${colors.icon} ${colors.text} text-xl mr-3"></i>
                        <div>
                            <h4 class="${colors.text} font-semibold">
                                Risk Level: ${analysis.riskLevel.toUpperCase()}
                            </h4>
                            <p class="${colors.text} text-sm">
                                Security Score: ${analysis.riskScore}/100
                            </p>
                        </div>
                    </div>
                </div>

                <!-- URL Details -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">URL Analysis:</h5>
                    <div class="text-sm text-gray-600 space-y-1">
                        <p><strong>URL:</strong> <span class="break-all">${url}</span></p>
                        ${analysis.details.domain ? `<p><strong>Domain:</strong> ${analysis.details.domain}</p>` : ''}
                        ${analysis.details.protocol ? `<p><strong>Protocol:</strong> ${analysis.details.protocol}</p>` : ''}
                    </div>
                </div>

                <!-- Warnings -->
                ${analysis.warnings.length > 0 ? `
                    <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h5 class="font-semibold text-red-800 mb-2">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            Security Warnings:
                        </h5>
                        <ul class="text-sm text-red-700 space-y-1">
                            ${analysis.warnings.map(warning => `<li>• ${warning}</li>`).join('')}
                        </ul>
                    </div>
                ` : `
                    <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <p class="text-green-800">
                            <i class="fas fa-check mr-2"></i>
                            No obvious security threats detected.
                        </p>
                    </div>
                `}

                <!-- Recommendation -->
                <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800 mb-2">Recommendation:</h5>
                    <p class="text-blue-700 text-sm">
                        ${this.getRecommendation(analysis.riskLevel)}
                    </p>
                </div>
            </div>
        `;
    },

    // Get recommendation based on risk level
    getRecommendation(riskLevel) {
        switch (riskLevel) {
            case 'high':
                return 'DO NOT CLICK this link. It shows multiple red flags and could be dangerous. Report it if received via email.';
            case 'medium':
                return 'Exercise caution. Verify the sender and consider typing the URL manually instead of clicking.';
            case 'low':
                return 'This link appears relatively safe, but always stay vigilant when browsing online.';
            default:
                return 'Unable to determine safety. Proceed with extreme caution.';
        }
    },

    // Save scan to history
    saveToHistory(url, analysis) {
        const history = CyberSecurivox.getStoredData('linkScanHistory') || [];

        // Add new scan to beginning of array
        history.unshift({
            url: url,
            riskLevel: analysis.riskLevel,
            riskScore: analysis.riskScore,
            timestamp: analysis.timestamp,
            warningCount: analysis.warnings.length
        });

        // Keep only last 10 scans
        if (history.length > 10) {
            history.splice(10);
        }

        CyberSecurivox.setStoredData('linkScanHistory', history);
    },

    // Load and display recent scans
    loadRecentScans() {
        const history = CyberSecurivox.getStoredData('linkScanHistory') || [];
        const recentScansContainer = document.getElementById('recent-scans');

        if (history.length === 0) {
            recentScansContainer.innerHTML = `
                <p class="text-gray-500 text-center py-8">No recent scans. Start by checking a link above!</p>
            `;
            return;
        }

        recentScansContainer.innerHTML = history.map(scan => {
            const riskColors = {
                low: 'text-green-600',
                medium: 'text-yellow-600',
                high: 'text-red-600'
            };

            const date = new Date(scan.timestamp).toLocaleString();

            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">${scan.url}</p>
                        <p class="text-xs text-gray-500">${date}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs ${riskColors[scan.riskLevel]} font-semibold uppercase">
                            ${scan.riskLevel}
                        </span>
                        ${scan.warningCount > 0 ? `
                            <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                ${scan.warningCount} warnings
                            </span>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    // Clear scan history
    clearScanHistory() {
        if (confirm('Are you sure you want to clear your scan history?')) {
            CyberSecurivox.setStoredData('linkScanHistory', []);
            this.loadRecentScans();
            CyberSecurivox.showNotification('Scan history cleared', 'info');
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    LinkChecker.init();
});
