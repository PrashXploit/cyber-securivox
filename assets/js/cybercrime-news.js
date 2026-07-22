/**
 * Cyber Securivox - Cybercrime News Feed
 * Real-time cybersecurity news and threat intelligence
 */

const CybercrimeNews = {
    articles: [],
    filteredArticles: [],
    currentPage: 1,
    articlesPerPage: 10,
    updateInterval: null,

    // Initialize the news feed
    init() {
        this.setupEventListeners();
        this.loadNews();
        this.startAutoRefresh();
    },

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('refresh-news').addEventListener('click', () => {
            this.loadNews();
        });

        document.getElementById('news-category').addEventListener('change', () => {
            this.filterNews();
        });

        document.getElementById('news-severity').addEventListener('change', () => {
            this.filterNews();
        });

        document.getElementById('load-more').addEventListener('click', () => {
            this.loadMoreArticles();
        });

        document.getElementById('close-sources').addEventListener('click', () => {
            document.getElementById('sources-modal').classList.add('hidden');
        });
    },

    // Load news articles
    async loadNews() {
        const loadingEl = document.getElementById('loading-news');
        const feedEl = document.getElementById('news-feed');
        
        loadingEl.classList.remove('hidden');
        feedEl.innerHTML = '';

        try {
            // Simulate API call - in real implementation, this would fetch from actual news APIs
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.articles = this.generateMockNews();
            this.filteredArticles = [...this.articles];
            this.currentPage = 1;
            
            this.updateStatistics();
            this.displayArticles();
            this.updateLastUpdated();
            this.checkBreakingNews();
            
        } catch (error) {
            console.error('Error loading news:', error);
            CyberSecurivox.showNotification('Failed to load news', 'error');
        } finally {
            loadingEl.classList.add('hidden');
        }
    },

    // Generate mock news data
    generateMockNews() {
        const newsTemplates = [
            {
                title: "Major Healthcare Provider Suffers Data Breach Affecting 2.3 Million Patients",
                category: "breaches",
                severity: "critical",
                content: "A major healthcare provider has disclosed a significant data breach that compromised personal and medical information of approximately 2.3 million patients."
            },
            {
                title: "New Ransomware Strain Targets Critical Infrastructure",
                category: "ransomware", 
                severity: "high",
                content: "Security researchers have identified a new ransomware strain specifically designed to target critical infrastructure systems."
            },
            {
                title: "Zero-Day Vulnerability Discovered in Popular Web Framework",
                category: "vulnerabilities",
                severity: "critical",
                content: "A critical zero-day vulnerability has been discovered in a widely-used web application framework."
            },
            {
                title: "Sophisticated Phishing Campaign Targets Financial Institutions",
                category: "phishing",
                severity: "high",
                content: "Cybersecurity firms have detected a sophisticated phishing campaign targeting employees of major financial institutions."
            },
            {
                title: "Banking Trojan Evolves with New Evasion Techniques",
                category: "malware",
                severity: "medium",
                content: "A well-known banking trojan has been updated with advanced evasion techniques."
            }
        ];

        const sources = ['CyberScoop', 'Krebs on Security', 'Threatpost', 'Security Week', 'Dark Reading'];
        const articles = [];
        const now = new Date();

        for (let i = 0; i < 25; i++) {
            const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
            const publishTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
            
            articles.push({
                id: i + 1,
                title: template.title,
                content: template.content,
                category: template.category,
                severity: template.severity,
                source: sources[Math.floor(Math.random() * sources.length)],
                publishedAt: publishTime,
                readTime: Math.floor(Math.random() * 5) + 2,
                tags: this.generateTags(template.category),
                url: `#article-${i + 1}`
            });
        }

        return articles.sort((a, b) => b.publishedAt - a.publishedAt);
    },

    // Generate tags for articles
    generateTags(category) {
        const tagMap = {
            breaches: ['Data Breach', 'Privacy', 'GDPR'],
            malware: ['Malware Analysis', 'Threat Detection'],
            ransomware: ['Ransomware', 'Backup'],
            phishing: ['Social Engineering', 'Email Security'],
            vulnerabilities: ['CVE', 'Patch Management']
        };
        
        const tags = tagMap[category] || ['Cybersecurity'];
        return tags.slice(0, Math.floor(Math.random() * 2) + 1);
    },

    // Filter news
    filterNews() {
        const category = document.getElementById('news-category').value;
        const severity = document.getElementById('news-severity').value;
        
        this.filteredArticles = this.articles.filter(article => {
            const categoryMatch = category === 'all' || article.category === category;
            const severityMatch = severity === 'all' || article.severity === severity;
            return categoryMatch && severityMatch;
        });
        
        this.currentPage = 1;
        this.displayArticles();
    },

    // Display articles
    displayArticles() {
        const feedEl = document.getElementById('news-feed');
        const endIndex = this.currentPage * this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(0, endIndex);
        
        feedEl.innerHTML = articlesToShow.map(article => this.createArticleHTML(article)).join('');
        
        const loadMoreBtn = document.getElementById('load-more');
        if (endIndex < this.filteredArticles.length) {
            loadMoreBtn.classList.remove('hidden');
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    },

    // Create article HTML
    createArticleHTML(article) {
        const timeAgo = this.getTimeAgo(article.publishedAt);
        const severityColor = this.getSeverityColor(article.severity);
        const categoryIcon = this.getCategoryIcon(article.category);
        
        return `
            <article class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <i class="${categoryIcon} text-2xl ${severityColor}"></i>
                        <div>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${severityColor} bg-opacity-20 capitalize">
                                ${article.severity}
                            </span>
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 ml-2 capitalize">
                                ${article.category}
                            </span>
                        </div>
                    </div>
                    <div class="text-right text-sm text-gray-500">
                        <div>${timeAgo}</div>
                        <div>${article.readTime} min read</div>
                    </div>
                </div>
                
                <h2 class="text-xl font-bold text-gray-800 mb-3 hover:text-teal-600 cursor-pointer">
                    ${article.title}
                </h2>
                
                <p class="text-gray-600 mb-4">
                    ${article.content}
                </p>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-500">
                            <i class="fas fa-newspaper mr-1"></i>${article.source}
                        </span>
                        <div class="flex flex-wrap gap-1">
                            ${article.tags.map(tag => `
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="text-gray-500 hover:text-teal-600 transition duration-300">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="text-gray-500 hover:text-yellow-600 transition duration-300">
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </article>
        `;
    },

    // Helper functions
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return 'Just now';
    },

    getSeverityColor(severity) {
        const colors = {
            critical: 'text-red-600',
            high: 'text-orange-600',
            medium: 'text-yellow-600',
            low: 'text-blue-600'
        };
        return colors[severity] || 'text-gray-600';
    },

    getCategoryIcon(category) {
        const icons = {
            breaches: 'fas fa-database',
            malware: 'fas fa-virus',
            ransomware: 'fas fa-lock',
            phishing: 'fas fa-fish',
            vulnerabilities: 'fas fa-bug'
        };
        return icons[category] || 'fas fa-newspaper';
    },

    // Load more articles
    loadMoreArticles() {
        this.currentPage++;
        this.displayArticles();
    },

    // Update statistics
    updateStatistics() {
        document.getElementById('total-articles').textContent = this.articles.length;
        document.getElementById('critical-alerts').textContent = this.articles.filter(a => a.severity === 'critical').length;
        document.getElementById('security-updates').textContent = this.articles.filter(a => a.category === 'vulnerabilities').length;
        document.getElementById('new-vulnerabilities').textContent = this.articles.filter(a => a.category === 'vulnerabilities').length;
    },

    // Update last updated time
    updateLastUpdated() {
        document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    },

    // Check for breaking news
    checkBreakingNews() {
        const criticalNews = this.articles.filter(a => a.severity === 'critical');
        if (criticalNews.length > 0) {
            const latest = criticalNews[0];
            document.getElementById('breaking-news-text').textContent = latest.title;
            document.getElementById('breaking-news').classList.remove('hidden');
        }
    },

    // Start auto refresh
    startAutoRefresh() {
        this.updateInterval = setInterval(() => {
            this.loadNews();
        }, 300000); // Refresh every 5 minutes
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CybercrimeNews.init();
});
