const state = {
    markedTabs: {}
};

// Initialize state from storage
async function initializeState() {
    try {
        const data = await chrome.storage.local.get(['markedTabs']);
        state.markedTabs = data.markedTabs || {};
        console.log('State initialized:', state);
    } catch (error) {
        console.error('Error initializing state:', error);
        state.markedTabs = {};
    }
}

// Initialize when the service worker starts
initializeState();
chrome.runtime.onInstalled.addListener(initializeState);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('🎯 Background received message:', request);

    if (request.command === 'mark') {
        handleMarkCommand(sender.tab, request.position).then(sendResponse).catch(error => {
            console.error('Mark command failed:', error);
            sendResponse({ success: false, error: error.message });
        });
        return true;
    }

    if (request.command === 'switch') {
        handleSwitchCommand(request.position).then(sendResponse).catch(error => {
            console.error('Switch command failed:', error);
            sendResponse({ success: false, error: error.message });
        });
        return true;
    }

    if (request.command === 'getState') {
        sendResponse({ markedTabs: state.markedTabs });
        return true;
    }
});

async function handleMarkCommand(tab, position) {
    if (!tab || !position || isNaN(position) || position < 1 || position > 4) {
        return { success: false, error: 'Invalid position (use 1-4)' };
    }

    // Check if tab is already marked somewhere else
    const existingPosition = Object.entries(state.markedTabs).find(([pos, tabId]) => tabId === tab.id)?.[0];
    if (existingPosition && existingPosition == position) {
        console.log(`Tab ${tab.id} is already marked at position ${position}`);
        return { success: true, alreadyMarked: true, position };
    }

    // Remove previous mark if it exists
    if (existingPosition) {
        delete state.markedTabs[existingPosition];
    }

    // Overwrite existing mark at the specified position
    state.markedTabs[position] = tab.id;
    console.log(`Marking tab ${tab.id} at position ${position}`);

    try {
        await chrome.storage.local.set({ markedTabs: state.markedTabs });
        await chrome.tabs.sendMessage(tab.id, { type: 'feedback', message: `Marked as ${position}` });
        return { success: true, position };
    } catch (error) {
        console.error('Error marking tab:', error);
        return { success: false, error: error.message };
    }
}

async function handleSwitchCommand(position) {
    await initializeState(); // Refresh state before switching
    const targetTabId = state.markedTabs[position];

    if (!targetTabId) {
        console.log(`No tab marked at position ${position}`);
        return { success: false, error: `No tab at position ${position}` };
    }

    console.log(`Switching to tab ${targetTabId} at position ${position}`);

    try {
        const tab = await chrome.tabs.get(targetTabId);
        if (tab) {
            await chrome.tabs.update(targetTabId, { active: true });
            await chrome.windows.update(tab.windowId, { focused: true });
            return { success: true };
        }
    } catch (error) {
        console.error('Error switching tab:', error);
        delete state.markedTabs[position];
        await chrome.storage.local.set({ markedTabs: state.markedTabs });
        return { success: false, error: 'Tab no longer exists' };
    }
}
