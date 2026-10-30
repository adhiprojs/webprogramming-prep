# Text Editor Formatting Controls

Build a small text editor panel. A font-size dropdown, a font-colour dropdown, Bold and Italic toggle buttons and a Reset button control the formatting of the text in `#editor`.

## Requirements

1. `#editor` has a default computed font size of about `12px` (within 2px of 12). *(default_font_size_is_12px)*
2. Selecting `16px` in `#fontSizeSelect` makes the `#editor` computed font size about `16px` (within 2px). *(change_font_size_to_16px)*
3. Selecting `red` in `#fontColorSelect` gives `#editor` a computed colour (`rgb(...)`). *(change_font_color_to_red)*
4. Clicking the button whose text contains `Bold` adds the class `active` to that button. *(click_bold_applies_bold)*
5. Clicking the button whose text contains `Italic` adds the class `active` to that button. *(click_italic_applies_italic)*
6. Clicking Bold a second time removes its `active` class. *(bold_toggle_back_to_normal)*
7. Clicking Bold again (re-applying it) and then Italic leaves bold and italic usable together; the case passes when the earlier Bold and Italic clicks had each added the class `active` to their buttons. *(bold_and_italic_combination_works)*
8. Clicking `#resetBtn` sets `#fontSizeSelect` to `12px`, `#fontColorSelect` to `black`, and removes `active` from `#boldBtn` and `#italicBtn`. *(reset_button_sets_defaults)*
9. After reset, selecting `20px` and `blue`, then clicking `#boldBtn` and `#italicBtn`, leaves `#fontSizeSelect` at `20px`, `#fontColorSelect` at `blue`, and both buttons with class `active`. *(multiple_rapid_changes_work)*
10. Right after that, the same four controls still hold `20px`, `blue`, bold active and italic active. *(controls_retain_selected_values)*

## Watch out

- The option values must be exactly `12px`, `16px`, `20px` and `black`, `red`, `blue`.
- Bold and Italic are found by their visible text (`Bold`, `Italic`) and also need ids `boldBtn` and `italicBtn`.
- The `active` class is checked immediately after the click, so toggle it synchronously.
- The select values are set with `select()`, so listen for the `change` event.
- If `#editor` is missing, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
