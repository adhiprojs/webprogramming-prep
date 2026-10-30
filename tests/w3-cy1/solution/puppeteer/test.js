const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const url = 'https://8081-workspace.examly.io/'; // 🔁 Replace with actual deployed URL

  // Test Case 1: Verify Body Background Color
  const page = await browser.newPage();
  try {
    await page.goto(url);
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    if (bodyBg === 'rgb(52, 73, 94)') {
      console.log('TESTCASE:verify_body_background_color:success');
    } else {
      console.log('TESTCASE:verify_body_background_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_body_background_color:failure');
  }

  // Test Case 2: Verify Navbar Background Color
  const page1 = await browser.newPage();
  try {
    await page1.goto(url);
    const navBg = await page1.$eval('.navbar', el => getComputedStyle(el).backgroundColor);
    if (navBg === 'rgb(44, 62, 80)') {
      console.log('TESTCASE:verify_navbar_background_color:success');
    } else {
      console.log('TESTCASE:verify_navbar_background_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_navbar_background_color:failure');
  }

  // Test Case 3: Verify Card Background Color
  const page2 = await browser.newPage();
  try {
    await page2.goto(url);
    const cardBg = await page2.$eval('.card', el => getComputedStyle(el).backgroundColor);
    if (cardBg === 'rgb(255, 255, 255)') {
      console.log('TESTCASE:verify_card_background_color:success');
    } else {
      console.log('TESTCASE:verify_card_background_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_card_background_color:failure');
  }

  // Test Case 4: Verify Footer Background Color
  const page3 = await browser.newPage();
  try {
    await page3.goto(url);
    const footerBg = await page3.$eval('.footer', el => getComputedStyle(el).backgroundColor);
    if (footerBg === 'rgb(44, 62, 80)') {
      console.log('TESTCASE:verify_footer_background_color:success');
    } else {
      console.log('TESTCASE:verify_footer_background_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_background_color:failure');
  }

  // Test Case 5: Verify Main Heading Text Color
  const page4 = await browser.newPage();
  try {
    await page4.goto(url);
    const headingColor = await page4.$eval('.heading', el => getComputedStyle(el).color);
    if (headingColor === 'rgb(192, 57, 43)') {
      console.log('TESTCASE:verify_main_heading_text_color:success');
    } else {
      console.log('TESTCASE:verify_main_heading_text_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_main_heading_text_color:failure');
  }

  // Test Case 6: Verify Subheading Text Color
  const page5 = await browser.newPage();
  try {
    await page5.goto(url);
    const subheadingColor = await page5.$eval('.subheading', el => getComputedStyle(el).color);
    if (subheadingColor === 'rgb(41, 128, 185)') {
      console.log('TESTCASE:verify_subheading_text_color:success');
    } else {
      console.log('TESTCASE:verify_subheading_text_color:failure');
    }
  } catch {
    console.log('TESTCASE:verify_subheading_text_color:failure');
  }

  // Test Case 13: Check <h1> text content
const page7 = await browser.newPage();
try {
  await page7.goto(url);
  await page7.setViewport({ width: 1200, height: 1200 });
  const h1Text = await page7.$eval('h2', el => el.textContent.trim());
  if (h1Text === 'Introduction to CSS') {
    console.log('TESTCASE:h2_text_is_correct:success');
  } else {
    console.log('TESTCASE:h2_text_is_correct:failure');
  }
} catch (error) {
  console.log('TESTCASE:h2_text_is_correct:failure');
}


// Test Case 13: Check <h1> text content
const page9 = await browser.newPage();
try {
  await page9.goto(url);
  await page9.setViewport({ width: 1200, height: 1200 });
  const h3Text = await page9.$eval('h3', el => el.textContent.trim());
  if (h3Text === 'CSS Syntax') {
    console.log('TESTCASE:h3_text_is_correct:success');
  } else {
    console.log('TESTCASE:h3_text_is_correct:failure');
  }
} catch (error) {
  console.log('TESTCASE:h3_text_is_correct:failure');
}



  await browser.close();
})();
