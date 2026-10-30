const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("Tech Conference 2025")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'Tech Conference 2025') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Main Heading Text ("Tech Conference 2025")
  try {
    const headerText = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });
    if (headerText === 'Tech Conference 2025') {
      console.log('TESTCASE:verify_header_text:success');
    } else {
      console.log('TESTCASE:verify_header_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_text:failure');
  }

  // Test Case 3: Conference Introduction Section Title ("Conference Introduction")
  try {
    const introHeader = await page.evaluate(() => {
      return document.querySelectorAll('h2')[0].innerText; // First h2 is "Conference Introduction"
    });
    if (introHeader === 'Conference Introduction') {
      console.log('TESTCASE:verify_conference_intro_header:success');
    } else {
      console.log('TESTCASE:verify_conference_intro_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_conference_intro_header:failure');
  }

  // Test Case 4: Conference Introduction Text with Bold and Italics ("exciting", "innovative", "technology")
  try {
    const introText = await page.evaluate(() => {
      const paragraph = document.querySelector('h2 + p').innerText; // Paragraph after the "Conference Introduction" heading
      return paragraph.includes('exciting') && paragraph.includes('innovative') && paragraph.includes('technology');
    });
    const isBold = await page.evaluate(() => {
      const boldElement = document.querySelector('b');
      return boldElement !== null;
    });
    const isItalic = await page.evaluate(() => {
      const italicElement = document.querySelector('i');
      return italicElement !== null;
    });
    if (introText && isBold && isItalic) {
      console.log('TESTCASE:verify_intro_text_bold_italic:success');
    } else {
      console.log('TESTCASE:verify_intro_text_bold_italic:failure');
    }
  } catch {
    console.log('TESTCASE:verify_intro_text_bold_italic:failure');
  }

  // Test Case 5: Schedule Section Title ("Schedule")
  try {
    const scheduleHeader = await page.evaluate(() => {
      return document.querySelectorAll('h2')[1].innerText; // Second h2 is "Schedule"
    });
    if (scheduleHeader === 'Schedule') {
      console.log('TESTCASE:verify_schedule_header:success');
    } else {
      console.log('TESTCASE:verify_schedule_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_schedule_header:failure');
  }

  // Test Case 6: Day 1 Schedule and Sessions ("Day 1", "Artificial Intelligence in 2025")
  try {
    const day1Text = await page.evaluate(() => {
      const day1Header = document.querySelectorAll('h3')[2].innerText; // Third h3 is "Day 1" (first h3 is slogan, second h3 is "Event Details")
      return day1Header === 'Day 1';
    });
    const ai2025Text = await page.evaluate(() => {
      // Look for "Artificial Intelligence in 2025" in the paragraphs after Day 1
      const allParagraphs = Array.from(document.querySelectorAll('p'));
      return allParagraphs.some(p => p.innerText.includes('Artificial Intelligence in 2025'));
    });
    if (day1Text && ai2025Text) {
      console.log('TESTCASE:verify_day1_schedule:success');
    } else {
      console.log('TESTCASE:verify_day1_schedule:failure');
    }
  } catch {
    console.log('TESTCASE:verify_day1_schedule:failure');
  }

  // Test Case 7: Speakers Section Title ("Speakers")
  try {
    const speakersHeader = await page.evaluate(() => {
      return document.querySelectorAll('h2')[2].innerText; // Third h2 is "Speakers"
    });
    if (speakersHeader === 'Speakers') {
      console.log('TESTCASE:verify_speakers_header:success');
    } else {
      console.log('TESTCASE:verify_speakers_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_speakers_header:failure');
  }

  // Test Case 8: Speaker Details with Name and Company ("Dr. John Doe", "CEO, Tech Innovations Inc.")
  try {
    const speakerName = await page.evaluate(() => {
      const speaker = document.querySelector('h5').innerText; // First h5 is speaker name
      return speaker.includes('Dr. John Doe');
    });
    const speakerCompany = await page.evaluate(() => {
      // Look for the span element that contains company info (first span after speakers section)
      const speakerSpans = Array.from(document.querySelectorAll('span'));
      return speakerSpans.some(span => span.innerText.includes('CEO, Tech Innovations Inc.'));
    });
    if (speakerName && speakerCompany) {
      console.log('TESTCASE:verify_speaker_details:success');
    } else {
      console.log('TESTCASE:verify_speaker_details:failure');
    }
  } catch {
    console.log('TESTCASE:verify_speaker_details:failure');
  }

  // Test Case 9: Footer Section with Correct Contact Information
  try {
    const footerText = await page.evaluate(() => {
      return document.querySelector('footer p').innerText;
    });
    const isUnderlinedEmail = await page.evaluate(() => {
      const emailElement = document.querySelector('footer u');
      return emailElement !== null && emailElement.innerText.includes('contact@techconference.com');
    });
    if (footerText.includes('contact@techconference.com') && isUnderlinedEmail) {
      console.log('TESTCASE:verify_footer_contact_info:success');
    } else {
      console.log('TESTCASE:verify_footer_contact_info:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_contact_info:failure');
  }

  // Test Case 10: Event Details Section with Strong and Em tags ("global speakers", "networking opportunities")
   try {
    const eventDetailsText = await page.evaluate(() => {
      // Find the paragraph after "Event Details" h3 specifically
      const eventDetailsH3 = Array.from(document.querySelectorAll('h3')).find(h3 => h3.innerText === 'Event Details');
      if (eventDetailsH3) {
        const nextP = eventDetailsH3.nextElementSibling;
        if (nextP && nextP.tagName === 'P') {
          return nextP.innerText.includes('global speakers') && nextP.innerText.includes('networking opportunities');
        }
      }
      return false;
    });
    const hasStrong = await page.evaluate(() => {
      const strongElement = document.querySelector('strong');
      return strongElement !== null && strongElement.innerText.includes('global speakers');
    });
    const hasEm = await page.evaluate(() => {
      // Find the em element that contains "networking opportunities" specifically
      const emElements = Array.from(document.querySelectorAll('em'));
      return emElements.some(em => em.innerText.includes('networking opportunities'));
    });
    if (eventDetailsText && hasStrong && hasEm) {
      console.log('TESTCASE:verify_event_details_emphasis:success');
    } else {
      console.log('TESTCASE:verify_event_details_emphasis:failure');
    }
  } catch {
    console.log('TESTCASE:verify_event_details_emphasis:failure');
  }

  await browser.close();
})();
