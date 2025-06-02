/**
 * Cyber Securivox - Learning Center JavaScript
 * Manages cybersecurity lessons and educational content
 */

const LearningCenter = {
    // Lesson database
    lessons: {
        'passwords-101': {
            title: 'Password Security 101',
            duration: '10 min',
            difficulty: 'Beginner',
            content: `
                <div class="space-y-6">
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 class="font-semibold text-blue-800 mb-2">Learning Objectives</h4>
                        <ul class="text-blue-700 text-sm space-y-1">
                            <li>• Understand what makes a password strong</li>
                            <li>• Learn common password mistakes to avoid</li>
                            <li>• Discover tools to help manage passwords</li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">What Makes a Strong Password?</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-green-800 mb-2">✅ Strong Password Traits</h5>
                                <ul class="text-green-700 text-sm space-y-1">
                                    <li>• At least 12 characters long</li>
                                    <li>• Mix of uppercase and lowercase</li>
                                    <li>• Contains numbers and symbols</li>
                                    <li>• Unique for each account</li>
                                    <li>• Not based on personal info</li>
                                </ul>
                            </div>
                            <div class="bg-red-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-red-800 mb-2">❌ Weak Password Examples</h5>
                                <ul class="text-red-700 text-sm space-y-1">
                                    <li>• 123456 or password</li>
                                    <li>• Your name + birth year</li>
                                    <li>• Common words (admin, welcome)</li>
                                    <li>• Keyboard patterns (qwerty)</li>
                                    <li>• Same password everywhere</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Password Creation Strategies</h4>
                        <div class="space-y-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h5 class="font-semibold mb-2">1. Passphrase Method</h5>
                                <p class="text-sm text-gray-600 mb-2">Use a memorable sentence with modifications:</p>
                                <p class="font-mono bg-white p-2 rounded border">
                                    "I love coffee in the morning!" → ILc0ff33!nTh3M0rn1ng!
                                </p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h5 class="font-semibold mb-2">2. Random Generation</h5>
                                <p class="text-sm text-gray-600 mb-2">Use a password manager to generate:</p>
                                <p class="font-mono bg-white p-2 rounded border">
                                    K9$mP2@vL8#nQ5!wR7
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <h4 class="font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
                        <p class="text-yellow-700 text-sm">
                            Use a password manager like Bitwarden, 1Password, or LastPass to generate and store unique passwords for all your accounts. This way, you only need to remember one master password!
                        </p>
                    </div>
                </div>
            `
        },

        'email-safety': {
            title: 'Email Safety & Phishing Prevention',
            duration: '15 min',
            difficulty: 'Beginner',
            content: `
                <div class="space-y-6">
                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <h4 class="font-semibold text-red-800 mb-2">⚠️ Phishing Alert</h4>
                        <p class="text-red-700 text-sm">
                            Phishing attacks are responsible for 95% of successful data breaches. Learning to spot them is crucial for your digital safety.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Red Flags in Emails</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-3">
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">🚨 Urgent Language</h5>
                                    <p class="text-red-700 text-xs">"Act now!", "Limited time!", "Immediate action required"</p>
                                </div>
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">👤 Generic Greetings</h5>
                                    <p class="text-red-700 text-xs">"Dear Customer", "Dear User", "Dear Sir/Madam"</p>
                                </div>
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">📎 Suspicious Attachments</h5>
                                    <p class="text-red-700 text-xs">Unexpected .exe, .zip, or .doc files</p>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">🔗 Suspicious Links</h5>
                                    <p class="text-red-700 text-xs">Shortened URLs, misspelled domains</p>
                                </div>
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">💰 Too Good to Be True</h5>
                                    <p class="text-red-700 text-xs">"You've won!", "Free money!", "Congratulations!"</p>
                                </div>
                                <div class="bg-red-50 p-3 rounded-lg">
                                    <h5 class="font-semibold text-red-800 text-sm">✍️ Poor Grammar</h5>
                                    <p class="text-red-700 text-xs">Spelling mistakes, awkward phrasing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">How to Verify Suspicious Emails</h4>
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                                <div>
                                    <h5 class="font-semibold">Check the sender's email address</h5>
                                    <p class="text-sm text-gray-600">Look for misspellings or suspicious domains</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                                <div>
                                    <h5 class="font-semibold">Hover over links (don't click!)</h5>
                                    <p class="text-sm text-gray-600">Check if the URL matches the claimed destination</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                                <div>
                                    <h5 class="font-semibold">Contact the company directly</h5>
                                    <p class="text-sm text-gray-600">Use official contact information, not what's in the email</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                                <div>
                                    <h5 class="font-semibold">Trust your instincts</h5>
                                    <p class="text-sm text-gray-600">If something feels off, it probably is</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 class="font-semibold text-green-800 mb-2">✅ What to Do Instead</h4>
                        <ul class="text-green-700 text-sm space-y-1">
                            <li>• Type URLs manually into your browser</li>
                            <li>• Use bookmarks for important sites</li>
                            <li>• Enable email security features</li>
                            <li>• Report phishing emails to your email provider</li>
                            <li>• Keep your email client updated</li>
                        </ul>
                    </div>
                </div>
            `
        },

        'safe-browsing': {
            title: 'Safe Web Browsing',
            duration: '12 min',
            difficulty: 'Beginner',
            content: `
                <div class="space-y-6">
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <h4 class="font-semibold text-blue-800 mb-2">🌐 Web Safety Fundamentals</h4>
                        <p class="text-blue-700 text-sm">
                            The web can be dangerous, but with the right knowledge and tools, you can browse safely and confidently.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Browser Security Settings</h4>
                        <div class="space-y-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h5 class="font-semibold mb-2">🔒 Enable HTTPS-Only Mode</h5>
                                <p class="text-sm text-gray-600">Forces secure connections and warns about insecure sites</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h5 class="font-semibold mb-2">🚫 Block Pop-ups and Redirects</h5>
                                <p class="text-sm text-gray-600">Prevents malicious pop-ups and unwanted redirects</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h5 class="font-semibold mb-2">🍪 Manage Cookies and Tracking</h5>
                                <p class="text-sm text-gray-600">Control how websites track your activity</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Identifying Safe Websites</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-green-800 mb-2">✅ Safe Website Signs</h5>
                                <ul class="text-green-700 text-sm space-y-1">
                                    <li>• HTTPS lock icon in address bar</li>
                                    <li>• Professional design and layout</li>
                                    <li>• Clear contact information</li>
                                    <li>• Privacy policy and terms</li>
                                    <li>• Secure payment methods</li>
                                </ul>
                            </div>
                            <div class="bg-red-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-red-800 mb-2">❌ Warning Signs</h5>
                                <ul class="text-red-700 text-sm space-y-1">
                                    <li>• No HTTPS (HTTP only)</li>
                                    <li>• Excessive pop-ups or ads</li>
                                    <li>• Requests for unnecessary permissions</li>
                                    <li>• Poor design or broken links</li>
                                    <li>• Suspicious download prompts</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <h4 class="font-semibold text-yellow-800 mb-2">🛡️ Recommended Browser Extensions</h4>
                        <ul class="text-yellow-700 text-sm space-y-1">
                            <li>• <strong>uBlock Origin</strong> - Blocks ads and trackers</li>
                            <li>• <strong>Privacy Badger</strong> - Prevents tracking</li>
                            <li>• <strong>HTTPS Everywhere</strong> - Forces secure connections</li>
                            <li>• <strong>Bitwarden</strong> - Password manager integration</li>
                        </ul>
                    </div>
                </div>
            `
        },

        '2fa-setup': {
            title: 'Two-Factor Authentication Setup',
            duration: '20 min',
            difficulty: 'Intermediate',
            content: `
                <div class="space-y-6">
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 class="font-semibold text-green-800 mb-2">🔐 Why 2FA Matters</h4>
                        <p class="text-green-700 text-sm">
                            Two-Factor Authentication reduces the risk of account compromise by 99.9%. Even if your password is stolen, attackers can't access your account without the second factor.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Types of 2FA</h4>
                        <div class="space-y-4">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-blue-800 mb-2">📱 Authenticator Apps (Recommended)</h5>
                                <p class="text-blue-700 text-sm mb-2">Generate time-based codes offline</p>
                                <ul class="text-blue-700 text-xs space-y-1">
                                    <li>• Google Authenticator</li>
                                    <li>• Microsoft Authenticator</li>
                                    <li>• Authy (with cloud backup)</li>
                                </ul>
                            </div>
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-yellow-800 mb-2">📞 SMS Codes (Less Secure)</h5>
                                <p class="text-yellow-700 text-sm">Codes sent to your phone number</p>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h5 class="font-semibold text-purple-800 mb-2">🔑 Hardware Keys (Most Secure)</h5>
                                <p class="text-purple-700 text-sm">Physical devices like YubiKey</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Step-by-Step Setup Guide</h4>
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                                <div>
                                    <h5 class="font-semibold">Download an authenticator app</h5>
                                    <p class="text-sm text-gray-600">Choose from Google Authenticator, Microsoft Authenticator, or Authy</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                                <div>
                                    <h5 class="font-semibold">Go to account security settings</h5>
                                    <p class="text-sm text-gray-600">Look for "Security", "Two-Factor Authentication", or "2FA"</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                                <div>
                                    <h5 class="font-semibold">Scan the QR code</h5>
                                    <p class="text-sm text-gray-600">Use your authenticator app to scan the displayed QR code</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                                <div>
                                    <h5 class="font-semibold">Enter the verification code</h5>
                                    <p class="text-sm text-gray-600">Type the 6-digit code from your app to confirm setup</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</div>
                                <div>
                                    <h5 class="font-semibold">Save backup codes</h5>
                                    <p class="text-sm text-gray-600">Store recovery codes in a safe place (not on your phone!)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <h4 class="font-semibold text-red-800 mb-2">⚠️ Important Reminders</h4>
                        <ul class="text-red-700 text-sm space-y-1">
                            <li>• Save backup codes in multiple secure locations</li>
                            <li>• Don't rely solely on SMS if other options are available</li>
                            <li>• Enable 2FA on all important accounts (email, banking, social media)</li>
                            <li>• Consider using multiple backup methods</li>
                        </ul>
                    </div>
                </div>
            `
        }
    },

    // Daily tips database
    dailyTips: [
        {
            title: "Update Your Software",
            content: "Keep your operating system, browsers, and apps updated with the latest security patches.",
            icon: "fas fa-download",
            category: "maintenance"
        },
        {
            title: "Check Login Activity",
            content: "Review recent login activity on your important accounts to spot unauthorized access.",
            icon: "fas fa-history",
            category: "monitoring"
        },
        {
            title: "Backup Your Data",
            content: "Ensure your important files are backed up to multiple locations, including cloud storage.",
            icon: "fas fa-cloud-upload-alt",
            category: "backup"
        },
        {
            title: "Review App Permissions",
            content: "Check what data your mobile apps can access and revoke unnecessary permissions.",
            icon: "fas fa-mobile-alt",
            category: "privacy"
        }
    ],

    // Initialize the learning center
    init() {
        this.setupEventListeners();
        this.loadProgress();
        this.loadDailyTips();
        this.updateProgress();
    },

    // Setup event listeners
    setupEventListeners() {
        const lessonItems = document.querySelectorAll('.lesson-item');
        const closeLesson = document.getElementById('close-lesson');
        const markComplete = document.getElementById('mark-complete');
        const resetProgress = document.getElementById('reset-progress');

        // Lesson item clicks
        lessonItems.forEach(item => {
            item.addEventListener('click', () => {
                const lessonId = item.getAttribute('data-lesson');
                this.openLesson(lessonId);
            });
        });

        // Close lesson modal
        if (closeLesson) {
            closeLesson.addEventListener('click', () => {
                this.closeLesson();
            });
        }

        // Mark lesson as complete
        if (markComplete) {
            markComplete.addEventListener('click', () => {
                this.markLessonComplete();
            });
        }

        // Reset progress
        if (resetProgress) {
            resetProgress.addEventListener('click', () => {
                this.resetProgress();
            });
        }

        // Close modal on outside click
        document.getElementById('lesson-modal').addEventListener('click', (e) => {
            if (e.target.id === 'lesson-modal') {
                this.closeLesson();
            }
        });
    },

    // Open lesson modal
    openLesson(lessonId) {
        const lesson = this.lessons[lessonId];
        if (!lesson) return;

        const modal = document.getElementById('lesson-modal');
        const title = document.getElementById('lesson-title');
        const content = document.getElementById('lesson-content');
        const duration = document.getElementById('lesson-duration');
        const difficulty = document.getElementById('lesson-difficulty');
        const markComplete = document.getElementById('mark-complete');

        title.textContent = lesson.title;
        content.innerHTML = lesson.content;
        duration.textContent = lesson.duration;
        difficulty.textContent = lesson.difficulty;

        // Check if already completed
        const progress = CyberSecurivox.getStoredData('learningProgress') || {};
        const isCompleted = progress.completedLessons && progress.completedLessons.includes(lessonId);

        markComplete.textContent = isCompleted ? 'Completed ✓' : 'Mark as Complete';
        markComplete.disabled = isCompleted;
        markComplete.className = isCompleted
            ? 'bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300';

        // Store current lesson
        this.currentLesson = lessonId;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },

    // Close lesson modal
    closeLesson() {
        const modal = document.getElementById('lesson-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentLesson = null;
    },

    // Mark lesson as complete
    markLessonComplete() {
        if (!this.currentLesson) return;

        const progress = CyberSecurivox.getStoredData('learningProgress') || {
            completedLessons: [],
            lastActivity: null,
            streak: 0
        };

        if (!progress.completedLessons.includes(this.currentLesson)) {
            progress.completedLessons.push(this.currentLesson);
            progress.lastActivity = new Date().toISOString();

            // Update streak
            this.updateStreak(progress);

            CyberSecurivox.setStoredData('learningProgress', progress);
            CyberSecurivox.showNotification('Lesson completed! Great job! 🎉', 'success');

            this.updateProgress();
            this.closeLesson();
        }
    },

    // Update learning streak
    updateStreak(progress) {
        const today = new Date().toDateString();
        const lastActivity = progress.lastActivity ? new Date(progress.lastActivity).toDateString() : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastActivity === today) {
            // Already learned today, no change to streak
            return;
        } else if (lastActivity === yesterdayStr) {
            // Learned yesterday, increment streak
            progress.streak = (progress.streak || 0) + 1;
        } else {
            // Gap in learning, reset streak
            progress.streak = 1;
        }
    },

    // Load progress from storage
    loadProgress() {
        const progress = CyberSecurivox.getStoredData('learningProgress') || {
            completedLessons: [],
            lastActivity: null,
            streak: 0
        };

        // Mark completed lessons
        progress.completedLessons.forEach(lessonId => {
            const lessonItem = document.querySelector(`[data-lesson="${lessonId}"]`);
            if (lessonItem) {
                lessonItem.classList.add('opacity-75');
                const icon = lessonItem.querySelector('i');
                icon.className = 'fas fa-check-circle text-green-500 text-xl';
            }
        });
    },

    // Update progress display
    updateProgress() {
        const progress = CyberSecurivox.getStoredData('learningProgress') || {
            completedLessons: [],
            streak: 0
        };

        const completedCount = progress.completedLessons.length;
        const totalLessons = Object.keys(this.lessons).length;
        const knowledgeScore = Math.round((completedCount / totalLessons) * 100);

        document.getElementById('completed-lessons').textContent = completedCount;
        document.getElementById('knowledge-score').textContent = `${knowledgeScore}%`;
        document.getElementById('streak-days').textContent = progress.streak || 0;
    },

    // Reset progress
    resetProgress() {
        if (confirm('Are you sure you want to reset your learning progress? This cannot be undone.')) {
            CyberSecurivox.setStoredData('learningProgress', {
                completedLessons: [],
                lastActivity: null,
                streak: 0
            });

            // Remove visual completion indicators
            document.querySelectorAll('.lesson-item').forEach(item => {
                item.classList.remove('opacity-75');
                const icon = item.querySelector('i');
                icon.className = 'fas fa-play-circle text-green-500 text-xl';
            });

            this.updateProgress();
            CyberSecurivox.showNotification('Learning progress reset', 'info');
        }
    },

    // Load daily tips
    loadDailyTips() {
        const tipsContainer = document.getElementById('daily-tips');
        const today = new Date().getDate();

        // Select 2 tips based on the day
        const selectedTips = [
            this.dailyTips[today % this.dailyTips.length],
            this.dailyTips[(today + 1) % this.dailyTips.length]
        ];

        tipsContainer.innerHTML = selectedTips.map(tip => `
            <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-lg">
                <div class="flex items-start space-x-3">
                    <i class="${tip.icon} text-yellow-600 text-xl mt-1"></i>
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">${tip.title}</h4>
                        <p class="text-gray-600 text-sm">${tip.content}</p>
                        <span class="inline-block mt-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                            ${tip.category}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    LearningCenter.init();
});
