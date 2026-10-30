const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

  // Test Case 1: Verify Testimonials Section Exists
  try {
    await page.goto(url);
    const testimonialsSectionExists = await page.evaluate(() => {
      return document.querySelector('#testimonialsSection') !== null;
    });
    if (testimonialsSectionExists) {
      console.log('TESTCASE:verify_testimonials_section_exists:success');
    } else {
      console.log('TESTCASE:verify_testimonials_section_exists:failure');
    }
  } catch {
    console.log('TESTCASE:verify_testimonials_section_exists:failure');
  }

  // Test Case 2: Verify Testimonials Section Contains Multiple Testimonials
  try {
    const testimonialsExist = await page.evaluate(() => {
      const testimonials = document.querySelectorAll('.testimonialDiv');
      return testimonials.length >= 3;
    });
    if (testimonialsExist) {
      console.log('TESTCASE:verify_multiple_testimonials:success');
    } else {
      console.log('TESTCASE:verify_multiple_testimonials:failure');
    }
  } catch {
    console.log('TESTCASE:verify_multiple_testimonials:failure');
  }

  // Test Case 3: Verify Each Testimonial Contains Photo, Name, and Review
  try {
    const testimonialStructure = await page.evaluate(() => {
      const testimonials = document.querySelectorAll('.testimonialDiv');
      if (testimonials.length === 0) return false;
      
      let allValid = true;
      testimonials.forEach(testimonial => {
        const img = testimonial.querySelector('img');
        const name = testimonial.querySelector('.customerName');
        const review = testimonial.querySelector('.customerReview');
        
        if (!img || !name || !review) {
          allValid = false;
        }
      });
      return allValid;
    });
    if (testimonialStructure) {
      console.log('TESTCASE:verify_testimonial_structure:success');
    } else {
      console.log('TESTCASE:verify_testimonial_structure:failure');
    }
  } catch {
    console.log('TESTCASE:verify_testimonial_structure:failure');
  }

  // Test Case 4: Verify Flexbox Layout Is Used
  try {
    const flexboxUsed = await page.evaluate(() => {
      const testimonialsSection = document.querySelector('#testimonialsSection');
      const styles = window.getComputedStyle(testimonialsSection);
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

  // Test Case 5: Verify Image Has Zoom Effect
  try {
    const imageZoomEffect = await page.evaluate(() => {
      const img = document.querySelector('.testimonialDiv img');
      const styles = window.getComputedStyle(img);
      return styles.transition !== '';
    });
    if (imageZoomEffect) {
      console.log('TESTCASE:verify_image_zoom:success');
    } else {
      console.log('TESTCASE:verify_image_zoom:failure');
    }
  } catch {
    console.log('TESTCASE:verify_image_zoom:failure');
  }

  // Test Case 6: Verify Review Text Has Color Change Effect
  try {
    const textColorEffect = await page.evaluate(() => {
      const review = document.querySelector('.customerReview');
      const styles = window.getComputedStyle(review);
      return styles.transition !== '';
    });
    if (textColorEffect) {
      console.log('TESTCASE:verify_text_color_effect:success');
    } else {
      console.log('TESTCASE:verify_text_color_effect:failure');
    }
  } catch {
    console.log('TESTCASE:verify_text_color_effect:failure');
  }

  // Test Case 7: Verify Horizontal Layout on Large Screens
  try {
    await page.setViewport({ width: 1024, height: 768 });
    await page.waitForTimeout(500);
    
    const horizontalLayout = await page.evaluate(() => {
      const testimonials = document.querySelectorAll('.testimonialDiv');
      if (testimonials.length < 2) return false;
      
      const firstRect = testimonials[0].getBoundingClientRect();
      const secondRect = testimonials[1].getBoundingClientRect();
      
      return Math.abs(firstRect.top - secondRect.top) < 50;
    });
    if (horizontalLayout) {
      console.log('TESTCASE:verify_horizontal_layout:success');
    } else {
      console.log('TESTCASE:verify_horizontal_layout:failure');
    }
  } catch {
    console.log('TESTCASE:verify_horizontal_layout:failure');
  }

  // Test Case 8: Verify Vertical Layout on Small Screens
  try {
    await page.setViewport({ width: 500, height: 768 });
    await page.waitForTimeout(500);
    
    const verticalLayout = await page.evaluate(() => {
      const testimonials = document.querySelectorAll('.testimonialDiv');
      if (testimonials.length < 2) return false;
      
      const firstRect = testimonials[0].getBoundingClientRect();
      const secondRect = testimonials[1].getBoundingClientRect();
      
      return secondRect.top > firstRect.bottom;
    });
    if (verticalLayout) {
      console.log('TESTCASE:verify_vertical_layout:success');
    } else {
      console.log('TESTCASE:verify_vertical_layout:failure');
    }
  } catch {
    console.log('TESTCASE:verify_vertical_layout:failure');
  }

  // Test Case 9: Verify Testimonials Have Spacing
  try {
    const spacingExists = await page.evaluate(() => {
      const testimonialsSection = document.querySelector('#testimonialsSection');
      const styles = window.getComputedStyle(testimonialsSection);
      return styles.gap !== '0px';
    });
    if (spacingExists) {
      console.log('TESTCASE:verify_spacing:success');
    } else {
      console.log('TESTCASE:verify_spacing:failure');
    }
  } catch {
    console.log('TESTCASE:verify_spacing:failure');
  }

  // Test Case 10: Verify Customer Images Are Circular
  try {
    const circularImages = await page.evaluate(() => {
      const img = document.querySelector('.testimonialDiv img');
      const styles = window.getComputedStyle(img);
      return styles.borderRadius === '50%';
    });
    if (circularImages) {
      console.log('TESTCASE:verify_circular_images:success');
    } else {
      console.log('TESTCASE:verify_circular_images:failure');
    }
  } catch {
    console.log('TESTCASE:verify_circular_images:failure');
  }

  await browser.close();
})();
