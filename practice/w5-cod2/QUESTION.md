# Footer with Social Icons

Build a styled footer containing a row of social icons, a list of links and a copyright notice. The footer should have a dark background, light text, centred content and a hover transition on the icons.

## Requirements

1. The page has a `<footer>` element. *(verify_footer_exists)*
2. The page contains elements with classes `.social-media`, `.footer-links` and `.copyright`. *(verify_footer_content)*
3. There are at least `3` elements with class `.social-icon`. *(verify_social_icons)*
4. The first `.social-icon` has a non-empty computed `transition` value (set a `transition` in CSS). *(verify_icon_hover_effect)*
5. There are at least `2` links matching `.footer-links a`. *(verify_footer_links)*
6. Every `.footer-links a` has a non-empty `href` attribute, and there are at least `2` of them. *(verify_links_functional)*
7. The footer's computed background colour is not transparent (it must not be `rgba(0, 0, 0, 0)`), so give it a dark `background-color`. *(verify_dark_background)*
8. The footer's computed `color` is non-empty (use white text). *(verify_white_text)*
9. The footer has `text-align: center`. *(verify_content_centered)*
10. The `.copyright` element has non-empty text. *(verify_copyright_notice)*

## Watch out

- The transition is checked on the computed style of the first `.social-icon`, not the `:hover` rule, so put `transition` on the base selector.
- `text-align: center` must be set on (or inherited by) the `footer` itself.
- `.social-icon` elements and `.footer-links a` must be placed so the selectors match (links inside `.footer-links`).

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
