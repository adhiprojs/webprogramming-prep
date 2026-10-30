# Tech Shop Online

Build a small shop page with a main heading, a mission statement, a contact section, a "why choose us" section, a product description and a footer. All texts must match the requirements exactly.

## Requirements

1. The first `h1` has the text exactly `Tech Shop Online`. *(verify_header_text)*
2. The first `p` placed directly after an `h2` has the text exactly `Our mission is to provide affordable, high-quality electronics to customers around the world.` *(verify_mission_statement)*
3. The first `h3` has the text exactly `Contact Information`. *(verify_contact_header_text)*
4. The second `p` on the page (index 1) has the text exactly `We are committed to providing excellent customer service. Reach us at contact@techshop.com or call 1-800-123-4567.` *(verify_contact_details)*
5. The first `p` inside `footer` has the text exactly `2025 Tech Shop Online. All rights reserved.` *(verify_footer_text)*
6. The second `h2` on the page has the text exactly `Why Choose Us?` *(verify_why_choose_us_header)*
7. The fourth `p` on the page (index 3) has the text exactly `At Tech Shop Online, we offer the best deals on electronics, fast shipping, and excellent customer support. We make sure that every product you purchase meets our highest quality standards.` *(verify_why_choose_us_description)*
8. The fifth `p` on the page (index 4) has the text exactly `We offer a range of premium laptops, including the latest models with high-speed processors and long-lasting batteries. Perfect for both work and play!` *(verify_product_description)*

## Watch out

- Several checks pick a `p` by position in the whole document (2nd, 4th and 5th), so the number and order of paragraphs matters. The third `p` (index 2) is not checked but must exist to keep the later indexes right.
- The mission `p` must come immediately after an `h2`; the "Why Choose Us?" `h2` must be the second `h2`.
- Texts use exact equality, so keep punctuation such as the commas, the `?` and the phone number.
- The footer text has no copyright sign: it starts with `2025`.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
