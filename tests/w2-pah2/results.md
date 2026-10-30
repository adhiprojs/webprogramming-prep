# w2-pah2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w2-pah2/code` (original) and `... tests/w2-pah2/solution --test tests/w2-pah2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/10 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_intro_paragraph | FAIL |
| verify_categories_section | FAIL |
| verify_categories_list | FAIL |
| verify_table_headers | FAIL |
| verify_number_of_rows | FAIL |
| verify_first_row_data | FAIL |
| verify_table_borders | FAIL |
| verify_best_selling_section | FAIL |
| verify_testimonials_section | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 10/10, run 2 = 10/10

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_intro_paragraph | PASS |
| verify_categories_section | PASS |
| verify_categories_list | PASS |
| verify_table_headers | PASS |
| verify_number_of_rows | PASS |
| verify_first_row_data | PASS |
| verify_table_borders | PASS |
| verify_best_selling_section | PASS |
| verify_testimonials_section | PASS |
