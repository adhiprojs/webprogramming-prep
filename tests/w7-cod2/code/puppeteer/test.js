//Write your code here...
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; 
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  } catch {
    console.log('TESTCASE:page_load:failure');
    await browser.close();
    return;
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Test 1: At least 2 fieldset and legend elements exist
  try {
    const result = await page.evaluate(() => {
      return document.querySelectorAll('fieldset').length >= 2 &&
             document.querySelectorAll('legend').length >= 2;
    });
    console.log(result
      ? 'TESTCASE:fieldset_and_legend_elements_exist:success'
      : 'TESTCASE:fieldset_and_legend_elements_exist:failure');
  } catch {
    console.log('TESTCASE:fieldset_and_legend_elements_exist:failure');
  }

  // Test 2: 3 radio buttons with name="ageGroup" and values teen, adult, senior
  try {
    const result = await page.evaluate(() => {
      const radios = document.querySelectorAll('input[type="radio"][name="ageGroup"]');
      const values = Array.from(radios).map(r => r.value);
      return radios.length === 3 &&
             values.includes('teen') &&
             values.includes('adult') &&
             values.includes('senior');
    });
    console.log(result
      ? 'TESTCASE:age_group_radio_buttons_exist:success'
      : 'TESTCASE:age_group_radio_buttons_exist:failure');
  } catch {
    console.log('TESTCASE:age_group_radio_buttons_exist:failure');
  }

  // Test 3: At least 5 checkboxes with class genre-checkbox
  try {
    const count = await page.evaluate(() =>
      document.querySelectorAll('input[type="checkbox"].genre-checkbox').length
    );
    console.log(count >= 5
      ? 'TESTCASE:genre_checkboxes_exist:success'
      : 'TESTCASE:genre_checkboxes_exist:failure');
  } catch {
    console.log('TESTCASE:genre_checkboxes_exist:failure');
  }

  // Test 4: Clicking adult radio updates #ageDisplay
  try {
    await page.evaluate(() => {
      const radio = document.querySelector('input[type="radio"][name="ageGroup"][value="adult"]');
      if (radio) radio.click();
    });
    await wait(300);
    const text = await page.$eval('#ageDisplay', el => el.textContent.trim());
    console.log(text.includes('adult')
      ? 'TESTCASE:selecting_age_group_updates_display:success'
      : 'TESTCASE:selecting_age_group_updates_display:failure');
  } catch {
    console.log('TESTCASE:selecting_age_group_updates_display:failure');
  }

  // Test 5: Check 4 genres, click submit, verify genreCount = 4
  try {
    await page.evaluate(() => {
      const boxes = document.querySelectorAll('input[type="checkbox"].genre-checkbox');
      for (let i = 0; i < 4; i++) {
        if (boxes[i]) boxes[i].checked = true;
      }
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#pollSubmitBtn');
      if (btn) btn.click();
    });
    await wait(300);
    const count = await page.$eval('#genreCount', el => parseInt(el.textContent.trim()));
    console.log(count === 4
      ? 'TESTCASE:selected_genre_count_is_correct:success'
      : 'TESTCASE:selected_genre_count_is_correct:failure');
  } catch {
    console.log('TESTCASE:selected_genre_count_is_correct:failure');
  }

  // Test 6: Reset clears all checkboxes and resets genreCount to 0
  try {
    await page.evaluate(() => {
      const btn = document.querySelector('#pollResetBtn');
      if (btn) btn.click();
    });
    await wait(300);
    const count = await page.$eval('#genreCount', el => parseInt(el.textContent.trim()));
    const anyChecked = await page.evaluate(() => {
      const boxes = document.querySelectorAll('input[type="checkbox"].genre-checkbox');
      return Array.from(boxes).some(b => b.checked);
    });
    console.log(count === 0 && !anyChecked
      ? 'TESTCASE:reset_clears_all_selections:success'
      : 'TESTCASE:reset_clears_all_selections:failure');
  } catch {
    console.log('TESTCASE:reset_clears_all_selections:failure');
  }

  await browser.close();
})();
