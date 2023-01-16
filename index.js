const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    keepAlive: true,
    //executablePath: 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
  });
  const page = await browser.newPage();

  await page.setViewport({
    //width: page.viewport().width,
    //height: page.viewport().height
    width: 1920,
    height: 1080,
  });

  await page.goto("https://online.apexpharma.com.sg/");
  //await page.goto('https://completevms.com.sg/');

  await page.type("input[name='username']", "CLINICAL");
  await page.type("input[name='password']", "1313twl");

  await page.click("input[id='submit']");

  await page.waitForSelector("#promo_popup");
  //await page.waitFor(2000);

  await page.goto("https://online.apexpharma.com.sg/products/");

  // //This is working code for 1 page
  // const productTables = await page.evaluate(() => {
  //   const elements = document.querySelectorAll('.productTable');
  //   return Array.from(elements).map(element => {
  //     // Extract the product-title, product-price, product-date, and product-description from each element
  //     const title = element.querySelector('.product-title b').innerText;
  //     const dateCheck = element.querySelector('.product-date b');
  //     const price = element.querySelector('.product-price b b').innerText;
  //     let date = '';
  //     if (dateCheck && dateCheck.innerText) {
  //       date = dateCheck.innerText;
  //     };
  //     const qty = element.querySelector('.product-description b').innerText;
  //     const status = element.querySelector('.addtocart').innerText;

  //     console.log(dateCheck);

  //     return {
  //       title,
  //       price,
  //       date,
  //       qty,
  //       status
  //      };
  //    });
  // });

  //This is the block to paginate by clicking next, scrape and append to variable productTables
  let productTables = [];
  const numPages = 50;
  for (let i = 1; i <= numPages; i++) {
    // Wait for 5 seconds before navigating to the next page
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Check if the next button has a disabled class
    const nextButton = await page.$(".next.disabled");

    // If the next button has a disabled class, exit the loop
    if (nextButton) {
      break;
    }

    // Scrape the data on the current page and add it to the productTables array
    const pageData = await page.evaluate(() => {
      const elements = document.querySelectorAll(".productTable");
      return Array.from(elements).map((element) => {
        // Extract the product-title, product-price, product-date, and product-description from each element
        const title = element.querySelector(".product-title b").innerText;
        const dateCheck = element.querySelector(".product-date b");
        const price = element.querySelector(".product-price b b").innerText;
        let date = "";
        if (dateCheck && dateCheck.innerText) {
          date = dateCheck.innerText;
        }
        const qty = element.querySelector(".product-description b").innerText;
        const status = element.querySelector(".addtocart").innerText;

        return {
          title,
          price,
          date,
          qty,
          status,
        };
      });
    });

    // Append the new data to the productTables variable
    //productTables = [...productTables, ...pageData];
    productTables.push(...pageData);

    // Click on the next button
    await page.click(".page-item.next");
  }

  console.log(productTables);
  fs.writeFileSync("productTables.json", JSON.stringify(productTables));
})();

//puppeteer pagination, scrape and append to variable productTables
