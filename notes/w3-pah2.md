# w3-pah2: Restaurant menu page (presence and text, class hooks)

## 1. What the question asks
Required elements and classes:
- `header`, `nav` with at least 4 `a`; first `a` text = `Home`
- `h1` = `Delicious Restaurant`
- `.container` div
- `.section-title` elements with texts `Starters`, `Main Course`, `Desserts`; first `h2` must be `Starters`
- at least 6 `.item` and at least 6 `.price` elements
- `footer` element

## 2. Tests (10)
header_element_is_present, nav_with_links_is_present (`nav a` count >= 4), container_div_is_present, all_menu_section_titles_are_present, menu_items_are_present (`.item` >= 6), footer_element_is_present, price_elements_are_present_in_menu_items (`.price` >= 6), h1_text_is_correct, h2_text_is_correct (first h2 = Starters), atag_text_is_correct (first `a` = Home). No colour or layout checks.

## 3. The original submission
Original blank (0/10); reference 10/10. Reference: header(h1, nav of 4 links), `.container` with three `h2.section-title` and two `.item` (spans `.name`, `.price`) each, footer. CSS is cosmetic only.

## 4. Common mistakes
- Section titles as h3 or without class `section-title`.
- Fewer than 6 items or prices.
- Another `a` (or h2) placed before Home/Starters.
- Nav links fewer than 4.
- Class typo (`section_title`, `items`).

## 5. Approach
1. header > h1 + nav with 4 links, Home first.
2. `.container` with 3 `h2.section-title` in the given texts.
3. Under each title add 2 `.item` with `.name` and `.price`.
4. footer.
5. Count items/prices >= 6.
