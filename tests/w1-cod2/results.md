# w1-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w1-cod2/code` (original) and `... tests/w1-cod2/solution --test tests/w1-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Starter had bugs: wrong title ("StramFlix"), h2 instead of h1, no <b>/<u> in first <p>, unclosed <span>, footer used <div> not <p>.

## Original code/: 0/6 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_header_text | FAIL |
| verify_paragraph_formatting | FAIL |
| verify_genre_list | FAIL |
| verify_footer_contact_info | FAIL |
| verify_html_structure | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 6/6, run 2 = 6/6

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_text | PASS |
| verify_paragraph_formatting | PASS |
| verify_genre_list | PASS |
| verify_footer_contact_info | PASS |
| verify_html_structure | PASS |
