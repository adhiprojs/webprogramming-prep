# w1-cy1: The Reading Nook (index-based selectors)

## 1. What the question asks
Plain HTML page. Test uses positional selectors, so ORDER of headings/paragraphs matters.
Exact values:
- title `The Reading Nook - Your Favorite Bookstore`
- `header` contains `h1` = `Welcome to The Reading Nook` and `h3` = `Where every book has a story`
- h2 #1 = `Our Mission`, followed immediately by a p containing `quality books` and `literature` (use `<b>` and `<i>`)
- h3 #2 (in page order) = `New Arrivals`; the p right after it contains `The Silent Sea`
- h2 #2 = `Customer Reviews`
- the second `h3 + p` contains a `<span style="text-decoration: underline">mystery</span>`
- a third h2 (e.g. "Why Choose Us") directly followed by a p containing `wide selection` and `affordable prices` (the second `h2 + p` match)
- `footer p` contains `info@readingnook.com`, with a `footer u`

## 2. Tests (11)
| Case | Check |
|---|---|
| verify_title | document.title |
| verify_header_text | `h1[0]` |
| verify_mission_header | `h2[0]` = Our Mission |
| verify_mission_text_bold_italic | `h2 + p` [0] text includes the two phrases |
| verify_new_arrivals_header | `h3[1]` = New Arrivals (h3[0] is the header slogan) |
| verify_new_books_italic | `h3 + p` [0] includes The Silent Sea |
| verify_customer_reviews_header | `h2[1]` |
| verify_review_genre_underlined | `h3 + p` [1] has a `span` with text `mystery` and INLINE style underline (`span.style.textDecoration`) |
| verify_footer_contact_info | `footer p` text + footer u |
| verify_why_choose_us_text | `h2 + p` [1] includes `wide selection` and `affordable prices` |
| verify_header_slogan | `header h1` and `header h3` texts |

## 3. The original submission
Original blank (0/11); reference solution 11/11. Layout that works: header(h1,h3), h2 Mission + p, h3 New Arrivals + p, h2 Customer Reviews, h3 review heading + p with span, h2 Why Choose Us + p, footer. `h2 + p` skips "Customer Reviews" because an h3 follows it directly, so the "Why Choose Us" p is index 1. The header h3 has no sibling p, so it does not count in `h3 + p`. The bold/italic/footer-u checks are weak (`undefined !== null` is true), but still write the tags.

## 4. Common mistakes
- Underline via CSS file or `<u>`: the test needs INLINE `style="text-decoration: underline"` on the span.
- Putting a p directly after the "Customer Reviews" h2 (breaks `h2 + p` index 1).
- Wrong h3 count/order: the slogan h3 must be the first h3.
- Not wrapping the slogan inside `<header>`.

## 5. Approach
1. Write the header block with h1 + h3.
2. Draw the h2/h3/p order the test indexes imply.
3. Add the inline-style span for mystery.
4. Footer with `<u>` email.
5. Walk each `[n]` in the test and count manually.
