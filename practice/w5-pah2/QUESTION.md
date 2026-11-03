# Product Gallery

Build a responsive product gallery using flexbox. Each product has an image and a description. Products appear two per row on wide screens and one per row on narrow screens.

## Requirements

1. The page has an element with id `gallerySection`. *(verify_gallery_section_exists)*
2. `#gallerySection` contains at least `3` elements with class `productDiv`. *(verify_product_divs)*
3. There are at least `3` elements with class `productImg`. *(verify_product_images)*
4. The first `.productImg` fills its parent: its computed width is between `99%` and `100%` of the parent's width (e.g. `width: 100%`). *(verify_images_responsive)*
5. There are at least `3` `.productDescription` elements, each with non-empty text after trimming. *(verify_product_descriptions)*
6. `#gallerySection` uses `display: flex`. *(verify_flexbox_layout)*
7. `#gallerySection` has `flex-wrap: wrap`. *(verify_flex_wrap)*
8. The first `.productDiv` has computed `padding` and `margin` both greater than `0`. *(verify_padding_margin)*
9. At a viewport of `1024x768`, the first two `.productDiv` elements have tops within `50`px of each other (side by side). *(verify_two_column_layout)*
10. At a viewport of `500x768`, the second `.productDiv` starts below the bottom of the first (one column). *(verify_single_column_layout)*

## Watch out

- The responsive-image check in the test is not awaited, so it passes regardless, but build it correctly anyway.
- Switching to one column on small screens needs a media query (e.g. making each `.productDiv` full width) at a breakpoint between `500` and `1024`.
- `padding` and `margin` are read with `parseInt`, so use px values.
- The test waits `500`ms after resizing, so avoid slow transitions on layout.

## Images

These sample images are already in the project (plain coloured placeholders). Use them with the `src` shown; any other file name gives a broken image.

| File | Use in HTML |
|---|---|
| `public/Wireless Headphones.jpg` | `src="Wireless Headphones.jpg"` |
| `public/Smartwatch.jpg` | `src="Smartwatch.jpg"` |
| `public/Laptop Backpack.jpg` | `src="Laptop Backpack.jpg"` |
| `public/Portable Speaker.jpg` | `src="Portable Speaker.jpg"` |
| `public/Wireless Mouse.jpg` | `src="Wireless Mouse.jpg"` |
| `public/USB-C Hub.jpg` | `src="USB-C Hub.jpg"` |

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
