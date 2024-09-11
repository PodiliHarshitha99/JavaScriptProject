
//const is a keyword which is used to define variables that cannot change once a value is assigned to it 
const puppeteer = require('puppeteer'); // JS library that provides API to control Chrome where we can automate the logins, UI testing, etc.  
const path = require('node:path');
const fs = require('fs');


const [,, url, username, password] = process.argv; //process.argv is an array of command-line arguments passed when running a script.


if ( !url || !username || !password ) {
    console.error('Provide your username and password');
    process.exit(1);
    
}


(async () => {
 
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage(); 
 
try {
    await page.goto(url);

    await page.waitForSelector('#wpName1'); //waitForSelector('#wpName1') is a method that is used to wait for an element with the specifies CSS selector. 
    //wpName1 is an identifier
    await page.waitForSelector('#wpPassword1');
    await page.waitForSelector('#wpLoginAttempt');
    

    await page.type('#wpName1', username); 
    await page.type('#wpPassword1', password); 
    await page.click('#wpLoginAttempt');

    
    await page.waitForNavigation({timeout : 0});
    console.log('Login successful');
    
   

// By default, after 30000 milliseconds, the page is closed automatically which is known as Timeout.
//page.setDefaultTimeout function is used to disable the timeout and if we pass 0 to disable the timeout.


} catch (error) {
    console.error('Error occured', error);
    //process.exit(1);
} finally {
    await browser.close();
}


})();








