# SkillUp Login Form Styling

The given page has bugs. Fix the login page and its stylesheet so that the form, the heading and the submit button get the required styles. The viewport used by the tests is 1200 by 800 pixels.

## Requirements

1. `.login-form` has the background colour `rgb(255, 255, 255)`. *(login_form_background_color_correct)*
2. The `h1` has the text colour `rgb(255, 0, 0)`. *(header_color_correct)*
3. `.login-form` has a border radius of `5px`. *(login_form_border_radius_correct)*
4. The element with the id `submitButton` has the background colour `rgb(0, 0, 255)`. *(submit_button_bg_color_correct)*
5. `#submitButton` has a font size of `16px`. *(submit_button_fontsize_color_correct)*
6. The `h1` has `text-align: center`. *(header_color_correct)*

## Watch out

- The editable stylesheet is `styles.css` (with an s), not `style.css`; make sure the HTML links to the right file name.
- The tests read computed styles, so the class `login-form` and the id `submitButton` must be spelled and cased exactly, and no later rule may override your values.
- Colours must compute to the `rgb(...)` forms above, and sizes to exactly `5px` and `16px`.
- Requirements 2 and 6 share the case name `header_color_correct` in the output, so check both the heading colour and its alignment.

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
