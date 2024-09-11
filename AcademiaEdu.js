const { timeout } = require('puppeteer');
const puppeteer = require ('puppeteer');
const [,, url, email, password] = process.argv;
if( !url ){
    console.error('Provide the link');
    process.exit(1);
}
    
//    || !email || !password) {
//    console.error('Provide the link, email, password');
//    process.exit(1);


(async () => {
    const browser = await puppeteer.launch({headless :  false});
    const page = await browser.newPage();
    try {
        await page.goto(url);
    /*
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]',email);
        await page.click('#identifierNext');

        await page.waitForNavigation({timeout : 0});
        await page.waitForSelector('input[type="password"]');
        await page.click('#identifierNext');
    */
        try{
            await page.waitForSelector('a.js-download-button.prompt_button');
            await page.click('a.js-download-button.prompt_button');

            await page.waitForNavigation({timeout : 600000});

            console.log('Link found');

    }   catch (error) {
            console.error('Error with download button', error);

    }

    try {
        await page.waitForSelector('a.js-signup-login-button');
        await page.click('a.js-signup-login-button');                                               


}   catch (error){
        console.error('Error occured with login button', error);

    
    } 
} catch (error) {
    console.error('Error loading the page', error);
} finally {
    await browser.close();
    }
})();

