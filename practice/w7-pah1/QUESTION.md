# Billing Calculator

Build a billing form with fieldsets and legends: a list of items with prices and a payment method choice. A Calculate button shows the total, the discount and the final amount; Reset clears the form.

## Requirements

1. The page has at least `2` `<fieldset>` elements and at least `2` `<legend>` elements. *(fieldset_and_legend_elements_exist)*
2. There are at least `5` checkboxes `input[type="checkbox"].item-checkbox`. *(item_checkboxes_exist)*
3. There are exactly `3` radio buttons `input[type="radio"][name="paymentMethod"]` with the values `cash`, `card` and `upi`. *(payment_radio_buttons_exist)*
4. Setting the `upi` radio to `checked` and dispatching a bubbling `change` event makes the text of `#paymentDisplay` (trimmed) include `upi`. *(selecting_payment_method_updates_display)*
5. After checking the first `2` item checkboxes (set `checked`, dispatch `change`) and clicking `#calculateBtn`, `#totalAmount` equals the sum of those two checkboxes' `data-price` attributes. *(total_amount_is_correct)*
6. With `upi` selected, `#discountAmount` equals `10%` of the total, rounded to 2 decimals. *(discount_applied_for_upi)*
7. `#finalAmount` equals the total minus the discount, rounded to 2 decimals. *(final_amount_is_correct)*
8. Clicking `#resetBillBtn` sets `#totalAmount` to `0` and `#finalAmount` to `0` and unchecks every `.item-checkbox`. *(reset_clears_all_selections)*

## Watch out

- Every item checkbox needs a numeric `data-price` attribute; the test sums them.
- The radios and checkboxes are changed by setting `checked` and dispatching `change`, not by clicking, so read their state when `#calculateBtn` is clicked.
- The amounts are parsed with `parseFloat` from trimmed text and compared with `===`, so show only the number (no currency symbols) and round to 2 decimals.
- The page is loaded with `networkidle2`, and the test waits `500`ms after actions.
- If `fieldset` is not found within 10 seconds, `page_load` prints a failure and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
