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
    width: 1920,
    height: 1080
  });

    await page.goto('https://online.apexpharma.com.sg/');
    //await page.goto('https://completevms.com.sg/');

    await page.type("input[name='username']", 'CLINICAL');
    await page.type("input[name='password']", '1313twl');

    await page.click("input[id='submit']");

    await page.waitForSelector('#promo_popup');
    //await page.waitFor(2000);

    await page.goto('https://online.apexpharma.com.sg/products/');
    

    //This is working code for 1 page
    const productTables = await page.evaluate(() => {
      const elements = document.querySelectorAll('.productTable');
      return Array.from(elements).map(element => {
        // Extract the product-title, product-price, product-date, and product-description from each element
        const title = element.querySelector('.product-title b').innerText;
        const dateCheck = element.querySelector('.product-date b');
        let date = '';
        if (dateCheck && dateCheck.innerText) {
          date = dateCheck.innerText;
        };
        const qty = element.querySelector('.product-description b').innerText;

        console.log(dateCheck);
  
        return {
          title,
          date,
          qty
         };
       });
    });
  
    console.log(productTables);

  }
)();