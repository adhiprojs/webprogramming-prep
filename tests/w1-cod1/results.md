# w1-cod1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w1-cod1/code` (original) and `... tests/w1-cod1/solution --test tests/w1-cod1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Starter was a blank template (index.html only had a comment).

## Original code/: 0/6 passed

| Case | Result |
|---|---|
| verify_header_text | FAIL |
| verify_description_text | FAIL |
| verify_subheader_text | FAIL |
| verify_footer_text_italic | FAIL |
| verify_html_paragraph_text | FAIL |
| verify_html_structure | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 6/6, run 2 = 6/6

| Case | Result |
|---|---|
| verify_header_text | PASS |
| verify_description_text | PASS |
| verify_subheader_text | PASS |
| verify_footer_text_italic | PASS |
| verify_html_paragraph_text | PASS |
| verify_html_structure | PASS |
