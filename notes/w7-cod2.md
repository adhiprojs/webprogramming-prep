# w7-cod2: Movie genre poll

Concept: fieldset/legend, radio display, checkbox count, reset to defaults, for / while / do...while.

## 1. What the question asks
- At least 2 `<fieldset>` and 2 `<legend>`.
- 3 radios `name="ageGroup"` with values `teen`, `adult`, `senior`. `#ageDisplay` shows the chosen value.
- At least 5 checkboxes `input[type=checkbox].genre-checkbox`.
- `#pollSubmitBtn` writes the number of checked genres to `#genreCount` (the original page also fills `#genreResultList`).
- `#pollResetBtn` unchecks all genre boxes and sets `#genreCount` to 0 (the original page also clears the radios and display).
- Loop requirement (from the original code comments): `for` to count, `while` to find the radio, `do...while` to build the list. Test does not verify the loop type.

## 2. What each test case checks
| Case | Check |
|---|---|
| fieldset_and_legend_elements_exist | `fieldset` >= 2 and `legend` >= 2 |
| age_group_radio_buttons_exist | exactly 3 radios named `ageGroup`; values include `teen`, `adult`, `senior` |
| genre_checkboxes_exist | `.genre-checkbox` count >= 5 |
| selecting_age_group_updates_display | `radio.click()` on `adult`; `#ageDisplay` text includes `adult` |
| selected_genre_count_is_correct | first 4 boxes `.checked = true`, click `#pollSubmitBtn`, `#genreCount` is 4 |
| reset_clears_all_selections | click `#pollResetBtn`; `#genreCount` is 0 and no genre box is checked |

## 3. The original submission
Passes 6/6. Same structure as w7-cod1 plus a result list built with do...while and a reset handler. Reset sets checkboxes and radios to unchecked, display back to `None`, count to `0`, and list to a "None" item.

Fragile points:
- The test checks exactly 3 radios, but only `>= 5` checkboxes; do not add a fourth radio.
- Display must contain the lowercase value (`adult`).
- `genreCount.textContent = 0` works; do not put text like "0 selected" or `parseInt` returns NaN.
- A do...while that always runs once is wrong when nothing is selected, hence the `if (selectedGenres.length === 0)` guard.

## 4. Common mistakes
- Reset only clears the display text, not the actual `.checked` states.
- Reset sets the count to "None" or an empty string (the test needs a number 0).
- `name` on radios not shared.
- `value="Adult"` capitalised.
- Selecting checkboxes by ID only (the test uses the class).
- Missing `DOMContentLoaded`.

## 5. Approach in 5 steps
1. Two fieldsets (age, genres) and one results fieldset, each with a legend.
2. Radios: `name="ageGroup"`; checkboxes: `class="genre-checkbox"`; exact button and span IDs.
3. Radio `change` listener updates `#ageDisplay`.
4. Submit: for loop counts `.checked`, writes the count; do...while fills the list.
5. Reset: loop over boxes and radios setting `checked = false`; set display to `None` and count to `0`.
