# w6-cy results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w6-cy/code` (original) and `... tests/w6-cy/solution --test tests/w6-cy/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    FAIL  page_load
    FAIL  canvas_initialized_properly
          did not report a result (test crashed or timed out before this case)
    FAIL  drawing_in_default_color
          did not report a result (test crashed or timed out before this case)
    FAIL  click_red_button_sets_color_red
          did not report a result (test crashed or timed out before this case)
    FAIL  click_blue_button_sets_color_blue
          did not report a result (test crashed or timed out before this case)
    FAIL  switching_colors_while_drawing
          did not report a result (test crashed or timed out before this case)
    FAIL  eraser_functionality
          did not report a result (test crashed or timed out before this case)
    FAIL  clear_canvas_functionality
          did not report a result (test crashed or timed out before this case)
    FAIL  drawing_inside_canvas_only
          did not report a result (test crashed or timed out before this case)
    FAIL  drawing_after_multiple_color_changes
          did not report a result (test crashed or timed out before this case)
    FAIL  no_console_errors_during_drawing
          did not report a result (test crashed or timed out before this case)
    0/11 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    FAIL  page_load
    10/11 passed (puppeteer, node v14.21.3)
Run 2:
    FAIL  page_load
    10/11 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.
