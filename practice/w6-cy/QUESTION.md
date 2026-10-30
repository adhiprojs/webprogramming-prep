# Canvas Sketch Pad

Build a drawing pad on a `<canvas>`. The user draws by dragging the mouse, picks red or blue with buttons, can erase, and can clear the whole canvas. The current colour name is shown in text.

## Requirements

1. `#sketchPad` is a canvas with a width and height greater than `0`. *(canvas_initialized_properly)*
2. Dragging the mouse from page point `(50, 50)` to `(150, 150)` draws in the default colour black: canvas pixel `(50, 50)` reads `rgb(0, 0, 0)`. *(drawing_in_default_color)*
3. Clicking `#redBtn` sets the text of `#currentColor` to `Red`. *(click_red_button_sets_color_red)*
4. Clicking `#blueBtn` sets the text of `#currentColor` to `Blue`. *(click_blue_button_sets_color_blue)*
5. After clicking `#redBtn` and dragging on the canvas, the context's `strokeStyle` is `#ff0000`. *(switching_colors_while_drawing)*
6. After clicking `#eraserBtn` and dragging, the context's `strokeStyle` is `#ffffff`. *(eraser_functionality)*
7. Clicking `#clearBtn` resets the canvas so pixel `(50, 50)` reads `rgb(255, 255, 255)` (filled white). *(clear_canvas_functionality)*
8. After a drag from `(500, 300)` to `(600, 350)`, canvas pixel `(500, 300)` has alpha `0`. *(drawing_inside_canvas_only)*
9. After clicking `#blueBtn` and dragging, the context's `strokeStyle` is `#0000ff`. *(drawing_after_multiple_color_changes)*
10. A fresh load of the page followed by a drag from `(50, 50)` to `(150, 150)` logs no console errors. *(no_console_errors_during_drawing)*

## Watch out

- If `#sketchPad` is missing, `page_load` prints a failure and aborts everything.
- `strokeStyle` is compared as the exact string, so assign the lowercase hex values (`#ff0000`, `#0000ff`, `#ffffff`); the browser normalises them to that form.
- Mouse coordinates are page coordinates but pixels are read in canvas coordinates, so the canvas should sit at the top-left of the page with no offset or scaling (no margin or body padding).
- Case 8 only passes if pixel `(500, 300)` lies outside the canvas bitmap (getImageData returns alpha `0` there), so keep the canvas smaller than `500` wide or `300` tall.
- Drawing must work with `mousedown`, `mousemove` and `mouseup`.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
