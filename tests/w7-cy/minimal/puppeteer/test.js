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

  // Test 1: At least 3 fieldset and legend elements exist
  try {
    const result = await page.evaluate(() =>
      document.querySelectorAll('fieldset').length >= 3 &&
      document.querySelectorAll('legend').length >= 3
    );
    console.log(result
      ? 'TESTCASE:fieldset_and_legend_elements_exist:success'
      : 'TESTCASE:fieldset_and_legend_elements_exist:failure');
  } catch {
    console.log('TESTCASE:fieldset_and_legend_elements_exist:failure');
  }

  // Test 2: 3 radio buttons with name="subject" and values maths, science, english
  try {
    const result = await page.evaluate(() => {
      const radios = document.querySelectorAll('input[type="radio"][name="subject"]');
      const values = Array.from(radios).map(r => r.value);
      return radios.length === 3 &&
             values.includes('maths') &&
             values.includes('science') &&
             values.includes('english');
    });
    console.log(result
      ? 'TESTCASE:subject_radio_buttons_exist:success'
      : 'TESTCASE:subject_radio_buttons_exist:failure');
  } catch {
    console.log('TESTCASE:subject_radio_buttons_exist:failure');
  }

  // Test 3: At least 3 checkboxes with class topic-checkbox
  try {
    const count = await page.evaluate(() =>
      document.querySelectorAll('input[type="checkbox"].topic-checkbox').length
    );
    console.log(count >= 3
      ? 'TESTCASE:topic_checkboxes_exist:success'
      : 'TESTCASE:topic_checkboxes_exist:failure');
  } catch {
    console.log('TESTCASE:topic_checkboxes_exist:failure');
  }

  // Test 4: studentName input exists
  try {
    const exists = await page.evaluate(() =>
      document.querySelector('#studentName') !== null
    );
    console.log(exists
      ? 'TESTCASE:student_name_input_exists:success'
      : 'TESTCASE:student_name_input_exists:failure');
  } catch {
    console.log('TESTCASE:student_name_input_exists:failure');
  }

  // Test 5: Clicking science radio updates #subjectDisplay
  try {
    await page.evaluate(() => {
      const radio = document.querySelector('input[type="radio"][name="subject"][value="science"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await wait(500);
    const text = await page.$eval('#subjectDisplay', el => el.textContent.trim());
    console.log(text.includes('science')
      ? 'TESTCASE:selecting_subject_updates_display:success'
      : 'TESTCASE:selecting_subject_updates_display:failure');
  } catch {
    console.log('TESTCASE:selecting_subject_updates_display:failure');
  }

  // Test 6: All correct answers gives score 3
  try {
    await page.evaluate(() => {
      const q1 = document.querySelector('input[type="radio"][name="q1"][value="a"]');
      const q2 = document.querySelector('input[type="radio"][name="q2"][value="b"]');
      const q3 = document.querySelector('input[type="radio"][name="q3"][value="c"]');
      [q1, q2, q3].forEach(r => {
        if (r) {
          r.checked = true;
          r.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#submitQuizBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const score = await page.$eval('#quizScore', el => parseInt(el.textContent.trim()));
    console.log(score === 3
      ? 'TESTCASE:all_correct_answers_gives_score_3:success'
      : 'TESTCASE:all_correct_answers_gives_score_3:failure');
  } catch {
    console.log('TESTCASE:all_correct_answers_gives_score_3:failure');
  }

  // Test 7: Grade is A for score 3
  try {
    const grade = await page.$eval('#quizGrade', el => el.textContent.trim());
    console.log(grade === 'A'
      ? 'TESTCASE:grade_is_correct_for_full_score:success'
      : 'TESTCASE:grade_is_correct_for_full_score:failure');
  } catch {
    console.log('TESTCASE:grade_is_correct_for_full_score:failure');
  }

  // Test 8: Remark is Excellent for score 3
  try {
    const remark = await page.$eval('#quizRemark', el => el.textContent.trim());
    console.log(remark === 'Excellent'
      ? 'TESTCASE:remark_is_correct_for_full_score:success'
      : 'TESTCASE:remark_is_correct_for_full_score:failure');
  } catch {
    console.log('TESTCASE:remark_is_correct_for_full_score:failure');
  }

  // Test 9: All wrong answers gives score 0 and grade F
  try {
    await page.evaluate(() => {
      const q1 = document.querySelector('input[type="radio"][name="q1"][value="b"]');
      const q2 = document.querySelector('input[type="radio"][name="q2"][value="a"]');
      const q3 = document.querySelector('input[type="radio"][name="q3"][value="a"]');
      [q1, q2, q3].forEach(r => {
        if (r) {
          r.checked = true;
          r.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#submitQuizBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const score = await page.$eval('#quizScore', el => parseInt(el.textContent.trim()));
    const grade = await page.$eval('#quizGrade', el => el.textContent.trim());
    console.log(score === 0 && grade === 'F'
      ? 'TESTCASE:wrong_answers_gives_score_0:success'
      : 'TESTCASE:wrong_answers_gives_score_0:failure');
  } catch {
    console.log('TESTCASE:wrong_answers_gives_score_0:failure');
  }

  // Test 10: Reset clears all fields
  try {
    await page.evaluate(() => {
      const nameInput = document.querySelector('#studentName');
      if (nameInput) nameInput.value = 'Test Student';
    });
    await page.evaluate(() => {
      const btn = document.querySelector('#resetQuizBtn');
      if (btn) btn.click();
    });
    await wait(500);
    const name = await page.$eval('#studentName', el => el.value.trim());
    const score = await page.$eval('#quizScore', el => el.textContent.trim());
    const grade = await page.$eval('#quizGrade', el => el.textContent.trim());
    const remark = await page.$eval('#quizRemark', el => el.textContent.trim());
    console.log(name === '' && score === '0' && grade === '-' && remark === '-'
      ? 'TESTCASE:reset_clears_all_fields:success'
      : 'TESTCASE:reset_clears_all_fields:failure');
  } catch {
    console.log('TESTCASE:reset_clears_all_fields:failure');
  }

  await browser.close();
})();
