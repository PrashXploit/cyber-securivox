# CYBER SECURIVOX - UML DIAGRAMS

## 📋 UML DIAGRAM COLLECTION

This document contains all UML diagrams for the Cyber Securivox cybersecurity education platform, following UML 2.0 standards and best practices.

---

## 🎯 1. USE CASE DIAGRAM

### **Purpose:** Shows all user interactions and system functionality

```mermaid
graph LR
    subgraph "Cyber Securivox System"
        subgraph "Core Security Features"
            UC1[Track Daily Habits]
            UC2[Check Suspicious Links]
            UC3[Test Password Strength]
            UC4[Generate Secure Passwords]
            UC5[Chat with CyberCoach]
            UC6[Access Learning Materials]
            UC7[Perform Security Scans]
        end
        
        subgraph "Advanced Security Features"
            UC8[Hide Messages in Images]
            UC9[Extract Hidden Messages]
            UC10[View Cybercrime News]
            UC11[Filter Threat Intelligence]
            UC12[Monitor Global Attacks]
            UC13[Analyze Attack Patterns]
        end
        
        subgraph "System Management"
            UC14[Manage User Progress]
            UC15[Export Progress Reports]
            UC16[Configure Settings]
            UC17[View Statistics]
        end
    end
    
    %% Actors
    User[👤 End User]
    Admin[👨‍💼 System Administrator]
    
    %% User Connections
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC14
    User --> UC16
    User --> UC17
    
    %% Admin Connections
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    
    %% Include Relationships
    UC1 -.->|includes| UC14
    UC6 -.->|includes| UC14
    UC7 -.->|includes| UC14
    UC10 -.->|includes| UC11
    UC12 -.->|includes| UC13
    
    %% Extend Relationships
    UC3 -.->|extends| UC4
    UC8 -.->|extends| UC9
    
    %% Styling
    classDef actor fill:#ffeb3b,stroke:#f57f17,stroke-width:2px
    classDef usecase fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef advanced fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef system fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class User,Admin actor
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7 usecase
    class UC8,UC9,UC10,UC11,UC12,UC13 advanced
    class UC14,UC15,UC16,UC17 system
```

### **Actors:**
- **End User:** Primary user accessing all security tools and educational content
- **System Administrator:** Manages platform configuration and generates reports

### **Use Case Categories:**
- **Core Security Features:** Essential daily security tools (7 use cases)
- **Advanced Security Features:** Specialized tools for advanced users (6 use cases)
- **System Management:** Administrative and progress tracking (4 use cases)

### **Relationships:**
- **Include:** Progress management is included in habit tracking, learning, and scanning
- **Extend:** Password generation extends testing; message extraction extends hiding

---

## 🏗️ 2. CLASS DIAGRAM

### **Purpose:** Shows the object-oriented structure and relationships

```mermaid
classDiagram
    class CyberSecurivox {
        -currentUser: User
        -moduleInstances: Array
        -globalSettings: Object
        +init(): void
        +setupMobileMenu(): void
        +showNotification(message: string): void
        +getStoredData(key: string): Object
        +saveData(key: string, data: Object): void
    }
    
    class SecurityTool {
        <<abstract>>
        #name: string
        #description: string
        #isActive: boolean
        +initialize(): void
        +execute(): void
        +saveProgress(): void
        +loadProgress(): void
    }
    
    class HabitTracker {
        -habits: Array~Habit~
        -currentStreak: number
        -completionPercentage: number
        -securityScore: number
        +loadHabits(): void
        +toggleHabit(habitId: string): void
        +calculateProgress(): Object
        +updateStreak(): void
        +getWeeklyData(): Array
    }
    
    class LinkChecker {
        -scanHistory: Array~ScanResult~
        -riskPatterns: Array~Pattern~
        -suspiciousKeywords: Array~string~
        +analyzeURL(url: string): ScanResult
        +checkPhishingPatterns(url: string): boolean
        +generateReport(result: ScanResult): string
        +saveScanHistory(result: ScanResult): void
    }
    
    class PasswordTester {
        -strengthCriteria: Object
        -commonPasswords: Array~string~
        -entropyCalculator: EntropyCalculator
        +testPassword(password: string): PasswordResult
        +calculateStrength(password: string): number
        +generatePassword(options: Object): string
        +checkCommonPassword(password: string): boolean
    }
    
    class CyberCoach {
        -knowledgeBase: Array~QAPair~
        -chatHistory: Array~Message~
        -responseTemplates: Object
        +processQuery(query: string): string
        +generateResponse(query: string): string
        +updateHistory(message: Message): void
        +searchKnowledge(keywords: Array): Array
    }
    
    class LearningCenter {
        -lessons: Array~Lesson~
        -userProgress: Object
        -completionStatus: Array~boolean~
        -certificates: Array~Certificate~
        +loadLessons(): void
        +trackProgress(lessonId: string): void
        +generateCertificate(courseId: string): Certificate
        +getRecommendations(): Array~Lesson~
    }
    
    class SecurityScanner {
        -scanResults: Array~SecurityResult~
        -recommendations: Array~Recommendation~
        -securityChecks: Array~SecurityCheck~
        +performScan(): SecurityResult
        +analyzeSettings(): Object
        +generateReport(): string
        +getPrioritizedRecommendations(): Array
    }
    
    class ImageSteganography {
        -imageData: ImageData
        -secretMessage: string
        -password: string
        -algorithm: string
        +hideMessage(image: File, message: string, password: string): ImageData
        +extractMessage(image: File, password: string): string
        +validateImage(image: File): boolean
        +encryptMessage(message: string, password: string): string
    }
    
    class CybercrimeNews {
        -newsArticles: Array~NewsArticle~
        -categories: Array~Category~
        -filters: Object
        -lastUpdate: Date
        +fetchNews(): Promise~Array~
        +filterByCategory(category: string): Array
        +searchArticles(query: string): Array
        +updateFeed(): void
    }
    
    class CyberAttackMap {
        -attackData: Array~Attack~
        -mapProjection: Object
        -attackTypes: Object
        -statistics: Object
        +initializeMap(): void
        +animateAttack(attack: Attack): void
        +updateStatistics(): void
        +filterAttacks(type: string): Array
        +generateAttackData(): Attack
    }
    
    class DataManager {
        -localStorage: Storage
        -sessionStorage: Storage
        -encryptionKey: string
        +save(key: string, data: Object): boolean
        +load(key: string): Object
        +encrypt(data: string): string
        +decrypt(data: string): string
        +clearData(): void
    }
    
    class Habit {
        +id: string
        +title: string
        +description: string
        +points: number
        +completed: boolean
        +completionDate: Date
    }
    
    class ScanResult {
        +url: string
        +riskLevel: string
        +score: number
        +factors: Array~string~
        +timestamp: Date
        +recommendations: Array~string~
    }
    
    class PasswordResult {
        +score: number
        +strength: string
        +feedback: Array~string~
        +entropy: number
        +crackTime: string
    }
    
    class Attack {
        +id: string
        +type: string
        +source: Location
        +target: Location
        +timestamp: Date
        +severity: number
    }
    
    %% Inheritance Relationships
    SecurityTool <|-- HabitTracker
    SecurityTool <|-- LinkChecker
    SecurityTool <|-- PasswordTester
    SecurityTool <|-- CyberCoach
    SecurityTool <|-- LearningCenter
    SecurityTool <|-- SecurityScanner
    SecurityTool <|-- ImageSteganography
    SecurityTool <|-- CybercrimeNews
    SecurityTool <|-- CyberAttackMap
    
    %% Composition Relationships
    CyberSecurivox *-- SecurityTool
    CyberSecurivox *-- DataManager
    HabitTracker *-- Habit
    LinkChecker *-- ScanResult
    PasswordTester *-- PasswordResult
    CyberAttackMap *-- Attack
    
    %% Association Relationships
    SecurityTool --> DataManager : uses
    HabitTracker --> DataManager : stores progress
    LinkChecker --> DataManager : stores history
    PasswordTester --> DataManager : stores results
    CyberCoach --> DataManager : stores chat history
    LearningCenter --> DataManager : stores progress
    SecurityScanner --> DataManager : stores scan results
```

### **Class Hierarchy:**
- **CyberSecurivox:** Main application controller
- **SecurityTool:** Abstract base class for all security modules
- **9 Specialized Classes:** Each security module extends SecurityTool
- **Data Classes:** Habit, ScanResult, PasswordResult, Attack
- **Utility Classes:** DataManager for storage operations

### **Design Patterns:**
- **Template Method:** SecurityTool provides common interface
- **Strategy Pattern:** Different algorithms for each security tool
- **Observer Pattern:** Progress updates across modules
- **Singleton Pattern:** DataManager for centralized storage

---

## 📊 3. SEQUENCE DIAGRAMS

### **A. Habit Tracking Process**

```mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant HT as HabitTracker
    participant DM as DataManager
    participant LS as LocalStorage
    
    Note over U,LS: Daily Habit Tracking Sequence
    
    U->>UI: Access Habit Tracker Page
    UI->>HT: Initialize HabitTracker
    HT->>DM: loadProgress()
    DM->>LS: getItem('habitData')
    LS-->>DM: Return stored data
    DM-->>HT: Return habit progress
    HT->>HT: calculateProgress()
    HT-->>UI: Display habits and progress
    UI-->>U: Show habit checklist
    
    Note over U,LS: User Completes a Habit
    
    U->>UI: Toggle habit completion
    UI->>HT: toggleHabit(habitId)
    HT->>HT: updateHabitStatus()
    HT->>HT: calculateProgress()
    HT->>HT: updateStreak()
    HT->>DM: saveProgress(updatedData)
    DM->>DM: encrypt(data)
    DM->>LS: setItem('habitData', encryptedData)
    LS-->>DM: Confirm save
    DM-->>HT: Confirm save success
    HT-->>UI: Return updated progress
    UI->>UI: updateProgressDisplay()
    UI->>UI: showNotification("Habit completed!")
    UI-->>U: Display updated progress
    
    Note over U,LS: Progress Calculation
    
    HT->>HT: calculateCompletionPercentage()
    HT->>HT: calculateSecurityScore()
    HT->>HT: updateStreakCounter()
    HT-->>UI: Return calculated metrics
    UI->>UI: updateProgressRing()
    UI->>UI: updateStreakDisplay()
    UI-->>U: Show visual progress updates
```

### **B. Image Steganography Process**

```mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant IS as ImageSteganography
    participant Canvas as Canvas API
    participant File as File System
    participant Crypto as Crypto Utils

    Note over U,Crypto: Hide Message in Image Process

    U->>UI: Upload image file
    UI->>File: readAsDataURL(imageFile)
    File-->>UI: Return image data
    UI->>Canvas: createImageData(image)
    Canvas-->>UI: Return ImageData object

    U->>UI: Enter secret message
    U->>UI: Enter password
    U->>UI: Click "Hide Message"

    UI->>IS: hideMessage(imageData, message, password)
    IS->>Crypto: encryptMessage(message, password)
    Crypto-->>IS: Return encrypted message
    IS->>IS: stringToBinary(encryptedMessage)
    IS->>IS: addDelimiter(binaryMessage)

    loop For each pixel
        IS->>Canvas: modifyLSB(pixel, messageBit)
        Canvas-->>IS: Return modified pixel
    end

    IS->>Canvas: putImageData(modifiedImageData)
    Canvas-->>IS: Return modified image
    IS-->>UI: Return processed image
    UI->>UI: displayPreview(originalImage, modifiedImage)
    UI-->>U: Show before/after comparison

    Note over U,Crypto: Extract Message from Image Process

    U->>UI: Upload steganographic image
    U->>UI: Enter password
    U->>UI: Click "Extract Message"

    UI->>IS: extractMessage(imageData, password)
    IS->>Canvas: getImageData(image)
    Canvas-->>IS: Return pixel data

    loop For each pixel
        IS->>IS: extractLSB(pixel)
        IS->>IS: buildBinaryMessage(bit)
        IS->>IS: checkForDelimiter()
    end

    IS->>IS: binaryToString(extractedBinary)
    IS->>Crypto: decryptMessage(encryptedMessage, password)
    Crypto-->>IS: Return decrypted message
    IS-->>UI: Return extracted message
    UI-->>U: Display secret message

    Note over U,Crypto: Error Handling

    alt Invalid password
        Crypto-->>IS: Decryption failed
        IS-->>UI: Return error
        UI-->>U: Show "Invalid password" message
    else Corrupted image
        IS-->>UI: Return error
        UI-->>U: Show "No hidden message found" message
    end
```

### **C. Link Security Analysis Process**

```mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant LC as LinkChecker
    participant DM as DataManager
    participant LS as LocalStorage

    Note over U,LS: URL Security Analysis

    U->>UI: Enter URL to check
    UI->>UI: validateURLFormat()
    UI->>LC: analyzeURL(url)

    LC->>LC: checkPhishingPatterns()
    LC->>LC: analyzeDomainReputation()
    LC->>LC: checkSuspiciousKeywords()
    LC->>LC: calculateRiskScore()

    LC->>LC: generateRecommendations()
    LC->>DM: saveScanHistory(result)
    DM->>LS: setItem('scanHistory', data)

    LC-->>UI: Return analysis result
    UI->>UI: displayRiskLevel()
    UI->>UI: showRecommendations()
    UI-->>U: Show security analysis

    Note over U,LS: Risk Assessment Display

    alt High Risk URL
        UI->>UI: showWarningAlert()
        UI->>UI: highlightRiskFactors()
        UI-->>U: Display danger warning
    else Medium Risk URL
        UI->>UI: showCautionAlert()
        UI-->>U: Display caution notice
    else Safe URL
        UI->>UI: showSafeIndicator()
        UI-->>U: Display safe confirmation
    end
```

---

## 🔄 4. ACTIVITY DIAGRAMS

### **A. CyberAttack Map Visualization Process**

```mermaid
flowchart TD
    Start([User Opens Attack Map]) --> Init[Initialize Map Module]
    Init --> LoadD3[Load D3.js Library]
    LoadD3 --> LoadTopo[Load TopoJSON World Data]
    LoadTopo --> CreateSVG[Create SVG Container]
    CreateSVG --> SetProjection[Set Map Projection]
    SetProjection --> DrawMap[Draw World Map]
    DrawMap --> InitStats[Initialize Statistics Dashboard]
    InitStats --> StartSim[Start Attack Simulation]

    StartSim --> GenAttack[Generate Random Attack]
    GenAttack --> SelectSource[Select Source Location]
    SelectSource --> SelectTarget[Select Target Location]
    SelectTarget --> SelectType[Select Attack Type]
    SelectType --> CreatePath[Create Attack Path]
    CreatePath --> AnimatePath[Animate Attack Trajectory]

    AnimatePath --> ShowExplosion[Show Explosion Effect]
    ShowExplosion --> UpdateStats[Update Live Statistics]
    UpdateStats --> UpdateCounters[Update Attack Counters]
    UpdateCounters --> UpdateThreat[Update Threat Level]
    UpdateThreat --> AddToFeed[Add to Recent Attacks Feed]

    AddToFeed --> CheckPause{Is Simulation Paused?}
    CheckPause -->|No| Delay[Wait Random Interval]
    CheckPause -->|Yes| WaitResume[Wait for Resume]

    Delay --> GenAttack
    WaitResume --> CheckResume{Resume Clicked?}
    CheckResume -->|Yes| GenAttack
    CheckResume -->|No| WaitResume

    %% User Interactions
    StartSim --> UserInteraction{User Interaction?}
    UserInteraction -->|Pause| PauseBtn[Pause Button Clicked]
    UserInteraction -->|Reset| ResetBtn[Reset Button Clicked]
    UserInteraction -->|Filter| FilterBtn[Filter Button Clicked]
    UserInteraction -->|Zoom| ZoomAction[Zoom/Pan Action]
    UserInteraction -->|None| Continue[Continue Simulation]

    PauseBtn --> TogglePause[Toggle Pause State]
    TogglePause --> CheckPause

    ResetBtn --> ClearMap[Clear All Attacks]
    ClearMap --> ResetStats[Reset All Statistics]
    ResetStats --> ResetCounters[Reset Counters to Zero]
    ResetCounters --> ClearFeed[Clear Recent Attacks Feed]
    ClearFeed --> GenAttack

    FilterBtn --> ApplyFilter[Apply Attack Type Filter]
    ApplyFilter --> UpdateDisplay[Update Map Display]
    UpdateDisplay --> GenAttack

    ZoomAction --> UpdateProjection[Update Map Projection]
    UpdateProjection --> RedrawMap[Redraw Map Elements]
    RedrawMap --> GenAttack

    Continue --> GenAttack

    %% Error Handling
    LoadD3 --> CheckD3{D3.js Loaded?}
    CheckD3 -->|No| ShowError[Show Loading Error]
    CheckD3 -->|Yes| LoadTopo

    LoadTopo --> CheckTopo{TopoJSON Loaded?}
    CheckTopo -->|No| UseFallback[Use Fallback Map]
    CheckTopo -->|Yes| CreateSVG

    UseFallback --> CreateSimpleMap[Create Simple Continent Shapes]
    CreateSimpleMap --> InitStats

    ShowError --> End([Error State])

    %% Styling
    classDef startEnd fill:#4caf50,stroke:#2e7d32,stroke-width:3px,color:#fff
    classDef process fill:#2196f3,stroke:#1565c0,stroke-width:2px,color:#fff
    classDef decision fill:#ff9800,stroke:#ef6c00,stroke-width:2px,color:#fff
    classDef userAction fill:#9c27b0,stroke:#6a1b9a,stroke-width:2px,color:#fff
    classDef error fill:#f44336,stroke:#c62828,stroke-width:2px,color:#fff

    class Start,End startEnd
    class Init,LoadD3,LoadTopo,CreateSVG,SetProjection,DrawMap,InitStats,StartSim,GenAttack,SelectSource,SelectTarget,SelectType,CreatePath,AnimatePath,ShowExplosion,UpdateStats,UpdateCounters,UpdateThreat,AddToFeed,Delay,WaitResume,ClearMap,ResetStats,ResetCounters,ClearFeed,ApplyFilter,UpdateDisplay,UpdateProjection,RedrawMap,Continue,UseFallback,CreateSimpleMap process
    class CheckPause,CheckResume,UserInteraction,CheckD3,CheckTopo decision
    class PauseBtn,ResetBtn,FilterBtn,ZoomAction,TogglePause userAction
    class ShowError error
```
