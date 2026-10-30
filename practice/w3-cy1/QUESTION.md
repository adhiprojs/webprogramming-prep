# Page Colours and Headings

Build a CSS introduction page with a navbar, a card and a footer, and give each part the required background and text colours. The page also has a main heading, a subheading, an `h2` and an `h3`.

## Requirements

1. The `body` has the background colour `rgb(52, 73, 94)`. *(verify_body_background_color)*
2. The element with the class `navbar` has the background colour `rgb(44, 62, 80)`. *(verify_navbar_background_color)*
3. The element with the class `card` has the background colour `rgb(255, 255, 255)`. *(verify_card_background_color)*
4. The element with the class `footer` has the background colour `rgb(44, 62, 80)`. *(verify_footer_background_color)*
5. The element with the class `heading` has the text colour `rgb(192, 57, 43)`. *(verify_main_heading_text_color)*
6. The element with the class `subheading` has the text colour `rgb(41, 128, 185)`. *(verify_subheading_text_color)*
7. The first `h2` has the text exactly `Introduction to CSS`. *(h2_text_is_correct)*
8. The first `h3` has the text exactly `CSS Syntax`. *(h3_text_is_correct)*

## Watch out

- The tests read computed styles, so the colours must compute to the exact `rgb(...)` values above; the class names are `navbar`, `card`, `footer`, `heading` and `subheading`.
- The `h2` and `h3` are found by tag name (first on the page), so put the right headings first. Their text is compared after trimming.
- Class names are used for selection, not tag names, so `.footer` must be a class even if you use a `footer` element.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
