# Profile Card Styling

Create a profile card and style it with CSS. The card has a white background and a box shadow, a heading with a person's name, and a green button that changes colour when hovered.

## Requirements

1. The page has an element with the class `profile-card`. *(profile_card_is_present)*
2. `.profile-card` has the background colour `rgb(255, 255, 255)`. *(profile_card_background_color_is_present)*
3. `.profile-card` has a box shadow (its computed `box-shadow` is anything other than `none`). *(profile_card_box_shadow_is_present)*
4. Inside the card, the `h2` has the text exactly `John Doe`. *(profile_card_heading2_text_is_present)*
5. Inside the card, the element with the class `button` has the text exactly `Contact`. *(profile_card_button_text_is_present)*
6. `.profile-card .button` has the background colour `rgb(76, 174, 79)`. *(profile_card_button_color_is_present)*
7. When the mouse hovers over `.profile-card .button`, its background colour becomes `rgb(69, 170, 63)`. *(profile_card_button_hover_color_is_present)*

## Watch out

- Colours are compared as computed values in the form `rgb(r, g, b)`, so hex or named colours are fine in CSS only if they compute to exactly these values.
- The button must be a descendant of `.profile-card` and carry the class `button` (any tag, for example `a` or `button`).
- The hover colour needs a `:hover` rule; the test hovers the real element and reads the computed colour after a short wait, so avoid long transitions.
- Texts are trimmed before comparison, so surrounding whitespace is fine but the words must match exactly.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
