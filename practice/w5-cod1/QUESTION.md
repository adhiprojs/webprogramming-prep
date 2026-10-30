# Personal Page with Semantic HTML5

Build a personal page using semantic HTML5 elements: a header with a title, an article with a paragraph, a list of hobbies, and a footer with contact information. Style it with an external stylesheet.

## Requirements

1. The page has a `<header>` element. *(verify_header_exists)*
2. The header contains an `<h1>` with non-empty text. *(verify_header_h1)*
3. The page has an `<article>` element. *(verify_article_exists)*
4. The article contains a `<p>` with non-empty text. *(verify_article_paragraph)*
5. The page has a `<ul>` element. *(verify_ul_exists)*
6. The `<ul>` has at least `3` `<li>` items. *(verify_multiple_li_elements)*
7. Every `ul li` has non-empty text after trimming. *(verify_li_content)*
8. The page has a `<footer>` element. *(verify_footer_exists)*
9. The footer has non-empty text (the contact information). *(verify_footer_contact_info)*
10. In the stylesheet, at least one of `header`, `article`, `footer` has a computed `padding` greater than `0`, AND `article` or `footer` has a computed `margin` greater than `0` (read as an integer, so use px values on the shorthand). *(verify_css_styling)*

## Watch out

- Selectors are plain tag names (`header h1`, `article p`, `ul li`, `footer`), so use exactly those nesting structures.
- Padding and margin are read with `parseInt` of the shorthand, so set the same value on all sides (e.g. `padding: 10px`).
- Both padding and margin conditions must hold at once.

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
