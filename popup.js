document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("save");
    const generateButton = document.getElementById("generate");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const statusDiv = document.getElementById("status");


    function validatePassword(password) {
        if (password.length < 8) {
          return "Password must be at least 8 characters long.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          return "Password must include at least one special character.";
        }
        if (!/[A-Za-z]/.test(password)) {
          return "Password must include at least one alphabetic character.";
        }
        if (!/[a-z]/.test(password)) {
          return "Password must include at least one lowercase letter.";
        }
        if (!/[0-9]/.test(password)) {
          return "Password must include at least one numeric character.";
        }
        if (!/[A-Z]/.test(password)) {
          return "Password must include at least one uppercase letter.";
        }
        return null; 
      }
  
    // Load saved credentials on popup load
    chrome.storage.local.get(["email", "password"], (data) => {
      if (data.email) emailInput.value = data.email; // Pre-fill email
      if (data.password) passwordInput.value = data.password; // Pre-fill password
    });
  
    // Save credentials
    saveButton.addEventListener("click", () => {
      const email = emailInput.value;
      const password = passwordInput.value;
  
      if (!email || !password) {
        statusDiv.textContent = "Error: Email and password are required to save.";
        return;
      }

      const validationError = validatePassword(password);
      if (validationError) {
        statusDiv.textContent = `Password validation error: ${validationError}`;
        statusDiv.style.color = "red";
        return;
      }

  
      chrome.storage.local.set({ email, password }, () => {
        statusDiv.textContent = "Credentials saved successfully!";
        statusDiv.style.color = "green";
      });
    });
  


  
      // Trigger the Selenium script
  generateButton.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Validate inputs
    if (!email || !password) {
        statusDiv.textContent = "Error: Email and password are required.";
        statusDiv.style.color = "red";
        return;
      }
  
      // Validate password
      const validationError = validatePassword(password);
      if (validationError) {
        statusDiv.textContent = `Password validation error: ${validationError}`;
        statusDiv.style.color = "red";
        return;
      }

    // Retrieve the stored target URL from local storage
    chrome.storage.local.get("targetUrl", (data) => {
      const targetUrl = data.targetUrl;

      if (!targetUrl) {
        console.error("No target URL detected.");
        statusDiv.textContent = "Error: No target URL detected.";
        return;
      }

      // Send email, password, and target URL to the background script
      chrome.runtime.sendMessage(
        { action: "runSelenium", email, password, targetUrl },
        (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                statusDiv.textContent = "Error: Could not communicate with background script.";
                statusDiv.style.color = "red";
                return;
              }
              statusDiv.textContent = response?.status || "Process started successfully.";
              statusDiv.style.color = "green";
        }
      );
    });
  });
  
    
  });
  