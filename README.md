# 🛡️ Cyber Securivox - Cybersecurity Awareness Platform

**Build Safe Habits. Stay Protected.**

Cyber Securivox is a comprehensive cybersecurity awareness and habit-building platform designed to help users develop daily digital safety practices and learn essential security skills.

## 🌟 Features

### 🏠 **Home Page**
- Modern, responsive landing page
- Overview of all security tools
- Cybersecurity statistics and facts
- Mobile-first design with Tailwind CSS

### 📊 **Cyber Habit Tracker**
- **Daily Security Checklist** with 7 essential habits
- **Interactive Progress Ring** showing completion percentage
- **Streak Counter** for consecutive days
- **Security Score** based on completed habits
- **Weekly Calendar View** with progress visualization
- **Local Storage** persistence - your progress is saved

### 🔗 **Suspicious Link Checker**
- **Real-time URL Analysis** for phishing detection
- **Pattern Recognition** for suspicious domains and keywords
- **Risk Assessment** with detailed security warnings
- **Scan History** with local storage
- **Educational Tips** on link safety

### 🔐 **Password Strength Tester**
- **Live Password Analysis** with strength meter
- **Detailed Security Feedback** with improvement suggestions
- **Entropy Calculation** and crack time estimation
- **Secure Password Generator** with customizable options
- **Copy to Clipboard** functionality
- **No Data Storage** - all testing happens locally

### 🤖 **CyberCoach Chatbot**
- **Interactive Q&A** on cybersecurity topics
- **Knowledge Base** covering phishing, passwords, 2FA, WiFi security
- **Quick Questions** for common security concerns
- **Chat History** with local storage
- **Typing Indicators** and smooth animations

### 📚 **Learning Center**
- **Structured Lessons** from beginner to advanced
- **Progress Tracking** with completion status
- **Interactive Content** with step-by-step guides
- **Daily Security Tips** that change based on the date
- **Learning Streaks** to encourage consistent study
- **Security News & Alerts** section

### 🔍 **Security Scanner** (Bonus Feature)
- **Comprehensive Security Assessment** of browser and system
- **Real-time Analysis** of security settings
- **Detailed Recommendations** with priority levels
- **Interactive Progress Visualization**
- **Manual Security Checklist**

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome 6.4.0
- **Storage**: localStorage for data persistence
- **Architecture**: Modular JavaScript with no dependencies

## 📁 Project Structure

```
cyber-securivox/
├── index.html                 # Home page
├── tracker.html              # Habit tracker
├── link-checker.html         # Link security checker
├── password-tester.html      # Password strength tester
├── chatbot.html              # CyberCoach chatbot
├── learn.html                # Learning center
├── security-scanner.html     # Security scanner (bonus)
├── start-server.bat          # Server launcher script
├── README.md                 # This file
└── assets/
    ├── css/
    │   └── style.css         # Custom styles and animations
    └── js/
        ├── main.js           # Core functionality
        ├── tracker.js        # Habit tracking logic
        ├── link-checker.js   # Link analysis
        ├── password-tester.js # Password security
        ├── chatbot.js        # Chatbot functionality
        ├── learn.js          # Learning system
        └── security-scanner.js # Security assessment
```

## 🚀 Getting Started

### Option 1: Direct File Access
1. Open `index.html` directly in your web browser
2. All features will work except some advanced browser security features

### Option 2: Local Server (Recommended)
1. **Python**: `python -m http.server 8000`
2. **Node.js**: `npx http-server -p 3000`
3. **PHP**: `php -S localhost:8080`
4. **VS Code**: Install "Live Server" extension

### Option 3: Use the Launcher
1. Double-click `start-server.bat` (Windows)
2. Choose your preferred server method
3. Open the provided URL in your browser

## 🎨 Design Features

### Color Scheme
- **Primary**: Teal (#14B8A6), Navy (#1E3A8A), Sky Blue (#0EA5E9)
- **Secondary**: Purple (#8B5CF6), Green (#10B981), Orange (#F59E0B)
- **Neutral**: Various shades of gray for text and backgrounds

### UI/UX Elements
- **Soft Gradients** throughout the interface
- **Rounded Cards** with hover animations
- **Responsive Grid Layouts** that adapt to screen size
- **Smooth Transitions** and micro-interactions
- **Accessibility Features** including focus states and ARIA labels

## 🔧 Key Features Explained

### Habit Tracker
- **7 Daily Habits**: Password checks, app permissions, spam cleanup, updates, backups, network security, social media privacy
- **Progress Calculation**: Real-time percentage based on completed habits
- **Streak System**: Tracks consecutive days with 80%+ completion
- **Points System**: Each habit has different point values
- **Data Persistence**: Uses localStorage to save progress

### Link Checker
- **Phishing Detection**: Checks for suspicious domains, keywords, and patterns
- **URL Analysis**: Examines protocol, domain structure, and file extensions
- **Risk Scoring**: Calculates risk based on multiple factors
- **Educational Feedback**: Provides explanations for security warnings

### Password Tester
- **Strength Calculation**: Multi-factor analysis including length, complexity, entropy
- **Common Password Detection**: Checks against database of weak passwords
- **Pattern Recognition**: Identifies repeating and sequential characters
- **Secure Generation**: Creates cryptographically strong passwords

### CyberCoach
- **Knowledge Base**: Comprehensive Q&A on cybersecurity topics
- **Natural Language Processing**: Keyword matching for relevant responses
- **Interactive Chat**: Real-time conversation with typing indicators
- **Educational Content**: Formatted responses with actionable advice

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for smartphones and tablets
- **Responsive Navigation**: Collapsible menu for mobile devices
- **Touch-Friendly**: Large buttons and touch targets
- **Adaptive Layouts**: Grid systems that reflow on different screen sizes

## 🔒 Privacy & Security

- **No Data Collection**: All processing happens locally in the browser
- **No External APIs**: Completely self-contained application
- **localStorage Only**: Data stays on your device
- **No Tracking**: No analytics or tracking scripts

## 🎯 Educational Value

### Learning Objectives
- **Password Security**: Understanding strong password creation and management
- **Phishing Awareness**: Recognizing and avoiding email scams
- **Browser Security**: Configuring safe browsing settings
- **Network Safety**: Securing WiFi and understanding VPNs
- **Privacy Protection**: Managing social media and app permissions

### Skill Development
- **Risk Assessment**: Learning to evaluate digital threats
- **Security Habits**: Building consistent protective behaviors
- **Incident Response**: Knowing what to do when things go wrong
- **Tool Usage**: Familiarity with security software and services

## 🚀 Deployment Options

### GitHub Pages
1. Upload files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/cyber-securivox`

### Netlify
1. Drag and drop the project folder to Netlify
2. Get instant deployment with custom domain options

### Local Network
1. Run local server on your network
2. Access from other devices using your IP address

## 🔮 Future Enhancements

- **Dark Mode**: Toggle between light and dark themes
- **Multi-language Support**: Internationalization for global users
- **Advanced Analytics**: More detailed security metrics
- **Gamification**: Badges, achievements, and leaderboards
- **Export Features**: PDF reports and progress summaries
- **Integration APIs**: Connect with password managers and security tools

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute as needed for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for digital safety education and awareness.**

*Cyber Securivox - Building a safer digital world, one habit at a time.*
