// FontScope Popup Script
// Handles enable/disable toggle and communicates with content script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('fontscope-toggle');

  // Load saved state and sync with content script
  chrome.storage.sync.get(['fontscopeEnabled'], function(result) {
    const isEnabled = result.fontscopeEnabled !== false; // Default to true
    toggle.checked = isEnabled;

    // Always send current state to active tab when popup opens
    sendStateToActiveTab(isEnabled);
  });

  // Handle toggle changes
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;

    // Save state
    chrome.storage.sync.set({ fontscopeEnabled: isEnabled }, function() {
      console.log('FontScope state saved:', isEnabled);
    });

    // Send state to active tab immediately
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

// Listen for tab activation to sync state with new active tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.storage.sync.get(['fontscopeEnabled'], function(result) {
    const isEnabled = result.fontscopeEnabled !== false;
    chrome.tabs.sendMessage(activeInfo.tabId, {
      action: 'toggleFontScope',
      enabled: isEnabled
    }).catch(function(error) {
      // Tab might not be ready yet, that's okay
    });
  });
});
