# w5-cy results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w5-cy/code` (original) and `... tests/w5-cy/solution --test tests/w5-cy/code/puppeteer/test.js` (solution)
Node: v14.21.3 (puppeteer 19 via shared runtime, exam package.json versions)

Note: if a case named page_load appears, the test file only prints a line for it on failure, so the runner always shows FAIL ("did not report a result"). That is a runner artifact, not a real failure.

## Original (code/)
    PASS  verify_header_title
    PASS  verify_header_styling
    PASS  verify_about_section
    PASS  verify_speakers_list
    PASS  verify_speakers_list_styling
    PASS  verify_agenda_list
    PASS  verify_agenda_list_styling
    PASS  verify_sections_background_colors
    PASS  verify_flexbox_layout
    PASS  verify_external_css
    10/10 passed (puppeteer, node v14.21.3)

## Solution (solution/, only public/* edited), run twice
Run 1:
    10/10 passed (puppeteer, node v14.21.3)
Run 2:
    10/10 passed (puppeteer, node v14.21.3)
All other cases PASS in both runs.
