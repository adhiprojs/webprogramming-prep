# w2-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w2-cod2/code` (original) and `... tests/w2-cod2/solution --test tests/w2-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Starter had bugs (h3 instead of h2 in header, <body> inside table instead of <tbody>, unclosed <td>/<table>, unquoted id, unclosed <p>/<li>, unclosed table tag). The provided index.html is truncated at the gallery section (ends in a half-written comment), so aside and footer were missing.

## Original code/: 3/8 passed

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_section | FAIL |
| verify_about_the_hotel_section | PASS |
| verify_rooms_and_pricing_table | PASS |
| verify_hotel_services_section | FAIL |
| verify_gallery_section | FAIL |
| verify_customer_reviews_section | FAIL |
| verify_footer_section | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 8/8, run 2 = 8/8

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_section | PASS |
| verify_about_the_hotel_section | PASS |
| verify_rooms_and_pricing_table | PASS |
| verify_hotel_services_section | PASS |
| verify_gallery_section | PASS |
| verify_customer_reviews_section | PASS |
| verify_footer_section | PASS |
