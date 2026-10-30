const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path or URL
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("Luxury Stays - Book Your Dream Room")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'Luxury Stays - Book Your Dream Room') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Verify header section contains the correct titles
  try {
    const headerTitle = await page.evaluate(() => {
      return document.querySelector('header h1').innerText;
    });
    const headerSubtitle = await page.evaluate(() => {
      return document.querySelector('header h2').innerText;
    });
    if (headerTitle === 'Welcome to Luxury Stays' && headerSubtitle === 'Your Dream Stay Awaits') {
      console.log('TESTCASE:verify_header_section:success');
    } else {
      console.log('TESTCASE:verify_header_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_section:failure');
  }

  // Test Case 3: Verify "About the Hotel" section content
  try {
    const aboutHeading = await page.evaluate(() => {
      return document.querySelector('section h2').innerText;
    });
    const aboutText = await page.evaluate(() => {
      return document.querySelector('section p').innerText;
    });
    if (aboutHeading === 'About the Hotel' && aboutText.includes('Luxury Stays offers the finest hospitality')) {
      console.log('TESTCASE:verify_about_the_hotel_section:success');
    } else {
      console.log('TESTCASE:verify_about_the_hotel_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_about_the_hotel_section:failure');
  }

  // Test Case 4: Verify "Rooms and Pricing" table content
  try {
    const roomsHeading = await page.evaluate(() => {
      return document.querySelector('section:nth-of-type(2) h2').innerText;
    });
    const tableHeaders = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('table th')).map(th => th.innerText);
      return headers;
    });
    const tableRows = await page.evaluate(() => {
      return document.querySelectorAll('table tbody tr').length;
    });
    if (roomsHeading === 'Rooms and Pricing' && tableHeaders.length === 3 && tableRows >= 4) {
      console.log('TESTCASE:verify_rooms_and_pricing_table:success');
    } else {
      console.log('TESTCASE:verify_rooms_and_pricing_table:failure');
    }
  } catch {
    console.log('TESTCASE:verify_rooms_and_pricing_table:failure');
  }

  // Test Case 5: Verify "Hotel Services" list content
  // Test Case 5: Verify "Hotel Services" section content
try {
  // Ensure you're selecting the correct "Hotel Services" section using nth-of-type
  const servicesHeading = await page.evaluate(() => {
    const heading = document.querySelector('section:nth-of-type(3) h2');
    return heading ? heading.innerText : null; // Safely handle missing heading
  });
  console.log('Services Heading:', servicesHeading); // Log to debug

  // Get the list items under the "Hotel Services" section
  const servicesList = await page.evaluate(() => {
    const services = Array.from(document.querySelectorAll('section:nth-of-type(3) ul li')).map(li => li.innerText);
    return services;
  });
  console.log('Hotel Services List:', servicesList); // Log to debug

  // Verify the content of the "Hotel Services" section
  if (servicesHeading === 'Hotel Services' && servicesList.length >= 5) {
    console.log('TESTCASE:verify_hotel_services_section:success');
  } else {
    console.log('TESTCASE:verify_hotel_services_section:failure');
    // Additional failure logging to help debug
    if (servicesHeading !== 'Hotel Services') {
      console.log('Services Heading did not match expected value');
    }
    if (servicesList.length < 5) {
      console.log('Hotel services list does not have enough items');
    }
  }
} catch (error) {
  console.log('TESTCASE:verify_hotel_services_section:failure');
  console.error('Error:', error); // Log any errors that occur during the process
}

// Test Case 6: Verify "Gallery" section and image content
try {
  // Ensure you're selecting the correct "Gallery" section and its heading
  const galleryHeading = await page.evaluate(() => {
    const heading = document.querySelector('section:nth-of-type(4) h2');
    return heading ? heading.innerText : null; // Safely handle missing heading
  });
  console.log('Gallery Heading:', galleryHeading); // Log to debug

  // Get the number of images in the "Gallery" section
  const galleryImages = await page.evaluate(() => {
    const images = document.querySelectorAll('section:nth-of-type(4) img');
    return images.length;
  });
  console.log('Number of Gallery Images:', galleryImages); // Log to debug

  // Verify the content of the "Gallery" section
  if (galleryHeading === 'Gallery' && galleryImages >= 3) {
    console.log('TESTCASE:verify_gallery_section:success');
  } else {
    console.log('TESTCASE:verify_gallery_section:failure');
    // Additional failure logging to help debug
    if (galleryHeading !== 'Gallery') {
      console.log('Gallery Heading did not match expected value');
    }
    if (galleryImages < 3) {
      console.log('Gallery does not have enough images');
    }
  }
} catch (error) {
  console.log('TESTCASE:verify_gallery_section:failure');
  console.error('Error:', error); // Log any errors that occur during the process
}


  // Test Case 7: Verify "Customer Reviews" in the aside section
  try {
    const reviewsHeading = await page.evaluate(() => {
      return document.querySelector('aside h3').innerText;
    });
    const reviewArticles = await page.evaluate(() => {
      return document.querySelectorAll('aside h4').length;
    });
    if (reviewsHeading === 'Customer Reviews' && reviewArticles >= 3) {
      console.log('TESTCASE:verify_customer_reviews_section:success');
    } else {
      console.log('TESTCASE:verify_customer_reviews_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_customer_reviews_section:failure');
  }

  // Test Case 8: Verify Footer content and contact information
  try {
    const footerHeading = await page.evaluate(() => {
      return document.querySelector('footer h2').innerText;
    });
    const contactInfo = await page.evaluate(() => {
      return document.querySelector('footer p').innerText;
    });
    if (footerHeading === 'Contact Us' && contactInfo.includes('info@luxurystays.com')) {
      console.log('TESTCASE:verify_footer_section:success');
    } else {
      console.log('TESTCASE:verify_footer_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_section:failure');
  }

  await browser.close();
})();
