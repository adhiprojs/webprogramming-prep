# w3-cod2: SkillUp login form (CSS values, styles.css)

## 1. What the question asks
Style a login page. Note the CSS file is `public/styles.css` (with s). Required hooks: container `.login-form`, `h1`, button `#submitButton` (type submit).
- `.login-form` background `rgb(255, 255, 255)`, border-radius `5px`
- `h1` color `rgb(255, 0, 0)`, text-align `center`
- `#submitButton` background `rgb(0, 0, 255)`, font-size `16px`

## 2. Tests (6 runs, 5 distinct names)
login_form_background_color_correct, header_color_correct (h1 color red), login_form_border_radius_correct (computed `5px`), submit_button_bg_color_correct, submit_button_fontsize_color_correct (font-size `16px`). The sixth run (h1 text-align `center`) also prints the name `header_color_correct`, so that name is printed twice; both must pass. Viewport is set to 1200x800.

## 3. The original submission
Original blank (0/5 names); reference 5/5. Reference HTML has `div.login-form` > h1 + form (labels, inputs, `button#submitButton`) and links `styles.css`. Extra items (Error span hidden) are not tested.

## 4. Common mistakes
- Linking `style.css` when the file is `styles.css`.
- Button id typed `submitbutton` (case matters: `submitButton`).
- Button font-size missing: browser default for buttons is 13.33px, so set 16px explicitly.
- border-radius set on the form tag, not `.login-form`.
- Colour given as `red` is fine (computes to rgb(255, 0, 0)); keywords like `blue` also OK.

## 5. Approach
1. HTML: `.login-form` wraps h1 and form; button `id="submitButton"`.
2. Link the exact stylesheet name.
3. Add the six property rules.
4. Open the page, inspect computed values.
5. Check ID case and the duplicate-name text-align test.
