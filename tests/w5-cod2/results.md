# w5-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w5-cod2/code` (original) and `... tests/w5-cod2/solution --test tests/w5-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  verify_footer_exists
    PASS  verify_footer_content
    PASS  verify_social_icons
    PASS  verify_icon_hover_effect
    PASS  verify_footer_links
    PASS  verify_links_functional
    PASS  verify_dark_background
    PASS  verify_white_text
    PASS  verify_content_centered
    PASS  verify_copyright_notice
    10/10 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    10/10 passed (puppeteer, node v14.21.3)
Run 2:
    10/10 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.
