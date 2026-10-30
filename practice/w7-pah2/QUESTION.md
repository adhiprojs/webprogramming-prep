# Fitness Plan Calculator

Build a fitness plan form with fieldsets and legends: a fitness goal choice and a row of seven weekday checkboxes. Calculate shows the workout days, rest days and calories burned; Reset clears everything.

## Requirements

1. The page has at least `2` `<fieldset>` elements and at least `2` `<legend>` elements. *(fieldset_and_legend_elements_exist)*
2. There are exactly `3` radio buttons `input[type="radio"][name="fitnessGoal"]` with the values `weightloss`, `muscle` and `stamina`. *(fitness_goal_radio_buttons_exist)*
3. There are exactly `7` checkboxes `input[type="checkbox"].day-checkbox`. *(workout_day_checkboxes_exist)*
4. Setting the `muscle` radio to `checked` and dispatching a bubbling `change` event makes the text of `#goalDisplay` (trimmed) include `muscle`. *(selecting_fitness_goal_updates_display)*
5. After checking the first `4` day checkboxes (set `checked`, dispatch `change`) and clicking `#calcPlanBtn`, `#workoutDays` reads `4`. *(workout_days_count_is_correct)*
6. With `weightloss` selected and exactly `3` days checked (checked directly, no event on the checkboxes), clicking `#calcPlanBtn` makes `#caloriesBurned` read `1200` (so `weightloss` burns `400` per day). *(calories_burned_is_correct)*
7. `#restDays` equals `7` minus `#workoutDays`. *(rest_days_is_correct)*
8. Clicking `#resetPlanBtn` sets `#workoutDays`, `#caloriesBurned` and `#restDays` to `0` and unchecks every `.day-checkbox`. *(reset_clears_all_selections)*

## Watch out

- The radios are changed by setting `checked` and dispatching `change`, so listen for `change`, not `click`.
- In case 6 the day checkboxes are checked without any event, so count checked boxes at `#calcPlanBtn` click time.
- Only the `weightloss` rate is visible in the test (`3` days = `1200`); the other goals have no checked values, so their rates are up to you.
- After reset, `#restDays` must show `0` (not `7`), as the test expects `0`.
- The page is loaded with `networkidle2`, and the test waits `500`ms after actions. If `fieldset` is not found within 10 seconds, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
