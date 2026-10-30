# w7-cod1: Student attendance tracker

Concept: fieldset/legend, radio `change`, counting checked checkboxes, for / while / do...while.

## 1. What the question asks
- At least 2 `<fieldset>` (each with a `<legend>`).
- 3 radios `input[type=radio][name="section"]` with values `A`, `B`, `C`. `#sectionDisplay` shows the chosen value.
- At least 5 checkboxes `input[type=checkbox].student-checkbox`.
- `#submitBtn`: counts checked boxes into `#presentCount` and unchecked into `#absentCount` (`#attendancePercent` is also shown in the original page).
- Loop requirement (stated in the original brief, as the original code comments show): `for` to count present, `while` to find the selected radio, `do...while` to count absent. The test file does not check loop type, but the exam may be marked on it.
- The original page also had a hidden `#sectionSelect` select with class `d-none`; the test never reads it.

## 2. What each test case checks
| Case | Check |
|---|---|
| fieldset_and_legend_elements_exist | `fieldset` count >= 2 (legends are not counted in this version) |
| section_radio_buttons_exist | exactly 3 radios named `section`, values include A, B, C |
| student_checkboxes_exist | `.student-checkbox` checkboxes >= 5 |
| selecting_section_radio_updates_display | `radio.click()` on value A, wait 300ms, `#sectionDisplay` text includes `A` |
| present_count_matches_checked_students | check first 3 boxes (`checked = true`, no event), click `#submitBtn`, `#presentCount` is 3 |
| absent_count_is_correct | `#absentCount` equals total checkboxes - 3 |

## 3. The original submission
Passes 6/6. Radios use `change` listeners; the submit click handler loops over checkboxes (for), looks up the selected radio via a while loop, and counts absent via a do...while.

Fragile points:
- The test sets `.checked = true` with no event, so you must read `.checked` at submit time, not rely on `change` listeners on checkboxes.
- `#sectionDisplay` must contain the raw value `A`, so "Section A" also passes, but `a` lowercase does not.
- Counts are read with `parseInt(textContent)`, so write plain numbers (no "3 students").
- If you hard-code total = 6, the absent test breaks when the number of checkboxes changes; use `checkboxes.length`.

## 4. Common mistakes
- Wrong class (`student-checkbox` vs `studentCheckbox`) or missing `name="section"`.
- Radios with different `name`s, so more than one can be checked.
- Using `value="a"` lowercase.
- Updating the display on `click` of the label only.
- Putting the script before the DOM without `DOMContentLoaded`.
- Using `forEach` where the task requires a specific loop type.

## 5. Approach in 5 steps
1. Build 2 fieldsets+legends, 3 radios, 6 checkboxes with the exact class, button `#submitBtn`, and the result divs.
2. In `DOMContentLoaded`, select radios and checkboxes with the same selectors the test uses.
3. Radio `change` listener writes `radio.value` to `#sectionDisplay`.
4. Submit handler: for loop counts checked; do...while counts unchecked; write both with `textContent`.
5. Add a while loop to read the selected radio if the brief demands one; click through manually.
