# w8-cy: Canvas sketch pad (same task as w6-cy)

Full explanation, mistakes and 5 steps are in `notes/w6-cy.md`. This note only records what is different.

## 1. What the question asks
Same: `canvas#sketchPad` (500x300, at page top-left), buttons `#redBtn`, `#blueBtn`, `#eraserBtn`, `#clearBtn` (and `#defaultBtn`, `#greenBtn`), and `span#currentColor`.

## 2. What each test case checks
Same 10 cases as w6-cy:
- canvas_initialized_properly: canvas width and height > 0.
- drawing_in_default_color: drag from (50,50) to (150,150); pixel at (50,50) is `rgb(0, 0, 0)`.
- click_red_button_sets_color_red: `#currentColor` text exactly `Red`.
- click_blue_button_sets_color_blue: text exactly `Blue`.
- switching_colors_while_drawing: after red and a drag, `ctx.strokeStyle === '#ff0000'`.
- eraser_functionality: after `#eraserBtn` and a drag, `ctx.strokeStyle === '#ffffff'`.
- clear_canvas_functionality: after `#clearBtn`, pixel (50,50) is `rgb(255, 255, 255)`.
- drawing_inside_canvas_only: drag (500,300) to (600,350); alpha at canvas (500,300) is 0.
- drawing_after_multiple_color_changes: after blue and a drag, `ctx.strokeStyle === '#0000ff'`.
- no_console_errors_during_drawing: fresh page, one drag, no console `error`.

## 3. The original submission
This time the original submission is the working one and passes all 10 cases. It is the same code that serves as the reference in w6-cy:
- Canvas is `position:absolute; top:0; left:0` so Puppeteer page coordinates equal canvas coordinates.
- Canvas is filled white on load; Clear does `clearRect` then white `fillRect`.
- Colours are stored as lowercase hex (`#ff0000`, `#0000ff`, `#ffffff`).
- Mouse listeners: `mousedown`, `mousemove`, `mouseup`, `mouseout`.

Fragile points: the script does not use `DOMContentLoaded`; it works only because `<script>` is at the end of `<body>`. If the script moved to `<head>`, `getElementById` would return null and every case would fail. Hex colours must be exact, and the Eraser button's label in `#currentColor` is not tested.

## 4. Common mistakes
See w6-cy: no white fill, colour names instead of hex, canvas not at (0,0), wrong IDs, click instead of mouse events.

## 5. Approach in 5 steps
Same as w6-cy: HTML with exact IDs, zero-margin CSS with absolute canvas, white fill + `strokeStyle`, mouse handlers with coordinate conversion, button handlers that set hex colour and `currentColor.textContent`.
