# Attendance Tracker

Build an attendance form made of fieldsets: one to choose a class section with radio buttons, and one with a list of student checkboxes. A submit button counts how many students are present and absent.

## Requirements

1. The page has at least `2` `<fieldset>` elements. *(fieldset_and_legend_elements_exist)*
2. There are exactly `3` radio buttons `input[type="radio"][name="section"]` with the values `A`, `B` and `C`. *(section_radio_buttons_exist)*
3. There are at least `5` checkboxes `input[type="checkbox"].student-checkbox`. *(student_checkboxes_exist)*
4. Clicking the radio with `value="A"` makes the text of `#sectionDisplay` (trimmed) include `A`. *(selecting_section_radio_updates_display)*
5. After the first `3` student checkboxes are set to `checked` and `#submitBtn` is clicked, `#presentCount` reads `3`. *(present_count_matches_checked_students)*
6. `#absentCount` then reads the total number of `.student-checkbox` checkboxes minus `3`. *(absent_count_is_correct)*

## Watch out

- The test sets `.checked` directly without firing events on the checkboxes, so only read their state when `#submitBtn` is clicked.
- The radio is activated with `click()`, so a `change` or `click` listener works.
- The counts are parsed as integers from the text content, so put only the number in `#presentCount` and `#absentCount`.
- The test waits `300`ms after each action.
- If the page fails to load, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
