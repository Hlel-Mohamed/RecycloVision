import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import path from 'path';

(async function imageRecognitionTest() {
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
        await driver.wait(until.urlIs('http://localhost:5173/'), 10000);

        // Step 7: Navigate to the image recognition page
        console.log('Navigating to image recognition page...');
        await driver.get('http://localhost:5173/image-recognition');

        // Step 8: Wait for the file input element to be present
        console.log('Waiting for file input element...');
        await driver.wait(until.elementLocated(By.css('input[type="file"]')), 10000);

        // Step 9: Locate the file input and the identify button
        console.log('Locating file input and identify button...');
        let fileInput = await driver.findElement(By.css('input[type="file"]'));
        let identifyButton = await driver.findElement(By.css('button.btn'));

        // Step 10: Upload an image
        console.log('Uploading an image...');
        let filePath = path.resolve('C:\\Users\\Hlel\\Downloads\\plastic_water_bottle_bottom_014.jpg');
        await fileInput.sendKeys(filePath);

        // Step 11: Wait for the identify button to be visible and clickable
        console.log('Waiting for identify button to be visible and clickable...');
        await driver.wait(until.elementIsVisible(identifyButton), 10000);
        await driver.wait(until.elementIsEnabled(identifyButton), 10000);

        // Step 12: Click the identify button
        console.log('Clicking the identify button...');
        await identifyButton.click();

        // Step 13: Wait for the results
        console.log('Waiting for results...');
        await driver.wait(until.elementLocated(By.css('.result')), 10000);

        // Step 14: Verify the results
        console.log('Verifying results...');
        let results = await driver.findElements(By.css('.result'));
        assert(results.length > 0, 'No results found');

        console.log('Image recognition test passed!');
    } catch (error) {
        console.error('Image recognition test failed:', error);
    } finally {
        // Step 15: Quit the WebDriver
        await driver.quit();
    }
})();