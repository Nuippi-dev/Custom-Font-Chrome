chrome.runtime.onInstalled.addListener(() => {
    console.log("Custom Font Injector installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "applyFont") {
        const fontName = message.font;
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400&display=swap`;

        const targetTabId = sender.tab?.id || message.tabId; // Fallback to message.tabId

        if (targetTabId) {
            chrome.scripting.executeScript({
                target: { tabId: targetTabId },
                func: (fontUrl, fontName) => {
                    const existingLink = document.getElementById("custom-font-injector");
                    if (existingLink) existingLink.remove();

                    const link = document.createElement("link");
                    link.id = "custom-font-injector";
                    link.rel = "stylesheet";
                    link.href = fontUrl;
                    document.head.appendChild(link);

                    document.body.style.fontFamily = `'${fontName}', sans-serif`;
                },
                args: [fontUrl, fontName]
            });

            sendResponse({ status: "Font applied: " + fontName });
        } else {
            console.error("No valid tab context available.");
            sendResponse({ status: "Error: No tab context." });
        }
    }
});

