# w3-pah2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w3-pah2/code` (original) and `... tests/w3-pah2/solution --test tests/w3-pah2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/10 passed

| Case | Result |
|---|---|
| header_element_is_present | FAIL |
| nav_with_links_is_present | FAIL |
| container_div_is_present | FAIL |
| all_menu_section_titles_are_present | FAIL |
| menu_items_are_present | FAIL |
| footer_element_is_present | FAIL |
| price_elements_are_present_in_menu_items | FAIL |
| h1_text_is_correct | FAIL |
| h2_text_is_correct | FAIL |
| atag_text_is_correct | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 10/10, run 2 = 10/10

| Case | Result |
|---|---|
| header_element_is_present | PASS |
| nav_with_links_is_present | PASS |
| container_div_is_present | PASS |
| all_menu_section_titles_are_present | PASS |
| menu_items_are_present | PASS |
| footer_element_is_present | PASS |
| price_elements_are_present_in_menu_items | PASS |
| h1_text_is_correct | PASS |
| h2_text_is_correct | PASS |
| atag_text_is_correct | PASS |
