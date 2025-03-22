// 監聽來自背景腳本的訊息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "menuClicked") {
    // 在頁面上執行某些操作
    alert("您點擊了自定義選單選項！");
  }
}); 