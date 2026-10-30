const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io/';

  // Test Case 1: Check if profile-card exists
  const page1 = await browser.newPage();
  try {
    await page1.goto(url);
    const cardExists = await page1.$('.profile-card') !== null;
    if (cardExists) {
      console.log('TESTCASE:profile_card_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_is_present:failure');
  }

  // Test Case 2: Check profile-card background color
  const page2 = await browser.newPage();
  try {
    await page2.goto(url);
    const backgroundColor = await page2.$eval('.profile-card', el => window.getComputedStyle(el).backgroundColor);
    if (backgroundColor === 'rgb(255, 255, 255)') {
      console.log('TESTCASE:profile_card_background_color_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_background_color_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_background_color_is_present:failure');
  }

  // Test Case 3: Check profile-card box shadow
  const page3 = await browser.newPage();
  try {
    await page3.goto(url);
    const boxShadow = await page3.$eval('.profile-card', el => window.getComputedStyle(el).boxShadow);
    if (boxShadow !== 'none') {
      console.log('TESTCASE:profile_card_box_shadow_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_box_shadow_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_box_shadow_is_present:failure');
  }

  // Test Case 4: Check profile-card heading h2 text
  const page4 = await browser.newPage();
  try {
    await page4.goto(url);
    const headerText = await page4.$eval('.profile-card h2', el => el.innerText.trim());
    if (headerText === 'John Doe') {
      console.log('TESTCASE:profile_card_heading2_text_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_heading2_text_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_heading2_text_is_present:failure');
  }

  // Test Case 5: Check profile-card button text
  const page5 = await browser.newPage();
  try {
    await page5.goto(url);
    const buttonText = await page5.$eval('.profile-card .button', el => el.innerText.trim());
    if (buttonText === 'Contact') {
      console.log('TESTCASE:profile_card_button_text_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_button_text_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_button_text_is_present:failure');
  }

  // Test Case 6: Check profile-card button background color
  const page6 = await browser.newPage();
  try {
    await page6.goto(url);
    const buttonColor = await page6.$eval('.profile-card .button', el => window.getComputedStyle(el).backgroundColor);
    if (buttonColor === 'rgb(76, 174, 79)') {
      console.log('TESTCASE:profile_card_button_color_is_present:success');
    } else {
      console.log('TESTCASE:profile_card_button_color_is_present:failure');
    }
  } catch {
    console.log('TESTCASE:profile_card_button_color_is_present:failure');
  }

  // Test Case 7: Check profile-card button hover color
  const page7 = await browser.newPage();
try {
  await page7.goto(url);

  const button = await page7.$('.profile-card .button');
  await button.hover();

  // Add a tiny wait to let the hover effect apply
  await page7.waitForTimeout(500);

  const hoverColor = await page7.$eval('.profile-card .button', el => 
    window.getComputedStyle(el).backgroundColor
  );

  if (hoverColor === 'rgb(69, 170, 63)') {
    console.log('TESTCASE:profile_card_button_hover_color_is_present:success');
  } else {
    console.log('TESTCASE:profile_card_button_hover_color_is_present:failure');
  }
} catch {
  console.log('TESTCASE:profile_card_button_hover_color_is_present:failure');
}


  // Cleanup
  finally {
    await page1.close();
    await page2.close();
    await page3.close();
    await page4.close();
    await page5.close();
    await page6.close();
    await page7.close();
    await browser.close();
  }
})();
