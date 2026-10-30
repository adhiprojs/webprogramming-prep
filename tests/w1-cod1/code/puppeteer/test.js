const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Main Heading Text ("My First Webpage")
  try {
    await page.goto(url);
    const headerText = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });
    if (headerText === 'My First Webpage') {
      console.log('TESTCASE:verify_header_text:success');
    } else {
      console.log('TESTCASE:verify_header_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_text:failure');
  }

  // Test Case 2: Description Text ("Welcome to my first webpage!")
  try {
    const descriptionText = await page.evaluate(() => {
      return document.querySelector('h5').innerText;
    });
    if (descriptionText === 'Welcome to my first webpage! This is an introduction to HTML structure and elements.') {
      console.log('TESTCASE:verify_description_text:success');
    } else {
      console.log('TESTCASE:verify_description_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_description_text:failure');
  }

  // Test Case 3: Subheading Text ("This webpage demonstrates the basic structure of an HTML document")
  try {
    const subHeaderText = await page.evaluate(() => {
      return document.querySelector('h2').innerText;
    });
    if (subHeaderText === 'This webpage demonstrates the basic structure of an HTML document, including headings, paragraphs, and footers.') {
      console.log('TESTCASE:verify_subheader_text:success');
    } else {
      console.log('TESTCASE:verify_subheader_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_subheader_text:failure');
  }

  // Test Case 4: Footer Text Content with Italics ("2025 My First Webpage. All rights reserved.")
  try {
    const footerText = await page.evaluate(() => {
      const footerTextElement = document.querySelector('footer p');
      const isItalic = footerTextElement.querySelector('i') !== null;
      return { text: footerTextElement.innerText, isItalic };
    });

    const expectedText = '2025 My First Webpage. All rights reserved.';

    if (footerText.text === expectedText && footerText.isItalic) {
      console.log('TESTCASE:verify_footer_text_italic:success');
    } else {
      console.log('TESTCASE:verify_footer_text_italic:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_text_italic:failure');
  }

  // Test Case 5: Paragraph Content ("HTML is the standard language used to create webpages")
  try {
    const paragraphTextHTML = await page.evaluate(() => {
      return document.querySelectorAll('p')[0].innerText; // First <p> explaining HTML
    });
    if (paragraphTextHTML === 'HTML is the standard language used to create webpages and structure content on the web.') {
      console.log('TESTCASE:verify_html_paragraph_text:success');
    } else {
      console.log('TESTCASE:verify_html_paragraph_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_html_paragraph_text:failure');
  }

  // Test Case 6: Verifying HTML Structure, including <html>, <head>, <body>, and <title>
  try {
    const isValidStructure = await page.evaluate(() => {
      const htmlTag = document.querySelector('html') !== null;
      const headTag = document.querySelector('head') !== null;
      const bodyTag = document.querySelector('body') !== null;
      const titleTag = document.querySelector('title') && document.querySelector('title').innerText === 'My First Webpage';
      
      return htmlTag && headTag && bodyTag && titleTag;
    });

    if (isValidStructure) {
      console.log('TESTCASE:verify_html_structure:success');
    } else {
      console.log('TESTCASE:verify_html_structure:failure');
    }
  } catch {
    console.log('TESTCASE:verify_html_structure:failure');
  }

  await browser.close();
})();
