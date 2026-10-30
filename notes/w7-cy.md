# w7-cy: Student quiz evaluation

Concept: grouped radios (quiz answers), score, grade, remark, reset; fieldset/legend.

## 1. What the question asks
- At least 3 `<fieldset>` and 3 `<legend>`.
- `#studentName` text input.
- Subject radios `name="subject"`, values `maths`, `science`, `english`; `#subjectDisplay` shows the chosen value.
- At least 3 checkboxes `input[type=checkbox].topic-checkbox` (the original page also lists chosen topics in `#topicList`).
- Three questions, radios named `q1`, `q2`, `q3`, each with values `a`, `b`, `c`. Correct answers: q1 = `a`, q2 = `b`, q3 = `c`.
- `#submitQuizBtn` computes `#quizScore`, `#quizGrade`, `#quizRemark`.
- `#resetQuizBtn` resets everything.
- Mapping: score 3 gives grade `A`, remark `Excellent`; score 0 gives grade `F`. Score 2 `B`/`Good` and score 1 `C`/`Needs Improvement` were picked freely (not tested).
- Loop requirement per the original code comments: `while` for the radio, `for` for the questions, `do...while` for the remark. Not verified by the test.

## 2. What each test case checks
| Case | Check |
|---|---|
| fieldset_and_legend_elements_exist | `fieldset` >= 3 and `legend` >= 3 |
| subject_radio_buttons_exist | exactly 3 radios `subject`; values maths, science, english |
| topic_checkboxes_exist | `.topic-checkbox` checkboxes >= 3 |
| student_name_input_exists | `#studentName` exists |
| selecting_subject_updates_display | `science` radio `.checked = true` + dispatch bubbling `change` event; `#subjectDisplay` includes `science` |
| all_correct_answers_gives_score_3 | q1=a, q2=b, q3=c set via `.checked` + `change`; click `#submitQuizBtn`; `#quizScore` is 3 |
| grade_is_correct_for_full_score | `#quizGrade` text is `A` |
| remark_is_correct_for_full_score | `#quizRemark` text is `Excellent` |
| wrong_answers_gives_score_0 | q1=b, q2=a, q3=a; submit; score 0 and grade `F` |
| reset_clears_all_fields | set `#studentName` value, click `#resetQuizBtn`; name `''`, score `'0'`, grade `'-'`, remark `'-'` |

## 3. The original submission
Passes 10/10. Subject radios use a `change` listener. Submit loops over `['q1','q2','q3']` and checks `input[name="q1"]:checked` against an answers object. Grade by if/else chain; remark by a do...while that always exits after one pass. Reset clears the name, all radios and checkboxes, and writes `0`, `-`, `-`.

Fragile points:
- The page must load with `networkidle2` and a `fieldset`, otherwise `page_load` fails and nothing else runs.
- Reset values are literal strings: score `0`, grade `-`, remark `-` (a plain hyphen).
- Quiz radios must share a name per question; otherwise answers from the "wrong" step stay checked next to the correct ones.
- Radios fire `change` through the test, so a `change` listener works, but clicking is not required.

## 4. Common mistakes
- Wrong correct-answer mapping or different `value` letters.
- Grade/remark text with other capitalisation (`Excellent` exact).
- Reset leaves score as empty string or `N/A`.
- Reset forgets the text input or the quiz radios.
- Only 2 fieldsets.
- Using `click` events when the test dispatches `change`.

## 5. Approach in 5 steps
1. Layout: fieldsets for subject, topics, result and each question (3+). Exact IDs and names.
2. Subject radio `change` writes `radio.value`.
3. Submit: loop the three questions, compare against `{q1:'a', q2:'b', q3:'c'}`, count score.
4. Map score to grade and remark (3 = A/Excellent, 0 = F).
5. Reset: clear name, uncheck all radios and checkboxes, write `0`, `-`, `-`, `None`.
