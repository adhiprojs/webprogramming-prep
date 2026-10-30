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

  // Test 2: 3 radio buttons with name="fitnessGoal" and values weightloss, muscle, stamina
  try {
    const result = await page.evaluate(() => {
      const radios = document.querySelectorAll('input[type="radio"][name="fitnessGoal"]');
      const values = Array.from(radios).map(r => r.value);
      return radios.length === 3 &&
             values.includes('weightloss') &&
             values.includes('muscle') &&
             values.includes('stamina');
    });
    console.log(result
      ? 'TESTCASE:fitness_goal_radio_buttons_exist:success'
      : 'TESTCASE:fitness_goal_radio_buttons_exist:failure');
  } catch {
    console.log('TESTCASE:fitness_goal_radio_buttons_exist:failure');
  }

  // Test 3: Exactly 7 checkboxes with class day-checkbox
  try {
    const count = await page.evaluate(() =>
      document.querySelectorAll('input[type="checkbox"].day-checkbox').length
    );
    console.log(count === 7
      ? 'TESTCASE:workout_day_checkboxes_exist:success'
      : 'TESTCASE:workout_day_checkboxes_exist:failure');
  } catch {
    console.log('TESTCASE:workout_day_checkboxes_exist:failure');
  }

  // Test 4: Clicking muscle radio updates #goalDisplay
  try {
    await page.evaluate(() => {
      const radio = document.querySelector('input[type="radio"][name="fitnessGoal"][value="muscle"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await wait(500);
    const text = await page.$eval('#goalDisplay', el => el.textContent.trim());
    console.log(text.includes('muscle')
      ? 'TESTCASE:selecting_fitness_goal_updates_display:success'
      : 'TESTCASE:selecting_fitness_goal_updates_display:failure');
  } catch {
    console.log('TESTCASE:selecting_fitness_goal_updates_display:failure');
  }

  // Test 5: Check 4 days, click calcPlanBtn, verify workoutDays = 4
  try {
    await page.evaluate(() => {
      const boxes = document.querySelectorAll('input[type="checkbox"].day-checkbox');
      for (let i = 0; i < 4; i++) {
        if (boxes[i]) {
          boxes[i].checked = true;
          boxes[i].dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#calcPlanBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const days = await page.$eval('#workoutDays', el => parseInt(el.textContent.trim()));
    console.log(days === 4
      ? 'TESTCASE:workout_days_count_is_correct:success'
      : 'TESTCASE:workout_days_count_is_correct:failure');
  } catch {
    console.log('TESTCASE:workout_days_count_is_correct:failure');
  }

  // Test 6: weightloss + 3 days = 1200 calories
  try {
    await page.evaluate(() => {
      // uncheck all first
      document.querySelectorAll('input[type="checkbox"].day-checkbox').forEach(b => b.checked = false);
      // select weightloss
      const radio = document.querySelector('input[type="radio"][name="fitnessGoal"][value="weightloss"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // check 3 days
      const boxes = document.querySelectorAll('input[type="checkbox"].day-checkbox');
      for (let i = 0; i < 3; i++) {
        if (boxes[i]) boxes[i].checked = true;
      }
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#calcPlanBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const calories = await page.$eval('#caloriesBurned', el => parseInt(el.textContent.trim()));
    console.log(calories === 1200
      ? 'TESTCASE:calories_burned_is_correct:success'
      : 'TESTCASE:calories_burned_is_correct:failure');
  } catch {
    console.log('TESTCASE:calories_burned_is_correct:failure');
  }

  // Test 7: restDays = 7 - workoutDays
  try {
    const days = await page.$eval('#workoutDays', el => parseInt(el.textContent.trim()));
    const rest = await page.$eval('#restDays', el => parseInt(el.textContent.trim()));
    console.log(rest === (7 - days)
      ? 'TESTCASE:rest_days_is_correct:success'
      : 'TESTCASE:rest_days_is_correct:failure');
  } catch {
    console.log('TESTCASE:rest_days_is_correct:failure');
  }

  // Test 8: Reset clears all
  try {
    await page.evaluate(() => {
      const btn = document.querySelector('#resetPlanBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const days = await page.$eval('#workoutDays', el => parseInt(el.textContent.trim()));
    const calories = await page.$eval('#caloriesBurned', el => parseInt(el.textContent.trim()));
    const rest = await page.$eval('#restDays', el => parseInt(el.textContent.trim()));
    const anyChecked = await page.evaluate(() =>
      Array.from(document.querySelectorAll('input[type="checkbox"].day-checkbox')).some(b => b.checked)
    );
    console.log(days === 0 && calories === 0 && rest === 0 && !anyChecked
      ? 'TESTCASE:reset_clears_all_selections:success'
      : 'TESTCASE:reset_clears_all_selections:failure');
  } catch {
    console.log('TESTCASE:reset_clears_all_selections:failure');
  }

  await browser.close();
})();
