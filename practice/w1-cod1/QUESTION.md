# My First Webpage

Build a simple introductory HTML page. It has a main heading, a short welcome description, a subheading, a paragraph explaining HTML, and a footer whose text is in italics. The page must be a complete HTML document with a proper title.

## Requirements

1. The page has an `h1` whose text is exactly `My First Webpage`. *(verify_header_text)*
2. The page has an `h5` whose text is exactly `Welcome to my first webpage! This is an introduction to HTML structure and elements.` *(verify_description_text)*
3. The page has an `h2` whose text is exactly `This webpage demonstrates the basic structure of an HTML document, including headings, paragraphs, and footers.` *(verify_subheader_text)*
4. The page has a `footer` containing a `p`. The text of that `p` is exactly `2025 My First Webpage. All rights reserved.` and it contains an `i` element (so the text is italic). *(verify_footer_text_italic)*
5. The first `p` on the page has the text exactly `HTML is the standard language used to create webpages and structure content on the web.` *(verify_html_paragraph_text)*
6. The document has `html`, `head` and `body` elements, and a `title` whose text is exactly `My First Webpage`. *(verify_html_structure)*

## Watch out

- The test reads the first `p` on the page (`querySelectorAll('p')[0]`), so the HTML paragraph must come before the footer `p`, and no other `p` may precede it.
- Texts are compared with exact equality using `innerText`, so keep the punctuation and case, and avoid extra words or symbols such as a copyright sign in the footer.
- The description must be an `h5` and the subheading an `h2`; the test uses the first element of each tag.
- The `i` must be inside the footer `p`, not wrapped around it.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
