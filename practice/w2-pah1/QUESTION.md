# Product Catalog

Build a product catalog page with an introductory paragraph, a section heading, a list of three categories and a product table with borders.

## Requirements

1. The page title (`document.title`) is exactly `Product Catalog`. *(verify_title)*
2. The first `p` on the page has the text exactly `Welcome to our product catalog. Here you will find a selection of the latest and most popular products available in our store.` *(verify_intro_paragraph)*
3. The first `h2` has the text exactly `Our Products`. *(verify_section_heading)*
4. The page has exactly `3` `li` items inside `ul` elements, with the texts `Electronics`, `Accessories` and `Home Appliances`. *(verify_categories_list)*
5. The table has exactly `3` `th` cells: `Product Name`, `Price` and `Description`. *(verify_table_headers)*
6. `table tbody tr` finds exactly `5` rows. *(verify_number_of_rows)*
7. The first body row has three cells with the texts `Laptop`, `$1200` and `A high-performance laptop`. *(verify_first_row_data)*
8. The first `table` has a `border` attribute. *(verify_table_borders)*

## Watch out

- The intro text must be in the first `p` of the whole page, so no `p` may come before it.
- Count every `ul li` on the page: any extra list item elsewhere breaks the count of `3`.
- Header cells go in `th`, and only the `5` product rows may be in `tbody` (the header row must not be counted).
- The border check needs the HTML `border` attribute on the `table`; CSS borders alone do not pass.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
