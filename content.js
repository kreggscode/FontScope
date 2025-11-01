// FontScope Content Script
// Identifies fonts on web pages and displays them in a stunning tooltip

// Request current state from storage when content script loads
chrome.storage.sync.get(['fontscopeEnabled'], function(result) {
  fontScopeEnabled = result.fontscopeEnabled !== false; // Default to true
  console.log('FontScope: Initialized with state:', fontScopeEnabled);
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleFontScope') {
    fontScopeEnabled = request.enabled;
    console.log('FontScope:', fontScopeEnabled ? 'enabled' : 'disabled');

    // Hide tooltip if disabled
    if (!fontScopeEnabled) {
      hideTooltip();
    }
  }
});

function createTooltip() {
  tooltip = document.createElement('div');
  tooltip.id = 'fontscope-tooltip';
  tooltip.innerHTML = `
    <div class="fontscope-header">
      <span class="fontscope-icon">🔍</span>
      <span class="fontscope-title">FontScope</span>
    </div>
    <div class="fontscope-content">
      <div class="fontscope-font-family">
        <span class="fontscope-label">Font Family:</span>
        <span class="fontscope-value" id="font-family"></span>
      </div>
      <div class="fontscope-font-size">
        <span class="fontscope-label">Font Size:</span>
        <span class="fontscope-value" id="font-size"></span>
      </div>
      <div class="fontscope-font-weight">
        <span class="fontscope-label">Font Weight:</span>
        <span class="fontscope-value" id="font-weight"></span>
      </div>
      <div class="fontscope-color">
        <span class="fontscope-label">Color:</span>
        <span class="fontscope-value" id="color"></span>
      </div>
    </div>
  `;
  document.body.appendChild(tooltip);
}

function updateTooltip(element) {
  if (!tooltip) return;

  // Enhanced font detection with inheritance checking
  const style = window.getComputedStyle(element);
  let fontFamily = style.fontFamily;
  let fontSize = style.fontSize;
  let fontWeight = style.fontWeight;
  let color = style.color;

  // Check if font is actually applied to this element (not just inherited)
  // Compare with parent element's computed style
  const parentElement = element.parentElement;
  if (parentElement) {
    const parentStyle = window.getComputedStyle(parentElement);
    const parentFontFamily = parentStyle.fontFamily;

    // If font-family matches parent, check if element has its own font-family rule
    if (fontFamily === parentFontFamily) {
      // Try to detect if element has font-family set via CSS
      const elementFontFamily = element.style.fontFamily || getComputedStyle(element).getPropertyValue('font-family');

      // If element has its own font-family or it's different from parent
      if (elementFontFamily && elementFontFamily !== parentFontFamily) {
        fontFamily = elementFontFamily;
      }
    }
  }

  // Clean up font-family (remove quotes, handle font stacks)
  if (fontFamily) {
    // Remove quotes and clean up font stack
    fontFamily = fontFamily.replace(/['"]/g, '').trim();

    // If it's a font stack, show primary font
    const fonts = fontFamily.split(',');
    if (fonts.length > 1) {
      // Check if first font is generic (serif, sans-serif, etc.)
      const firstFont = fonts[0].trim().toLowerCase();
      if (['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'].includes(firstFont)) {
        // Use second font if first is generic
        fontFamily = fonts[1] ? fonts[1].trim() : fonts[0].trim();
      } else {
        fontFamily = fonts[0].trim();
      }
    }
  }

  // Verify font detection is working
  if (!fontFamily || fontFamily === '' || fontFamily === 'inherit') {
    console.log('FontScope: No specific font detected for element:', element);
    console.log('Element classes:', element.className);
    console.log('Element styles:', element.style.cssText);
  }

  document.getElementById('font-family').textContent = fontFamily || 'Not detected';
  document.getElementById('font-size').textContent = fontSize || 'Not detected';
  document.getElementById('font-weight').textContent = fontWeight || 'Not detected';
  document.getElementById('color').textContent = color || 'Not detected';

  // Smart positioning logic
  const rect = element.getBoundingClientRect();
  const tooltipHeight = tooltip.offsetHeight || 150; // Estimated height if not yet rendered
  const tooltipWidth = tooltip.offsetWidth || 400; // Updated to match new max-width

  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Calculate available space
  const spaceAbove = rect.top;
  const spaceBelow = viewportHeight - rect.bottom;

  // Determine vertical position
  let tooltipTop;
  if (spaceAbove > tooltipHeight + 20) {
    // Enough space above - position above
    tooltipTop = rect.top + scrollY - tooltipHeight - 10;
  } else if (spaceBelow > tooltipHeight + 20) {
    // Enough space below - position below
    tooltipTop = rect.bottom + scrollY + 10;
  } else {
    // Not enough space either way - position above as fallback
    tooltipTop = rect.top + scrollY - tooltipHeight - 10;
  }

  // Ensure tooltip doesn't go off-screen vertically
  if (tooltipTop < scrollY) {
    tooltipTop = scrollY + 10;
  } else if (tooltipTop + tooltipHeight > scrollY + viewportHeight) {
    tooltipTop = scrollY + viewportHeight - tooltipHeight - 10;
  }

  // Horizontal positioning - center on element
  let tooltipLeft = rect.left + scrollX + (rect.width / 2) - (tooltipWidth / 2);

  // Ensure tooltip doesn't go off-screen horizontally
  if (tooltipLeft < scrollX) {
    tooltipLeft = scrollX + 10;
  } else if (tooltipLeft + tooltipWidth > scrollX + viewportWidth) {
    tooltipLeft = scrollX + viewportWidth - tooltipWidth - 10;
  }

  tooltip.style.left = `${tooltipLeft}px`;
  tooltip.style.top = `${tooltipTop}px`;
  tooltip.style.display = 'block';

  // Debug logging for positioning
  console.log('FontScope: Tooltip positioned at', tooltipLeft, tooltipTop, 'for element at', rect.left + scrollX, rect.top + scrollY);
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

function handleMouseOver(event) {
  // Don't show tooltips if disabled
  if (!fontScopeEnabled) return;

  const element = event.target;

  // Handle text nodes - get their parent element
  let targetElement = element;
  if (element.nodeType === Node.TEXT_NODE) {
    targetElement = element.parentElement;
  }

  // Skip if no valid element
  if (!targetElement || targetElement.tagName === 'HTML' || targetElement.tagName === 'BODY') {
    return;
  }

  // Only show tooltip for elements that have text content or are text-related
  const textContent = targetElement.textContent?.trim();
  const hasText = textContent && textContent.length > 0;

  // Check if element has visible text or is an input/textarea
  const isTextInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(targetElement.tagName);
  const isTextElement = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'A', 'LI', 'TD', 'TH', 'LABEL', 'BUTTON'].includes(targetElement.tagName);

  if (!hasText && !isTextInput && !isTextElement) {
    return;
  }

  currentElement = targetElement;
  updateTooltip(targetElement);
}

function handleMouseOut(event) {
  if (event.relatedTarget && tooltip.contains(event.relatedTarget)) return;
  hideTooltip();
}

function handleMouseMove(event) {
  // Don't update tooltips if disabled
  if (!fontScopeEnabled) return;

  if (currentElement && tooltip.style.display === 'block') {
    updateTooltip(currentElement);
  }
}

function init() {
  createTooltip();
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('mousemove', handleMouseMove);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
