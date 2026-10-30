# w5-pah1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w5-pah1/code` (original) and `... tests/w5-pah1/solution --test tests/w5-pah1/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  verify_testimonials_section_exists
    PASS  verify_multiple_testimonials
    PASS  verify_testimonial_structure
    PASS  verify_flexbox_layout
    PASS  verify_image_zoom
    PASS  verify_text_color_effect
    PASS  verify_horizontal_layout
    PASS  verify_vertical_layout
    PASS  verify_spacing
    PASS  verify_circular_images
    10/10 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    10/10 passed (puppeteer, node v14.21.3)
Run 2:
    10/10 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.
