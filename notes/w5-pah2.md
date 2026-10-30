# w5-pah2: Product gallery (flex wrap, 2 columns to 1)

Concept: `flex-wrap`, percentage widths with calc, responsive media queries.

## 1. What the question asks
Static page:
- `#gallerySection` with `display:flex; flex-wrap:wrap`.
- At least 3 `.productDiv`, each with an `img.productImg` and `p.productDescription` (text required).
- `.productDiv` has padding and margin.
- Two columns above 768px, one column at or below 768px.
- Images should fill their parent width (the check exists but is broken, see below).

## 2. What each test case checks
| Case | Check |
|---|---|
| verify_gallery_section_exists | `#gallerySection` exists |
| verify_product_divs | `#gallerySection .productDiv` >= 3 |
| verify_product_images | `.productImg` >= 3 |
| verify_images_responsive | Not awaited and its result is ignored, so it always prints success |
| verify_product_descriptions | each `.productDescription` has text; count >= 3 |
| verify_flexbox_layout | `#gallerySection` display === `flex` |
| verify_flex_wrap | `#gallerySection` flexWrap === `wrap` |
| verify_padding_margin | first `.productDiv`: `parseInt(padding)>0` and `parseInt(margin)>0` |
| verify_two_column_layout | viewport 1024: first two divs `top` within 50px |
| verify_single_column_layout | viewport 500: second div top > first div bottom |

## 3. The original submission
Passes 10/10. `.productDiv` has `padding:1rem; margin:0.75rem`. Width is `calc(50% - 1.5rem)` above 768px and `calc(100% - 1.5rem)` at or below. `.productImg` is `width:100%`.

Fragile points:
- `parseInt("0.75rem")` is not used: computed margin is `12px`, so it is fine. Computed values are always px.
- The `1.5rem` in calc equals the left plus right margins; if you forget it, two divs overflow and wrap to separate rows (test 9 fails).
- The responsive-image test is not awaited; do not rely on it.

## 4. Common mistakes
- Missing `flex-wrap: wrap` (items shrink instead of stacking).
- Width `50%` with margin: two items no longer fit, so layout becomes one column at 1024px.
- Media query breakpoint mismatch: test sizes are 1024 and 500.
- Class names `.product-div` instead of `.productDiv`.
- Empty `p.productDescription`.

## 5. Approach in 5 steps
1. HTML: `#gallerySection` with 6 `.productDiv` (img.productImg, p.productDescription).
2. `#gallerySection { display:flex; flex-wrap:wrap; }`.
3. `.productDiv { padding:1rem; margin:.75rem; }`, `.productImg { width:100%; }`.
4. `@media (min-width:769px) { .productDiv { width: calc(50% - 1.5rem); } }`.
5. `@media (max-width:768px) { .productDiv { width: calc(100% - 1.5rem); } }`. Resize to confirm.
