/**
 * Cyber Securivox - CyberAttack Map
 * Real-time global cyberattack visualization
 */

const CyberAttackMap = {
    isPlaying: true,
    attackCount: 0,
    attacks: [],
    countries: [],
    attackTypes: {
        ddos: { name: 'DDoS', color: 'bg-red-500', count: 0 },
        malware: { name: 'Malware', color: 'bg-orange-500', count: 0 },
        phishing: { name: 'Phishing', color: 'bg-yellow-500', count: 0 },
        breach: { name: 'Data Breach', color: 'bg-purple-500', count: 0 },
        ransomware: { name: 'Ransomware', color: 'bg-blue-500', count: 0 }
    },
    updateInterval: null,

    // Initialize the attack map
    init() {
        this.setupEventListeners();
        this.initializeCountries();
        this.startSimulation();
        this.updateThreatLevel();
    },

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('reset-map').addEventListener('click', () => {
            this.resetMap();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('attack-modal').classList.add('hidden');
        });
    },

    // Initialize country data
    initializeCountries() {
        this.countries = [
            { name: 'United States', code: 'US', x: 25, y: 35, attacks: 0 },
            { name: 'China', code: 'CN', x: 75, y: 40, attacks: 0 },
            { name: 'Russia', code: 'RU', x: 65, y: 25, attacks: 0 },
            { name: 'Germany', code: 'DE', x: 52, y: 30, attacks: 0 },
            { name: 'United Kingdom', code: 'GB', x: 48, y: 28, attacks: 0 },
            { name: 'Japan', code: 'JP', x: 82, y: 42, attacks: 0 },
            { name: 'South Korea', code: 'KR', x: 80, y: 45, attacks: 0 },
            { name: 'India', code: 'IN', x: 70, y: 50, attacks: 0 },
            { name: 'Brazil', code: 'BR', x: 35, y: 70, attacks: 0 },
            { name: 'Australia', code: 'AU', x: 85, y: 75, attacks: 0 },
            { name: 'Canada', code: 'CA', x: 22, y: 25, attacks: 0 },
            { name: 'France', code: 'FR', x: 50, y: 32, attacks: 0 },
            { name: 'Italy', code: 'IT', x: 52, y: 38, attacks: 0 },
            { name: 'Spain', code: 'ES', x: 47, y: 38, attacks: 0 },
            { name: 'Netherlands', code: 'NL', x: 51, y: 29, attacks: 0 }
        ];
    },

    // Start attack simulation
    startSimulation() {
        this.updateInterval = setInterval(() => {
            if (this.isPlaying) {
                this.generateRandomAttack();
                this.updateStatistics();
                this.updateRecentAttacks();
                this.updateTopTargets();
                this.updateAttackTypesChart();
            }
        }, 2000); // Generate attack every 2 seconds
    },

    // Generate random cyberattack
    generateRandomAttack() {
        const attackTypeKeys = Object.keys(this.attackTypes);
        const attackType = attackTypeKeys[Math.floor(Math.random() * attackTypeKeys.length)];
        const sourceCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
        const targetCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
        
        // Ensure source and target are different
        if (sourceCountry === targetCountry) return;

        const attack = {
            id: Date.now(),
            type: attackType,
            source: sourceCountry,
            target: targetCountry,
            timestamp: new Date(),
            severity: this.getRandomSeverity(),
            status: 'active'
        };

        this.attacks.unshift(attack);
        this.attackCount++;
        targetCountry.attacks++;
        this.attackTypes[attackType].count++;

        // Keep only last 50 attacks
        if (this.attacks.length > 50) {
            this.attacks = this.attacks.slice(0, 50);
        }

        this.visualizeAttack(attack);
        this.updateLiveCounter();
    },

    // Get random severity level
    getRandomSeverity() {
        const severities = ['low', 'medium', 'high', 'critical'];
        const weights = [40, 30, 20, 10]; // Probability weights
        const random = Math.random() * 100;
        let cumulative = 0;
        
        for (let i = 0; i < severities.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return severities[i];
            }
        }
        return 'low';
    },

    // Visualize attack on map
    visualizeAttack(attack) {
        const overlay = document.getElementById('attack-overlay');
        
        // Create attack marker
        const marker = document.createElement('div');
        marker.className = `absolute w-4 h-4 rounded-full ${this.attackTypes[attack.type].color} animate-ping cursor-pointer`;
        marker.style.left = `${attack.target.x}%`;
        marker.style.top = `${attack.target.y}%`;
        marker.style.transform = 'translate(-50%, -50%)';
        
        // Add click event for details
        marker.addEventListener('click', () => {
            this.showAttackDetails(attack);
        });

        overlay.appendChild(marker);

        // Create attack line from source to target
        this.createAttackLine(attack.source, attack.target, attack.type);

        // Remove marker after animation
        setTimeout(() => {
            if (marker.parentNode) {
                marker.parentNode.removeChild(marker);
            }
        }, 3000);
    },

    // Create attack line between countries
    createAttackLine(source, target, attackType) {
        const overlay = document.getElementById('attack-overlay');
        const line = document.createElement('div');
        
        const deltaX = target.x - source.x;
        const deltaY = target.y - source.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        line.className = `absolute h-0.5 ${this.attackTypes[attackType].color} opacity-70`;
        line.style.left = `${source.x}%`;
        line.style.top = `${source.y}%`;
        line.style.width = `${distance}%`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';
        line.style.animation = 'attackLine 2s ease-out forwards';
        
        overlay.appendChild(line);
        
        // Remove line after animation
        setTimeout(() => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        }, 2000);
    },

    // Show attack details in modal
    showAttackDetails(attack) {
        const modal = document.getElementById('attack-modal');
        const details = document.getElementById('attack-details');
        
        details.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Attack Type:</span>
                    <span class="px-3 py-1 rounded-full text-sm ${this.attackTypes[attack.type].color} text-white">
                        ${this.attackTypes[attack.type].name}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Source:</span>
                    <span>${attack.source.name}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Target:</span>
                    <span>${attack.target.name}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Severity:</span>
                    <span class="capitalize ${this.getSeverityColor(attack.severity)}">${attack.severity}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Time:</span>
                    <span>${attack.timestamp.toLocaleTimeString()}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold">Status:</span>
                    <span class="text-red-600 font-semibold">Active</span>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    },

    // Get severity color class
    getSeverityColor(severity) {
        const colors = {
            low: 'text-blue-600',
            medium: 'text-yellow-600',
            high: 'text-orange-600',
            critical: 'text-red-600'
        };
        return colors[severity] || 'text-gray-600';
    },

    // Update statistics
    updateStatistics() {
        document.getElementById('total-attacks').textContent = this.attackCount;
        document.getElementById('countries-affected').textContent = this.countries.filter(c => c.attacks > 0).length;
        document.getElementById('malware-detected').textContent = this.attackTypes.malware.count + this.attackTypes.ransomware.count;
        document.getElementById('attacks-blocked').textContent = Math.floor(this.attackCount * 0.7); // Simulate 70% blocked
    },

    // Update live counter
    updateLiveCounter() {
        const activeAttacks = this.attacks.filter(a => a.status === 'active').length;
        document.getElementById('live-attack-count').textContent = activeAttacks;
    },

    // Update recent attacks feed
    updateRecentAttacks() {
        const container = document.getElementById('recent-attacks');
        const recentAttacks = this.attacks.slice(0, 5);
        
        container.innerHTML = recentAttacks.map(attack => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full ${this.attackTypes[attack.type].color}"></div>
                    <div>
                        <div class="font-semibold text-sm">${this.attackTypes[attack.type].name}</div>
                        <div class="text-xs text-gray-600">${attack.source.name} → ${attack.target.name}</div>
                    </div>
                </div>
                <div class="text-xs text-gray-500">
                    ${this.getTimeAgo(attack.timestamp)}
                </div>
            </div>
        `).join('');
    },

    // Update top targets
    updateTopTargets() {
        const container = document.getElementById('top-targets');
        const sortedCountries = [...this.countries]
            .sort((a, b) => b.attacks - a.attacks)
            .slice(0, 5);
        
        container.innerHTML = sortedCountries.map((country, index) => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        ${index + 1}
                    </div>
                    <div>
                        <div class="font-semibold text-sm">${country.name}</div>
                        <div class="text-xs text-gray-600">${country.attacks} attacks</div>
                    </div>
                </div>
                <div class="text-lg font-bold text-red-600">
                    ${country.attacks}
                </div>
            </div>
        `).join('');
    },

    // Update attack types chart
    updateAttackTypesChart() {
        const container = document.getElementById('attack-types-chart');
        const maxCount = Math.max(...Object.values(this.attackTypes).map(t => t.count));
        
        container.innerHTML = Object.entries(this.attackTypes).map(([key, type]) => {
            const percentage = maxCount > 0 ? (type.count / maxCount) * 100 : 0;
            return `
                <div class="text-center">
                    <div class="mb-2">
                        <div class="w-full bg-gray-200 rounded-full h-24 flex items-end">
                            <div class="${type.color} rounded-full transition-all duration-1000" 
                                 style="width: 100%; height: ${percentage}%"></div>
                        </div>
                    </div>
                    <div class="text-sm font-semibold">${type.name}</div>
                    <div class="text-lg font-bold text-gray-800">${type.count}</div>
                </div>
            `;
        }).join('');
    },

    // Update threat level
    updateThreatLevel() {
        const totalAttacks = this.attackCount;
        const criticalAttacks = this.attacks.filter(a => a.severity === 'critical').length;
        
        let level, color, percentage;
        
        if (totalAttacks < 10) {
            level = 'Low';
            color = 'bg-green-500';
            percentage = 25;
        } else if (totalAttacks < 25) {
            level = 'Medium';
            color = 'bg-yellow-500';
            percentage = 50;
        } else if (totalAttacks < 50) {
            level = 'High';
            color = 'bg-orange-500';
            percentage = 75;
        } else {
            level = 'Critical';
            color = 'bg-red-500';
            percentage = 100;
        }
        
        document.getElementById('threat-level-text').textContent = level;
        document.getElementById('threat-indicator').className = `w-4 h-4 rounded-full mr-2 ${color}`;
        document.getElementById('threat-level-bar').style.width = `${percentage}%`;
    },

    // Toggle play/pause
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('play-pause-btn');
        
        if (this.isPlaying) {
            btn.innerHTML = '<i class="fas fa-pause mr-2"></i>Pause';
        } else {
            btn.innerHTML = '<i class="fas fa-play mr-2"></i>Play';
        }
    },

    // Reset map
    resetMap() {
        this.attackCount = 0;
        this.attacks = [];
        this.countries.forEach(country => country.attacks = 0);
        Object.values(this.attackTypes).forEach(type => type.count = 0);
        
        document.getElementById('attack-overlay').innerHTML = '';
        this.updateStatistics();
        this.updateRecentAttacks();
        this.updateTopTargets();
        this.updateAttackTypesChart();
        this.updateThreatLevel();
        this.updateLiveCounter();
    },

    // Get time ago string
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        
        if (minutes > 0) return `${minutes}m ago`;
        return `${seconds}s ago`;
    }
};

// Add CSS for attack line animation
const style = document.createElement('style');
style.textContent = `
    @keyframes attackLine {
        0% { width: 0%; opacity: 1; }
        100% { width: var(--line-width); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CyberAttackMap.init();
});
