# w1-cy1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w1-cy1/code` (original) and `... tests/w1-cy1/solution --test tests/w1-cy1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/11 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_header_text | FAIL |
| verify_mission_header | FAIL |
| verify_mission_text_bold_italic | FAIL |
| verify_new_arrivals_header | FAIL |
| verify_new_books_italic | FAIL |
| verify_customer_reviews_header | FAIL |
| verify_review_genre_underlined | FAIL |
| verify_footer_contact_info | FAIL |
| verify_why_choose_us_text | FAIL |
| verify_header_slogan | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 11/11, run 2 = 11/11

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_text | PASS |
| verify_mission_header | PASS |
| verify_mission_text_bold_italic | PASS |
| verify_new_arrivals_header | PASS |
| verify_new_books_italic | PASS |
| verify_customer_reviews_header | PASS |
| verify_review_genre_underlined | PASS |
| verify_footer_contact_info | PASS |
| verify_why_choose_us_text | PASS |
| verify_header_slogan | PASS |
