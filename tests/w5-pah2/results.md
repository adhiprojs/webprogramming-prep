# w5-pah2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w5-pah2/code` (original) and `... tests/w5-pah2/solution --test tests/w5-pah2/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  verify_gallery_section_exists
    PASS  verify_product_divs
    PASS  verify_product_images
    PASS  verify_images_responsive
    PASS  verify_product_descriptions
    PASS  verify_flexbox_layout
    PASS  verify_flex_wrap
    PASS  verify_padding_margin
    PASS  verify_two_column_layout
    PASS  verify_single_column_layout
    10/10 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    10/10 passed (puppeteer, node v14.21.3)
Run 2:
    10/10 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.
