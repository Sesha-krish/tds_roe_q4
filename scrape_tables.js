const { chromium } = require('playwright');

(async () => {
  let totalSum = 0;

  for (let seed = 74; seed <= 83; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for all tables
    await page.waitForSelector('table');

    // Extract all table numbers and sum
    const seedSum = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.textContent))
        .filter(num => !isNaN(num))
        .reduce((acc, val) => acc + val, 0)
    );

    console.log(`Seed ${seed}: ${seedSum}`);
    totalSum += seedSum;
    await browser.close();
  }

  console.log(`🎯 TOTAL SUM = ${totalSum}`);
})();
