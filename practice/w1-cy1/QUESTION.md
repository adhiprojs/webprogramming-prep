# The Reading Nook Bookstore Page

Build a bookstore page with a header (main heading and slogan), a mission section, a new arrivals section, a customer reviews section, a "why choose us" paragraph and a footer. Use bold, italic and underline formatting where the requirements say so.

## Requirements

1. The page title (`document.title`) is exactly `The Reading Nook - Your Favorite Bookstore`. *(verify_title)*
2. The first `h1` has the text exactly `Welcome to The Reading Nook`. *(verify_header_text)*
3. The first `h2` has the text exactly `Our Mission`. *(verify_mission_header)*
4. The first `p` placed directly after an `h2` contains the words `quality books` and `literature`, and the page contains at least one `b` and one `i` element for the emphasised words. *(verify_mission_text_bold_italic)*
5. The second `h3` on the page has the text exactly `New Arrivals` (the first `h3` is the slogan in the header). *(verify_new_arrivals_header)*
6. The first `p` placed directly after an `h3` contains `The Silent Sea`. *(verify_new_books_italic)*
7. The second `h2` has the text exactly `Customer Reviews`. *(verify_customer_reviews_header)*
8. The second `p` placed directly after an `h3` contains the word `mystery` inside a `span`. The `span` text is exactly `mystery` and it has an inline style `text-decoration: underline`. *(verify_review_genre_underlined)*
9. The first `p` inside `footer` includes `info@readingnook.com`, and the footer contains a `u` element (the underlined email). *(verify_footer_contact_info)*
10. The second `p` placed directly after an `h2` contains `wide selection` and `affordable prices`. *(verify_why_choose_us_text)*
11. Inside a `header` element, the first `h1` is exactly `Welcome to The Reading Nook` and the first `h3` is exactly `Where every book has a story`. *(verify_header_slogan)*

## Watch out

- Selectors like `h2 + p` and `h3 + p` need the `p` to be the immediate next sibling of the heading. Count them in document order: the 1st `h2 + p` is the mission, the 2nd is "why choose us"; the 2nd `h3 + p` holds the review.
- The slogan `h3` lives in the `header`, so `New Arrivals` is the second `h3` on the page. Mind that a `p` right after the slogan `h3` would become the first `h3 + p`.
- The underline on the review `span` must be an inline `style` attribute, not a CSS class, because the test reads `span.style.textDecoration`.
- Use `h1`, `h2`, `h3` in the exact order and numbers the test indexes; extra headings of the same level will shift the indexes.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
