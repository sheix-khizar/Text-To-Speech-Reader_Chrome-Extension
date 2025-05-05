chrome.contextMenus.create({
  id: "ttsRead",
  title: "Read selected text",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ttsRead") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const text = window.getSelection().toString();
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    });
  }
});
