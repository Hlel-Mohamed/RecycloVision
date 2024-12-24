import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function identifyMaterialTest() {
    // Step 1: Set up the WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Step 2: Open the web application
        console.log('Opening the web application...');
        await driver.get("http://localhost:5173/");

        // Step 3: Click on the "Image Recognition" link
        console.log('Clicking on the "Image Recognition" link...');
        await driver.findElement(By.linkText("Image Recognition")).click();

        // Step 4: Click on the "Upload Image" button
        console.log('Clicking on the "Upload Image" button...');
        await driver.findElement(By.xpath("//button[contains(.,'Upload Image')]")).click();

        // Step 5: Type the file path into the file input element
        console.log('Typing the file path into the file input element...');
        await driver.findElement(By.xpath("//input[@type='file']")).sendKeys("C:\\Users\\Hlel\\Downloads\\plastic_water_bottle_bottom_014.jpg");

        // Step 6: Click on the element with the class "mt-4"
        console.log('Clicking on the element with the class "mt-4"...');
        await driver.findElement(By.css(".mt-4")).click();

        // Step 7: Click on the second block element
        console.log('Clicking on the second block element...');
        await driver.findElement(By.css(".block:nth-child(2)")).click();

        // Step 8: Click on the third button element
        console.log('Clicking on the third button element...');
        await driver.findElement(By.css(".btn:nth-child(3)")).click();

        console.log('Identify Material test passed!');
    } catch (error) {
        console.error('Identify Material test failed:', error);
    } finally {
        // Step 9: Quit the WebDriver
        await driver.quit();
    }
})();