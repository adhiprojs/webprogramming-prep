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

  // Test 1: At least 2 fieldset elements exist
  try {
    const count = await page.evaluate(() => document.querySelectorAll('fieldset').length);
    console.log(count >= 2
      ? 'TESTCASE:fieldset_and_legend_elements_exist:success'
      : 'TESTCASE:fieldset_and_legend_elements_exist:failure');
  } catch {
    console.log('TESTCASE:fieldset_and_legend_elements_exist:failure');
  }

  // Test 2: 3 radio buttons with name="section" and values A, B, C exist
  try {
    const result = await page.evaluate(() => {
      const radios = document.querySelectorAll('input[type="radio"][name="section"]');
      const values = Array.from(radios).map(r => r.value);
      return radios.length === 3 && values.includes('A') && values.includes('B') && values.includes('C');
    });
    console.log(result
      ? 'TESTCASE:section_radio_buttons_exist:success'
      : 'TESTCASE:section_radio_buttons_exist:failure');
  } catch {
    console.log('TESTCASE:section_radio_buttons_exist:failure');
  }

  // Test 3: At least 5 checkboxes with class student-checkbox exist
  try {
    const count = await page.evaluate(() => document.querySelectorAll('input[type="checkbox"].student-checkbox').length);
    console.log(count >= 5
      ? 'TESTCASE:student_checkboxes_exist:success'
      : 'TESTCASE:student_checkboxes_exist:failure');
  } catch {
    console.log('TESTCASE:student_checkboxes_exist:failure');
  }

  // Test 4: Clicking section radio A updates #sectionDisplay
  try {
    await page.evaluate(() => {
      const radio = document.querySelector('input[type="radio"][name="section"][value="A"]');
      if (radio) radio.click();
    });
    await wait(300);
    const text = await page.$eval('#sectionDisplay', el => el.textContent.trim());
    console.log(text.includes('A')
      ? 'TESTCASE:selecting_section_radio_updates_display:success'
      : 'TESTCASE:selecting_section_radio_updates_display:failure');
  } catch {
    console.log('TESTCASE:selecting_section_radio_updates_display:failure');
  }

  // Test 5: Check 3 checkboxes, click submit, verify presentCount = 3
  try {
    await page.evaluate(() => {
      const boxes = document.querySelectorAll('input[type="checkbox"].student-checkbox');
      for (let i = 0; i < 3; i++) {
        if (boxes[i]) boxes[i].checked = true;
      }
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#submitBtn');
      if (btn) btn.click();
    });
    await wait(300);
    const present = await page.$eval('#presentCount', el => parseInt(el.textContent.trim()));
    console.log(present === 3
      ? 'TESTCASE:present_count_matches_checked_students:success'
      : 'TESTCASE:present_count_matches_checked_students:failure');
  } catch {
    console.log('TESTCASE:present_count_matches_checked_students:failure');
  }

  // Test 6: absentCount = total - 3
  try {
    const total = await page.evaluate(() => document.querySelectorAll('input[type="checkbox"].student-checkbox').length);
    const absent = await page.$eval('#absentCount', el => parseInt(el.textContent.trim()));
    console.log(absent === (total - 3)
      ? 'TESTCASE:absent_count_is_correct:success'
      : 'TESTCASE:absent_count_is_correct:failure');
  } catch {
    console.log('TESTCASE:absent_count_is_correct:failure');
  }

  await browser.close();
})();
