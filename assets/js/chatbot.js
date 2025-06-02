/**
 * Cyber Securivox - CyberCoach Chatbot JavaScript
 * Provides cybersecurity Q&A functionality
 */

const CyberCoach = {
    // Knowledge base for cybersecurity questions
    knowledgeBase: {
        // Phishing and Email Security
        'phishing': {
            keywords: ['phishing', 'phish', 'email', 'suspicious email', 'scam email', 'fake email'],
            response: `🎣 **Identifying Phishing Emails:**

**Red Flags to Watch For:**
• Urgent language ("Act now!", "Limited time!")
• Generic greetings ("Dear Customer")
• Suspicious sender addresses
• Unexpected attachments or links
• Requests for personal information
• Poor grammar and spelling

**What to Do:**
1. Don't click any links or download attachments
2. Verify the sender through a separate channel
3. Report the email to your IT department
4. Delete the email
5. If you clicked a link, change your passwords immediately

**Pro Tip:** Hover over links to see the real destination before clicking!`
        },

        // Password Security
        'password': {
            keywords: ['password', 'strong password', 'password security', 'password manager'],
            response: `🔐 **Creating Strong Passwords:**

**Best Practices:**
• Use at least 12 characters (longer is better)
• Mix uppercase, lowercase, numbers, and symbols
• Avoid personal information (birthdays, names)
• Use unique passwords for each account
• Consider passphrases (e.g., "Coffee!Sunrise#Beach2024")

**Password Manager Benefits:**
• Generates strong, unique passwords
• Stores them securely
• Auto-fills login forms
• Syncs across devices

**Popular Password Managers:**
• Bitwarden (free & open source)
• 1Password
• LastPass
• Dashlane

**Quick Test:** Can you remember it easily? If yes, it might be too simple!`
        },

        // Two-Factor Authentication
        '2fa': {
            keywords: ['2fa', 'two factor', 'two-factor', 'authentication', 'mfa', 'multi-factor'],
            response: `🛡️ **Two-Factor Authentication (2FA):**

**What is 2FA?**
An extra security layer requiring two forms of verification:
1. Something you know (password)
2. Something you have (phone, app, hardware key)

**Types of 2FA:**
• **SMS codes** - Sent to your phone
• **Authenticator apps** - Google Authenticator, Authy
• **Hardware keys** - YubiKey, Titan Security Key
• **Biometrics** - Fingerprint, face recognition

**How to Enable:**
1. Go to account security settings
2. Look for "Two-Factor Authentication" or "2FA"
3. Choose your preferred method
4. Follow setup instructions
5. Save backup codes in a safe place

**Pro Tip:** Authenticator apps are more secure than SMS!`
        },

        // WiFi Security
        'wifi': {
            keywords: ['wifi', 'wi-fi', 'wireless', 'network security', 'router'],
            response: `📶 **Securing Your WiFi Network:**

**Router Security Checklist:**
• Change default admin password
• Use WPA3 encryption (or WPA2 if WPA3 unavailable)
• Create a strong WiFi password
• Hide network name (SSID) if desired
• Enable firewall
• Keep firmware updated

**WiFi Password Tips:**
• Use 15+ characters
• Mix letters, numbers, symbols
• Avoid dictionary words
• Don't share with strangers

**Public WiFi Safety:**
• Avoid sensitive activities (banking, shopping)
• Use VPN when possible
• Turn off auto-connect
• Verify network names with staff
• Keep software updated

**Red Flags:** Networks named "Free WiFi" or similar generic names`
        },

        // Social Media Security
        'social media': {
            keywords: ['social media', 'facebook', 'instagram', 'twitter', 'linkedin', 'privacy settings'],
            response: `📱 **Social Media Security:**

**Privacy Settings Checklist:**
• Review who can see your posts
• Limit friend/follower requests
• Turn off location tracking
• Disable facial recognition
• Review app permissions
• Enable login alerts

**Safe Posting Practices:**
• Don't share personal information (address, phone)
• Avoid posting travel plans in real-time
• Be cautious with photos containing personal details
• Think before you post - it's permanent!

**Account Security:**
• Use strong, unique passwords
• Enable two-factor authentication
• Review active sessions regularly
• Log out from shared devices

**Scam Awareness:**
• Fake friend requests
• "You've won" messages
• Suspicious links in DMs
• Impersonation accounts`
        },

        // Malware and Viruses
        'malware': {
            keywords: ['malware', 'virus', 'ransomware', 'trojan', 'spyware', 'infected'],
            response: `🦠 **Malware Protection:**

**Types of Malware:**
• **Viruses** - Self-replicating programs
• **Ransomware** - Encrypts files for money
• **Trojans** - Disguised malicious software
• **Spyware** - Steals personal information
• **Adware** - Unwanted advertisements

**Prevention:**
• Keep software updated
• Use reputable antivirus software
• Don't download from untrusted sources
• Be cautious with email attachments
• Regular system backups

**Signs of Infection:**
• Slow computer performance
• Unexpected pop-ups
• Programs crashing frequently
• Unknown programs running
• High network activity

**If Infected:**
1. Disconnect from internet
2. Run antivirus scan
3. Remove detected threats
4. Change all passwords
5. Restore from clean backup if needed`
        },

        // Data Backup
        'backup': {
            keywords: ['backup', 'data backup', 'cloud backup', 'restore'],
            response: `💾 **Data Backup Best Practices:**

**3-2-1 Rule:**
• **3** copies of important data
• **2** different storage types
• **1** offsite backup

**Backup Options:**
• **Cloud storage** - Google Drive, iCloud, OneDrive
• **External drives** - USB, external hard drives
• **Network storage** - NAS devices
• **Automated backups** - Time Machine, File History

**What to Backup:**
• Documents and photos
• Email and contacts
• Browser bookmarks
• Software licenses
• System settings

**Testing Backups:**
• Regularly test restore process
• Verify backup integrity
• Update backup strategy as needed

**Pro Tip:** Automate your backups so you don't forget!`
        },

        // Hacked Account Recovery
        'hacked': {
            keywords: ['hacked', 'compromised', 'account stolen', 'unauthorized access'],
            response: `🚨 **If You Think You've Been Hacked:**

**Immediate Actions:**
1. **Change passwords** for all accounts
2. **Enable 2FA** where possible
3. **Check account activity** for unauthorized actions
4. **Scan devices** for malware
5. **Contact your bank** if financial accounts affected

**Account Recovery:**
• Use official account recovery options
• Contact customer support
• Provide identity verification
• Review and revoke app permissions

**Damage Control:**
• Notify contacts about potential scam messages
• Monitor credit reports
• Consider identity theft protection
• Document everything for reports

**Prevention for Future:**
• Use unique passwords for each account
• Enable security notifications
• Regular security checkups
• Keep software updated

**Remember:** Act quickly but don't panic. Most issues can be resolved!`
        }
    },

    // Initialize the chatbot
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.loadChatHistory();
    },

    // Setup event listeners
    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');
        const clearButton = document.getElementById('clear-chat');
        const quickQuestions = document.querySelectorAll('.quick-question');

        // Send message on button click
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Clear chat
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearChat();
            });
        }

        // Quick question buttons
        quickQuestions.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-question');
                this.sendMessage(question);
            });
        });
    },

    // Show welcome message
    showWelcomeMessage() {
        const welcomeMessage = `👋 **Welcome to CyberCoach!**

I'm here to help you stay safe online. You can ask me about:
• Phishing and email security
• Password best practices
• Two-factor authentication
• WiFi and network security
• Social media privacy
• Malware protection
• Data backup strategies
• Account recovery

What would you like to learn about today?`;

        this.addMessage('bot', welcomeMessage);
    },

    // Send message
    sendMessage(predefinedMessage = null) {
        const chatInput = document.getElementById('chat-input');
        const message = predefinedMessage || chatInput.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage('user', message);

        // Clear input if not predefined
        if (!predefinedMessage) {
            chatInput.value = '';
        }

        // Show typing indicator
        this.showTypingIndicator();

        // Generate response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
            this.saveChatHistory();
        }, 1000 + Math.random() * 1000); // 1-2 second delay
    },

    // Add message to chat
    addMessage(sender, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`;

        const bubbleClass = sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot';
        const maxWidth = sender === 'user' ? 'max-w-xs' : 'max-w-md';

        messageDiv.innerHTML = `
            <div class="${bubbleClass} ${maxWidth} px-4 py-2 shadow-sm">
                ${sender === 'bot' ? this.formatBotMessage(message) : this.escapeHtml(message)}
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    },

    // Format bot message with markdown-like styling
    formatBotMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '&bull;')
            .replace(/\n/g, '<br>')
            .replace(/🎣|🔐|🛡️|📶|📱|🦠|💾|🚨|👋/g, '<span class="text-lg">$&</span>');
    },

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Generate response based on user input
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Find matching knowledge base entry
        for (const [topic, data] of Object.entries(this.knowledgeBase)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }

        // Handle greetings
        if (this.isGreeting(lowerMessage)) {
            return this.getGreetingResponse();
        }

        // Handle thanks
        if (this.isThanks(lowerMessage)) {
            return this.getThanksResponse();
        }

        // Default response for unrecognized queries
        return this.getDefaultResponse();
    },

    // Check if message is a greeting
    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => message.includes(greeting));
    },

    // Check if message is thanks
    isThanks(message) {
        const thanks = ['thank', 'thanks', 'appreciate', 'helpful'];
        return thanks.some(thank => message.includes(thank));
    },

    // Get greeting response
    getGreetingResponse() {
        const responses = [
            "Hello! I'm CyberCoach, your cybersecurity assistant. How can I help you stay safe online today?",
            "Hi there! Ready to boost your digital security? What would you like to learn about?",
            "Hey! Great to see you taking cybersecurity seriously. What questions do you have for me?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Get thanks response
    getThanksResponse() {
        const responses = [
            "You're welcome! Stay safe out there! 🛡️",
            "Happy to help! Remember, cybersecurity is a journey, not a destination. 🔐",
            "Glad I could assist! Feel free to ask if you have more questions. 👍"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Get default response
    getDefaultResponse() {
        return `I'd love to help, but I'm not sure about that specific topic. I specialize in:

• **Phishing** and email security
• **Password** best practices
• **Two-factor authentication**
• **WiFi** and network security
• **Social media** privacy
• **Malware** protection
• **Data backup** strategies
• **Account recovery**

Try asking about one of these topics, or use the quick questions below!`;
    },

    // Show typing indicator
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start mb-4';
        typingDiv.innerHTML = `
            <div class="chat-bubble-bot max-w-md px-4 py-2 shadow-sm">
                <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <span class="ml-2 text-gray-500 text-sm">CyberCoach is typing...</span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    },

    // Hide typing indicator
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    },

    // Scroll to bottom of chat
    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Clear chat
    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';
            this.showWelcomeMessage();
            this.saveChatHistory();
            CyberSecurivox.showNotification('Chat cleared', 'info');
        }
    },

    // Save chat history
    saveChatHistory() {
        const chatMessages = document.getElementById('chat-messages');
        const messages = Array.from(chatMessages.children).map(msg => ({
            html: msg.innerHTML,
            timestamp: new Date().toISOString()
        }));

        CyberSecurivox.setStoredData('chatHistory', messages.slice(-20)); // Keep last 20 messages
    },

    // Load chat history
    loadChatHistory() {
        const history = CyberSecurivox.getStoredData('chatHistory');
        if (history && history.length > 0) {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = ''; // Clear welcome message

            history.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.innerHTML = msg.html;
                chatMessages.appendChild(messageDiv);
            });

            this.scrollToBottom();
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CyberCoach.init();
});
