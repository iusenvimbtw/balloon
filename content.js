class TabSwitcher {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('Tab Switcher initialized');
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 999999;
            font-family: system-ui;
            opacity: 0.9;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 1200);
    }

    handleKeyDown = (e) => {
        console.log('Key event:', { key: e.key, ctrl: e.ctrlKey, shift: e.shiftKey });

        // Exit if not Ctrl+Shift combination
        if (!e.ctrlKey || !e.shiftKey) return;

        // Handle mark command (Ctrl+Shift+M)
        if (e.key === 'M' || e.key === 'm') {
            e.preventDefault();
            e.stopPropagation();

            const position = prompt('Enter position (1-4) to mark this tab:');
            if (!position || isNaN(position) || position < 1 || position > 4) {
                console.log('Invalid position entered');
                return;
            }

            console.log(`📍 Marking tab at position ${position}`);
            chrome.runtime.sendMessage({ command: 'mark', position: parseInt(position) }, (response) => {
                console.log('Mark command response:', response);
            });
            return;
        }

        // Handle switch command (Ctrl+Shift+1 to 4)
        if (['1', '2', '3', '4'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();

            console.log(`🔄 Switching to position ${e.key}`);
            chrome.runtime.sendMessage({ command: 'switch', position: parseInt(e.key) }, (response) => {
                console.log('Switch command response:', response);
            });
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown, true);

        chrome.runtime.onMessage.addListener((message) => {
            console.log('Received message:', message);
            if (message.type === 'feedback') {
                this.showFeedback(message.message);
            }
        });

        window.addEventListener('load', () => {
            console.log('Page loaded, Tab Switcher active');
            this.showFeedback('Tab Switcher Active');
        });
    }
}

// Initialize the Tab Switcher
new TabSwitcher();
