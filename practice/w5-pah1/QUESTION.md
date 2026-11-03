# Customer Testimonials Section

Build a responsive testimonials section. Each testimonial shows a customer photo, name and review; the cards sit side by side on wide screens and stack on narrow screens, with hover transitions on the photo and review text.

## Requirements

1. The page has an element with id `testimonialsSection`. *(verify_testimonials_section_exists)*
2. There are at least `3` elements with class `testimonialDiv`. *(verify_multiple_testimonials)*
3. Every `.testimonialDiv` contains an `img`, a `.customerName` and a `.customerReview`. *(verify_testimonial_structure)*
4. `#testimonialsSection` uses `display: flex`. *(verify_flexbox_layout)*
5. The first `.testimonialDiv img` has a non-empty computed `transition` (for the zoom effect). *(verify_image_zoom)*
6. The first `.customerReview` has a non-empty computed `transition` (for the colour change). *(verify_text_color_effect)*
7. At a viewport of `1024x768`, the first two `.testimonialDiv` elements have tops within `50`px of each other (side by side). *(verify_horizontal_layout)*
8. At a viewport of `500x768`, the second `.testimonialDiv` starts below the bottom of the first (stacked vertically). *(verify_vertical_layout)*
9. `#testimonialsSection` has a computed `gap` that is not `0px`. *(verify_spacing)*
10. The first `.testimonialDiv img` has `border-radius: 50%`. *(verify_circular_images)*

## Watch out

- Stacking on small screens needs a media query that changes `flex-direction` (or wrapping) at some width between `500` and `1024`.
- `transition` is checked on the base element, not on `:hover`.
- Set `gap` directly on the flex container; it must not compute to `0px`.
- The test waits `500`ms after resizing the viewport, so layout must settle quickly.
- Images must load without console errors; use local images or none that break.

## Images

These sample images are already in the project (plain coloured placeholders). Use them with the `src` shown; any other file name gives a broken image.

| File | Use in HTML |
|---|---|
| `public/Jessica Smith.jpg` | `src="Jessica Smith.jpg"` |
| `public/Michael Johnson.jpg` | `src="Michael Johnson.jpg"` |
| `public/Sarah Brown.jpg` | `src="Sarah Brown.jpg"` |

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
