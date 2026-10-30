# w1-pah1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w1-pah1/code` (original) and `... tests/w1-pah1/solution --test tests/w1-pah1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/8 passed

| Case | Result |
|---|---|
| verify_header_text | FAIL |
| verify_mission_statement | FAIL |
| verify_contact_header_text | FAIL |
| verify_contact_details | FAIL |
| verify_footer_text | FAIL |
| verify_why_choose_us_header | FAIL |
| verify_why_choose_us_description | FAIL |
| verify_product_description | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 8/8, run 2 = 8/8

| Case | Result |
|---|---|
| verify_header_text | PASS |
| verify_mission_statement | PASS |
| verify_contact_header_text | PASS |
| verify_contact_details | PASS |
| verify_footer_text | PASS |
| verify_why_choose_us_header | PASS |
| verify_why_choose_us_description | PASS |
| verify_product_description | PASS |
