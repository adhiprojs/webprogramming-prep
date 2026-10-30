const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Verify Header Displays Event Title
  try {
    await page.goto(url);
    const headerText = await page.evaluate(() => {
      const header = document.querySelector('header h1');
      return header !== null && header.innerText === 'Tech Innovators Summit';
    });
    if (headerText) {
      console.log('TESTCASE:verify_header_title:success');
    } else {
      console.log('TESTCASE:verify_header_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_title:failure');
  }

  // Test Case 2: Verify Header Has Background Color and Centered Text
  try {
    const headerStyling = await page.evaluate(() => {
      const header = document.querySelector('header');
      const styles = window.getComputedStyle(header);
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent';
      const isCentered = styles.textAlign === 'center';
      return hasBackground && isCentered;
    });
    if (headerStyling) {
      console.log('TESTCASE:verify_header_styling:success');
    } else {
      console.log('TESTCASE:verify_header_styling:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_styling:failure');
  }

  // Test Case 3: Verify About Section Has H2 and P Tags with Styling
  try {
    const aboutSectionContent = await page.evaluate(() => {
      const aboutSection = document.querySelector('#aboutSection');
      const h2 = aboutSection.querySelector('h2');
      const p = aboutSection.querySelector('p');
      const styles = window.getComputedStyle(aboutSection);
      const hasPadding = parseInt(styles.padding) > 0;
      const hasMargin = parseInt(styles.margin) > 0;
      return h2 !== null && p !== null && h2.innerText.length > 0 && p.innerText.length > 0 && hasPadding && hasMargin;
    });
    if (aboutSectionContent) {
      console.log('TESTCASE:verify_about_section:success');
    } else {
      console.log('TESTCASE:verify_about_section:failure');
    }
  } catch {
    console.log('TESTCASE:verify_about_section:failure');
  }

  // Test Case 4: Verify Speakers List is Visible and Has Multiple Items
  try {
    const speakersListValid = await page.evaluate(() => {
      const speakersList = document.querySelector('#speakersList');
      const listItems = speakersList.querySelectorAll('li');
      return speakersList !== null && listItems.length >= 3;
    });
    if (speakersListValid) {
      console.log('TESTCASE:verify_speakers_list:success');
    } else {
      console.log('TESTCASE:verify_speakers_list:failure');
    }
  } catch {
    console.log('TESTCASE:verify_speakers_list:failure');
  }

  // Test Case 5: Verify Speakers List Items Have Padding and Margin
  try {
    const speakersListStyling = await page.evaluate(() => {
      const listItems = document.querySelectorAll('#speakersList li');
      if (listItems.length === 0) return false;
      
      const firstItemStyles = window.getComputedStyle(listItems[0]);
      const hasPadding = parseInt(firstItemStyles.padding) > 0;
      const hasMargin = parseInt(firstItemStyles.margin) > 0;
      return hasPadding && hasMargin;
    });
    if (speakersListStyling) {
      console.log('TESTCASE:verify_speakers_list_styling:success');
    } else {
      console.log('TESTCASE:verify_speakers_list_styling:failure');
    }
  } catch {
    console.log('TESTCASE:verify_speakers_list_styling:failure');
  }

  // Test Case 6: Verify Agenda List is Visible and Has Multiple Items
  try {
    const agendaListValid = await page.evaluate(() => {
      const agendaList = document.querySelector('#agendaList');
      const listItems = agendaList.querySelectorAll('li');
      return agendaList !== null && listItems.length >= 3;
    });
    if (agendaListValid) {
      console.log('TESTCASE:verify_agenda_list:success');
    } else {
      console.log('TESTCASE:verify_agenda_list:failure');
    }
  } catch {
    console.log('TESTCASE:verify_agenda_list:failure');
  }

  // Test Case 7: Verify Agenda List Items Have Padding and Margin
  try {
    const agendaListStyling = await page.evaluate(() => {
      const listItems = document.querySelectorAll('#agendaList li');
      if (listItems.length === 0) return false;
      
      const firstItemStyles = window.getComputedStyle(listItems[0]);
      const hasPadding = parseInt(firstItemStyles.padding) > 0;
      const hasMargin = parseInt(firstItemStyles.margin) > 0;
      return hasPadding && hasMargin;
    });
    if (agendaListStyling) {
      console.log('TESTCASE:verify_agenda_list_styling:success');
    } else {
      console.log('TESTCASE:verify_agenda_list_styling:failure');
    }
  } catch {
    console.log('TESTCASE:verify_agenda_list_styling:failure');
  }

  // Test Case 8: Verify Sections Have Background Colors
  try {
    const sectionsHaveBackground = await page.evaluate(() => {
      const aboutSection = document.querySelector('#aboutSection');
      const speakersSection = document.querySelector('#speakersSection');
      const agendaSection = document.querySelector('#agendaSection');
      
      const aboutStyles = window.getComputedStyle(aboutSection);
      const speakersStyles = window.getComputedStyle(speakersSection);
      const agendaStyles = window.getComputedStyle(agendaSection);
      
      const aboutHasBackground = aboutStyles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const speakersHasBackground = speakersStyles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const agendaHasBackground = agendaStyles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      return aboutHasBackground && speakersHasBackground && agendaHasBackground;
    });
    if (sectionsHaveBackground) {
      console.log('TESTCASE:verify_sections_background_colors:success');
    } else {
      console.log('TESTCASE:verify_sections_background_colors:failure');
    }
  } catch {
    console.log('TESTCASE:verify_sections_background_colors:failure');
  }

  // Test Case 9: Verify Flexbox is Used for Speakers List
  try {
    const flexboxUsed = await page.evaluate(() => {
      const speakersList = document.querySelector('#speakersList');
      const styles = window.getComputedStyle(speakersList);
      return styles.display === 'flex';
    });
    if (flexboxUsed) {
      console.log('TESTCASE:verify_flexbox_layout:success');
    } else {
      console.log('TESTCASE:verify_flexbox_layout:failure');
    }
  } catch {
    console.log('TESTCASE:verify_flexbox_layout:failure');
  }

  // Test Case 10: Verify External CSS is Applied
  try {
    const cssApplied = await page.evaluate(() => {
      const header = document.querySelector('header');
      const aboutSection = document.querySelector('#aboutSection');
      
      const headerStyles = window.getComputedStyle(header);
      const aboutStyles = window.getComputedStyle(aboutSection);
      
      const headerHasPadding = parseInt(headerStyles.padding) > 0;
      const aboutHasPadding = parseInt(aboutStyles.padding) > 0;
      
      return headerHasPadding && aboutHasPadding;
    });
    if (cssApplied) {
      console.log('TESTCASE:verify_external_css:success');
    } else {
      console.log('TESTCASE:verify_external_css:failure');
    }
  } catch {
    console.log('TESTCASE:verify_external_css:failure');
  }

  await browser.close();
})();
