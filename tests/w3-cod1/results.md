# w3-cod1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w3-cod1/code` (original) and `... tests/w3-cod1/solution --test tests/w3-cod1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Starter had an empty body and an empty style block.

## Original code/: 0/7 passed

| Case | Result |
|---|---|
| profile_card_is_present | FAIL |
| profile_card_background_color_is_present | FAIL |
| profile_card_box_shadow_is_present | FAIL |
| profile_card_heading2_text_is_present | FAIL |
| profile_card_button_text_is_present | FAIL |
| profile_card_button_color_is_present | FAIL |
| profile_card_button_hover_color_is_present | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 7/7, run 2 = 7/7

| Case | Result |
|---|---|
| profile_card_is_present | PASS |
| profile_card_background_color_is_present | PASS |
| profile_card_box_shadow_is_present | PASS |
| profile_card_heading2_text_is_present | PASS |
| profile_card_button_text_is_present | PASS |
| profile_card_button_color_is_present | PASS |
| profile_card_button_hover_color_is_present | PASS |
