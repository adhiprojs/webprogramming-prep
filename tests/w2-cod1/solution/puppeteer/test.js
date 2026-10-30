const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("Top Tourist Destinations")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'Top Tourist Destinations') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Main Heading Text ("Top Tourist Destinations")
  try {
    const headerText = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });
    if (headerText === 'Top Tourist Destinations') {
      console.log('TESTCASE:verify_main_heading:success');
    } else {
      console.log('TESTCASE:verify_main_heading:failure');
    }
  } catch {
    console.log('TESTCASE:verify_main_heading:failure');
  }

  // Test Case 3: Number of Tourist Destinations (5 destinations)
  try {
    const listItems = await page.evaluate(() => {
      return document.querySelectorAll('ol > li').length;
    });
    if (listItems === 5) {
      console.log('TESTCASE:verify_number_of_destinations:success');
    } else {
      console.log('TESTCASE:verify_number_of_destinations:failure');
    }
  } catch {
    console.log('TESTCASE:verify_number_of_destinations:failure');
  }

  // Test Case 4: Verify Each Destination has Name, Description, and Image
  try {
    const destinationsValid = await page.evaluate(() => {
      const listItems = document.querySelectorAll('ol > li');
      return Array.from(listItems).every(item => {
        const name = item.querySelector('h2');
        const description = item.querySelector('ul > li');
        const image = item.querySelector('img');
        return name && description && image && image.hasAttribute('alt') && image.hasAttribute('src');
      });
    });

    if (destinationsValid) {
      console.log('TESTCASE:verify_each_destination_has_name_description_and_image:success');
    } else {
      console.log('TESTCASE:verify_each_destination_has_name_description_and_image:failure');
    }
  } catch {
    console.log('TESTCASE:verify_each_destination_has_name_description_and_image:failure');
  }

  // Test Case 5: Verify Image has Alt Text
  try {
    const altTextPresent = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.hasAttribute('alt') && img.getAttribute('alt').length > 0);
    });
    if (altTextPresent) {
      console.log('TESTCASE:verify_images_have_alt_text:success');
    } else {
      console.log('TESTCASE:verify_images_have_alt_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_images_have_alt_text:failure');
  }

  // Test Case 6: Verify Image Width is Set Properly (300px)
  try {
    const imagesWidthCorrect = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.width === 300);
    });
    if (imagesWidthCorrect) {
      console.log('TESTCASE:verify_image_width:success');
    } else {
      console.log('TESTCASE:verify_image_width:failure');
    }
  } catch {
    console.log('TESTCASE:verify_image_width:failure');
  }

  await browser.close();
})();
