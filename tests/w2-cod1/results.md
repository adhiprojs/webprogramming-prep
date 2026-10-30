# w2-cod1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w2-cod1/code` (original) and `... tests/w2-cod1/solution --test tests/w2-cod1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Blank template. Note: images are broken links, so width="300" alone gave img.width != 300; the solution also sets img { width: 300px } in style.css.

## Original code/: 3/6 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_main_heading | FAIL |
| verify_number_of_destinations | FAIL |
| verify_each_destination_has_name_description_and_image | PASS |
| verify_images_have_alt_text | PASS |
| verify_image_width | PASS |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 6/6, run 2 = 6/6

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_main_heading | PASS |
| verify_number_of_destinations | PASS |
| verify_each_destination_has_name_description_and_image | PASS |
| verify_images_have_alt_text | PASS |
| verify_image_width | PASS |
