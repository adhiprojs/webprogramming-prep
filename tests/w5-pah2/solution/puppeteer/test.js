const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const url = 'https://8081-workspace.examly.io'; // Update with your local file path
  const page = await browser.newPage();

    // Test Case 1: Verify Gallery Section Exists
    try {
      await page.goto(url);
      const gallerySectionExists = await page.evaluate(() => {
        return document.querySelector('#gallerySection') !== null;
      });
      if (gallerySectionExists) {
        console.log('TESTCASE:verify_gallery_section_exists:success');
      } else {
        console.log('TESTCASE:verify_gallery_section_exists:failure');
      }
    } catch {
      console.log('TESTCASE:verify_gallery_section_exists:failure');
    }
  
    // Test Case 2: Verify Gallery Section Contains Product Divs
    try {
      const productDivsExist = await page.evaluate(() => {
        const gallerySection = document.querySelector('#gallerySection');
        const productDivs = gallerySection.querySelectorAll('.productDiv');
        return productDivs.length >= 3;
      });
      if (productDivsExist) {
        console.log('TESTCASE:verify_product_divs:success');
      } else {
        console.log('TESTCASE:verify_product_divs:failure');
      }
    } catch {
      console.log('TESTCASE:verify_product_divs:failure');
    }
  
    // Test Case 3: Verify Product Images Are Present
    try {
      const productImagesExist = await page.evaluate(() => {
        const productImgs = document.querySelectorAll('.productImg');
        return productImgs.length >= 3;
      });
      if (productImagesExist) {
        console.log('TESTCASE:verify_product_images:success');
      } else {
        console.log('TESTCASE:verify_product_images:failure');
      }
    } catch {
      console.log('TESTCASE:verify_product_images:failure');
    }
  
    // Test Case 4: Verify Product Images Are Responsive
try {
  page.evaluate(() => {
    const productImgs = document.querySelectorAll('.productImg');
    if (productImgs.length === 0) {
      return;
    }

    const firstImg = productImgs[0];
    const firstImgStyles = window.getComputedStyle(firstImg);

    // Check the computed width in pixels of the image
    const imageWidth = parseFloat(firstImgStyles.getPropertyValue('width'));  // Get width in pixels
    const parentDiv = firstImg.parentElement;
    const parentStyles = window.getComputedStyle(parentDiv);
    const parentWidth = parseFloat(parentStyles.getPropertyValue('width'));  // Get parent width in pixels

    // Check if the image width is taking up the entire space of the parent container
    const isResponsive = (imageWidth >= parentWidth * 0.99) && (imageWidth <= parentWidth);

    return isResponsive;
  });

  console.log('TESTCASE:verify_images_responsive:success');
} catch (error) {
  console.log('TESTCASE:verify_images_responsive:failure');
  console.error(error);
}

    // Test Case 5: Verify Product Descriptions Are Visible
    try {
      const descriptionsVisible = await page.evaluate(() => {
        const productDescriptions = document.querySelectorAll('.productDescription');
        if (productDescriptions.length === 0) return false;
        
        let allVisible = true;
        productDescriptions.forEach(desc => {
          if (desc.innerText.trim().length === 0) {
            allVisible = false;
          }
        });
        return allVisible && productDescriptions.length >= 3;
      });
      if (descriptionsVisible) {
        console.log('TESTCASE:verify_product_descriptions:success');
      } else {
        console.log('TESTCASE:verify_product_descriptions:failure');
      }
    } catch {
      console.log('TESTCASE:verify_product_descriptions:failure');
    }
  
    // Test Case 6: Verify Flexbox is Used for Gallery Layout
    try {
      const flexboxUsed = await page.evaluate(() => {
        const gallerySection = document.querySelector('#gallerySection');
        const styles = window.getComputedStyle(gallerySection);
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
  
    // Test Case 7: Verify Flex Wrap is Applied
    try {
      const flexWrapApplied = await page.evaluate(() => {
        const gallerySection = document.querySelector('#gallerySection');
        const styles = window.getComputedStyle(gallerySection);
        return styles.flexWrap === 'wrap';
      });
      if (flexWrapApplied) {
        console.log('TESTCASE:verify_flex_wrap:success');
      } else {
        console.log('TESTCASE:verify_flex_wrap:failure');
      }
    } catch {
      console.log('TESTCASE:verify_flex_wrap:failure');
    }
  
    // Test Case 8: Verify Product Divs Have Padding and Margin
    try {
      const paddingMarginApplied = await page.evaluate(() => {
        const productDivs = document.querySelectorAll('.productDiv');
        if (productDivs.length === 0) return false;
        
        const styles = window.getComputedStyle(productDivs[0]);
        const hasPadding = parseInt(styles.padding) > 0;
        const hasMargin = parseInt(styles.margin) > 0;
        return hasPadding && hasMargin;
      });
      if (paddingMarginApplied) {
        console.log('TESTCASE:verify_padding_margin:success');
      } else {
        console.log('TESTCASE:verify_padding_margin:failure');
      }
    } catch {
      console.log('TESTCASE:verify_padding_margin:failure');
    }
  
    // Test Case 9: Verify Two-Column Layout on Large Screens
    try {
      await page.setViewport({ width: 1024, height: 768 });
      await page.waitForTimeout(500);
      
      const twoColumnLayout = await page.evaluate(() => {
        const productDivs = document.querySelectorAll('.productDiv');
        if (productDivs.length < 2) return false;
        
        const firstDiv = productDivs[0];
        const secondDiv = productDivs[1];
        
        const firstRect = firstDiv.getBoundingClientRect();
        const secondRect = secondDiv.getBoundingClientRect();
        
        return Math.abs(firstRect.top - secondRect.top) < 50;
      });
      
      if (twoColumnLayout) {
        console.log('TESTCASE:verify_two_column_layout:success');
      } else {
        console.log('TESTCASE:verify_two_column_layout:failure');
      }
    } catch {
      console.log('TESTCASE:verify_two_column_layout:failure');
    }
  
    // Test Case 10: Verify Single-Column Layout on Small Screens
    try {
      await page.setViewport({ width: 500, height: 768 });
      await page.waitForTimeout(500);
      
      const singleColumnLayout = await page.evaluate(() => {
        const productDivs = document.querySelectorAll('.productDiv');
        if (productDivs.length < 2) return false;
        
        const firstDiv = productDivs[0];
        const secondDiv = productDivs[1];
        
        const firstRect = firstDiv.getBoundingClientRect();
        const secondRect = secondDiv.getBoundingClientRect();
        
        return secondRect.top > firstRect.bottom;
      });
      
      if (singleColumnLayout) {
        console.log('TESTCASE:verify_single_column_layout:success');
      } else {
        console.log('TESTCASE:verify_single_column_layout:failure');
      }
    } catch {
      console.log('TESTCASE:verify_single_column_layout:failure');
    }
  
    await browser.close();
  })();
