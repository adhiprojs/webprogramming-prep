# Movie Poll

Build a poll form with fieldsets and legends: one for choosing an age group with radio buttons and one for picking favourite genres with checkboxes. Submit counts the selected genres and Reset clears everything.

## Requirements

1. The page has at least `2` `<fieldset>` elements and at least `2` `<legend>` elements. *(fieldset_and_legend_elements_exist)*
2. There are exactly `3` radio buttons `input[type="radio"][name="ageGroup"]` with the values `teen`, `adult` and `senior`. *(age_group_radio_buttons_exist)*
3. There are at least `5` checkboxes `input[type="checkbox"].genre-checkbox`. *(genre_checkboxes_exist)*
4. Clicking the radio with `value="adult"` makes the text of `#ageDisplay` (trimmed) include `adult`. *(selecting_age_group_updates_display)*
5. After the first `4` genre checkboxes are set to `checked` and `#pollSubmitBtn` is clicked, `#genreCount` reads `4`. *(selected_genre_count_is_correct)*
6. Clicking `#pollResetBtn` unchecks every `.genre-checkbox` and sets `#genreCount` to `0`. *(reset_clears_all_selections)*

## Watch out

- The test sets `.checked` directly with no events, so count checked boxes only when the submit button is clicked.
- The radio is activated with `click()`.
- `#genreCount` is parsed as an integer, so its text must be only the number.
- Reset must clear the checkboxes themselves, not just the count; the test waits `300`ms after each action.
- If the page fails to load, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
