# Luxury Stays Hotel Page

The given page has bugs. Fix it so that the hotel page has a header, four sections (About the Hotel, Rooms and Pricing, Hotel Services, Gallery), an aside with customer reviews and a footer with contact information. Look for broken tables, unclosed tags and wrongly nested elements.

## Requirements

1. The page title (`document.title`) is exactly `Luxury Stays - Book Your Dream Room`. *(verify_title)*
2. Inside `header`, the `h1` is exactly `Welcome to Luxury Stays` and the `h2` is exactly `Your Dream Stay Awaits`. *(verify_header_section)*
3. The first `section` has an `h2` exactly `About the Hotel`, and the first `p` inside a `section` includes `Luxury Stays offers the finest hospitality`. *(verify_about_the_hotel_section)*
4. The second `section` has an `h2` exactly `Rooms and Pricing`. The page has exactly `3` `th` cells in total (inside `table`) and at least `4` rows in `table tbody tr`. *(verify_rooms_and_pricing_table)*
5. The third `section` has an `h2` exactly `Hotel Services` and at least `5` `li` items inside a `ul`. *(verify_hotel_services_section)*
6. The fourth `section` has an `h2` exactly `Gallery` and at least `3` `img` elements. *(verify_gallery_section)*
7. Inside `aside`, the `h3` is exactly `Customer Reviews` and there are at least `3` `h4` elements. *(verify_customer_reviews_section)*
8. Inside `footer`, the `h2` is exactly `Contact Us` and the first `p` includes `info@luxurystays.com`. *(verify_footer_section)*

## Watch out

- The sections are found with `section:nth-of-type(n)`, so all four must be sibling `section` elements in the right order and none may be nested inside another `section` or left unclosed.
- Count every `th` on the page: exactly `3` in total, so do not add a second table or extra header cells.
- Rows are counted in `table tbody tr`, so the data rows belong in the table body, not in the header row.
- Reviews are `h4` elements inside the `aside`, under the `h3` heading.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
