const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Verify Header Element Exists
  try {
    await page.goto(url);
    const headerExists = await page.evaluate(() => {
      return document.querySelector('header') !== null;
    });
    if (headerExists) {
      console.log('TESTCASE:verify_header_exists:success');
    } else {
      console.log('TESTCASE:verify_header_exists:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_exists:failure');
  }

  // Test Case 2: Verify H1 Element in Header
  try {
    const h1Exists = await page.evaluate(() => {
      const h1 = document.querySelector('header h1');
      return h1 !== null && h1.innerText.length > 0;
    });
    if (h1Exists) {
      console.log('TESTCASE:verify_header_h1:success');
    } else {
      console.log('TESTCASE:verify_header_h1:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_h1:failure');
  }

  // Test Case 3: Verify Article Element Exists
  try {
    const articleExists = await page.evaluate(() => {
      return document.querySelector('article') !== null;
    });
    if (articleExists) {
      console.log('TESTCASE:verify_article_exists:success');
    } else {
      console.log('TESTCASE:verify_article_exists:failure');
    }
  } catch {
    console.log('TESTCASE:verify_article_exists:failure');
  }

  // Test Case 4: Verify Paragraph in Article
  try {
    const paragraphExists = await page.evaluate(() => {
      const paragraph = document.querySelector('article p');
      return paragraph !== null && paragraph.innerText.length > 0;
    });
    if (paragraphExists) {
      console.log('TESTCASE:verify_article_paragraph:success');
    } else {
      console.log('TESTCASE:verify_article_paragraph:failure');
    }
  } catch {
    console.log('TESTCASE:verify_article_paragraph:failure');
  }

  // Test Case 5: Verify UL Element Exists
  try {
    const ulExists = await page.evaluate(() => {
      return document.querySelector('ul') !== null;
    });
    if (ulExists) {
      console.log('TESTCASE:verify_ul_exists:success');
    } else {
      console.log('TESTCASE:verify_ul_exists:failure');
    }
  } catch {
    console.log('TESTCASE:verify_ul_exists:failure');
  }

  // Test Case 6: Verify Multiple LI Elements in UL
  try {
    const liCount = await page.evaluate(() => {
      const listItems = document.querySelectorAll('ul li');
      return listItems.length;
    });
    if (liCount >= 3) {
      console.log('TESTCASE:verify_multiple_li_elements:success');
    } else {
      console.log('TESTCASE:verify_multiple_li_elements:failure');
    }
  } catch {
    console.log('TESTCASE:verify_multiple_li_elements:failure');
  }

  // Test Case 7: Verify LI Elements Have Content
  try {
    const liHasContent = await page.evaluate(() => {
      const listItems = document.querySelectorAll('ul li');
      let allHaveContent = true;
      listItems.forEach(item => {
        if (item.innerText.trim().length === 0) {
          allHaveContent = false;
        }
      });
      return allHaveContent && listItems.length > 0;
    });
    if (liHasContent) {
      console.log('TESTCASE:verify_li_content:success');
    } else {
      console.log('TESTCASE:verify_li_content:failure');
    }
  } catch {
    console.log('TESTCASE:verify_li_content:failure');
  }

  // Test Case 8: Verify Footer Element Exists
  try {
    const footerExists = await page.evaluate(() => {
      return document.querySelector('footer') !== null;
    });
    if (footerExists) {
      console.log('TESTCASE:verify_footer_exists:success');
    } else {
      console.log('TESTCASE:verify_footer_exists:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_exists:failure');
  }

  // Test Case 9: Verify Footer Has Contact Information
  try {
    const footerHasContact = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer !== null && footer.innerText.length > 0;
    });
    if (footerHasContact) {
      console.log('TESTCASE:verify_footer_contact_info:success');
    } else {
      console.log('TESTCASE:verify_footer_contact_info:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_contact_info:failure');
  }

  // Test Case 10: Verify CSS Styling Applied (Check for margin/padding)
  try {
    const stylingApplied = await page.evaluate(() => {
      const header = document.querySelector('header');
      const article = document.querySelector('article');
      const footer = document.querySelector('footer');
      
      const headerStyles = window.getComputedStyle(header);
      const articleStyles = window.getComputedStyle(article);
      const footerStyles = window.getComputedStyle(footer);
      
      const hasPadding = 
        parseInt(headerStyles.padding) > 0 ||
        parseInt(articleStyles.padding) > 0 ||
        parseInt(footerStyles.padding) > 0;
        
      const hasMargin = 
        parseInt(articleStyles.margin) > 0 ||
        parseInt(footerStyles.margin) > 0;
      
      return hasPadding && hasMargin;
    });
    
    if (stylingApplied) {
      console.log('TESTCASE:verify_css_styling:success');
    } else {
      console.log('TESTCASE:verify_css_styling:failure');
    }
  } catch {
    console.log('TESTCASE:verify_css_styling:failure');
  }

  await browser.close();
})();
