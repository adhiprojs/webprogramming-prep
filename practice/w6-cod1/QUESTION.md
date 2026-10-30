# Highlight Toggle

Build a page with a paragraph and a button. Clicking the button toggles a yellow highlight on the paragraph only; the page starts with no highlight.

## Requirements

1. On load, `#textPara` has no background (computed `rgba(0, 0, 0, 0)` or `transparent`). *(no_background_on_load)*
2. Clicking `#highlightBtn` gives `#textPara` a computed background colour of `rgb(255, 255, 0)`. *(highlight_applied_on_click)*
3. Clicking `#highlightBtn` a second time removes the highlight (back to transparent). *(highlight_removed_on_second_click)*
4. `#highlightBtn` itself never gets the background `rgb(255, 255, 0)`. *(other_elements_not_affected)*
5. Clicking `#highlightBtn` 4 more times alternates the paragraph background: yellow (`rgb(255, 255, 0)`), transparent, yellow, transparent. *(button_toggle_multiple_times)*
6. Loading the page and clicking `#highlightBtn` immediately, before waiting for `#textPara`, logs no console errors. *(no_errors_on_early_click)*

## Watch out

- There is no `page_load` guard, but the test waits for `#textPara` to exist.
- Case 5 starts from the unhighlighted state, so keep the toggle state in sync with the real style.
- Case 6 fails on any console error, so the script must not touch elements that do not exist yet (put the script at the end of `body` or wait for `DOMContentLoaded`).
- The colour is compared as the computed value, so `yellow` or `#ffff00` both work.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
