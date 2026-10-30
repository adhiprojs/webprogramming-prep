# Student Quiz Grader

Build a quiz form using fieldsets and legends: a student name input, a subject choice, a topic list and three multiple-choice questions. Submitting the quiz scores it and shows a grade and remark; Reset clears everything.

## Requirements

1. The page has at least `3` `<fieldset>` elements and at least `3` `<legend>` elements. *(fieldset_and_legend_elements_exist)*
2. There are exactly `3` radio buttons `input[type="radio"][name="subject"]` with the values `maths`, `science` and `english`. *(subject_radio_buttons_exist)*
3. There are at least `3` checkboxes `input[type="checkbox"].topic-checkbox`. *(topic_checkboxes_exist)*
4. An element with id `studentName` exists. *(student_name_input_exists)*
5. Setting the `science` radio to `checked` and dispatching a bubbling `change` event makes the text of `#subjectDisplay` (trimmed) include `science`. *(selecting_subject_updates_display)*
6. Selecting radio `q1` = `a`, `q2` = `b` and `q3` = `c` (each via `checked` then `change`) and clicking `#submitQuizBtn` makes `#quizScore` read `3`. *(all_correct_answers_gives_score_3)*
7. With a score of `3`, `#quizGrade` reads exactly `A`. *(grade_is_correct_for_full_score)*
8. With a score of `3`, `#quizRemark` reads exactly `Excellent`. *(remark_is_correct_for_full_score)*
9. Selecting `q1` = `b`, `q2` = `a` and `q3` = `a` and clicking `#submitQuizBtn` makes `#quizScore` read `0` and `#quizGrade` read `F`. *(wrong_answers_gives_score_0)*
10. After typing a value into `#studentName` and clicking `#resetQuizBtn`, `#studentName` is empty, `#quizScore` reads `0`, and `#quizGrade` and `#quizRemark` both read `-`. *(reset_clears_all_fields)*

## Watch out

- The radios are changed by setting `checked` and dispatching `change`, not by clicking, so listen for `change`, not `click`.
- Text is compared after trim, and `#quizScore` is parsed as an integer.
- The answer radios for the questions use names `q1`, `q2`, `q3` with values `a`, `b`, `c`; grade only changes on `#submitQuizBtn` click.
- The page is loaded with `networkidle2`, and the test waits `500`ms after actions. An external CDN link that never settles or fails can cause a load failure.
- If `fieldset` is not found within 10 seconds, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
