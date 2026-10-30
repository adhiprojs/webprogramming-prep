# StreamFlix Landing Page

The given page has bugs. Fix it so that the StreamFlix landing page has the correct title, a main heading, an introductory paragraph with bold and underlined words, a list of genre labels, and a footer with contact information. Check the tags for wrong levels, broken nesting and a misplaced or duplicate footer.

## Requirements

1. The page title (`document.title`) is exactly `StreamFlix - Watch Movies Online`. *(verify_title)*
2. The page has an `h1` whose text is exactly `Welcome to StreamFlix`. *(verify_header_text)*
3. The first `p` on the page contains the words `movies` and `TV Shows`. The page has a `b` element (for `movies` in bold) and a `u` element (for `TV Shows` underlined). *(verify_paragraph_formatting)*
4. Under "Top Picks for You", the genres are `span` elements with the texts `Action`, `Comedy`, `Drama` and `Thriller`. *(verify_genre_list)*
5. The page has a `footer` containing a `p`. The text of that `p` includes `info@streamflix.com`, and the email is wrapped in a `u` element inside the footer. *(verify_footer_contact_info)*
6. The page has a `body` and a `footer`, and the first `p` contains both a `b` and a `u` in its HTML (correctly nested inside the paragraph). *(verify_html_structure)*

## Watch out

- The `b` and `u` must be inside the first `p`, and the test looks for the literal strings `<b>` and `<u>` in its HTML, so do not add attributes to those tags.
- `footer u` must exist as well, so the underlined email in the footer is a separate `u`.
- Only one footer should exist, and it must be placed properly in the `body`.
- Genre names are compared exactly with `innerText` of `span`, so no extra characters inside the spans.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
