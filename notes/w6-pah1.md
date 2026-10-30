# w6-pah1: Layered images, bring to front (z-index)

Concept: `position` + `z-index`, `style.zIndex` set from JS click handlers.

## 1. What the question asks
Three overlapping images and three buttons:
- Images `#img1`, `#img2`, `#img3`, stacked at the same place with initial z-index 1, 2, 3.
- Buttons `#btn1`, `#btn2`, `#btn3`.
- Clicking `#btnN` sets that image's inline `style.zIndex` to `'10'` and the other two to `'1'`.

The original submission was the blank template (nothing written); the notes below describe the verified reference solution.

## 2. What each test case checks
Strings are compared exactly, e.g. `'10'` not `10`.

| Case | Action | Expected |
|---|---|---|
| initial_zindex_and_overlap | read inline z-index, else computed | img1 `'1'`, img2 `'2'`, img3 `'3'` |
| button1_brings_img1_front | click `#btn1` | inline z-index: img1 `'10'`, img2 `'1'`, img3 `'1'` |
| button2_brings_img2_front | click `#btn2` | img2 `'10'`, others `'1'` |
| button3_brings_img3_front | click `#btn3` | img3 `'10'`, others `'1'` |
| zindex_updates_dynamically | no click (state after previous case) | img3 `'10'`, img1 `'1'`, img2 `'1'` |
| buttons_remain_responsive | 3 rounds clicking btn1, btn2, btn3 | each time the clicked image has inline `'10'` |
| no_console_errors_on_click | new page, click all three | no console `error` messages |
| only_selected_image_in_front | click `#btn2` | img2 `'10'`, img1 `'1'`, img3 `'1'` |

## 3. The reference solution
Passes all 8. CSS gives `.layered-img` `position:absolute; top:0; left:0` inside a `position:relative` container, with `#img1{z-index:1}`, `#img2{z-index:2}`, `#img3{z-index:3}`. JS has one `bringToFront(image)` that sets all three to `'1'` then the chosen one to `'10'`.

Fragile points:
- Without `position` on the images, computed z-index is `auto`, so the initial case fails.
- After a click, only the **inline** style counts, so the handler must write `style.zIndex` for all three (not just the clicked one).
- Image files must exist (`img1.svg` etc.), or the 404 appears as a console error and fails `no_console_errors_on_click`.

## 4. Common mistakes
- Setting z-index as a number in a different place (CSS class toggling), when the test reads `element.style.zIndex`.
- Not resetting the others to `'1'`.
- `'100'` or `99` instead of `'10'`.
- Forgetting `position: absolute/relative`.
- Missing image sources (404 console error).
- Script before the DOM without `DOMContentLoaded`.

## 5. Approach in 5 steps
1. HTML: `#btn1-3` and `#img1-3` with real image files in `public/`.
2. CSS: container `position:relative`; images `position:absolute; top:0; left:0`; z-index 1, 2, 3.
3. JS in `DOMContentLoaded`: collect the three images.
4. Write `bringToFront(img)`: set all to `'1'`, the chosen one to `'10'`.
5. Attach one click listener per button; test by clicking 3 rounds.
