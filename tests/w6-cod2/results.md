# w6-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w6-cod2/code` (original) and `... tests/w6-cod2/solution --test tests/w6-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  name_field_blank_error
    PASS  invalid_email_format_error
    PASS  age_less_than_18_error
    PASS  valid_submission_success_message
    PASS  invalid_email_domain_error
    PASS  valid_form_submission_with_data
    6/6 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    6/6 passed (puppeteer, node v14.21.3)
Run 2:
    6/6 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.

> **Update:** the shared runner was fixed after this report. `page_load` only prints on failure, so it is no longer listed as FAIL on a passing page; the solution now reports all real cases passing with no `page_load` line.
