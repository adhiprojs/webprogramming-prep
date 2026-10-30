# w1-cod2: StreamFlix landing page (b, u, span, footer)

## 1. What the question asks
Plain HTML page in `public/index.html`. Exact values:
- `<title>` = `StreamFlix - Watch Movies Online`
- first `<h1>` = `Welcome to StreamFlix`
- FIRST `<p>` in the page contains text `movies` and `TV Shows`, with `<b>` around movies and `<u>` around TV Shows (both inside that p)
- four `<span>` elements with text `Action`, `Comedy`, `Drama`, `Thriller` (a section titled "Top Picks for You")
- `<footer><p>` contains `info@streamflix.com` inside a `<u>`

## 2. Tests
| Case | Check |
|---|---|
| verify_title | `document.title` exact |
| verify_header_text | `h1` innerText exact |
| verify_paragraph_formatting | first `p` includes both words; a `b` and a `u` exist somewhere |
| verify_genre_list | spans' innerText include the 4 genres |
| verify_footer_contact_info | `footer p` includes the email AND `footer u` exists |
| verify_html_structure | body, footer, b, u exist; first `p`'s innerHTML contains `<b>` and `<u>` |

## 3. The original submission
Original was blank (0/6); reference solution passes 6/6. Fragile: the first `p` must be the formatted one. If you put an intro `<p>` earlier, tests 3 and 6 fail. Using `<strong>` instead of `<b>` fails (selector is `b`).

## 4. Common mistakes
- `<strong>`/`<em>` instead of `<b>`/`<u>`.
- Formatted text in a later paragraph, not the first.
- Genres in a list or div instead of `<span>`.
- Email not wrapped in `<u>`, or `<u>` outside the footer.

## 5. Approach
1. Title + h1 exact.
2. First p: text with `<b>movies</b>` and `<u>TV Shows</u>`.
3. Heading "Our Top Picks for You" then four spans.
4. `<footer><p>Contact us at <u>email</u></p></footer>`.
5. Re-check first-p rule and tag names.
