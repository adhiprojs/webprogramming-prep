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
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('fieldset', { timeout: 10000 });
  } catch {
    console.log('TESTCASE:page_load:failure');
    await browser.close();
    return;
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await wait(500);

  // Test 1: At least 2 fieldset and legend elements exist
  try {
    const result = await page.evaluate(() =>
      document.querySelectorAll('fieldset').length >= 2 &&
      document.querySelectorAll('legend').length >= 2
    );
    console.log(result
      ? 'TESTCASE:fieldset_and_legend_elements_exist:success'
      : 'TESTCASE:fieldset_and_legend_elements_exist:failure');
  } catch {
    console.log('TESTCASE:fieldset_and_legend_elements_exist:failure');
  }

  // Test 2: At least 5 checkboxes with class item-checkbox
  try {
    const count = await page.evaluate(() =>
      document.querySelectorAll('input[type="checkbox"].item-checkbox').length
    );
    console.log(count >= 5
      ? 'TESTCASE:item_checkboxes_exist:success'
      : 'TESTCASE:item_checkboxes_exist:failure');
  } catch {
    console.log('TESTCASE:item_checkboxes_exist:failure');
  }

  // Test 3: 3 radio buttons with name="paymentMethod" and values cash, card, upi
  try {
    const result = await page.evaluate(() => {
      const radios = document.querySelectorAll('input[type="radio"][name="paymentMethod"]');
      const values = Array.from(radios).map(r => r.value);
      return radios.length === 3 &&
             values.includes('cash') &&
             values.includes('card') &&
             values.includes('upi');
    });
    console.log(result
      ? 'TESTCASE:payment_radio_buttons_exist:success'
      : 'TESTCASE:payment_radio_buttons_exist:failure');
  } catch {
    console.log('TESTCASE:payment_radio_buttons_exist:failure');
  }

  // Test 4: Clicking upi radio updates #paymentDisplay
  try {
    await page.evaluate(() => {
      const radio = document.querySelector('input[type="radio"][name="paymentMethod"][value="upi"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await wait(500);
    const text = await page.$eval('#paymentDisplay', el => el.textContent.trim());
    console.log(text.includes('upi')
      ? 'TESTCASE:selecting_payment_method_updates_display:success'
      : 'TESTCASE:selecting_payment_method_updates_display:failure');
  } catch {
    console.log('TESTCASE:selecting_payment_method_updates_display:failure');
  }

  // Test 5: Check item1 and item2, calculate, verify totalAmount
  try {
    const expectedTotal = await page.evaluate(() => {
      const boxes = document.querySelectorAll('input[type="checkbox"].item-checkbox');
      let total = 0;
      for (let i = 0; i < 2; i++) {
        if (boxes[i]) {
          boxes[i].checked = true;
          boxes[i].dispatchEvent(new Event('change', { bubbles: true }));
          total += parseFloat(boxes[i].getAttribute('data-price') || 0);
        }
      }
      return total;
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#calculateBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const total = await page.$eval('#totalAmount', el => parseFloat(el.textContent.trim()));
    console.log(total === expectedTotal
      ? 'TESTCASE:total_amount_is_correct:success'
      : 'TESTCASE:total_amount_is_correct:failure');
  } catch {
    console.log('TESTCASE:total_amount_is_correct:failure');
  }

  // Test 6: Discount is 10% of total for upi
  try {
    const total = await page.$eval('#totalAmount', el => parseFloat(el.textContent.trim()));
    const discount = await page.$eval('#discountAmount', el => parseFloat(el.textContent.trim()));
    const expectedDiscount = parseFloat((total * 0.10).toFixed(2));
    console.log(discount === expectedDiscount
      ? 'TESTCASE:discount_applied_for_upi:success'
      : 'TESTCASE:discount_applied_for_upi:failure');
  } catch {
    console.log('TESTCASE:discount_applied_for_upi:failure');
  }

  // Test 7: Final amount = total - discount
  try {
    const total = await page.$eval('#totalAmount', el => parseFloat(el.textContent.trim()));
    const discount = await page.$eval('#discountAmount', el => parseFloat(el.textContent.trim()));
    const final = await page.$eval('#finalAmount', el => parseFloat(el.textContent.trim()));
    const expected = parseFloat((total - discount).toFixed(2));
    console.log(final === expected
      ? 'TESTCASE:final_amount_is_correct:success'
      : 'TESTCASE:final_amount_is_correct:failure');
  } catch {
    console.log('TESTCASE:final_amount_is_correct:failure');
  }

  // Test 8: Reset clears all
  try {
    await page.evaluate(() => {
      const btn = document.querySelector('#resetBillBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const total = await page.$eval('#totalAmount', el => parseFloat(el.textContent.trim()));
    const final = await page.$eval('#finalAmount', el => parseFloat(el.textContent.trim()));
    const anyChecked = await page.evaluate(() =>
      Array.from(document.querySelectorAll('input[type="checkbox"].item-checkbox')).some(b => b.checked)
    );
    console.log(total === 0 && final === 0 && !anyChecked
      ? 'TESTCASE:reset_clears_all_selections:success'
      : 'TESTCASE:reset_clears_all_selections:failure');
  } catch {
    console.log('TESTCASE:reset_clears_all_selections:failure');
  }

  await browser.close();
})();
