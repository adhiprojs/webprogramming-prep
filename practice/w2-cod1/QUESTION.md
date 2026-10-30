# Top Tourist Destinations

Build a page that lists five top tourist destinations as an ordered list. Each destination has a name, a bulleted description and an image with alt text. All images must be displayed 300 pixels wide.

## Requirements

1. The page title (`document.title`) is exactly `Top Tourist Destinations`. *(verify_title)*
2. The first `h1` has the text exactly `Top Tourist Destinations`. *(verify_main_heading)*
3. The page has an `ol` with exactly `5` direct `li` children (`ol > li`). *(verify_number_of_destinations)*
4. Every `ol > li` contains an `h2` (the name), a `ul > li` (the description), and an `img` that has both a `src` and an `alt` attribute. *(verify_each_destination_has_name_description_and_image)*
5. Every `img` on the page has a non-empty `alt` attribute. *(verify_images_have_alt_text)*
6. Every `img` has a width of `300` pixels (`img.width === 300`). *(verify_image_width)*

## Watch out

- Only the five destination items may be direct children of the `ol`; the description bullets must be in a nested `ul` so they are not counted by `ol > li`.
- Each destination needs its own `img` with `src` and a non-empty `alt`, and the test checks every image on the page.
- The image files may not exist, so do not depend on the real image size: set the width explicitly (the `width` attribute or CSS) so it reads `300`.
- Use `h2` for destination names, and keep the single `h1` as the main heading.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
