# w3-pah1: Contact Us page (header, nav, flex form)

## 1. What the question asks
Required structure and computed styles:
- `header` background `rgb(0, 115, 230)` (#0073e6) and `padding` computed exactly `16px`
- `h1` = `Contact Us` (inside the header)
- `nav a` color `rgb(255, 255, 255)` and `text-transform: uppercase`
- `.container` with `max-width: 1200px`
- `.contact-form` with `align-items: center` (needs a flex container to be meaningful)
- `.contact-form button` background `rgb(0, 115, 230)`

## 2. Tests (8)
header_bg_color_is_correct, nav_link_color_is_correct (first `nav a`), container_max_width_is_correct (`1200px`), contact_form_alignment_is_correct (`alignItems === 'center'`), button_bg_color_is_correct, nav_link_text_transform_is_correct, header_padding_is_correct (`padding` string === `16px`, so one value on all sides), h1_text_is_correct. Viewport 1200x1200.

## 3. The original submission
Original blank (0/8); reference 8/8. `.contact-form` is a form with `display:flex; flex-direction:column; align-items:center`. Button is the form's `button`.

## 4. Common mistakes
- `padding: 16px 20px` (computed shorthand wouldn't be `16px`).
- max-width written on body instead of `.container`.
- `.contact-form` as an id, or `button` outside the form.
- Forgetting to link style.css.
- Uppercase done by typing text in capitals (test reads computed text-transform).

## 5. Approach
1. Markup: header(h1, nav with links), div.container > form.contact-form (inputs, textarea, button).
2. Header colours and padding 16px.
3. nav a: white, uppercase.
4. Container max-width 1200px.
5. Form flex + align-items center; button colour.
