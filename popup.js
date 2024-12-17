document.addEventListener("DOMContentLoaded", () => {
    const applyButton = document.getElementById("applyButton");

    if (applyButton) {
        applyButton.addEventListener("click", () => {
            const fontName = document.getElementById("fontSelect").value;

            // Query the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    const activeTabId = tabs[0].id;

                    // Send the font information to the background script
                    chrome.runtime.sendMessage({
                        action: "applyFont",
                        font: fontName,
                        tabId: activeTabId
                    }, (response) => {
                        console.log(response.status);
                    });
                } else {
                    console.error("No active tab found.");
                }
            });
        });
    } else {
        console.error("applyButton not found in the DOM.");
    }
});
