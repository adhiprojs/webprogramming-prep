# w2-cod2: Luxury Stays (fix buggy HTML: sections, table, aside, footer)

## 1. What the question asks
The starter HTML was buggy and truncated; complete and fix it. Exact values:
- title `Luxury Stays - Book Your Dream Room`
- `header h1` = `Welcome to Luxury Stays`, `header h2` = `Your Dream Stay Awaits`
- section 1: h2 `About the Hotel`, first p includes `Luxury Stays offers the finest hospitality`
- section 2: h2 `Rooms and Pricing`; table with 3 `th` and a `tbody` with at least 4 `tr`
- section 3: h2 `Hotel Services`; `ul li` at least 5
- section 4: h2 `Gallery`; at least 3 `img`
- `aside h3` = `Customer Reviews` and at least 3 `aside h4`
- `footer h2` = `Contact Us`, `footer p` includes `info@luxurystays.com`

## 2. Tests (8)
verify_title, verify_header_section, verify_about_the_hotel_section, verify_rooms_and_pricing_table, verify_hotel_services_section, verify_gallery_section, verify_customer_reviews_section, verify_footer_section. Sections are selected as `section:nth-of-type(n) h2`, so the four `<section>` elements must be siblings in this exact order. `aside` and `footer` are not sections, so they don't shift the count.

## 3. The original submission
Original: 3/8 (bugs: h3 instead of h2 in header, `<body>` used inside the table instead of `<tbody>`, unclosed td/table/p/li, unquoted id, file cut off before aside and footer). Reference passes 8/8. Header must contain an h2 (not h3).

## 4. Common mistakes
- `<tbody>` missing: test counts `table tbody tr` (the parser adds tbody itself, but writing it is safer).
- Unclosed tags making sections nest inside each other, breaking `nth-of-type`.
- Header subtitle as h3.
- Extra `<section>` before the 4 expected, shifting the numbers.
- Gallery with fewer than 3 images, services with fewer than 5 items.

## 5. Approach
1. Close/fix all tags first (validate the structure).
2. Header: h1 + h2 (+ nav).
3. Four sections in order: about, rooms (table with thead/tbody), services (ul 5+), gallery (3+ img).
4. Aside with h3 and 3 articles each with h4.
5. Footer with h2 and p email.
