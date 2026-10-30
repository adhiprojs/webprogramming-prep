# w6-cy: Canvas sketch pad

Concept: canvas 2D drawing with mouse events, colour buttons, eraser, clear. (w8-cy uses the same test.)

## 1. What the question asks
A drawing pad:
- `<canvas id="sketchPad">` with width and height > 0.
- Buttons `#redBtn`, `#blueBtn`, `#eraserBtn`, `#clearBtn` (the page also had `#defaultBtn`, `#greenBtn`).
- `<span id="currentColor">` showing the current colour name. Default text is Black.
- Mouse drag on the canvas draws a line. Default stroke black, red `#ff0000`, blue `#0000ff`, eraser `#ffffff`.
- Clear fills the canvas white.

Layout matters: Puppeteer's mouse uses page coordinates, so the canvas must sit at the top-left of the page so that page (50,50) is canvas (50,50). The original submission was the blank template (nothing written), so the study reference is the verified solution.

## 2. What each test case checks
| Case | Action | Expected |
|---|---|---|
| canvas_initialized_properly | read `#sketchPad` | `width > 0 && height > 0` |
| drawing_in_default_color | drag (50,50) to (150,150) | pixel at (50,50) is `rgb(0, 0, 0)` |
| click_red_button_sets_color_red | click `#redBtn` | `#currentColor` text exactly `Red` |
| click_blue_button_sets_color_blue | click `#blueBtn` | text exactly `Blue` |
| switching_colors_while_drawing | click red, drag (200,200) to (250,250) | `ctx.strokeStyle === '#ff0000'` |
| eraser_functionality | click `#eraserBtn`, drag (300,300) to (350,350) | `ctx.strokeStyle === '#ffffff'` |
| clear_canvas_functionality | click `#clearBtn` | pixel (50,50) is `rgb(255, 255, 255)` |
| drawing_inside_canvas_only | drag (500,300) to (600,350) | pixel alpha at (500,300) is 0 |
| drawing_after_multiple_color_changes | click blue, drag (400,200) to (450,250) | `ctx.strokeStyle === '#0000ff'` |
| no_console_errors_during_drawing | new page, drag | no console errors |

## 3. The original submission
No original submission to review (the original dump was the empty template). The reference solution passes all cases.

Key points of the reference:
- Canvas `width=500 height=300`, CSS `position:absolute; top:0; left:0`, controls placed below.
- On init: `ctx.strokeStyle='#000000'`, then `fillStyle='#ffffff'; fillRect(...)` so cleared pixels read white, not transparent black.
- Convert mouse to canvas coordinates with `getBoundingClientRect()`, draw with `beginPath/moveTo/lineTo/stroke`.
- Listeners: `mousedown`, `mousemove`, `mouseup`, `mouseout` on the canvas.
- Clear: `clearRect` then white `fillRect`; keep the current stroke colour.

Fragile points:
- `strokeStyle` must be set as lowercase 6-digit hex strings: the browser returns these exactly; `red` or `rgb(...)` would be returned in a different form and fail.
- Text of `#currentColor` must match exactly: `Red`, `Blue`.
- Drawing at (500,300) is on the canvas edge/outside the bitmap, so alpha stays 0. A canvas bigger than 500x300 or a scaled canvas would break this.
- If the canvas is not at page (0,0), the pixel tests (50,50) miss the stroke.

## 4. Common mistakes
- Not filling white at start; `clearRect` alone gives transparent black, which reads as `rgb(0, 0, 0)` and fails the clear test.
- Using `ctx.strokeStyle = 'red'` instead of `'#ff0000'`.
- Forgetting the mouse-position conversion or putting the canvas inside a margin/padding wrapper.
- Setting colour only in a variable and never on `ctx.strokeStyle`.
- Listening for `click` instead of mouse down/move/up.
- IDs different from the list above.

## 5. Approach in 5 steps
1. HTML: canvas `#sketchPad`, buttons with exact IDs, `span#currentColor`; script at end of body.
2. CSS: zero body margin; canvas `position:absolute; top:0; left:0`, fixed size.
3. JS: get `ctx`; set `strokeStyle`/`lineWidth`; fill the whole canvas white.
4. Mouse handlers with a `drawing` flag, convert coordinates, `lineTo` + `stroke`.
5. Button handlers set `ctx.strokeStyle` (hex) and `currentColor.textContent`; clear = clearRect then white fillRect.
