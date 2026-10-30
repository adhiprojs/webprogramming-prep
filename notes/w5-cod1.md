# w5-cod1: Personal page with semantic HTML5

Concept: semantic elements (header/article/ul/footer) + external CSS padding/margin.

## 1. What the question asks
Static page `public/index.html` plus `public/styles.css` (linked as `styles.css`). No JS, no IDs or classes needed. The test only uses tag selectors:
- `header` containing an `h1` with text.
- `article` containing a `p` with text.
- a `ul` with at least 3 `li`, all non-empty.
- `footer` with some text (contact info).
- CSS padding and margin set (see test 10).

## 2. What each test case checks
All run with `document.querySelector` inside `page.evaluate`.

| Case | Check |
|---|---|
| verify_header_exists | `header` exists |
| verify_header_h1 | `header h1` exists, `innerText.length > 0` |
| verify_article_exists | `article` exists |
| verify_article_paragraph | `article p` exists with text |
| verify_ul_exists | `ul` exists |
| verify_multiple_li_elements | `ul li` count >= 3 |
| verify_li_content | every `ul li` has non-blank text |
| verify_footer_exists | `footer` exists |
| verify_footer_contact_info | `footer.innerText.length > 0` |
| verify_css_styling | header OR article OR footer `parseInt(padding) > 0` AND article OR footer `parseInt(margin) > 0` |

## 3. The original submission
Passes 10/10 (verified, run twice). Header, article and footer each have `padding: 20px`, and article and footer have `margin: 20px`.

Fragile points:
- `parseInt(computed.padding)` reads only the first number. `padding: 0 20px` gives 0 and fails. `margin: 0 auto` also gives 0.
- Do not set `margin` on `header` only; the test needs it on `article` or `footer`.
- The `h2` "My Hobbies" sits outside `article`. It is fine because the test only looks at `article p`.

## 4. Common mistakes
- Using `<div class="header">` instead of the real `<header>` tag.
- Putting the `<p>` outside `<article>`, or the `h1` outside `<header>`.
- Fewer than 3 `li`, or an empty `li`.
- Wrong CSS filename or link (`style.css` vs `styles.css`), so no styles load.
- Only setting padding, or margin on the wrong elements.

## 5. Approach in 5 steps
1. Check the file names: `public/index.html`, `styles.css`, and the `<link href>` matches.
2. Write `header>h1`, `article>h2+p`, `ul` with 3 to 5 real `li`, `footer` with text.
3. Give every element real text; empty text fails.
4. In CSS set `padding: 20px` on header, article, footer and `margin: 20px` on article and footer.
5. Reload and check in DevTools that computed padding and margin are non-zero.
