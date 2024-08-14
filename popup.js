document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('manualDark').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: applyDarkMode,
          args: [true]
        });
      }
    });
  });

  document.getElementById('manualLight').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: applyDarkMode,
          args: [false]
        });
      }
    });
  });

  function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  }
});
