/**
 * Cyber Securivox - Habit Tracker JavaScript
 * Manages daily cybersecurity habits and progress tracking
 */

const HabitTracker = {
    // Default daily habits
    defaultHabits: [
        {
            id: 'password-check',
            title: 'Check Password Security',
            description: 'Review and update weak passwords',
            icon: 'fas fa-key',
            points: 20
        },
        {
            id: 'app-permissions',
            title: 'Review App Permissions',
            description: 'Check what data apps can access',
            icon: 'fas fa-mobile-alt',
            points: 15
        },
        {
            id: 'clear-spam',
            title: 'Clear Spam & Phishing Emails',
            description: 'Delete suspicious emails from inbox',
            icon: 'fas fa-envelope',
            points: 10
        },
        {
            id: 'update-apps',
            title: 'Update Apps & Software',
            description: 'Install security updates',
            icon: 'fas fa-download',
            points: 15
        },
        {
            id: 'backup-check',
            title: 'Verify Backup Status',
            description: 'Ensure important data is backed up',
            icon: 'fas fa-cloud-upload-alt',
            points: 20
        },
        {
            id: 'network-security',
            title: 'Check Network Security',
            description: 'Verify WiFi security and VPN status',
            icon: 'fas fa-wifi',
            points: 15
        },
        {
            id: 'social-privacy',
            title: 'Review Social Media Privacy',
            description: 'Check privacy settings on social platforms',
            icon: 'fas fa-users',
            points: 10
        }
    ],

    // Initialize the tracker
    init() {
        this.loadHabits();
        this.updateProgress();
        this.updateStreakCounter();
        this.updateSecurityScore();
        this.renderWeeklyCalendar();
        this.updateCurrentDate();
        this.setupEventListeners();
    },

    // Load habits for today
    loadHabits() {
        const today = this.getTodayKey();
        const todayHabits = CyberSecurivox.getStoredData(`habits_${today}`) || this.initializeTodayHabits();

        const habitsList = document.getElementById('habits-list');
        habitsList.innerHTML = '';

        todayHabits.forEach(habit => {
            const habitElement = this.createHabitElement(habit);
            habitsList.appendChild(habitElement);
        });
    },

    // Initialize today's habits if not exists
    initializeTodayHabits() {
        const today = this.getTodayKey();
        const todayHabits = this.defaultHabits.map(habit => ({
            ...habit,
            completed: false,
            completedAt: null
        }));

        CyberSecurivox.setStoredData(`habits_${today}`, todayHabits);
        return todayHabits;
    },

    // Create habit element
    createHabitElement(habit) {
        const habitDiv = document.createElement('div');
        habitDiv.className = `habit-item p-4 rounded-lg border-2 transition-all duration-300 ${
            habit.completed ? 'habit-completed border-green-200' : 'border-gray-200 hover:border-teal-200'
        }`;

        habitDiv.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <i class="${habit.icon} text-2xl ${habit.completed ? 'text-green-600' : 'text-teal-600'}"></i>
                    </div>
                    <div class="flex-grow">
                        <h3 class="text-lg font-semibold text-gray-800 ${habit.completed ? 'line-through' : ''}">${habit.title}</h3>
                        <p class="text-gray-600 text-sm">${habit.description}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                                <i class="fas fa-star mr-1"></i>${habit.points} points
                            </span>
                            ${habit.completed ? `
                                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                                    <i class="fas fa-check mr-1"></i>Completed
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="flex-shrink-0">
                    <button
                        class="habit-toggle w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                            habit.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
                        }"
                        data-habit-id="${habit.id}"
                        ${habit.completed ? 'disabled' : ''}
                    >
                        <i class="fas ${habit.completed ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                </div>
            </div>
        `;

        return habitDiv;
    },

    // Setup event listeners
    setupEventListeners() {
        // Habit toggle buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.habit-toggle')) {
                const button = e.target.closest('.habit-toggle');
                const habitId = button.getAttribute('data-habit-id');
                this.toggleHabit(habitId);
            }
        });

        // Reset button
        const resetButton = document.getElementById('reset-habits');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset today\'s progress? This cannot be undone.')) {
                    this.resetTodayHabits();
                }
            });
        }
    },

    // Toggle habit completion
    toggleHabit(habitId) {
        const today = this.getTodayKey();
        const todayHabits = CyberSecurivox.getStoredData(`habits_${today}`);

        const habit = todayHabits.find(h => h.id === habitId);
        if (habit && !habit.completed) {
            habit.completed = true;
            habit.completedAt = new Date().toISOString();

            CyberSecurivox.setStoredData(`habits_${today}`, todayHabits);

            // Show success message
            CyberSecurivox.showNotification(`Great job! You earned ${habit.points} points!`, 'success');

            // Reload habits and update progress
            this.loadHabits();
            this.updateProgress();
            this.updateStreakCounter();
            this.updateSecurityScore();
            this.renderWeeklyCalendar();
        }
    },

    // Reset today's habits
    resetTodayHabits() {
        const today = this.getTodayKey();
        const resetHabits = this.defaultHabits.map(habit => ({
            ...habit,
            completed: false,
            completedAt: null
        }));

        CyberSecurivox.setStoredData(`habits_${today}`, resetHabits);

        this.loadHabits();
        this.updateProgress();
        this.updateStreakCounter();
        this.updateSecurityScore();
        this.renderWeeklyCalendar();

        CyberSecurivox.showNotification('Today\'s progress has been reset', 'info');
    },

    // Update progress circle
    updateProgress() {
        const today = this.getTodayKey();
        const todayHabits = CyberSecurivox.getStoredData(`habits_${today}`) || [];

        const completedHabits = todayHabits.filter(h => h.completed).length;
        const totalHabits = todayHabits.length;
        const percentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

        // Update progress circle
        const circle = document.getElementById('progress-circle');
        const percentageElement = document.getElementById('progress-percentage');
        const statusElement = document.getElementById('progress-status');

        if (circle && percentageElement && statusElement) {
            const circumference = 2 * Math.PI * 50; // radius = 50
            const offset = circumference - (percentage / 100) * circumference;

            circle.style.strokeDashoffset = offset;
            percentageElement.textContent = `${percentage}%`;

            // Update status message
            if (percentage === 100) {
                statusElement.textContent = 'Perfect! All habits completed!';
                statusElement.className = 'text-green-600 font-semibold';
            } else if (percentage >= 80) {
                statusElement.textContent = 'Great progress! Almost there!';
                statusElement.className = 'text-teal-600';
            } else if (percentage >= 50) {
                statusElement.textContent = 'Good start! Keep going!';
                statusElement.className = 'text-blue-600';
            } else {
                statusElement.textContent = 'Get started with your daily habits!';
                statusElement.className = 'text-gray-600';
            }
        }
    },

    // Update streak counter
    updateStreakCounter() {
        const streak = this.calculateStreak();
        const streakElement = document.getElementById('streak-count');

        if (streakElement) {
            streakElement.textContent = streak;
        }
    },

    // Calculate current streak
    calculateStreak() {
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 30; i++) { // Check last 30 days
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = this.getDateKey(date);

            const dayHabits = CyberSecurivox.getStoredData(`habits_${dateKey}`);
            if (!dayHabits) break;

            const completedHabits = dayHabits.filter(h => h.completed).length;
            const completionRate = completedHabits / dayHabits.length;

            if (completionRate >= 0.8) { // 80% completion required
                streak++;
            } else {
                break;
            }
        }

        return streak;
    },

    // Update security score
    updateSecurityScore() {
        let totalScore = 0;
        const last30Days = [];
        const today = new Date();

        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = this.getDateKey(date);

            const dayHabits = CyberSecurivox.getStoredData(`habits_${dateKey}`);
            if (dayHabits) {
                const dayScore = dayHabits
                    .filter(h => h.completed)
                    .reduce((sum, h) => sum + h.points, 0);
                totalScore += dayScore;
            }
        }

        const scoreElement = document.getElementById('security-score');
        if (scoreElement) {
            scoreElement.textContent = totalScore;
        }
    },

    // Render weekly calendar
    renderWeeklyCalendar() {
        const calendar = document.getElementById('weekly-calendar');
        if (!calendar) return;

        calendar.innerHTML = '';

        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dateKey = this.getDateKey(date);

            const dayHabits = CyberSecurivox.getStoredData(`habits_${dateKey}`);
            let completionRate = 0;

            if (dayHabits && dayHabits.length > 0) {
                const completedHabits = dayHabits.filter(h => h.completed).length;
                completionRate = completedHabits / dayHabits.length;
            }

            const dayElement = document.createElement('div');
            dayElement.className = `h-12 rounded-lg flex items-center justify-center text-sm font-medium ${
                completionRate >= 0.8
                    ? 'bg-green-500 text-white'
                    : completionRate > 0
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-gray-200 text-gray-600'
            }`;

            dayElement.textContent = date.getDate();
            calendar.appendChild(dayElement);
        }
    },

    // Update current date display
    updateCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const today = new Date();
            dateElement.textContent = today.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    },

    // Get today's key for localStorage
    getTodayKey() {
        return this.getDateKey(new Date());
    },

    // Get date key for localStorage
    getDateKey(date) {
        return date.toISOString().split('T')[0];
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    HabitTracker.init();
});
