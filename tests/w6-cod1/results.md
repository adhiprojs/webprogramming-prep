# w6-cod1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w6-cod1/code` (original) and `... tests/w6-cod1/solution --test tests/w6-cod1/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  no_background_on_load
    PASS  highlight_applied_on_click
    PASS  highlight_removed_on_second_click
    PASS  other_elements_not_affected
    PASS  button_toggle_multiple_times
    PASS  no_errors_on_early_click
    6/6 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    6/6 passed (puppeteer, node v14.21.3)
Run 2:
    6/6 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.
