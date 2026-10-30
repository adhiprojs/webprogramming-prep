# w7-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w7-cod2/code` (original) and `... tests/w7-cod2/solution --test tests/w7-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    FAIL  page_load
          did not report a result (test crashed or timed out before this case)
    PASS  fieldset_and_legend_elements_exist
    PASS  age_group_radio_buttons_exist
    PASS  genre_checkboxes_exist
    PASS  selecting_age_group_updates_display
    PASS  selected_genre_count_is_correct
    PASS  reset_clears_all_selections
    6/7 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    FAIL  page_load
    6/7 passed (puppeteer, node v14.21.3)
Run 2:
    FAIL  page_load
    6/7 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.
