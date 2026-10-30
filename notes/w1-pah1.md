# w1-pah1: Tech Shop Online (exact text, paragraph indexes)

## 1. What the question asks
Plain HTML page with exact strings. No title test.
- `h1` = `Tech Shop Online`
- first `h2` = `Our Mission`; `h2 + p` = `Our mission is to provide affordable, high-quality electronics to customers around the world.`
- first `h3` = `Contact Information`
- p[1] = `We are committed to providing excellent customer service. Reach us at contact@techshop.com or call 1-800-123-4567.`
- second `h2` = `Why Choose Us?`
- p[3] = `At Tech Shop Online, we offer the best deals on electronics, fast shipping, and excellent customer support. We make sure that every product you purchase meets our highest quality standards.`
- p[4] = `We offer a range of premium laptops, including the latest models with high-speed processors and long-lasting batteries. Perfect for both work and play!`
- `footer p` = `2025 Tech Shop Online. All rights reserved.`

## 2. Tests (8)
verify_header_text (h1), verify_mission_statement (`h2 + p`), verify_contact_header_text (h3), verify_contact_details (p[1]), verify_footer_text (`footer p`), verify_why_choose_us_header (h2[1]), verify_why_choose_us_description (p[3]), verify_product_description (p[4]).

## 3. The original submission
Original blank (0/8); reference 8/8. Key trick: p[2] is not tested, so a filler paragraph (e.g. "Open Monday to Saturday.") sits between contact details and "Why Choose Us" so the next two land on p[3] and p[4]. Footer p is p[5], after them.

## 4. Common mistakes
- Skipping the filler p, so the indexes shift by one.
- Missing "?" in `Why Choose Us?`.
- Placing the contact text before the h2 mission p (changes p[1]).
- Typos in long sentences (copy exactly).

## 5. Approach
1. List the p indexes the test uses: 0,1,3,4.
2. Lay out headings and paragraphs so those positions line up; fill gap p[2].
3. Paste strings exactly.
4. Footer last.
5. Count p tags top to bottom to verify.
