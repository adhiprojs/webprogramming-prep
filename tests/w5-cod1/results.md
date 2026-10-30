# w5-cod1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w5-cod1/code` (original) and `... tests/w5-cod1/solution --test tests/w5-cod1/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  verify_header_exists
    PASS  verify_header_h1
    PASS  verify_article_exists
    PASS  verify_article_paragraph
    PASS  verify_ul_exists
    PASS  verify_multiple_li_elements
    PASS  verify_li_content
    PASS  verify_footer_exists
    PASS  verify_footer_contact_info
    PASS  verify_css_styling
    10/10 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    10/10 passed (puppeteer, node v14.21.3)
Run 2:
    10/10 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.
