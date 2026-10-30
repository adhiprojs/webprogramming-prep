# Restaurant Menu Page Structure

Build a restaurant menu page with a header, navigation links, a `.container` holding three menu sections with items and prices, and a footer. This test checks the page structure and texts only.

## Requirements

1. The page has a `header` element. *(header_element_is_present)*
2. The page has a `nav` element containing at least `4` links (`nav a`). *(nav_with_links_is_present)*
3. The page has an element with the class `container`. *(container_div_is_present)*
4. The elements with the class `section-title` include the texts `Starters`, `Main Course` and `Desserts`. *(all_menu_section_titles_are_present)*
5. The page has at least `6` elements with the class `item`. *(menu_items_are_present)*
6. The page has a `footer` element. *(footer_element_is_present)*
7. The page has at least `6` elements with the class `price`. *(price_elements_are_present_in_menu_items)*
8. The first `h1` has the text exactly `Delicious Restaurant`. *(h1_text_is_correct)*
9. The first `h2` has the text exactly `Starters`. *(h2_text_is_correct)*
10. The first `a` on the page has the text exactly `Home`. *(atag_text_is_correct)*

## Watch out

- The first `h2` must be `Starters`, so the Starters section comes before the other section titles; give the title elements the class `section-title` as well.
- The first `a` on the page must be the `Home` link, so put it first in the `nav` and do not place any other link before it.
- Item and price counts are of classes `item` and `price` across the whole page, at least `6` of each.
- Texts are trimmed before comparing, but the words and case must match exactly.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
