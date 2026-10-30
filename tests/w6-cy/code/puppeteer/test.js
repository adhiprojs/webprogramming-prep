const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const url = 'https://8081-workspace.examly.io'; // 🔁 Replace with the correct local path

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#sketchPad');
  } catch {
    console.log('TESTCASE:page_load:failure');
    await browser.close();
    return;
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Test 1: Canvas is visible and initialized properly
  try {
    const canvasVisible = await page.$eval('#sketchPad', el => el.width > 0 && el.height > 0);
    console.log(canvasVisible
      ? 'TESTCASE:canvas_initialized_properly:success'
      : 'TESTCASE:canvas_initialized_properly:failure');
  } catch {
    console.log('TESTCASE:canvas_initialized_properly:failure');
  }

  // Test 2: Drawing in default color (black) works
  try {
    await page.mouse.move(50, 50);
    await page.mouse.down();
    await page.mouse.move(150, 150);
    await page.mouse.up();
    const color = await page.$eval('#sketchPad', el => {
      const ctx = el.getContext('2d');
      const pixel = ctx.getImageData(50, 50, 1, 1).data;
      return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    });
    console.log(color === 'rgb(0, 0, 0)'
      ? 'TESTCASE:drawing_in_default_color:success'
      : 'TESTCASE:drawing_in_default_color:failure');
  } catch {
    console.log('TESTCASE:drawing_in_default_color:failure');
  }

  // Test 3: Clicking red button sets color to red
  await page.click('#redBtn');
  await wait(100);
  const currentColorRed = await page.$eval('#currentColor', el => el.textContent);
  console.log(currentColorRed === 'Red'
    ? 'TESTCASE:click_red_button_sets_color_red:success'
    : 'TESTCASE:click_red_button_sets_color_red:failure');

  // Test 4: Clicking blue button sets color to blue
  await page.click('#blueBtn');
  await wait(100);
  const currentColorBlue = await page.$eval('#currentColor', el => el.textContent);
  console.log(currentColorBlue === 'Blue'
    ? 'TESTCASE:click_blue_button_sets_color_blue:success'
    : 'TESTCASE:click_blue_button_sets_color_blue:failure');

  // Test 5: Switching colors while drawing works as expected
  await page.click('#redBtn');   
  await page.mouse.move(200, 200); 
  await page.mouse.down();   
  await page.mouse.move(250, 250);  
  await page.mouse.up(); 
  
  const colorAfterRed = await page.$eval('#sketchPad', el => {
    const ctx = el.getContext('2d');
    return ctx.strokeStyle; 
  });
  
  // Check if color is red (either from strokeStyle or pixel)
  console.log(colorAfterRed  === '#ff0000'
    ? 'TESTCASE:switching_colors_while_drawing:success'
    : 'TESTCASE:switching_colors_while_drawing:failure');

  // Test 6: Eraser functionality clears only the dragged area
  await page.click('#eraserBtn');
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(350, 350);
  await page.mouse.up();
  const eraserColor = await page.$eval('#sketchPad', el => {
    const ctx = el.getContext('2d');
    return ctx.strokeStyle;
  });
  //console.log(eraserColor)
  console.log(eraserColor === '#ffffff'
    ? 'TESTCASE:eraser_functionality:success'
    : 'TESTCASE:eraser_functionality:failure');

  // Test 7: Clear Canvas button resets the entire canvas
  await page.click('#clearBtn');
  await wait(100);
  const resetCanvas = await page.$eval('#sketchPad', el => {
    const ctx = el.getContext('2d');
    const pixel = ctx.getImageData(50, 50, 1, 1).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  });
  console.log(resetCanvas === 'rgb(255, 255, 255)'
    ? 'TESTCASE:clear_canvas_functionality:success'
    : 'TESTCASE:clear_canvas_functionality:failure');

  // Test 8: Drawing remains inside the canvas area only
  await page.mouse.move(500, 300);
  await page.mouse.down();
  await page.mouse.move(600, 350);
  await page.mouse.up();
  const outsideCanvas = await page.$eval('#sketchPad', el => {
    const ctx = el.getContext('2d');
    const pixel = ctx.getImageData(500, 300, 1, 1).data;
    return pixel[3]; // Checking the alpha value (should be 0 if outside)
  });
  console.log(outsideCanvas === 0
    ? 'TESTCASE:drawing_inside_canvas_only:success'
    : 'TESTCASE:drawing_inside_canvas_only:failure');

  // Test 9: Drawing works after multiple color changes
  await page.click('#blueBtn');
  await page.mouse.move(400, 200);
  await page.mouse.down();
  await page.mouse.move(450, 250);
  await page.mouse.up();
  const colorAfterBlue = await page.$eval('#sketchPad', el => {
    const ctx = el.getContext('2d');
    return ctx.strokeStyle ;
  });
  console.log(colorAfterBlue === '#0000ff'
    ? 'TESTCASE:drawing_after_multiple_color_changes:success'
    : 'TESTCASE:drawing_after_multiple_color_changes:failure');

  // Test 10: No console errors or lags during drawing
  try {
    const errorPage = await browser.newPage();
    const logs = [];

    errorPage.on('console', msg => {
      if (msg.type() === 'error') logs.push(msg.text());
    });

    await errorPage.goto(url);
    await errorPage.mouse.move(50, 50);
    await errorPage.mouse.down();
    await errorPage.mouse.move(150, 150);
    await errorPage.mouse.up();

    console.log(logs.length === 0
      ? 'TESTCASE:no_console_errors_during_drawing:success'
      : 'TESTCASE:no_console_errors_during_drawing:failure');

    await errorPage.close();
  } catch {
    console.log('TESTCASE:no_console_errors_during_drawing:failure');
  }

  await browser.close();
})();
