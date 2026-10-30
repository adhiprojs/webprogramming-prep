# w5-pah1: Customer testimonials (flexbox + responsive)

Concept: flex layout, hover transitions, media query switching row to column.

## 1. What the question asks
Static page:
- `#testimonialsSection` (must be `display:flex`).
- At least 3 `.testimonialDiv`, each with an `img`, a `.customerName`, a `.customerReview`.
- Images circular (`border-radius: 50%`) with a `transition` (zoom on hover).
- `.customerReview` has a `transition` (colour change on hover).
- Row on wide screens, column on narrow ones.

## 2. What each test case checks
| Case | Check |
|---|---|
| verify_testimonials_section_exists | `#testimonialsSection` exists |
| verify_multiple_testimonials | `.testimonialDiv` count >= 3 |
| verify_testimonial_structure | each has `img`, `.customerName`, `.customerReview` |
| verify_flexbox_layout | `#testimonialsSection` display === `flex` |
| verify_image_zoom | first `.testimonialDiv img` transition !== '' |
| verify_text_color_effect | first `.customerReview` transition !== '' |
| verify_horizontal_layout | viewport 1024x768: first two divs have `top` difference < 50 |
| verify_vertical_layout | viewport 500x768: second div top > first div bottom |
| verify_spacing | `#testimonialsSection` computed gap !== '0px' |
| verify_circular_images | first img computed `borderRadius === '50%'` |

## 3. The original submission
Passes 10/10. The solution makes `#testimonialsSection` flex (column, centred) and put the real row inside a `.testimonialsWrapper` with `flex-wrap`, `gap: 30px`. A media query at 768px makes the wrapper `flex-direction: column`.

Fragile points:
- Spacing, zoom and colour-effect tests are weak (computed gap on the section is `normal`, not `0px`; transition is never `''`), so they pass even without CSS. Still write them.
- Horizontal layout depends on the wrapper allowing 3 cards in a row at 1024px (cards max 320px).
- `borderRadius` must be literally `50%`, not `100px` or `999px`.
- The image files do not exist; harmless here.

## 4. Common mistakes
- Wrong class names (`testimonial-div`, `customer-name`). Use camelCase exactly.
- `display:flex` on the wrapper but not on `#testimonialsSection`.
- Forgetting a media query (the vertical test fails at 500px).
- Media query using `min-width` incorrectly so wide screens stack.
- Cards with fixed width bigger than the viewport so they never share a row.

## 5. Approach in 5 steps
1. Section `#testimonialsSection` with 3 `.testimonialDiv`: img, h4.customerName, p.customerReview.
2. `#testimonialsSection { display:flex; flex-wrap:wrap; gap:30px; }`.
3. `.testimonialDiv img { border-radius:50%; transition: transform .3s; }` and `:hover` scale.
4. `.customerReview { transition: color .3s; }` and hover colour.
5. `@media (max-width:768px) { #testimonialsSection { flex-direction:column; } }`. Test by resizing.
