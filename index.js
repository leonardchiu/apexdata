const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
      headless: false,
      executablePath: 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
     });
    const page = await browser.newPage();
    await page.goto('https://online.apexpharma.com.sg/');

    await page.type("input[name='username']", 'CLINCIAL');
    await page.type("input[name='password']", '1313twl');

    await page.click("input[id='submit']");

    await page.waitForSelector("a[href='/products']");
    await page.click("a[href='/products']")
  }
)();