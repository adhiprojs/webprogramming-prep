# w2-pah1: Product Catalog (list + table)

## 1. What the question asks
Plain HTML. Exact values:
- title `Product Catalog`
- first `p` = `Welcome to our product catalog. Here you will find a selection of the latest and most popular products available in our store.`
- first `h2` = `Our Products`
- the page has exactly 3 `ul li`: `Electronics`, `Accessories`, `Home Appliances`
- a `table` with `border` attribute, 3 `th`: `Product Name`, `Price`, `Description`; `tbody` has exactly 5 `tr`
- first row cells: `Laptop`, `$1200`, `A high-performance laptop`

## 2. Tests (8)
verify_title, verify_intro_paragraph (first p), verify_section_heading (first h2), verify_categories_list (all `ul li` count === 3), verify_table_headers (3 th), verify_number_of_rows (exactly 5), verify_first_row_data, verify_table_borders (`table.hasAttribute('border')`).

## 3. The original submission
Original blank (0/8); reference 8/8. Only one ul on the page, so the category count is exactly 3.

## 4. Common mistakes
- Border done only with CSS (test needs the HTML `border` attribute).
- Extra `ul`/`li` elsewhere (count must be exactly 3).
- 6 rows or header row put inside tbody (rows counted from `tbody tr`; use thead for headers).
- Price without `$`.

## 5. Approach
1. Title, h1, intro p (first p).
2. h2 + ul of 3.
3. `table border="1"` with thead of 3 th.
4. tbody with exactly 5 rows; row 1 = Laptop data.
5. Verify no stray ul/li or p before the intro.
