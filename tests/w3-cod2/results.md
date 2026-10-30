# w3-cod2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w3-cod2/code` (original) and `... tests/w3-cod2/solution --test tests/w3-cod2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

Starter bugs: <link rel="styles.css"> (no stylesheet/href), selector .loginForm vs class login-form, rgb(0,0,255,) invalid, alpha red, no id=submitButton, <username>/<password> not <label>, broken <script> tag, border-radius 50%, invalid cursor. The 6th case (h1 text-align) prints no TESTCASE line, so only 5 cases are graded.

## Original code/: 0/5 passed

| Case | Result |
|---|---|
| login_form_background_color_correct | FAIL |
| header_color_correct | FAIL |
| login_form_border_radius_correct | FAIL |
| submit_button_bg_color_correct | FAIL |
| submit_button_fontsize_color_correct | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 5/5, run 2 = 5/5

| Case | Result |
|---|---|
| login_form_background_color_correct | PASS |
| header_color_correct | PASS |
| login_form_border_radius_correct | PASS |
| submit_button_bg_color_correct | PASS |
| submit_button_fontsize_color_correct | PASS |
