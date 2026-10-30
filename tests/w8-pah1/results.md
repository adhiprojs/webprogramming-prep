# w8-pah1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w8-pah1/code` (original) and `... tests/w8-pah1/solution --test tests/w8-pah1/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    FAIL  page_load
          did not report a result (test crashed or timed out before this case)
    PASS  initial_zindex_and_overlap
    PASS  button1_brings_img1_front
    PASS  button2_brings_img2_front
    PASS  button3_brings_img3_front
    PASS  zindex_updates_dynamically
    PASS  buttons_remain_responsive
    FAIL  no_console_errors_on_click
    PASS  only_selected_image_in_front
    7/9 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    FAIL  page_load
    8/9 passed (puppeteer, node v14.21.3)
Run 2:
    FAIL  page_load
    8/9 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.

> **Update (images):** the 7/8 above was caused only by `img1.jpg`, `img2.jpg`, `img3.jpg` missing from the dump (the dump command skips images), giving 404 console errors. The Bootstrap link was not the cause. `solution/` is now `code/` byte-for-byte plus three placeholder JPEGs in `public/`: 8/8 in two runs. The same placeholders were added to `practice/w8-pah1/starter/public/`; starter + the original code also gives 8/8.
