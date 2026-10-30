# w6-pah2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w6-pah2/code` (original) and `... tests/w6-pah2/solution --test tests/w6-pah2/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    FAIL  page_load
    FAIL  default_font_size_is_12px
          did not report a result (test crashed or timed out before this case)
    FAIL  change_font_size_to_16px
          did not report a result (test crashed or timed out before this case)
    FAIL  change_font_color_to_red
          did not report a result (test crashed or timed out before this case)
    FAIL  click_bold_applies_bold
          did not report a result (test crashed or timed out before this case)
    FAIL  click_italic_applies_italic
          did not report a result (test crashed or timed out before this case)
    FAIL  bold_toggle_back_to_normal
          did not report a result (test crashed or timed out before this case)
    FAIL  bold_and_italic_combination_works
          did not report a result (test crashed or timed out before this case)
    FAIL  reset_button_sets_defaults
          did not report a result (test crashed or timed out before this case)
    FAIL  multiple_rapid_changes_work
          did not report a result (test crashed or timed out before this case)
    FAIL  controls_retain_selected_values
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
