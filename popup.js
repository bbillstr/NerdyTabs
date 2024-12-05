let isProcessing = false;

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  setupMessageHandlers();

  // Update shortcuts based on platform with proper symbols
  if (navigator.platform.includes('Mac')) {
    document.getElementById('groupShortcut').innerHTML = 'Option+A';  // Using proper UTF-8 symbol
    document.getElementById('ungroupShortcut').innerHTML = 'Option+S';
  } else {
    document.getElementById('groupShortcut').textContent = 'Alt+A';
    document.getElementById('ungroupShortcut').textContent = 'Alt+S';
  }
});

function initializeEventListeners() {
  const buttons = [
    'groupTabs',
    'ungroupTabs',
    'suggestClosures',
    'showAnalytics'
  ];

  buttons.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      if (isProcessing) return;
      handleButtonClick(id);
    });
  });

  document.getElementById('results').addEventListener('click', async (e) => {
    const closeButton = e.target.closest('.close-tab-btn');
    const closeAllButton = e.target.closest('.close-all-btn');
    
    if (closeButton) {
      const tabTitle = closeButton.dataset.tabTitle;
      if (tabTitle) {
        await closeSuggestedTab(tabTitle);
      }
    } else if (closeAllButton) {
      const tabIds = JSON.parse(closeAllButton.dataset.tabIds);
      await closeAllSuggestedTabs(tabIds);
    }
  });

  document.getElementById('backButton').addEventListener('click', () => {
    showMainView();
  });
}

function setupMessageHandlers() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    switch (message.action) {
      case 'operationComplete':
        console.log('Operation completed:', message.result);
        hideLoading();
        showResults(message.result);
        break;
      case 'operationError':
        console.error('Operation failed:', message.error);
        hideLoading();
        showError(message.error);
        break;
    }
  });
}

async function handleButtonClick(action) {
  showLoading();
  isProcessing = true;

  try {
    let result;
    switch (action) {
      case 'groupTabs':
        result = await groupSimilarTabs();
        showResults(result);
        setTimeout(showMainView, 2000);
        break;
      case 'ungroupTabs':
        result = await ungroupTabs();
        showResults(result);
        setTimeout(showMainView, 2000);
        break;
      case 'suggestClosures':
        result = await suggestTabClosures();
        showResults(result);
        break;
      case 'showAnalytics':
        result = await showTabAnalytics();
        showResults(result);
        break;
    }
  } catch (error) {
    console.error('Operation failed:', error);
    showError(error.message);
  } finally {
    isProcessing = false;
    hideLoading();
  }
}

function showLoading() {
  const results = document.getElementById('results');
  results.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
    </div>
  `;
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.remove();
  }
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

async function groupSimilarTabs() {
  try {
    console.log('Starting group similar tabs');
    const tabs = await chrome.tabs.query({ currentWindow: true });
    console.log('Found tabs:', tabs.length);
    
    const tabData = tabs.map(tab => ({
      id: tab.id,
      url: tab.url,
      title: tab.title
    }));

    console.log('Sending tabData to background:', tabData);
    
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'analyzeTabs',
        tabs: tabData
      }, response => {
        console.log('Received response from background:', response);
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response && response.result);
        }
      });
    });
    
  } catch (error) {
    console.error('Error in groupSimilarTabs:', error);
    throw error;
  }
}

async function suggestTabClosures() {
  try {
    console.log('Starting tab closure suggestions');
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'suggestClosures',
        tabs: tabs
      }, response => {
        console.log('Received closure suggestions response:', response);
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response && response.result);
        }
      });
    });
  } catch (error) {
    console.error('Error in suggestTabClosures:', error);
    throw error;
  }
}

function displayResults(html) {
  document.getElementById('results').innerHTML = html;
}

function showError(message) {
  const results = document.getElementById('results');
  results.innerHTML = `
    <div class="error-message">
      <i class="material-icons">error</i>
      <p>${message}</p>
    </div>
  `;
  showToast(message, 'error');
}

function showResults(content) {
  const mainContent = document.getElementById('mainContent');
  const resultsContainer = document.getElementById('resultsContainer');
  const results = document.getElementById('results');
  
  // Hide main content and show results
  mainContent.style.display = 'none';
  resultsContainer.style.display = 'block';
  
  // Display the content
  if (typeof content === 'string') {
    results.innerHTML = content;
  } else if (Array.isArray(content)) {
    results.innerHTML = content.join('');
  } else {
    results.innerHTML = JSON.stringify(content, null, 2);
  }
}

function showMainView() {
  const mainContent = document.getElementById('mainContent');
  const resultsContainer = document.getElementById('resultsContainer');
  
  // Show main content and hide results
  mainContent.style.display = 'block';
  resultsContainer.style.display = 'none';
  
  // Clear results
  document.getElementById('results').innerHTML = '';
}

async function closeSuggestedTab(title) {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const tabToClose = tabs.find(tab => tab.title === title);
  
  if (tabToClose) {
    try {
      await chrome.tabs.remove(tabToClose.id);
      showToast('Tab closed successfully');
      
      // Remove the closed tab from the UI immediately
      const tabElement = document.querySelector(`[data-tab-title="${title.replace(/"/g, '&quot;')}"]`)
          .closest('.tab-suggestion');
      if (tabElement) {
        tabElement.style.opacity = '0';
        setTimeout(() => {
          tabElement.remove();
          
          // Check if there are any suggestions left
          const remainingSuggestions = document.querySelectorAll('.tab-suggestion');
          if (remainingSuggestions.length === 0) {
            displayResults(`
              <div class="info-message">
                <i class="material-icons">info</i>
                <p>No more tabs to manage!</p>
              </div>
            `);
          }
        }, 300);
      }
    } catch (error) {
      showError('Failed to close tab: ' + error.message);
    }
  } else {
    showError('Tab not found. It may have been already closed.');
  }
}

async function ungroupTabs() {
  try {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'ungroupTabs'
      }, response => {
        console.log('Received ungroup response:', response);
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response && response.result);
        }
      });
    });
  } catch (error) {
    console.error('Error in ungroupTabs:', error);
    throw error;
  }
}

async function showTabAnalytics() {
  try {
    console.log('Starting tab analytics');
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        action: 'getAnalytics',
        tabs: tabs
      }, response => {
        console.log('Received analytics response:', response);
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else if (response && response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response && response.result);
        }
      });
    });
  } catch (error) {
    console.error('Error in showTabAnalytics:', error);
    throw error;
  }
}

async function closeAllSuggestedTabs(tabIds) {
  try {
    await chrome.tabs.remove(tabIds);
    showToast('All suggested tabs closed successfully');
    
    // Update the UI to show no more suggestions
    displayResults(`
      <div class="info-message">
        <i class="material-icons">info</i>
        <p>No more tabs to manage!</p>
      </div>
    `);
  } catch (error) {
    showError('Failed to close all tabs: ' + error.message);
  }
} 