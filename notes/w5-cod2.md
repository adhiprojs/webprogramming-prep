# w5-cod2: Website footer with social icons

Concept: footer layout with flexbox, transitions on hover, computed-style checks.

## 1. What the question asks
Static page with a `<footer>` containing:
- `.social-media` div holding at least 3 anchors with class `social-icon` (extra class per site: facebook, twitter...). Each has an `<img>`.
- `.footer-links` div with at least 2 `<a>` that have non-empty `href`.
- `.copyright` element with text.

CSS on the footer: dark background, white text, centered text, and a `transition` on `.social-icon`. File: `public/styles.css`.

## 2. What each test case checks
| Case | Check |
|---|---|
| verify_footer_exists | `footer` exists |
| verify_footer_content | `.social-media`, `.footer-links`, `.copyright` all exist |
| verify_social_icons | `.social-icon` count >= 3 |
| verify_icon_hover_effect | first `.social-icon` computed `transition !== ''` |
| verify_footer_links | `.footer-links a` count >= 2 |
| verify_links_functional | every `.footer-links a` has an href; count >= 2 |
| verify_dark_background | footer background-color is not transparent |
| verify_white_text | footer computed `color !== ''` |
| verify_content_centered | footer computed `text-align === 'center'` |
| verify_copyright_notice | `.copyright` exists, has text |

## 3. The original submission
Passes 10/10. Footer is a flex column with `text-align: center`, `background-color: #1a1a2e`, `color: #fff`. `.social-icon` has `transition: ... 0.3s ease`. Images (`facebook.png` etc.) do not exist; that does not matter for these tests.

Fragile points:
- The transition and white-text tests are weak: `transition` computed is never `''` (default is `all 0s ease 0s`), and `color` is never empty. They pass regardless, but still write the real CSS.
- `text-align: center` must be on the footer itself, not only on children.
- `.social-icon` must be the class on the first matched element, since only the first is tested.

## 4. Common mistakes
- Class names off by one (`.social-icons`, `.footerLinks`, `.copy-right`).
- Fewer than 3 social icons or 2 links.
- `<a>` without `href`, or `href=""`.
- `background: transparent` or no background on `footer` (put it on a child `div` instead).
- `text-align: center` set on `body` only: computed value on footer inherits as center, so this is fine, but flexbox `align-items` alone is not text-align.

## 5. Approach in 5 steps
1. Footer skeleton with the three exact class names.
2. Four `a.social-icon` (with `img`), two `a` in `.footer-links` with real hrefs, `p.copyright` with text.
3. Footer CSS: dark `background-color`, `color: #fff`, `text-align: center`, flex column.
4. `.social-icon { transition: transform 0.3s ease; }` plus a `:hover` rule.
5. Check names against the list above.
