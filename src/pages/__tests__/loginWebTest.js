import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function loginTest() {
    // Step 1: Set up the WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Step 2: Navigate to the login page
        console.log('Navigating to login page...');
        await driver.get('http://localhost:5173/login');

        // Step 3: Locate the email and password input fields and the login button
        console.log('Locating input fields and login button...');
        let emailField = await driver.findElement(By.css('input[type="email"]'));
        let passwordField = await driver.findElement(By.css('input[type="password"]'));
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));

        // Step 4: Enter the email and password
        console.log('Entering email and password...');
        await emailField.sendKeys('test@example.us');
        await passwordField.sendKeys('000');

        // Step 5: Click the login button
        console.log('Clicking the login button...');
        await loginButton.click();

        // Step 6: Wait for the navigation to the home page
        console.log('Waiting for URL to change...');
        await driver.wait(until.urlIs('http://localhost:5173/'), 10000); // Increased timeout to 10 seconds

        // Step 7: Verify the login was successful by checking the URL or a specific element
        console.log('Verifying login success...');
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:5173/');

        console.log('Login test passed!');
    } catch (error) {
        console.error('Login test failed:', error);
    } finally {
        // Step 8: Quit the WebDriver
        await driver.quit();
    }
})();