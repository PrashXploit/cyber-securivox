/**
 * Cyber Securivox - Image Steganography
 * Hide and extract messages in images using LSB steganography
 */

const Steganography = {
    currentMode: null,
    coverImageData: null,
    stegoImageData: null,

    // Initialize the steganography tool
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Mode selection
        document.getElementById('hide-mode').addEventListener('click', () => {
            this.selectMode('hide');
        });

        document.getElementById('extract-mode').addEventListener('click', () => {
            this.selectMode('extract');
        });

        // File uploads
        document.getElementById('cover-image').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'cover');
        });

        document.getElementById('stego-image').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'stego');
        });

        // Action buttons
        document.getElementById('hide-btn').addEventListener('click', () => {
            this.hideMessage();
        });

        document.getElementById('extract-btn').addEventListener('click', () => {
            this.extractMessage();
        });

        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadStegoImage();
        });
    },

    // Select operation mode
    selectMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('#hide-mode, #extract-mode').forEach(el => {
            el.classList.remove('border-yellow-500', 'bg-yellow-50');
        });

        if (mode === 'hide') {
            document.getElementById('hide-mode').classList.add('border-yellow-500', 'bg-yellow-50');
            document.getElementById('hide-section').classList.remove('hidden');
            document.getElementById('extract-section').classList.add('hidden');
        } else {
            document.getElementById('extract-mode').classList.add('border-yellow-500', 'bg-yellow-50');
            document.getElementById('extract-section').classList.remove('hidden');
            document.getElementById('hide-section').classList.add('hidden');
        }
    },

    // Handle image upload
    handleImageUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                if (type === 'cover') {
                    this.coverImageData = img;
                    document.getElementById('cover-img').src = e.target.result;
                    document.getElementById('cover-preview').classList.remove('hidden');
                } else {
                    this.stegoImageData = img;
                    document.getElementById('stego-img').src = e.target.result;
                    document.getElementById('stego-preview').classList.remove('hidden');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    // Hide message in image
    hideMessage() {
        const message = document.getElementById('secret-message').value;
        const password = document.getElementById('hide-password').value;

        if (!this.coverImageData) {
            CyberSecurivox.showNotification('Please select a cover image', 'error');
            return;
        }

        if (!message.trim()) {
            CyberSecurivox.showNotification('Please enter a message to hide', 'error');
            return;
        }

        try {
            // Create canvas and get image data
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.coverImageData.width;
            canvas.height = this.coverImageData.height;
            
            ctx.drawImage(this.coverImageData, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // Prepare message (with password if provided)
            let finalMessage = message;
            if (password) {
                finalMessage = this.simpleEncrypt(message, password);
            }
            
            // Add delimiter to mark end of message
            finalMessage += '\0';
            
            // Convert message to binary
            const binaryMessage = this.stringToBinary(finalMessage);
            
            // Check if image can hold the message
            const maxBits = imageData.data.length;
            if (binaryMessage.length > maxBits) {
                CyberSecurivox.showNotification('Message too long for this image', 'error');
                return;
            }
            
            // Hide message using LSB steganography
            this.embedMessage(imageData, binaryMessage);
            
            // Update canvas with modified image data
            ctx.putImageData(imageData, 0, 0);
            
            // Show result
            const resultCanvas = document.getElementById('stego-canvas');
            const resultCtx = resultCanvas.getContext('2d');
            resultCanvas.width = canvas.width;
            resultCanvas.height = canvas.height;
            resultCtx.putImageData(imageData, 0, 0);
            
            document.getElementById('hide-result').classList.remove('hidden');
            CyberSecurivox.showNotification('Message hidden successfully!', 'success');
            
        } catch (error) {
            console.error('Error hiding message:', error);
            CyberSecurivox.showNotification('Error hiding message', 'error');
        }
    },

    // Extract message from image
    extractMessage() {
        const password = document.getElementById('extract-password').value;

        if (!this.stegoImageData) {
            CyberSecurivox.showNotification('Please select a steganographic image', 'error');
            return;
        }

        try {
            // Create canvas and get image data
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.stegoImageData.width;
            canvas.height = this.stegoImageData.height;
            
            ctx.drawImage(this.stegoImageData, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // Extract binary message
            const binaryMessage = this.extractBinaryMessage(imageData);
            
            if (!binaryMessage) {
                CyberSecurivox.showNotification('No hidden message found', 'error');
                return;
            }
            
            // Convert binary to string
            let message = this.binaryToString(binaryMessage);
            
            // Remove delimiter
            const delimiterIndex = message.indexOf('\0');
            if (delimiterIndex !== -1) {
                message = message.substring(0, delimiterIndex);
            }
            
            // Decrypt if password provided
            if (password) {
                try {
                    message = this.simpleDecrypt(message, password);
                } catch (e) {
                    CyberSecurivox.showNotification('Incorrect password or corrupted message', 'error');
                    return;
                }
            }
            
            // Show result
            document.getElementById('extracted-message').textContent = message;
            document.getElementById('extract-result').classList.remove('hidden');
            CyberSecurivox.showNotification('Message extracted successfully!', 'success');
            
        } catch (error) {
            console.error('Error extracting message:', error);
            CyberSecurivox.showNotification('Error extracting message', 'error');
        }
    },

    // Embed message using LSB steganography
    embedMessage(imageData, binaryMessage) {
        const data = imageData.data;
        let messageIndex = 0;
        
        for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
            // Skip alpha channel, use RGB channels
            for (let j = 0; j < 3 && messageIndex < binaryMessage.length; j++) {
                // Clear LSB and set message bit
                data[i + j] = (data[i + j] & 0xFE) | parseInt(binaryMessage[messageIndex]);
                messageIndex++;
            }
        }
    },

    // Extract binary message from image
    extractBinaryMessage(imageData) {
        const data = imageData.data;
        let binaryMessage = '';
        
        for (let i = 0; i < data.length; i += 4) {
            // Extract from RGB channels
            for (let j = 0; j < 3; j++) {
                binaryMessage += (data[i + j] & 1).toString();
            }
        }
        
        return binaryMessage;
    },

    // Convert string to binary
    stringToBinary(str) {
        return str.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join('');
    },

    // Convert binary to string
    binaryToString(binary) {
        let result = '';
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            if (byte.length === 8) {
                const charCode = parseInt(byte, 2);
                if (charCode === 0) break; // Null terminator
                result += String.fromCharCode(charCode);
            }
        }
        return result;
    },

    // Simple encryption (XOR cipher)
    simpleEncrypt(text, password) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const textChar = text.charCodeAt(i);
            const keyChar = password.charCodeAt(i % password.length);
            result += String.fromCharCode(textChar ^ keyChar);
        }
        return result;
    },

    // Simple decryption (XOR cipher)
    simpleDecrypt(encryptedText, password) {
        return this.simpleEncrypt(encryptedText, password); // XOR is symmetric
    },

    // Download steganographic image
    downloadStegoImage() {
        const canvas = document.getElementById('stego-canvas');
        const link = document.createElement('a');
        link.download = 'steganographic_image.png';
        link.href = canvas.toDataURL();
        link.click();
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Steganography.init();
});
