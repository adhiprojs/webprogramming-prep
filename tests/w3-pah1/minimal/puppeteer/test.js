const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io/';

  // Test Case 1: Check header background color
  const page1 = await browser.newPage();
  try {
    await page1.goto(url);
    await page1.setViewport({ width: 1200, height: 1200 });
    const headerBgColor = await page1.$eval('header', el => window.getComputedStyle(el).backgroundColor);
    if (headerBgColor === 'rgb(0, 115, 230)') {
      console.log('TESTCASE:header_bg_color_is_correct:success');
    } else {
      console.log('TESTCASE:header_bg_color_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:header_bg_color_is_correct:failure');
  }

  // Test Case 2: Check navigation link color
  const page2 = await browser.newPage();
  try {
    await page2.goto(url);
    await page2.setViewport({ width: 1200, height: 1200 });
    const navLinkColor = await page2.$eval('nav a', el => window.getComputedStyle(el).color);
    if (navLinkColor === 'rgb(255, 255, 255)') {
      console.log('TESTCASE:nav_link_color_is_correct:success');
    } else {
      console.log('TESTCASE:nav_link_color_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:nav_link_color_is_correct:failure');
  }

  // Test Case 3: Check container max-width
  const page3 = await browser.newPage();
  try {
    await page3.goto(url);
    await page3.setViewport({ width: 1200, height: 1200 });
    const containerMaxWidth = await page3.$eval('.container', el => window.getComputedStyle(el).maxWidth);
    if (containerMaxWidth === '1200px') {
      console.log('TESTCASE:container_max_width_is_correct:success');
    } else {
      console.log('TESTCASE:container_max_width_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:container_max_width_is_correct:failure');
  }

  // Test Case 4: Check contact form alignment
  const page4 = await browser.newPage();
  try {
    await page4.goto(url);
    await page4.setViewport({ width: 1200, height: 1200 });
    const contactFormAlignment = await page4.$eval('.contact-form', el => window.getComputedStyle(el).alignItems);
    if (contactFormAlignment === 'center') {
      console.log('TESTCASE:contact_form_alignment_is_correct:success');
    } else {
      console.log('TESTCASE:contact_form_alignment_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:contact_form_alignment_is_correct:failure');
  }

  // Test Case 5: Check contact form button background color
  const page5 = await browser.newPage();
  try {
    await page5.goto(url);
    await page5.setViewport({ width: 1200, height: 1200 });
    const buttonBgColor = await page5.$eval('.contact-form button', el => window.getComputedStyle(el).backgroundColor);
    if (buttonBgColor === 'rgb(0, 115, 230)') {
      console.log('TESTCASE:button_bg_color_is_correct:success');
    } else {
      console.log('TESTCASE:button_bg_color_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:button_bg_color_is_correct:failure');
  }

  // Test Case 6: Check nav link text-transform
  const page6 = await browser.newPage();
  try {
    await page6.goto(url);
    await page6.setViewport({ width: 1200, height: 1200 });
    const navLinkTextTransform = await page6.$eval('nav a', el => window.getComputedStyle(el).textTransform);
    if (navLinkTextTransform === 'uppercase') {
      console.log('TESTCASE:nav_link_text_transform_is_correct:success');
    } else {
      console.log('TESTCASE:nav_link_text_transform_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:nav_link_text_transform_is_correct:failure');
  }

  // Test Case 7: Check header padding
  const page7 = await browser.newPage();
  try {
    await page7.goto(url);
    await page7.setViewport({ width: 1200, height: 1200 });
    const headerPadding = await page7.$eval('header', el => window.getComputedStyle(el).padding);
    if (headerPadding === '16px') {
      console.log('TESTCASE:header_padding_is_correct:success');
    } else {
      console.log('TESTCASE:header_padding_is_correct:failure');
    }
  } catch (error) {
    console.log('TESTCASE:header_padding_is_correct:failure');
  }

  // Test Case 13: Check <h1> text content
const page8 = await browser.newPage();
try {
  await page8.goto(url);
  await page8.setViewport({ width: 1200, height: 1200 });
  const h1Text = await page8.$eval('h1', el => el.textContent.trim());

  if (h1Text === 'Contact Us') {
    console.log('TESTCASE:h1_text_is_correct:success');
  } else {
    console.log('TESTCASE:h1_text_is_correct:failure');
  }
} catch (error) {
  console.log('TESTCASE:h1_text_is_correct:failure');
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
    await page8.close();
    await browser.close();
  }
})();
