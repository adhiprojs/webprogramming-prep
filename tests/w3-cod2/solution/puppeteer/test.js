const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });
  const page= await browser.newPage();
  try {
    await page.goto('https://8081-workspace.examly.io/');
    await page.setViewport({
      width: 1200,
      height: 800,
    })
    const formBackgroundColor= await page.$eval('.login-form', (form) => {
        return window.getComputedStyle(form).backgroundColor;
      });
      if (formBackgroundColor == 'rgb(255, 255, 255)') {
        console.log('TESTCASE:login_form_background_color_correct:success');
      } else {
        console.log('TESTCASE:login_form_background_color_correct:failure');
      }
    } catch (e) {
      console.log('TESTCASE:login_form_background_color_correct:failure');
    }

  const page2 = await browser.newPage();
  try {
    await page2.goto('https://8081-workspace.examly.io/');
    await page2.setViewport({
      width: 1200,
      height: 800,
    })
    const headerColor = await page2.$eval('h1', (h1) => {
        return window.getComputedStyle(h1).color;
      });
      if (headerColor == 'rgb(255, 0, 0)') {
        console.log('TESTCASE:header_color_correct:success');
      } else {
        console.log('TESTCASE:header_color_correct:failure');
      }
    } catch (e) {
      console.log('TESTCASE:header_color_correct:failure');
    }

  const page3 = await browser.newPage();
  try {
    await page3.goto('https://8081-workspace.examly.io/');
    await page3.setViewport({
      width: 1200,
      height: 800,
    })
    const formBorderRadius = await page3.$eval('.login-form', (form) => {
        return window.getComputedStyle(form).borderRadius;
      });
      if (formBorderRadius == '5px') {
        console.log('TESTCASE:login_form_border_radius_correct:success');
      } else {
        console.log('TESTCASE:login_form_border_radius_correct:failure');
      }
    } catch (e) {
      console.log('TESTCASE:login_form_border_radius_correct:failure');
    }

  const page4 = await browser.newPage();
  try {
    await page4.goto('https://8081-workspace.examly.io/');
    await page4.setViewport({
      width: 1200,
      height: 800,
    })
    const buttonBgColor = await page4.$eval('#submitButton', (button) => {
        return window.getComputedStyle(button).backgroundColor;
      });
      if (buttonBgColor == 'rgb(0, 0, 255)') {
        console.log('TESTCASE:submit_button_bg_color_correct:success');
      } else {
        console.log('TESTCASE:submit_button_bg_color_correct:failure');
      }
    } catch (e) {
      console.log('TESTCASE:submit_button_bg_color_correct:failure');
    }


    const page5 = await browser.newPage();
    try {
      await page5.goto('https://8081-workspace.examly.io/');
      await page5.setViewport({
        width: 1200,
        height: 800,
      })
      const value = await page5.$eval('#submitButton', (button) => {
          return window.getComputedStyle(button).fontSize;
        });
        if (value == '16px') {
          console.log('TESTCASE:submit_button_fontsize_color_correct:success');
        } else {
          console.log('TESTCASE:submit_button_fontsize_color_correct:failure');
        }
      } catch (e) {
        console.log('TESTCASE:submit_button_fontsize_color_correct:failure');
      }

      const page6 = await browser.newPage();
      try {
        await page6.goto('https://8081-workspace.examly.io/');
        await page6.setViewport({
          width: 1200,
          height: 800,
        })
        const value = await page6.$eval('h1', (h1) => {
            return window.getComputedStyle(h1).textAlign;
          });
          if (value =='center') {
            console.log('TESTCASE:header_color_correct:success');
          } else {
            console.log('TESTCASE:header_color_correct:failure');
          }
        } catch (e) {
          console.log('TESTCASE:header_color_correct:failure');
        }



  finally {
    await page.close();
    await page2.close();
    await page3.close();
    await page4.close();
    await page5.close();
    await page6.close();

    await browser.close();
  }

})();
