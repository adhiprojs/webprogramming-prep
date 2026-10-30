# w8-cy results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w8-cy/code` (original) and `... tests/w8-cy/solution --test tests/w8-cy/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    FAIL  page_load
          did not report a result (test crashed or timed out before this case)
    PASS  canvas_initialized_properly
    PASS  drawing_in_default_color
    PASS  click_red_button_sets_color_red
    PASS  click_blue_button_sets_color_blue
    PASS  switching_colors_while_drawing
    PASS  eraser_functionality
    PASS  clear_canvas_functionality
    PASS  drawing_inside_canvas_only
    PASS  drawing_after_multiple_color_changes
    PASS  no_console_errors_during_drawing
    10/11 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    FAIL  page_load
    10/11 passed (puppeteer, node v14.21.3)
Run 2:
    FAIL  page_load
    10/11 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.
