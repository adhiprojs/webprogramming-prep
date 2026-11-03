const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Title of the Page ("Product Catalog")
  try {
    await page.goto(url);
    const titleText = await page.evaluate(() => {
      return document.title;
    });
    if (titleText === 'Product Catalog') {
      console.log('TESTCASE:verify_title:success');
    } else {
      console.log('TESTCASE:verify_title:failure');
    }
  } catch {
    console.log('TESTCASE:verify_title:failure');
  }

  // Test Case 2: Verify the introductory paragraph text
  try {
    const paragraphText = await page.evaluate(() => {
      return document.querySelector('p').innerText;
    });
    if (paragraphText === 'Welcome to our product catalog. Here you will find a selection of the latest and most popular products available in our store.') {
      console.log('TESTCASE:verify_intro_paragraph:success');
    } else {
      console.log('TESTCASE:verify_intro_paragraph:failure');
    }
  } catch {
    console.log('TESTCASE:verify_intro_paragraph:failure');
  }

  // Test Case 3: Verify the section heading ("Our Products")
  try {
    const sectionHeading = await page.evaluate(() => {
      return document.querySelector('h2').innerText;
    });
    if (sectionHeading === 'Our Products') {
      console.log('TESTCASE:verify_section_heading:success');
    } else {
      console.log('TESTCASE:verify_section_heading:failure');
    }
  } catch {
    console.log('TESTCASE:verify_section_heading:failure');
  }

  // Test Case 4: Verify the categories list (Electronics, Accessories, Home Appliances)
  try {
    const categories = await page.evaluate(() => {
      const listItems = Array.from(document.querySelectorAll('ul li')).map(item => item.innerText);
      return listItems;
    });
    if (categories.length === 3 &&
      categories.includes('Electronics') &&
      categories.includes('Accessories') &&
      categories.includes('Home Appliances')) {
      console.log('TESTCASE:verify_categories_list:success');
    } else {
      console.log('TESTCASE:verify_categories_list:failure');
    }
  } catch {
    console.log('TESTCASE:verify_categories_list:failure');
  }

  // Test Case 5: Verify the table structure and columns (Product Name, Price, Description)
  try {
    const tableHeaders = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('table th')).map(th => th.innerText);
      return headers;
    });
    if (tableHeaders.length === 3 &&
      tableHeaders.includes('Product Name') &&
      tableHeaders.includes('Price') &&
      tableHeaders.includes('Description')) {
      console.log('TESTCASE:verify_table_headers:success');
    } else {
      console.log('TESTCASE:verify_table_headers:failure');
    }
  } catch {
    console.log('TESTCASE:verify_table_headers:failure');
  }

  // Test Case 6: Verify the number of rows in the table (5 rows)
  try {
    const tableRows = await page.evaluate(() => {
      return document.querySelectorAll('table tbody tr').length;
    });
    if (tableRows === 5) {
      console.log('TESTCASE:verify_number_of_rows:success');
    } else {
      console.log('TESTCASE:verify_number_of_rows:failure');
    }
  } catch {
    console.log('TESTCASE:verify_number_of_rows:failure');
  }

  // Test Case 7: Verify the first row's data (Laptop details)
  try {
    const firstRow = await page.evaluate(() => {
      const firstRowCells = Array.from(document.querySelectorAll('table tbody tr')[0].cells).map(cell => cell.innerText);
      return firstRowCells;
    });
    if (firstRow[0] === 'Laptop' && firstRow[1] === '$1200' && firstRow[2] === 'A high-performance laptop') {
      console.log('TESTCASE:verify_first_row_data:success');
    } else {
      console.log('TESTCASE:verify_first_row_data:failure');
    }
  } catch {
    console.log('TESTCASE:verify_first_row_data:failure');
  }

  // Test Case 8: Verify that the table has borders (check for border-collapse and border styles)
    try {
    const hasBorders = await page.evaluate(() => {
      const table = document.querySelector('table');
      return table.hasAttribute('border');
    });

    if (hasBorders) {
      console.log('TESTCASE:verify_table_borders:success');
    } else {
      console.log('TESTCASE:verify_table_borders:failure');
    }
  } catch {
    console.log('TESTCASE:verify_table_borders:failure');
  }

  await browser.close();
})();

