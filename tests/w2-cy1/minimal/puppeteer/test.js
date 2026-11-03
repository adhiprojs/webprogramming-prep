const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path or URL
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("Tech Innovators 2025 - Event Page")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'Tech Innovators 2025 - Event Page') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Verify header section contains event name and tagline
  try {
    const eventName = await page.evaluate(() => {
      return document.querySelector('header h1').innerText;
    });
    const tagline = await page.evaluate(() => {
      return document.querySelector('header h2').innerText;
    });
    if (eventName === 'Tech Innovators 2025' && tagline === 'Innovating the Future of Technology') {
      console.log('TESTCASE:verify_header_section:success');
    } else {
      console.log('TESTCASE:verify_header_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_section:failure');
  }

  // Test Case 3: Verify "About the Event" section
  try {
    const aboutHeading = await page.evaluate(() => {
      return document.querySelector('section h2').innerText;
    });
    const aboutText = await page.evaluate(() => {
      return document.querySelector('section p').innerText;
    });
    if (aboutHeading === 'About the Event' && aboutText.includes('Tech Innovators 2025')) {
      console.log('TESTCASE:verify_about_event_section:success');
    } else {
      console.log('TESTCASE:verify_about_event_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_about_event_section:failure');
  }

  // Test Case 4: Verify 
  try {
    // Targeting the 'Event Schedule' section and its heading
    const scheduleHeading = await page.evaluate(() => {
        return document.querySelector('section:nth-of-type(2) h2').innerText;
    });
   // console.log('Schedule Heading:', scheduleHeading);  // Log to debug

    // Checking the table headers
    const tableHeaders = await page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('section:nth-of-type(2) table th')).map(th => th.innerText); 
        return headers;
    });
   // console.log('Table Headers:', tableHeaders);  // Log to debug

    // Checking the number of rows in the table
    const tableRows = await page.evaluate(() => {
        return document.querySelectorAll('section:nth-of-type(2) table tbody tr').length;
    });
    //console.log('Table Rows Count:', tableRows);  // Log to debug

    // Verifying the border attribute of the table
    const hasBorders = await page.evaluate(() => {
        const table = document.querySelector('table');
        return table.style.border !== "" || table.hasAttribute('border');  // Check for border attribute
    });
    //console.log('Table Has Borders:', hasBorders);  // Log to debug
    
    // Validating all conditions for the test case
    if (scheduleHeading === 'Event Schedule' && tableHeaders.length === 3 && tableRows >= 5 && hasBorders) {
        console.log('TESTCASE:verify_event_schedule_section:success');
    } else {
        console.log('TESTCASE:verify_event_schedule_section:failure');
        console.log('Failed conditions:');
        console.log('scheduleHeading:', scheduleHeading);
        console.log('tableHeaders:', tableHeaders);
        console.log('tableRows:', tableRows);
        console.log('hasBorders:', hasBorders);
    }
  } catch (error) {
      console.log('TESTCASE:verify_event_schedule_section:failure');
      console.error('Error:', error);
  }



  // Test Case 5: Verify Speakers section and its content
  try {
    const speakersHeading = await page.evaluate(() => {
      return document.querySelector('section:nth-of-type(3) h2').innerText; // Adjusted to target Speakers section specifically
    });
    const speakerArticles = await page.evaluate(() => {
      return document.querySelectorAll('section:nth-of-type(3) article').length; // Adjusted to target articles within the Speakers section
    });
    if (speakersHeading === 'Speakers' && speakerArticles >= 3) {
      console.log('TESTCASE:verify_speakers_section:success');
    } else {
      console.log('TESTCASE:verify_speakers_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_speakers_section:failure');
  }

  // Test Case 6: Verify Venue section and its content
  try {
    const venueHeading = await page.evaluate(() => {
      return document.querySelector('section:nth-of-type(4) h2').innerText; // Adjusted to target Venue section specifically
    });
    const venueText = await page.evaluate(() => {
      return document.querySelector('section:nth-of-type(4) p').innerText; // Adjusted to target paragraph within the Venue section
    });
    const venueImage = await page.evaluate(() => {
      return document.querySelector('section:nth-of-type(4) img') ? true : false; // Adjusted to target image in the Venue section
    });
    if (venueHeading === 'Venue' && venueText.includes('The event will be held at') && venueImage) {
      console.log('TESTCASE:verify_venue_section:success');
    } else {
      console.log('TESTCASE:verify_venue_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_venue_section:failure');
  }


  // Test Case 7: Verify Sponsors sidebar and its content
  try {
    const sponsorsHeading = await page.evaluate(() => {
      return document.querySelector('aside h3').innerText;
    });
    const sponsorList = await page.evaluate(() => {
      const sponsors = Array.from(document.querySelectorAll('aside ul li')).map(li => li.innerText);
      return sponsors;
    });
    if (sponsorsHeading === 'Our Sponsors' && sponsorList.length >= 3) {
      console.log('TESTCASE:verify_sponsors_section:success');
    } else {
      console.log('TESTCASE:verify_sponsors_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_sponsors_section:failure');
  }

  // Test Case 8: Verify Footer content and contact information
  try {
    const footerHeading = await page.evaluate(() => {
      return document.querySelector('footer h2').innerText;
    });
    const contactInfo = await page.evaluate(() => {
      return document.querySelector('footer p').innerText;
    });
    if (footerHeading === 'Contact Us' && contactInfo.includes('info@techinnovators2025.com')) {
      console.log('TESTCASE:verify_footer_section:success');
    } else {
      console.log('TESTCASE:verify_footer_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_section:failure');
  }

  // Test Case 9: Verify Registration section and ticket list
  // Test Case: Verify Registration section and its content
  // Test Case: Verify Registration section and its content
try {
  // Ensure you're selecting the correct section for Registration
  const registrationHeading = await page.evaluate(() => {
    const heading = document.querySelector('section:nth-of-type(5) h2');
    return heading ? heading.innerText : null; // Safely handle null if heading is not found
  });

  console.log('Registration Heading:', registrationHeading); // Log the heading to debug

  // Get the list items under the Register Now section
  const ticketList = await page.evaluate(() => {
    const tickets = Array.from(document.querySelectorAll('section:nth-of-type(5) ul li')).map(li => li.innerText);
    return tickets;
  });

  console.log('Ticket List:', ticketList); // Log the ticket list to debug

  // Verify the content of the Registration section
  if (registrationHeading === 'Register Now' && ticketList.length >= 3) {
    console.log('TESTCASE:verify_registration_section:success');
  } else {
    console.log('TESTCASE:verify_registration_section:failure');
    // Log why the test failed
    if (registrationHeading !== 'Register Now') {
      console.log('Registration Heading did not match expected value');
    }
    if (ticketList.length < 3) {
      console.log('Ticket list does not have enough items');
    }
  }
} catch (error) {
  console.log('TESTCASE:verify_registration_section:failure');
  console.error('Error:', error); // Log the error for better debugging
}



  // Test Case 10: Verify the event logo in the header section
  try {
    const logoImage = await page.evaluate(() => {
      return document.querySelector('header img') ? true : false;
    });
    if (logoImage) {
      console.log('TESTCASE:verify_event_logo:success');
    } else {
      console.log('TESTCASE:verify_event_logo:failure');
    }
  } catch {
    console.log('TESTCASE:verify_event_logo:failure');
  }

  await browser.close();
})();
