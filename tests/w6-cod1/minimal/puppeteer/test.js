const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const url = 'https://8081-workspace.examly.io'; // 🔁 Replace with correct local file path

  // Test Case 1: Page loads with no background applied to the paragraph
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#textPara');

    const bgColor = await page.$eval('#textPara', el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log(bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent'
      ? 'TESTCASE:no_background_on_load:success'
      : 'TESTCASE:no_background_on_load:failure');
  } catch {
    console.log('TESTCASE:no_background_on_load:failure');
  }

  // Test Case 2: Clicking "Highlight" applies yellow background
  try {
    await page.click('#highlightBtn');
    const bgColor = await page.$eval('#textPara', el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log(bgColor === 'rgb(255, 255, 0)'
      ? 'TESTCASE:highlight_applied_on_click:success'
      : 'TESTCASE:highlight_applied_on_click:failure');
  } catch {
    console.log('TESTCASE:highlight_applied_on_click:failure');
  }

  // Test Case 3: Clicking again removes yellow background
  try {
    await page.click('#highlightBtn');
    const bgColor = await page.$eval('#textPara', el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log(bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent'
      ? 'TESTCASE:highlight_removed_on_second_click:success'
      : 'TESTCASE:highlight_removed_on_second_click:failure');
  } catch {
    console.log('TESTCASE:highlight_removed_on_second_click:failure');
  }

  // Test Case 4: No other elements (like the button) are affected
  try {
    const btnBgColor = await page.$eval('#highlightBtn', el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log(btnBgColor !== 'rgb(255, 255, 0)'
      ? 'TESTCASE:other_elements_not_affected:success'
      : 'TESTCASE:other_elements_not_affected:failure');
  } catch {
    console.log('TESTCASE:other_elements_not_affected:failure');
  }

  // Test Case 5: Button functions correctly after multiple toggles
  try {
    let toggleSuccess = true;

    for (let i = 0; i < 4; i++) {
      await page.click('#highlightBtn');
      const bgColor = await page.$eval('#textPara', el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      const expected = i % 2 === 0 ? 'rgb(255, 255, 0)' : 'rgba(0, 0, 0, 0)';
      if (!(bgColor === expected || (expected === 'rgba(0, 0, 0, 0)' && bgColor === 'transparent'))) {
        toggleSuccess = false;
        break;
      }
    }

    console.log(toggleSuccess
      ? 'TESTCASE:button_toggle_multiple_times:success'
      : 'TESTCASE:button_toggle_multiple_times:failure');
  } catch {
    console.log('TESTCASE:button_toggle_multiple_times:failure');
  }

  // Test Case 6: Clicking button before DOM fully loads doesn’t throw errors
  try {
    const errorPage = await browser.newPage();
    const consoleErrors = [];

    errorPage.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await errorPage.goto(url);
    await errorPage.click('#highlightBtn');
    await errorPage.waitForSelector('#textPara');

    console.log(consoleErrors.length === 0
      ? 'TESTCASE:no_errors_on_early_click:success'
      : 'TESTCASE:no_errors_on_early_click:failure');

    await errorPage.close();
  } catch {
    console.log('TESTCASE:no_errors_on_early_click:failure');
  }

  await browser.close();
})();
