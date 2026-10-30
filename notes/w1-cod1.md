# w1-cod1: "My First Webpage" (plain HTML structure)

Puppeteer test, prints TESTCASE:<name>:success|failure. No JS, no CSS needed.

## 1. What the question asks
Build `public/index.html` from a blank starter. Exact text matters (compared with `===` on `innerText`):
- `<title>` = `My First Webpage`
- `<h1>` = `My First Webpage`
- `<h5>` = `Welcome to my first webpage! This is an introduction to HTML structure and elements.` (it is h5, not p)
- `<h2>` = `This webpage demonstrates the basic structure of an HTML document, including headings, paragraphs, and footers.` (h2 is the long sentence)
- first `<p>` = `HTML is the standard language used to create webpages and structure content on the web.`
- `<footer><p><i>2025 My First Webpage. All rights reserved.</i></p></footer>`

## 2. What each test checks
| Case | Check |
|---|---|
| verify_header_text | `querySelector('h1').innerText` |
| verify_description_text | first `h5` text |
| verify_subheader_text | first `h2` text |
| verify_footer_text_italic | `footer p` text exact AND it contains an `<i>` |
| verify_html_paragraph_text | `querySelectorAll('p')[0]` text (first p in the whole page) |
| verify_html_structure | html/head/body exist and `<title>` text = `My First Webpage` |

## 3. The original submission
Original dump was a blank template (0/6). Reference solution passes 6/6. Fragile spot: the footer `<p>` is also a `<p>`, so the HTML paragraph must come BEFORE the footer or p[0] is wrong.

## 4. Common mistakes
- Using p for the description and h5 for nothing (tag types are fixed by the test).
- Typing "(c)" or a symbol before 2025 in the footer.
- Putting the footer paragraph before the HTML paragraph.
- `<i>` missing (using CSS font-style instead fails; test looks for the tag).
- Trailing/double spaces or missing final full stop.

## 5. Approach
1. Read each expected string in the statement, copy it exactly.
2. Write the boilerplate: doctype, html, head (title), body.
3. Add h1, h5, h2, p in the order given.
4. Add `footer > p > i`.
5. Check tag types and order against the list above.
