# w3-cy1: CSS Basics page (class selectors and colours)

## 1. What the question asks
Page with these classes and colours (computed rgb):
- `body` background `rgb(52, 73, 94)` (#34495e)
- `.navbar` background `rgb(44, 62, 80)` (#2c3e50)
- `.card` background `rgb(255, 255, 255)`
- `.footer` background `rgb(44, 62, 80)`
- `.heading` color `rgb(192, 57, 43)` (#c0392b); it is an `h2` with text `Introduction to CSS`
- `.subheading` color `rgb(41, 128, 185)` (#2980b9); it is an `h3` with text `CSS Syntax`

## 2. Tests (8)
verify_body_background_color, verify_navbar_background_color, verify_card_background_color, verify_footer_background_color, verify_main_heading_text_color, verify_subheading_text_color, h2_text_is_correct (first `h2` textContent trimmed), h3_text_is_correct (first `h3`).

## 3. The original submission
Original blank (0/8); reference 8/8. Class `.footer` is on a div, not the `footer` tag (test queries `.footer`). Because the first h2/h3 are tested, nothing else in a nav or earlier should be h2/h3.

## 4. Common mistakes
- Only styling the `footer` tag instead of class `.footer`.
- Heading classes on the wrong element or text typos.
- Hex mistakes; convert carefully (#34495e = 52,73,94).
- Not linking `style.css`.
- Putting another h2/h3 before the tested ones.

## 5. Approach
1. Markup: nav.navbar, div.card (h2.heading, h3.subheading, p), div.footer.
2. Link `style.css`.
3. One rule per class with the hex colours.
4. Body background rule.
5. Verify exact h2/h3 text.
