// FontScope Popup Script
// Handles enable/disable toggle and communicates with content script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('fontscope-toggle');

  // Load saved state
  chrome.storage.sync.get(['fontscopeEnabled'], function(result) {
    const isEnabled = result.fontscopeEnabled !== false; // Default to true
    toggle.checked = isEnabled;

    // Send initial state to active tab
    sendStateToActiveTab(isEnabled);
  });

  // Handle toggle changes
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;

    // Save state
    chrome.storage.sync.set({ fontscopeEnabled: isEnabled }, function() {
      console.log('FontScope state saved:', isEnabled);
    });

    // Send state to active tab
    sendStateToActiveTab(isEnabled);

    // Show feedback
    showFeedback(isEnabled ? 'Font detection enabled' : 'Font detection disabled');
  });
});

function sendStateToActiveTab(enabled) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleFontScope',
        enabled: enabled
      }).catch(function(error) {
        console.log('Tab not ready yet, will apply on next page load');
      });
    }
  });
}

function showFeedback(message) {
  // Simple feedback - could be enhanced with a toast notification
  console.log('FontScope:', message);
}

// Listen for state requests from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getFontScopeState') {
    chrome.storage.sync.get(['fontscopeEnabled'], function(result) {
      sendResponse({ enabled: result.fontscopeEnabled !== false });
    });
    return true; // Keep message channel open for async response
  }
});
