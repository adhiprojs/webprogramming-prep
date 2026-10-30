# w2-pah2: E-Commerce Product Catalog (header + 4 sections + table)

## 1. What the question asks
Plain HTML. Exact values:
- title `E-Commerce Product Catalog`
- `header p` = `We offer a wide variety of products to suit all your needs.`
- section 1: `section h2` = `Product Categories`; its ul has 3 li: `Electronics`, `Clothing`, `Home Appliances`
- section 2: table with `border` attr; 4 th: `Product Name`, `Price`, `Description`, `Image`; `tbody` 5 `tr`; first row `Laptop`, `$1200`, `A high-performance laptop`
- section 3: h2 `Best-Selling Products`
- section 4: h2 `Customer Testimonials`

## 2. Tests (10)
verify_title, verify_intro_paragraph, verify_categories_section (first `section h2`), verify_categories_list (`section:nth-of-type(1) ul li`), verify_table_headers (exactly 4), verify_number_of_rows (5), verify_first_row_data, verify_table_borders, verify_best_selling_section (`section:nth-of-type(3) h2`), verify_testimonials_section (`section:nth-of-type(4) h2`).

## 3. The original submission
Original blank (0/10); reference 10/10. Four `<section>` siblings in order: categories, product table (h2 "Product List"), best-selling, testimonials. Header is not a section.

## 4. Common mistakes
- Header wrapped in a `<section>` (shifts nth-of-type).
- Table not inside section 2 or an extra section added.
- Missing Image column (test needs exactly 4 th).
- `border` attribute missing.
- Section order wrong.

## 5. Approach
1. Header with h1 + p.
2. Section 1: h2 + ul of 3.
3. Section 2: table, 4 th, 5 rows with img in last cell.
4. Section 3 and 4 with the exact h2 text.
5. Confirm only 4 sections.
