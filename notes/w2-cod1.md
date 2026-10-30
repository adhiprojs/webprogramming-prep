# w2-cod1: Top Tourist Destinations (ol, nested ul, images)

## 1. What the question asks
Plain HTML + CSS. Exact values:
- title and `h1` = `Top Tourist Destinations`
- an ordered list `ol` with exactly 5 direct `li` children
- each of those `li` contains: an `h2` (name), a `ul > li` (description), and an `img` with `src` and non-empty `alt`
- every `img` must have rendered `width === 300`

## 2. Tests (6)
| Case | Check |
|---|---|
| verify_title | document.title |
| verify_main_heading | h1 text |
| verify_number_of_destinations | `ol > li` count === 5 (nested ul li is not counted since selector is `ol > li`) |
| verify_each_destination_has_name_description_and_image | every `ol > li` has h2, `ul > li`, img with alt and src |
| verify_images_have_alt_text | all img alt non-empty |
| verify_image_width | `img.width === 300` for all |

## 3. The original submission
Original blank template (3/6; the three image/every() tests passed only because there were no items). Reference passes 6/6. Gotcha: image files do not exist, so a broken image has no natural size and `width="300"` alone gave a wrong `img.width`. Solution adds `img { width: 300px; display: block; }` in style.css as well as the width attribute.

## 4. Common mistakes
- Using `ul` for the outer list (test needs `ol > li`).
- Putting the description in `p` instead of `ul > li`.
- Missing alt text or empty alt.
- Relying on the width attribute only with broken images; set CSS width 300px too.
- Not linking style.css.

## 5. Approach
1. Title + h1.
2. `ol` with 5 `li`.
3. Inside each: h2, `ul > li` text, img with src, alt, width.
4. CSS `img { width: 300px; }` and link the stylesheet.
5. Count `ol > li` = 5.
