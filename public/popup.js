document.getElementById('playBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const text = window.getSelection().toString();
      if (text.trim() === "") {
        alert("Please select some text on the page.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  });

  document.getElementById('status').classList.remove('hidden');
});

document.getElementById('stopBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      speechSynthesis.cancel();
    }
  });

  document.getElementById('status').classList.add('hidden');
});
