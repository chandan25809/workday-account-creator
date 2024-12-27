chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "runSelenium") {
      const { email, password, targetUrl } = message;
  
      if (!email || !password || !targetUrl) {
        console.error("Email, password, and target URL are required.");
        sendResponse({ status: "Error: Email, password, and target URL are required." });
        return;
      }
  
      console.log(`Running Selenium with:
        Email: ${email}
        Password: [hidden]
        Target URL: ${targetUrl}`);
  
      // Send a POST request to the Node.js server
      fetch("http://localhost:3000/run-selenium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, targetUrl }),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(`Server response: ${result}`);
          sendResponse({ status: result });
        })
        .catch((error) => {
          console.error(`Error communicating with server: ${error.message}`);
          sendResponse({ status: `Error: ${error.message}` });
        });
  
      return true; // Keep the message channel open for async response
    }
  });
  
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Use the URL from changeInfo or fallback to tab.url
    const updatedUrl = changeInfo.url || tab.url;
  
    console.log(`URL updated to: ${updatedUrl}`); // Log the detected URL
  
    if (updatedUrl) {
      const workdayPattern = /https:\/\/.*\.wd\d+\.myworkdayjobs\.com\/.*\/login(\?.*)?/;
  
      // Check if the URL matches the Workday login page pattern
      if (workdayPattern.test(updatedUrl)) {
        console.log(`Workday login page detected: ${updatedUrl}`);
  
        // Save the detected URL in storage
        chrome.storage.local.set({ targetUrl: updatedUrl }, () => {
          console.log("Target URL saved successfully.");
        });
      }
    }
  });
  
  
  