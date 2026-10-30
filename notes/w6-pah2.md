# w6-pah2: Text formatter (font size, colour, bold, italic, reset)

Concept: select `change` events, button toggle with an `active` class, reset restoring defaults.

## 1. What the question asks
Mini text editor:
- `<div id="editor" contenteditable="true">` with default font size 12px.
- `<select id="fontSizeSelect">` with option values `12px`, `16px`, `20px` (12px first/selected).
- `<select id="fontColorSelect">` with values `black`, `red`, `blue` (black first/selected).
- Buttons `#boldBtn` (visible text contains `Bold`), `#italicBtn` (text contains `Italic`), `#resetBtn`.
- Bold and Italic buttons toggle the class `active` on themselves and apply font-weight / font-style to the editor.
- Reset sets selects back to `12px` and `black`, removes `active` from both buttons, restores the editor style.

The original submission was the blank template; the notes describe the verified reference solution.

## 2. What each test case checks
| Case | Action | Expected |
|---|---|---|
| default_font_size_is_12px | read `#editor` font-size | within 2px of 12 |
| change_font_size_to_16px | `page.select('#fontSizeSelect','16px')` | editor font-size within 2px of 16 |
| change_font_color_to_red | select `red` in `#fontColorSelect` | computed colour string starts with `rgb` (weak, nearly always true) |
| click_bold_applies_bold | find button by XPath text `Bold`, click | button has class `active` |
| click_italic_applies_italic | find button with text `Italic`, click | button has class `active` |
| bold_toggle_back_to_normal | click bold again | button no longer has `active` |
| bold_and_italic_combination_works | click bold, click italic | uses old variables from earlier cases, so passes if cases 4 and 5 passed |
| reset_button_sets_defaults | click `#resetBtn` | fontSizeSelect value `12px`, fontColorSelect value `black`, no `active` on either button |
| multiple_rapid_changes_work | select `20px`, `blue`, click bold and italic | selects hold `20px`/`blue`; both buttons have `active` |
| controls_retain_selected_values | read same state | same expectations |

## 3. The reference solution
Passes all 10. `change` listeners set `editor.style.fontSize` / `editor.style.color`. Bold and italic: `classList.toggle('active')` and then set `fontWeight`/`fontStyle` to `bold`/`normal` and `italic`/`normal` by checking the class. Reset sets select `.value`, removes `active`, and resets the four inline styles.

Fragile points:
- The XPath `//button[contains(text(),'Bold')]` needs the text directly inside `<button>` (not inside a nested `<span>`).
- Option values must be exactly `12px` etc., since both `page.select` and the reset check use `.value`.
- The test checks the `active` **class**, not the style; do both.
- Reset must change the `<select>` values, not only the editor style.

## 4. Common mistakes
- Option values `12`, `16` instead of `12px`.
- Using `click` instead of `change` on `<select>`.
- Reset restores the editor but leaves the dropdowns on the old value.
- Toggling styles without the `active` class.
- Using `value="Black"` (capital) when the test expects `black`.
- `contenteditable` div replaced by a `textarea` with another ID.

## 5. Approach in 5 steps
1. Write the HTML with the six IDs; first option of each select is the default.
2. CSS: `#editor { font-size:12px; color:black; }` and `button.active { ... }`.
3. Two `change` listeners writing `style.fontSize` and `style.color`.
4. Bold and italic click handlers: toggle `active`, then set weight/style from `contains('active')`.
5. Reset: set both select values, remove `active` from both, clear the editor's styles to defaults.
