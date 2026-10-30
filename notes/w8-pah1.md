# w8-pah1: Layered images z-index (same task as w6-pah1)

Full explanation in `notes/w6-pah1.md`. This note keeps the cases and what happened with this attempt.

## 1. What the question asks
Same: `#img1`-`#img3` overlapping (initial z-index 1, 2, 3), buttons `#btn1`-`#btn3`. Clicking a button sets that image's inline `style.zIndex` to `'10'` and the other two to `'1'`.

## 2. What each test case checks
Same 8 cases as w6-pah1:
- initial_zindex_and_overlap: z-index `'1'`, `'2'`, `'3'` (inline, else computed).
- button1_brings_img1_front: after `#btn1`, inline img1 `'10'`, img2 `'1'`, img3 `'1'`.
- button2_brings_img2_front: same pattern for `#btn2`.
- button3_brings_img3_front: same pattern for `#btn3`.
- zindex_updates_dynamically: img3 `'10'`, others `'1'` (state from the previous click).
- buttons_remain_responsive: 3 rounds of btn1, btn2, btn3, clicked image is `'10'` each time.
- no_console_errors_on_click: fresh page, click all three buttons, no console `error` events.
- only_selected_image_in_front: after `#btn2`, img2 `'10'`, others `'1'`.

## 3. The original submission
The original code was correct: all 8 real cases pass. The JS and the CSS positioning/z-index are right, and the Bootstrap CDN link is fine (it loads without errors).

The first local run showed 7/8 (`no_console_errors_on_click` failed) only because `img1.jpg`, `img2.jpg` and `img3.jpg` were not in the dump. The dump command only collects `.js/.html/.css/.json`, so images never get copied. Each missing image is a 404, which Chrome logs as a console error ("Failed to load resource"). On the exam the images were there.

The stored solution is the original code unchanged plus three placeholder JPEGs with the same names (`public/img1.jpg` etc., plain coloured squares). With them it passes 8/8.

## 4. Common mistakes
- A missing image (404) or a CDN link that fails to load in a "no console errors" test. Every `src`/`href` must point to a file that exists.
- Images without `position: absolute/relative`, so computed z-index is `auto`.
- Not resetting the other images to `'1'`.
- Writing z-index only in CSS classes (the test reads inline `style.zIndex` after clicks).

## 5. Approach in 5 steps
1. Use the image files in `public/` (`img1.jpg`, `img2.jpg`, `img3.jpg`); reference them by exact file name.
2. HTML and CSS: container `position:relative`, images `position:absolute; top:0; left:0`, z-index 1/2/3.
3. JS in `DOMContentLoaded`: `bringToFront(img)` sets all three to `'1'`, then the chosen one to `'10'`.
4. One click listener per button.
5. Open DevTools Console and Network, click all three buttons, confirm no red errors and no 404s.
