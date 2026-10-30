# Image Stack Controller

Build a page with three overlapping images and three buttons. Each button brings its matching image to the front by changing its `z-index`.

## Requirements

1. Images `#img1`, `#img2` and `#img3` overlap and start with `z-index` `1`, `2` and `3` respectively (inline or from CSS). *(initial_zindex_and_overlap)*
2. Clicking `#btn1` sets the inline `style.zIndex` of `#img1` to `10` and of `#img2` and `#img3` to `1`. *(button1_brings_img1_front)*
3. Clicking `#btn2` sets `#img2` to `10` and `#img1` and `#img3` to `1`. *(button2_brings_img2_front)*
4. Clicking `#btn3` sets `#img3` to `10` and `#img1` and `#img2` to `1`. *(button3_brings_img3_front)*
5. With no further clicks after the previous case, `#img3` is still `10` and `#img1` and `#img2` are `1`. *(zindex_updates_dynamically)*
6. Clicking `#btn1`, `#btn2`, `#btn3` in turn, repeated 3 times, always leaves the matching image at inline `z-index` `10`. *(buttons_remain_responsive)*
7. On a fresh load, clicking `#btn1`, `#btn2` and `#btn3` logs no console errors. *(no_console_errors_on_click)*
8. Clicking `#btn2` leaves only `#img2` at `10` and the other two at `1`. *(only_selected_image_in_front)*

## Watch out

- After the first click, values are read from the inline `style.zIndex`, so set them with JavaScript as strings such as `'10'` and `'1'` (the others must be reset to `'1'`, not left empty).
- Only the initial check also accepts computed CSS values.
- The elements `#img1`, `#img2` and `#img3` must exist or `page_load` prints a failure and aborts everything.
- `public/` already has `img1.jpg`, `img2.jpg` and `img3.jpg` (placeholders). A `src` that points to a missing file is a 404 console error and fails case 7.
- Buttons are clicked by id, so the images must not cover them.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
