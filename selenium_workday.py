import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import sys
import time

def validate_password(password):
    """
    Validate the password based on the following requirements:
    - A special character
    - An alphabetic character
    - A minimum of 8 characters
    - A lowercase character
    - A numeric character
    - An uppercase character
    """
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "Password must include at least one special character."
    if not re.search(r"[A-Za-z]", password):
        return "Password must include at least one alphabetic character."
    if not re.search(r"[a-z]", password):
        return "Password must include at least one lowercase letter."
    if not re.search(r"[0-9]", password):
        return "Password must include at least one numeric character."
    if not re.search(r"[A-Z]", password):
        return "Password must include at least one uppercase letter."
    return None  

def run_selenium(email, password, target_url):

    validation_error = validate_password(password)
    if validation_error:
        print(f"Password validation error: {validation_error}")
        return 
    # Specify the ChromeDriver path
    driver_path = "chromedriver-mac-arm64/chromedriver"
    service = Service(driver_path)

    # Initialize the WebDriver
    driver = webdriver.Chrome(service=service)

    try:
        # Navigate to the target URL
        driver.get(target_url)

        time.sleep(2)

        create_account_button = driver.find_element(By.CSS_SELECTOR, 'button[data-automation-id="createAccountLink"]')
        create_account_button.click()

        time.sleep(2)  # Wait for the Create Account form to load

        # Fill in the email field
        email_field = driver.find_element(By.CSS_SELECTOR, 'input[data-automation-id="email"]')
        email_field.send_keys(email)

        # Fill in the password field
        password_field = driver.find_element(By.CSS_SELECTOR, 'input[data-automation-id="password"]')
        password_field.send_keys(password)

        # Fill in the confirm password field
        confirm_password_field = driver.find_element(By.CSS_SELECTOR, 'input[data-automation-id="verifyPassword"]')
        confirm_password_field.send_keys(password)

        # Check if the checkbox exists
        try:
            checkbox = driver.find_element(By.CSS_SELECTOR, 'input[data-automation-id="createAccountCheckbox"]')
            if not checkbox.is_selected():
                checkbox.click()  # Click the checkbox if it's not already selected
                print("Checkbox clicked.")
            else:
                print("Checkbox already selected.")
        except Exception as e:
            print("Checkbox not found or not required.")

        # Submit the form
        submit_button = driver.find_element(By.CSS_SELECTOR, 'div[aria-label="Create Account"][role="button"]')
        submit_button.click()

        time.sleep(3600)

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 selenium_workday.py <email> <password> <target_url>")
        sys.exit(1)

    email = sys.argv[1]
    password = sys.argv[2]
    target_url = sys.argv[3]
    run_selenium(email, password, target_url)
