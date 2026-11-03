# E-Commerce Product Catalog

Build an e-commerce catalog page with a header and intro, sections for product categories, a bordered product table, best-selling products and customer testimonials.

## Requirements

1. The page title (`document.title`) is exactly `E-Commerce Product Catalog`. *(verify_title)*
2. The first `p` inside `header` has the text exactly `We offer a wide variety of products to suit all your needs.` *(verify_intro_paragraph)*
3. The first `h2` inside a `section` has the text exactly `Product Categories`. *(verify_categories_section)*
4. The first `section` contains a `ul` with exactly `3` `li` items: `Electronics`, `Clothing` and `Home Appliances`. *(verify_categories_list)*
5. The table has exactly `4` `th` cells: `Product Name`, `Price`, `Description` and `Image`. *(verify_table_headers)*
6. `table tbody tr` finds exactly `5` rows. *(verify_number_of_rows)*
7. The first body row starts with three cells with the texts `Laptop`, `$1200` and `A high-performance laptop`. *(verify_first_row_data)*
8. The first `table` has a `border` attribute. *(verify_table_borders)*
9. The third `section` has an `h2` exactly `Best-Selling Products`. *(verify_best_selling_section)*
10. The fourth `section` has an `h2` exactly `Customer Testimonials`. *(verify_testimonials_section)*

## Watch out

- The intro `p` must be inside the `header`, not in a `section`.
- Sections are selected with `section:nth-of-type(n)`: categories first, the product table (second) section, then best-selling third and testimonials fourth, all as siblings.
- There are `4` header cells but only `3` cells of the first row are checked; the fourth is the image cell.
- The border check needs the HTML `border` attribute on the `table`; CSS borders alone do not pass.

## Images

These sample images are already in the project (plain coloured placeholders). Use them with the `src` shown; any other file name gives a broken image.

| File | Use in HTML |
|---|---|
| `public/laptop.jpg` | `src="laptop.jpg"` |
| `public/phone.jpg` | `src="phone.jpg"` |
| `public/tshirt.jpg` | `src="tshirt.jpg"` |
| `public/jeans.jpg` | `src="jeans.jpg"` |
| `public/microwave.jpg` | `src="microwave.jpg"` |

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
