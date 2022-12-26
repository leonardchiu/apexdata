const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
      headless: false,
      keepAlive: true
      //executablePath: 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
     });
    const page = await browser.newPage();

    await page.setViewport({
    //width: page.viewport().width,
    //height: page.viewport().height
    width: 1366,
    height: 768
  });

    await page.goto('https://online.apexpharma.com.sg/');
    //await page.goto('https://completevms.com.sg/');

    await page.type("input[name='username']", 'CLINICAL');
    await page.type("input[name='password']", '1313twl');

    await page.click("input[id='submit']");
    
    await page.waitForSelector('#promo_popup');
    //await page.click("//div[@id='promo_popup']//button[@id='alertclose']")

    const popup = await page.evaluate(() => {
      window.open('https://online.apexpharma.com.sg', 'popup');
    });

    await popup.waitForNavigation();

    await popup.close();

    await page.waitForSelector('#main_navigation_wrap');
    //await page.click("a[href='/products']")
    await page.click('#main_navigation_wrap')
  }
)();