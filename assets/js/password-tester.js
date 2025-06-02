/**
 * Cyber Securivox - Password Tester JavaScript
 * Analyzes password strength and generates secure passwords
 */

const PasswordTester = {
    // Common weak passwords and patterns
    commonPasswords: [
        '123456', 'password', '123456789', '12345678', '12345', '1234567',
        'qwerty', 'abc123', 'password123', 'admin', 'letmein', 'welcome',
        'monkey', '1234567890', 'dragon', 'master', 'hello', 'freedom'
    ],

    // Character sets for password generation
    charSets: {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },

    // Initialize the password tester
    init() {
        this.setupEventListeners();
        this.generateInitialPassword();
    },

    // Setup event listeners
    setupEventListeners() {
        const passwordInput = document.getElementById('password-input');
        const togglePassword = document.getElementById('toggle-password');
        const testButtons = document.querySelectorAll('.test-password');
        const generateBtn = document.getElementById('generate-password');
        const copyBtn = document.getElementById('copy-password');
        const lengthSlider = document.getElementById('password-length');

        // Real-time password analysis
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                this.analyzePassword(passwordInput.value);
            });
        }

        // Toggle password visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                const icon = togglePassword.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
        }

        // Test password buttons
        testButtons.forEach(button => {
            button.addEventListener('click', () => {
                const testPassword = button.getAttribute('data-password');
                passwordInput.value = testPassword;
                this.analyzePassword(testPassword);
            });
        });

        // Password generator
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generatePassword();
            });
        }

        // Copy generated password
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyGeneratedPassword();
            });
        }

        // Length slider
        if (lengthSlider) {
            lengthSlider.addEventListener('input', () => {
                document.getElementById('length-value').textContent = lengthSlider.value;
            });
        }

        // Checkbox changes trigger new password generation
        const checkboxes = document.querySelectorAll('#include-uppercase, #include-lowercase, #include-numbers, #include-symbols');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (document.getElementById('generated-password').value) {
                    this.generatePassword();
                }
            });
        });
    },

    // Analyze password strength
    analyzePassword(password) {
        if (!password) {
            this.updateStrengthMeter(0, 'Enter a password', 'gray');
            this.hideResults();
            return;
        }

        const analysis = this.calculatePasswordStrength(password);
        this.updateStrengthMeter(analysis.score, analysis.strength, analysis.color);
        this.displayDetailedAnalysis(password, analysis);
    },

    // Calculate password strength score
    calculatePasswordStrength(password) {
        let score = 0;
        const analysis = {
            length: password.length,
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumbers: /\d/.test(password),
            hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            isCommon: this.commonPasswords.includes(password.toLowerCase()),
            hasRepeating: this.hasRepeatingChars(password),
            hasSequential: this.hasSequentialChars(password),
            entropy: this.calculateEntropy(password),
            suggestions: []
        };

        // Length scoring
        if (analysis.length >= 12) score += 25;
        else if (analysis.length >= 8) score += 15;
        else if (analysis.length >= 6) score += 5;
        else analysis.suggestions.push('Use at least 8 characters (12+ recommended)');

        // Character variety scoring
        if (analysis.hasLowercase) score += 5;
        else analysis.suggestions.push('Include lowercase letters');

        if (analysis.hasUppercase) score += 5;
        else analysis.suggestions.push('Include uppercase letters');

        if (analysis.hasNumbers) score += 5;
        else analysis.suggestions.push('Include numbers');

        if (analysis.hasSymbols) score += 10;
        else analysis.suggestions.push('Include special characters');

        // Bonus for character variety
        const charTypes = [analysis.hasLowercase, analysis.hasUppercase, analysis.hasNumbers, analysis.hasSymbols].filter(Boolean).length;
        if (charTypes >= 3) score += 10;
        if (charTypes === 4) score += 5;

        // Penalties
        if (analysis.isCommon) {
            score -= 30;
            analysis.suggestions.push('Avoid common passwords');
        }

        if (analysis.hasRepeating) {
            score -= 10;
            analysis.suggestions.push('Avoid repeating characters');
        }

        if (analysis.hasSequential) {
            score -= 15;
            analysis.suggestions.push('Avoid sequential characters (123, abc)');
        }

        // Entropy bonus
        if (analysis.entropy > 50) score += 10;
        else if (analysis.entropy > 30) score += 5;

        // Ensure score is within bounds
        score = Math.max(0, Math.min(100, score));

        // Determine strength level
        let strength, color;
        if (score >= 80) {
            strength = 'Very Strong';
            color = 'green';
        } else if (score >= 60) {
            strength = 'Strong';
            color = 'green';
        } else if (score >= 40) {
            strength = 'Medium';
            color = 'yellow';
        } else if (score >= 20) {
            strength = 'Weak';
            color = 'orange';
        } else {
            strength = 'Very Weak';
            color = 'red';
        }

        return { ...analysis, score, strength, color };
    },

    // Check for repeating characters
    hasRepeatingChars(password) {
        return /(.)\1{2,}/.test(password);
    },

    // Check for sequential characters
    hasSequentialChars(password) {
        const sequences = ['123', '234', '345', '456', '567', '678', '789', '890',
                          'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij',
                          'qwerty', 'asdf', 'zxcv'];

        const lowerPassword = password.toLowerCase();
        return sequences.some(seq => lowerPassword.includes(seq));
    },

    // Calculate password entropy
    calculateEntropy(password) {
        const charSetSize = this.getCharSetSize(password);
        return password.length * Math.log2(charSetSize);
    },

    // Get character set size for entropy calculation
    getCharSetSize(password) {
        let size = 0;
        if (/[a-z]/.test(password)) size += 26;
        if (/[A-Z]/.test(password)) size += 26;
        if (/\d/.test(password)) size += 10;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) size += 32;
        return size;
    },

    // Update strength meter
    updateStrengthMeter(score, strength, color) {
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');

        if (strengthBar && strengthText) {
            strengthBar.style.width = `${score}%`;
            strengthText.textContent = strength;

            // Update colors
            const colorClasses = {
                gray: 'bg-gray-300',
                red: 'bg-red-500',
                orange: 'bg-orange-500',
                yellow: 'bg-yellow-500',
                green: 'bg-green-500'
            };

            // Remove all color classes
            Object.values(colorClasses).forEach(cls => strengthBar.classList.remove(cls));

            // Add current color class
            strengthBar.classList.add(colorClasses[color]);

            // Update text color
            const textColorClasses = {
                gray: 'text-gray-500',
                red: 'text-red-600',
                orange: 'text-orange-600',
                yellow: 'text-yellow-600',
                green: 'text-green-600'
            };

            Object.values(textColorClasses).forEach(cls => strengthText.classList.remove(cls));
            strengthText.classList.add(textColorClasses[color]);
        }
    },

    // Display detailed analysis
    displayDetailedAnalysis(password, analysis) {
        const resultsSection = document.getElementById('results-section');
        const analysisContainer = document.getElementById('password-analysis');

        resultsSection.classList.remove('hidden');

        const crackTime = this.estimateCrackTime(analysis.entropy);

        analysisContainer.innerHTML = `
            <div class="space-y-6">
                <!-- Score Overview -->
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-gray-800">${analysis.score}/100</div>
                        <div class="text-sm text-gray-600">Security Score</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-gray-800">${Math.round(analysis.entropy)}</div>
                        <div class="text-sm text-gray-600">Entropy Bits</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                        <div class="text-lg font-bold text-gray-800">${crackTime}</div>
                        <div class="text-sm text-gray-600">Time to Crack</div>
                    </div>
                </div>

                <!-- Character Analysis -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-3">Character Analysis:</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div class="flex items-center">
                            <i class="fas ${analysis.hasLowercase ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span class="text-sm">Lowercase</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas ${analysis.hasUppercase ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span class="text-sm">Uppercase</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas ${analysis.hasNumbers ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span class="text-sm">Numbers</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas ${analysis.hasSymbols ? 'fa-check text-green-600' : 'fa-times text-red-600'} mr-2"></i>
                            <span class="text-sm">Symbols</span>
                        </div>
                    </div>
                </div>

                <!-- Security Issues -->
                ${this.getSecurityIssues(analysis)}

                <!-- Suggestions -->
                ${analysis.suggestions.length > 0 ? `
                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">
                            <i class="fas fa-lightbulb mr-2"></i>
                            Suggestions for Improvement:
                        </h4>
                        <ul class="text-sm text-blue-700 space-y-1">
                            ${analysis.suggestions.map(suggestion => `<li>• ${suggestion}</li>`).join('')}
                        </ul>
                    </div>
                ` : `
                    <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <p class="text-green-800">
                            <i class="fas fa-check mr-2"></i>
                            Great job! Your password meets security best practices.
                        </p>
                    </div>
                `}
            </div>
        `;
    },

    // Get security issues HTML
    getSecurityIssues(analysis) {
        const issues = [];

        if (analysis.isCommon) issues.push('This is a commonly used password');
        if (analysis.hasRepeating) issues.push('Contains repeating characters');
        if (analysis.hasSequential) issues.push('Contains sequential characters');
        if (analysis.length < 8) issues.push('Password is too short');

        if (issues.length === 0) return '';

        return `
            <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 class="font-semibold text-red-800 mb-2">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    Security Issues:
                </h4>
                <ul class="text-sm text-red-700 space-y-1">
                    ${issues.map(issue => `<li>• ${issue}</li>`).join('')}
                </ul>
            </div>
        `;
    },

    // Estimate crack time
    estimateCrackTime(entropy) {
        const guessesPerSecond = 1e9; // 1 billion guesses per second
        const totalCombinations = Math.pow(2, entropy);
        const averageGuesses = totalCombinations / 2;
        const seconds = averageGuesses / guessesPerSecond;

        if (seconds < 1) return 'Instant';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
        return 'Centuries';
    },

    // Hide results section
    hideResults() {
        const resultsSection = document.getElementById('results-section');
        resultsSection.classList.add('hidden');
    },

    // Generate initial password
    generateInitialPassword() {
        this.generatePassword();
    },

    // Generate secure password
    generatePassword() {
        const length = parseInt(document.getElementById('password-length').value);
        const includeUppercase = document.getElementById('include-uppercase').checked;
        const includeLowercase = document.getElementById('include-lowercase').checked;
        const includeNumbers = document.getElementById('include-numbers').checked;
        const includeSymbols = document.getElementById('include-symbols').checked;

        let charset = '';
        if (includeUppercase) charset += this.charSets.uppercase;
        if (includeLowercase) charset += this.charSets.lowercase;
        if (includeNumbers) charset += this.charSets.numbers;
        if (includeSymbols) charset += this.charSets.symbols;

        if (!charset) {
            CyberSecurivox.showNotification('Please select at least one character type', 'warning');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        const generatedPasswordInput = document.getElementById('generated-password');
        const copyBtn = document.getElementById('copy-password');

        generatedPasswordInput.value = password;
        copyBtn.disabled = false;

        // Auto-analyze the generated password
        const passwordInput = document.getElementById('password-input');
        passwordInput.value = password;
        this.analyzePassword(password);
    },

    // Copy generated password
    copyGeneratedPassword() {
        const generatedPassword = document.getElementById('generated-password').value;
        if (generatedPassword) {
            CyberSecurivox.copyToClipboard(generatedPassword);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    PasswordTester.init();
});
