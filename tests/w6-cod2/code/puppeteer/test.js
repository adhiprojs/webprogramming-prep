const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: 50, // Slow down Puppeteer actions to observe
  });

  const page = await browser.newPage();
  const url = 'https://8081-workspace.examly.io'; // Replace with the path to your HTML file

  try {
    console.log('Navigating to the page...');
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log('Page loaded successfully!');
  } catch (error) {
    console.log('Error loading the page:', error);
    await browser.close();
    return;
  }

  // Helper function to completely clear and reset form
  const clearAndResetForm = async () => {
    await page.evaluate(() => {
      // Clear all input values
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const ageField = document.getElementById('age');
      
      nameField.value = '';
      emailField.value = '';
      ageField.value = '';
      
      // Hide all error messages
      document.getElementById('nameError').classList.add('d-none');
      document.getElementById('emailError').classList.add('d-none');
      document.getElementById('ageError').classList.add('d-none');
      
      // Hide success message
      document.getElementById('successMessage').classList.add('d-none');
      
      // Remove invalid styling
      nameField.classList.remove('is-invalid');
      emailField.classList.remove('is-invalid');
      ageField.classList.remove('is-invalid');
    });
    
    // Small delay to ensure DOM updates
    await page.waitForTimeout(100);
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  // Test 1: Name field is blank, submit button is clicked, error message appears
  try {
    console.log('Test 1: Testing name field blank error...');
    await page.click('button[type="submit"]'); // Submit the form without filling name
    await page.waitForSelector('#nameError');
    const nameErrorVisible = await page.$eval('#nameError', el => !el.classList.contains('d-none'));
    console.log('Name error visible:', nameErrorVisible);
    console.log(nameErrorVisible
      ? 'TESTCASE:name_field_blank_error:success'
      : 'TESTCASE:name_field_blank_error:failure');
  } catch (error) {
    console.log('Error during name field blank test:', error);
    console.log('TESTCASE:name_field_blank_error:failure');
  }

  // Test 2: Invalid email format (missing "@"), submit button is clicked, error message appears
  try {
    console.log('Test 2: Testing invalid email format error...');
    await page.type('#name', 'John Doe'); // Fill valid name
    await page.type('#email', 'userexample.com'); // Invalid email
    await page.type('#age', '25'); // Valid age
    await page.click('button[type="submit"]');
    await page.waitForSelector('#emailError');
    const emailErrorVisible = await page.$eval('#emailError', el => !el.classList.contains('d-none'));
    console.log('Email error visible:', emailErrorVisible);
    console.log(emailErrorVisible
      ? 'TESTCASE:invalid_email_format_error:success'
      : 'TESTCASE:invalid_email_format_error:failure');
  } catch (error) {
    console.log('Error during email format test:', error);
    console.log('TESTCASE:invalid_email_format_error:failure');
  }

  // Test 3: Age less than 18, submit button is clicked, error message appears
  try {
    console.log('Test 3: Testing age less than 18 error...');
    await page.type('#name', 'John Doe');
    await page.type('#email', 'user@domain.com');
    await page.type('#age', '16'); // Invalid age
    await page.click('button[type="submit"]');
    await page.waitForSelector('#ageError');
    const ageErrorVisible = await page.$eval('#ageError', el => !el.classList.contains('d-none'));
    console.log('Age error visible:', ageErrorVisible);
    console.log(ageErrorVisible
      ? 'TESTCASE:age_less_than_18_error:success'
      : 'TESTCASE:age_less_than_18_error:failure');
  } catch (error) {
    console.log('Error during age test:', error);
    console.log('TESTCASE:age_less_than_18_error:failure');
  }



  // Test 4: Valid name, email, and age; the form should display a success message
  try {
    console.log('Test 4: Testing valid form submission...');
    await clearAndResetForm();
    
    await page.type('#name', 'John Doe');
    await page.type('#email', 'user@domain.com');
    await page.type('#age', '25');
    await page.click('button[type="submit"]');
    await wait(1000); // Wait longer for success message
    
    // Check if success message is visible
    const successMessageVisible = await page.$eval('#successMessage', el => !el.classList.contains('d-none'));
    console.log('Success message visible:', successMessageVisible);
    
    if (successMessageVisible) {
      const successMessageContent = await page.$eval('#successData', el => el.innerHTML);
      console.log('Success message content:', successMessageContent);
      
      if (successMessageContent.includes('John Doe') && successMessageContent.includes('user@domain.com') && successMessageContent.includes('25')) {
        console.log('TESTCASE:valid_submission_success_message:success');
      } else {
        console.log('TESTCASE:valid_submission_success_message:failure');
      }
    } else {
      console.log('TESTCASE:valid_submission_success_message:failure');
    }
  } catch (error) {
    console.log('Error during valid form submission test:', error);
    console.log('TESTCASE:valid_submission_success_message:failure');
  }

  // Test 5: Invalid email domain (not ".com"), error message appears
  try {
    console.log('Test 5: Testing invalid email domain error...');
    await clearAndResetForm();
    
    await page.type('#name', 'John Doe');
    await page.type('#email', 'user@domain.org'); // Invalid email domain
    await page.type('#age', '25');
    await page.click('button[type="submit"]');
    await wait(500); // Wait for validation
    
    const emailErrorVisible = await page.$eval('#emailError', el => !el.classList.contains('d-none'));
    console.log('Email error visible:', emailErrorVisible);
    console.log(emailErrorVisible
      ? 'TESTCASE:invalid_email_domain_error:success'
      : 'TESTCASE:invalid_email_domain_error:failure');
  } catch (error) {
    console.log('Error during invalid email domain test:', error);
    console.log('TESTCASE:invalid_email_domain_error:failure');
  }

  // Test 6: Another valid form submission with different data
  try {
    console.log('Test 6: Testing valid form submission with different data...');
    await clearAndResetForm();
    
    await page.type('#name', 'Alice');
    await page.type('#email', 'alice@example.com');
    await page.type('#age', '30');
    await page.click('button[type="submit"]');
    await wait(1000); // Wait longer for success message
  
    // Check if success message is visible
    const successMessageVisible = await page.$eval('#successMessage', el => !el.classList.contains('d-none'));
    console.log('Success message visible:', successMessageVisible);
  
    if (successMessageVisible) {
      const successMessageContent = await page.$eval('#successData', el => el.innerHTML);
      console.log('Success message content:', successMessageContent);
  
      if (successMessageContent.includes('Alice') && successMessageContent.includes('alice@example.com') && successMessageContent.includes('30')) {
        console.log('TESTCASE:valid_form_submission_with_data:success');
      } else {
        console.log('TESTCASE:valid_form_submission_with_data:failure');
      }
    } else {
      console.log('TESTCASE:valid_form_submission_with_data:failure');
    }
  } catch (error) {
    console.error('Error during valid form submission test:', error);
    console.log('TESTCASE:valid_form_submission_with_data:failure');
  }

  await browser.close();
})();
