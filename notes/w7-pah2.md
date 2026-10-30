# w7-pah2: Fitness activity planner

Concept: radio-driven calories per day, count of checked days, rest days = 7 - days, reset.

## 1. What the question asks
- At least 2 `<fieldset>` and 2 `<legend>`.
- 3 radios `name="fitnessGoal"`, values `weightloss`, `muscle`, `stamina`. `#goalDisplay` shows the chosen value.
- Exactly 7 checkboxes `input[type=checkbox].day-checkbox` (one per weekday).
- `#calcPlanBtn` fills `#workoutDays` (checked days), `#caloriesBurned` and `#restDays` (7 - workout days).
- Calories per day: `weightloss` 400 (the test fixes this: 3 days gives 1200). The original used: muscle 300, stamina 350, stored as `data-calories` on the radios.
- `#resetPlanBtn` unchecks everything and sets all three counters to 0.
- Loop notes in the original code: while (find radio), for (count days), do...while (accumulate calories). Not tested.

## 2. What each test case checks
| Case | Check |
|---|---|
| fieldset_and_legend_elements_exist | `fieldset` >= 2 and `legend` >= 2 |
| fitness_goal_radio_buttons_exist | exactly 3 `fitnessGoal` radios with the three values |
| workout_day_checkboxes_exist | exactly 7 `.day-checkbox` (`=== 7`, not `>=`) |
| selecting_fitness_goal_updates_display | `muscle` checked + `change`; `#goalDisplay` includes `muscle` |
| workout_days_count_is_correct | first 4 days checked; click `#calcPlanBtn`; `#workoutDays` is 4 |
| calories_burned_is_correct | unchecks all, picks `weightloss`, checks 3 days, calculate; `#caloriesBurned` is 1200 |
| rest_days_is_correct | `#restDays` equals 7 - `#workoutDays` |
| reset_clears_all_selections | click `#resetPlanBtn`; workoutDays 0, calories 0, restDays 0 (zero, not 7), none checked |

## 3. The original submission
Passes 8/8. Counts checked days with a for loop; finds the radio with a while loop; accumulates calories with a do...while; `restDays = 7 - workoutDays`. Reset writes `0` into all three counters.

Fragile points:
- After reset, the test wants `#restDays` to be `0`, not `7`. That is odd but required.
- The do...while runs once even when 0 days are selected, which would add one day of calories. The test does not check this case; guard with `if (workoutDays > 0)` or use `calories = perDay * days`.
- If no radio is selected at calculate time, calories must still be a number (0).
- Exactly 7 checkboxes: an extra one fails.

## 4. Common mistakes
- 6 or 8 checkboxes.
- Calories per day not 400 for weightloss.
- Reset sets rest days to 7.
- Radio values with other spelling (`weight-loss`, `muscleGain`).
- Showing text like `1200 cal` in `#caloriesBurned`.
- Not reading the radio at click time (stale value).

## 5. Approach in 5 steps
1. HTML: goal fieldset (3 radios with `data-calories`), days fieldset (7 checkboxes), buttons, 3 summary divs.
2. Radio `change` writes the value to `#goalDisplay`.
3. Calculate: count checked days with a loop; read the selected radio's calories (0 if none).
4. caloriesBurned = days * perDay; restDays = 7 - days; write plain numbers.
5. Reset: uncheck all, set the three counters to `0`, display to `None`.
