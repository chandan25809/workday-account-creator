
# **Workday Account Creator Extension**

The **Workday Account Creator Extension** is a Chrome extension designed to automate the account creation process on Workday websites. This extension integrates with a backend powered by Selenium and Node.js to fill out and submit forms programmatically, providing a seamless experience for users.

---

## **Features**
- **Automatic Workday URL Detection**: Detects Workday login pages (e.g., `https://<company>.wdX.myworkdayjobs.com/.../login`) automatically.
- **Password Validation**: Ensures passwords meet strict criteria before submission.
- **Save, Update, and Delete Credentials**: Manage your login credentials securely in Chrome's local storage.
- **Selenium and Express Backend Integration**: Automates form filling and submission on Workday websites.

---

## **Requirements**
### **Frontend**
- Google Chrome
- Chrome Extension Developer Mode enabled

### **Backend**
- Node.js
- Express.js
- Python 3.x
- Selenium
- ChromeDriver

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd workday_account_creator
```

### **2. Set Up the Chrome Extension**
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (toggle in the top right corner).
3. Click **Load unpacked** and select the folder containing the extension files (e.g., `workday_account_creator/extension`).

### **3. Set Up the Backend**
1. Install Node.js and Express.js:
   ```bash
   npm install express
   ```
2. Install Python dependencies:
   ```bash
   pip install selenium
   ```
3. Download and place the **ChromeDriver** executable in the project directory. Ensure it matches your browser version and system architecture.
   - Check your browser version via `chrome://settings/help`.

4. Start the backend server:
   ```bash
   node server.js
   ```

---

## **Usage**

### **1. Launch the Extension**
- Click on the **Workday Account Creator** extension icon in your Chrome toolbar.

### **2. Save Credentials**
- Enter your **email** and **password**.
- Click the **Save Credentials** button.
- The extension validates the password and saves it locally.

### **3. Automate Account Creation**
- Navigate to a Workday account creation page (e.g., `https://<company>.wd5.myworkdayjobs.com/.../login`).
- Click **Create Account** in the extension popup.
- The extension will:
  - Validate the password.
  - Trigger the backend (Node.js and Selenium) to fill and submit the form.


---

## **Password Requirements**
The password must meet the following criteria:
- At least 8 characters long
- At least one special character (e.g., `!@#$%^&*()`)
- At least one uppercase letter
- At least one lowercase letter
- At least one numeric character

---

## **Contributing**
Contributions are welcome! Feel free to submit issues or pull requests.

---

## **Known Issues**
- Ensure that ChromeDriver matches the version of your Chrome browser.
- The backend requires Node.js, Express, Python, and Selenium to be properly installed.

---

## **Contact**
For questions or feedback, please reach out to:

- **Name**: Chandan Abhishek
- **Email**: chandanmuchukota2001@gmail.com
