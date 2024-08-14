chrome.runtime.onInstalled.addListener(() => {
  checkAndApplyDarkMode();

  // Re-check every hour
  setInterval(checkAndApplyDarkMode, 3600000); // 3600000 ms = 1 hour
});

function checkAndApplyDarkMode() {
  const hours = new Date().getHours();
  const isDarkMode = hours >= 18 || hours <= 6; // 6 PM to 6 AM

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: applyDarkMode,
        args: [isDarkMode]
      });
    }
  });
}

function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
  }
}
