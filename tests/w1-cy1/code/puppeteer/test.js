const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("The Reading Nook - Your Favorite Bookstore")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'The Reading Nook - Your Favorite Bookstore') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Main Heading Text ("Welcome to The Reading Nook")
  try {
    const headerText = await page.evaluate(() => {
      return document.querySelectorAll('h1')[0].innerText; // Indexing to select the first <h1>
    });
    if (headerText === 'Welcome to The Reading Nook') {
      console.log('TESTCASE:verify_header_text:success');
    } else {
      console.log('TESTCASE:verify_header_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_text:failure');
  }

  // Test Case 3: Mission Section Title ("Our Mission")
  try {
    const missionHeader = await page.evaluate(() => {
      return document.querySelectorAll('h2')[0].innerText; // Indexing to select the first <h2>
    });
    if (missionHeader === 'Our Mission') {
      console.log('TESTCASE:verify_mission_header:success');
    } else {
      console.log('TESTCASE:verify_mission_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_mission_header:failure');
  }

  // Test Case 4: Mission Statement Text with Bold and Italics ("quality books", "literature")
  try {
    const missionText = await page.evaluate(() => {
      const paragraph = document.querySelectorAll('h2 + p')[0].innerText; // Indexing to select the first <p> after <h2>
      return paragraph.includes('quality books') && paragraph.includes('literature');
    });
    const isBold = await page.evaluate(() => {
      const boldElement = document.querySelectorAll('b')[0]; // Indexing to select the first <b> element
      return boldElement !== null;
    });
    const isItalic = await page.evaluate(() => {
      const italicElement = document.querySelectorAll('i')[0]; // Indexing to select the first <i> element
      return italicElement !== null;
    });
    if (missionText && isBold && isItalic) {
      console.log('TESTCASE:verify_mission_text_bold_italic:success');
    } else {
      console.log('TESTCASE:verify_mission_text_bold_italic:failure');
    }
  } catch {
    console.log('TESTCASE:verify_mission_text_bold_italic:failure');
  }

  // Test Case 5: New Arrivals Section Title ("New Arrivals")
  try {
    const newArrivalsHeader = await page.evaluate(() => {
      return document.querySelectorAll('h3')[1].innerText; // Indexing to select the first <h3>
    });
    if (newArrivalsHeader === 'New Arrivals') {
      console.log('TESTCASE:verify_new_arrivals_header:success');
    } else {
      console.log('TESTCASE:verify_new_arrivals_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_new_arrivals_header:failure');
  }

  // Test Case 6: New Book Listing and Italics ("The Silent Sea")
  try {
    const newBooksText = await page.evaluate(() => {
      const newBook = document.querySelectorAll('h3 + p')[0].innerText; // Indexing to select the first <p> after <h3>
      return newBook.includes('The Silent Sea');
    });
    if (newBooksText) {
      console.log('TESTCASE:verify_new_books_italic:success');
    } else {
      console.log('TESTCASE:verify_new_books_italic:failure');
    }
  } catch {
    console.log('TESTCASE:verify_new_books_italic:failure');
  }

  // Test Case 7: Customer Reviews Section Title ("Customer Reviews")
  try {
    const customerReviewsHeader = await page.evaluate(() => {
      return document.querySelectorAll('h2')[1].innerText; // Indexing to select the second <h2>
    });
    if (customerReviewsHeader === 'Customer Reviews') {
      console.log('TESTCASE:verify_customer_reviews_header:success');
    } else {
      console.log('TESTCASE:verify_customer_reviews_header:failure');
    }
  } catch {
    console.log('TESTCASE:verify_customer_reviews_header:failure');
  }

  // Test Case 8: Review Section with Reviewer’s Name and Genre Underlined
  // Test Case 8: Review Section with Reviewer’s Name and Genre Underlined
try {
  const reviewText = await page.evaluate(() => {
    // Select the second h3 + p pair
    const review = document.querySelectorAll('h3 + p')[1].innerText; // This is the second review paragraph
    const spanText = document.querySelectorAll('h3 + p')[1].querySelector('span').innerText; // Ensure we're checking the <span> content
    const isUnderlined = document.querySelectorAll('h3 + p')[1].querySelector('span')?.style.textDecoration === 'underline'; // Check if the genre text is underlined
    return review.includes('mystery') && spanText === 'mystery' && isUnderlined; // Check both genre and underlining
  });
  if (reviewText) {
    console.log('TESTCASE:verify_review_genre_underlined:success');
  } else {
    console.log('TESTCASE:verify_review_genre_underlined:failure');
  }
} catch {
  console.log('TESTCASE:verify_review_genre_underlined:failure');
}


  // Test Case 9: Footer Section with Correct Contact Information
  try {
    const footerText = await page.evaluate(() => {
      return document.querySelectorAll('footer p')[0].innerText; // Indexing to select the first <p> in footer
    });
    const isUnderlinedEmail = await page.evaluate(() => {
      const emailElement = document.querySelectorAll('footer u')[0]; // Indexing to select the first <u> in footer
      return emailElement !== null;
    });
    if (footerText.includes('info@readingnook.com') && isUnderlinedEmail) {
      console.log('TESTCASE:verify_footer_contact_info:success');
    } else {
      console.log('TESTCASE:verify_footer_contact_info:failure');
    }
  } catch {
    console.log('TESTCASE:verify_footer_contact_info:failure');
  }

  // Test Case 10: Why Choose Us Section with Emphasized Text
  try {
    const whyChooseText = await page.evaluate(() => {
      const text = document.querySelectorAll('h2 + p')[1].innerText; // Indexing to select the second <p> after <h2>
      return text.includes('wide selection') && text.includes('affordable prices');
    });
    if (whyChooseText) {
      console.log('TESTCASE:verify_why_choose_us_text:success');
    } else {
      console.log('TESTCASE:verify_why_choose_us_text:failure');
    }
  } catch {
    console.log('TESTCASE:verify_why_choose_us_text:failure');
  }

  // Test Case 11: Header Section with Conference Title and Slogan
  try {
    const headerSlogan = await page.evaluate(() => {
      const headerText = document.querySelectorAll('header h1')[0].innerText; // Indexing to select the first <h1>
      const sloganText = document.querySelectorAll('header h3')[0].innerText; // Indexing to select the first <h3>
      return headerText === 'Welcome to The Reading Nook' && sloganText === 'Where every book has a story';
    });
    if (headerSlogan) {
      console.log('TESTCASE:verify_header_slogan:success');
    } else {
      console.log('TESTCASE:verify_header_slogan:failure');
    }
  } catch {
    console.log('TESTCASE:verify_header_slogan:failure');
  }

  await browser.close();
})();
