# w3-cy1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w3-cy1/code` (original) and `... tests/w3-cy1/solution --test tests/w3-cy1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/8 passed

| Case | Result |
|---|---|
| verify_body_background_color | FAIL |
| verify_navbar_background_color | FAIL |
| verify_card_background_color | FAIL |
| verify_footer_background_color | FAIL |
| verify_main_heading_text_color | FAIL |
| verify_subheading_text_color | FAIL |
| h2_text_is_correct | FAIL |
| h3_text_is_correct | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 8/8, run 2 = 8/8

| Case | Result |
|---|---|
| verify_body_background_color | PASS |
| verify_navbar_background_color | PASS |
| verify_card_background_color | PASS |
| verify_footer_background_color | PASS |
| verify_main_heading_text_color | PASS |
| verify_subheading_text_color | PASS |
| h2_text_is_correct | PASS |
| h3_text_is_correct | PASS |
