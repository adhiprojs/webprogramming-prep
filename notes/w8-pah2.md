# w8-pah2: Text formatter (same task as w6-pah2)

Full explanation in `notes/w6-pah2.md`. The original dump for this test was the blank template (nothing submitted); the verified reference passes all cases.

## 1. What the question asks
Same: `div#editor[contenteditable]` (12px default), `select#fontSizeSelect` (`12px`/`16px`/`20px`), `select#fontColorSelect` (`black`/`red`/`blue`), buttons `#boldBtn` ("Bold"), `#italicBtn` ("Italic"), `#resetBtn`. Bold/Italic toggle an `active` class on themselves.

## 2. What each test case checks
Same 10 cases as w6-pah2:
- default_font_size_is_12px: editor font-size within 2px of 12.
- change_font_size_to_16px: `page.select('#fontSizeSelect','16px')`; font-size within 2px of 16.
- change_font_color_to_red: computed colour starts with `rgb` (weak check).
- click_bold_applies_bold: button found by text `Bold`, click, has class `active`.
- click_italic_applies_italic: button with text `Italic` gets `active`.
- bold_toggle_back_to_normal: click Bold again, `active` removed.
- bold_and_italic_combination_works: re-click Bold, click Italic; reuses earlier variables so it passes if the two earlier clicks passed.
- reset_button_sets_defaults: `#resetBtn`; size select `12px`, colour select `black`, no `active` on either button.
- multiple_rapid_changes_work: select `20px`, `blue`, click bold and italic; selects hold those values and both buttons are `active`.
- controls_retain_selected_values: same state read again.

## 3. The original submission
No submission to review (blank template). The reference uses `change` listeners that write `editor.style.fontSize` / `editor.style.color`, `classList.toggle('active')` plus `fontWeight`/`fontStyle` on Bold/Italic, and a Reset that resets both selects, removes `active` from both buttons, and restores the four inline styles. It passes all cases.

## 4. Common mistakes
- Option values `12` instead of `12px`; `Black` instead of `black`.
- Reset restores the editor but not the dropdown `.value`.
- Bold/Italic change style but never toggle the `active` class.
- Button text hidden inside a child element (breaks the XPath `contains(text(),'Bold')`).
- `click` listener on a `<select>` instead of `change`.

## 5. Approach in 5 steps
1. HTML with the six exact IDs; first option of each select is the default.
2. CSS defaults on `#editor` (12px, black, normal) and `button.active`.
3. Two `change` listeners for size and colour.
4. Bold and Italic: toggle `active`, then set weight/style from the class.
5. Reset: set both `<select>` values, remove `active`, reset the four inline styles.
