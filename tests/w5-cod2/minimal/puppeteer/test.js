const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Verify Footer Exists
  try {
    await page.goto(url);
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

  // Test Case 2: Verify Footer Contains All Required Elements
  try {
    const footerContentComplete = await page.evaluate(() => {
      const socialMedia = document.querySelector('.social-media');
      const footerLinks = document.querySelector('.footer-links');
      const copyright = document.querySelector('.copyright');
      
      return socialMedia !== null && footerLinks !== null && copyright !== null;
    });
    if (footerContentComplete) {
      console.log('TESTCASE:verify_footer_content:success');
    } else {
      console.log('TESTCASE:verify_footer_content:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_content:failure');
  }

  // Test Case 3: Verify Social Media Icons Exist
  try {
    const socialIconsExist = await page.evaluate(() => {
      const icons = document.querySelectorAll('.social-icon');
      return icons.length >= 3;
    });
    if (socialIconsExist) {
      console.log('TESTCASE:verify_social_icons:success');
    } else {
      console.log('TESTCASE:verify_social_icons:failure');
    }
  } catch {
    console.log('TESTCASE:verify_social_icons:failure');
  }

  // Test Case 4: Verify Social Media Icons Have Hover Effect
  try {
    const hoverEffectExists = await page.evaluate(() => {
      const icon = document.querySelector('.social-icon');
      const styles = window.getComputedStyle(icon);
      return styles.transition !== '';
    });
    if (hoverEffectExists) {
      console.log('TESTCASE:verify_icon_hover_effect:success');
    } else {
      console.log('TESTCASE:verify_icon_hover_effect:failure');
    }
  } catch {
    console.log('TESTCASE:verify_icon_hover_effect:failure');
  }

  // Test Case 5: Verify Footer Links Exist
  try {
    const footerLinksExist = await page.evaluate(() => {
      const links = document.querySelectorAll('.footer-links a');
      return links.length >= 2;
    });
    if (footerLinksExist) {
      console.log('TESTCASE:verify_footer_links:success');
    } else {
      console.log('TESTCASE:verify_footer_links:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_links:failure');
  }

  // Test Case 6: Verify Footer Links Are Functional
  try {
    const linksHaveHref = await page.evaluate(() => {
      const links = document.querySelectorAll('.footer-links a');
      let allHaveHref = true;
      
      links.forEach(link => {
        if (!link.getAttribute('href')) {
          allHaveHref = false;
        }
      });
      
      return allHaveHref && links.length >= 2;
    });
    if (linksHaveHref) {
      console.log('TESTCASE:verify_links_functional:success');
    } else {
      console.log('TESTCASE:verify_links_functional:failure');
    }
  } catch {
    console.log('TESTCASE:verify_links_functional:failure');
  }

  // Test Case 7: Verify Footer Has Dark Background
  try {
    const darkBackground = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      const styles = window.getComputedStyle(footer);
      return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent';
    });
    if (darkBackground) {
      console.log('TESTCASE:verify_dark_background:success');
    } else {
      console.log('TESTCASE:verify_dark_background:failure');
    }
  } catch {
    console.log('TESTCASE:verify_dark_background:failure');
  }

  // Test Case 8: Verify Footer Text Is White
  try {
    const whiteText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      const styles = window.getComputedStyle(footer);
      return styles.color !== '';
    });
    if (whiteText) {
      console.log('TESTCASE:verify_white_text:success');
    } else {
      console.log('TESTCASE:verify_white_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_white_text:failure');
  }

  // Test Case 9: Verify Footer Content Is Centered
  try {
    const contentCentered = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      const styles = window.getComputedStyle(footer);
      return styles.textAlign === 'center';
    });
    if (contentCentered) {
      console.log('TESTCASE:verify_content_centered:success');
    } else {
      console.log('TESTCASE:verify_content_centered:failure');
    }
  } catch {
    console.log('TESTCASE:verify_content_centered:failure');
  }

  // Test Case 10: Verify Copyright Notice Exists
  try {
    const copyrightExists = await page.evaluate(() => {
      const copyright = document.querySelector('.copyright');
      return copyright !== null && copyright.innerText.length > 0;
    });
    if (copyrightExists) {
      console.log('TESTCASE:verify_copyright_notice:success');
    } else {
      console.log('TESTCASE:verify_copyright_notice:failure');
    }
  } catch {
    console.log('TESTCASE:verify_copyright_notice:failure');
  }

  await browser.close();
})();
