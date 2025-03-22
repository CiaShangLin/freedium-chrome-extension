// 當擴充功能安裝或更新時創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  // 確保 contextMenus API 可用
  if (chrome.contextMenus) {
    chrome.contextMenus.create({
      id: "customContextMenu",
      title: "使用 Freedium 免費閱讀",
      contexts: ["all"],
      documentUrlPatterns: ["*://*.medium.com/*", "*://medium.com/*"]
    });
  } else {
    console.error("contextMenus API 不可用");
  }
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "customContextMenu") {
    // 獲取當前頁面的URL
    const currentUrl = tab.url;
    
    // 檢查是否為Medium鏈接
    if (currentUrl.includes("medium.com")) {
      // 創建Freedium URL
      const freediumUrl = `https://freedium.cfd/${currentUrl}`;
      
      // 在新標籤頁中打開Freedium URL
      chrome.tabs.create({ url: freediumUrl });
    } else {
      // 如果不是Medium鏈接，可以提示用戶
      chrome.notifications.create({
        type: "basic",
        iconUrl: "favicon.png",
        title: "非Medium鏈接",
        message: "此功能僅適用於Medium網站上的文章",
      });
    }
  }
}); 