# Header, Navigation and Contact Form Styling

Build a "Contact Us" page with a header, a navigation bar with links, a centred container and a contact form. Style them with the CSS values below. The tests use a 1200 by 1200 pixel viewport.

## Requirements

1. The `header` has the background colour `rgb(0, 115, 230)`. *(header_bg_color_is_correct)*
2. The first link `nav a` has the text colour `rgb(255, 255, 255)`. *(nav_link_color_is_correct)*
3. The element with the class `container` has a maximum width of `1200px`. *(container_max_width_is_correct)*
4. The element with the class `contact-form` has `align-items: center`. *(contact_form_alignment_is_correct)*
5. The `button` inside `.contact-form` has the background colour `rgb(0, 115, 230)`. *(button_bg_color_is_correct)*
6. The first link `nav a` has `text-transform: uppercase`. *(nav_link_text_transform_is_correct)*
7. The `header` has a padding of `16px` (all four sides). *(header_padding_is_correct)*
8. The first `h1` has the text exactly `Contact Us`. *(h1_text_is_correct)*

## Watch out

- Computed padding is only `16px` if all four sides are equal, so use a single `padding: 16px` rather than different sides.
- `align-items` only matters on a flex or grid container, but the test reads the computed value, so set `align-items: center` on `.contact-form` directly.
- The colours must compute to the exact `rgb(...)` values above, and `max-width` to `1200px`.
- The test uses the first `nav a` and the first `h1`; the button must be inside `.contact-form`.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
