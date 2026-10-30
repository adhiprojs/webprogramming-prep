# w2-pah1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w2-pah1/code` (original) and `... tests/w2-pah1/solution --test tests/w2-pah1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/8 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_intro_paragraph | FAIL |
| verify_section_heading | FAIL |
| verify_categories_list | FAIL |
| verify_table_headers | FAIL |
| verify_number_of_rows | FAIL |
| verify_first_row_data | FAIL |
| verify_table_borders | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 8/8, run 2 = 8/8

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_intro_paragraph | PASS |
| verify_section_heading | PASS |
| verify_categories_list | PASS |
| verify_table_headers | PASS |
| verify_number_of_rows | PASS |
| verify_first_row_data | PASS |
| verify_table_borders | PASS |
