# w7-pah1: Shopping bill calculator

Concept: checkbox prices via `data-price`, radio-based discount, total/discount/final maths, reset.

## 1. What the question asks
- At least 2 `<fieldset>` and 2 `<legend>`.
- At least 5 checkboxes `input[type=checkbox].item-checkbox`, each with a numeric `data-price` attribute (the original page also had `data-name`).
- 3 radios `name="paymentMethod"`, values `cash`, `card`, `upi`; `#paymentDisplay` shows the chosen value.
- `#calculateBtn` computes `#totalAmount`, `#discountAmount`, `#finalAmount`.
- Discount: `upi` 10%, `card` 5%, `cash` 0.
- `#resetBillBtn` unchecks items and returns the numbers to 0.
- Loop notes in the original code: while (find radio), for (total), do...while (item list). Not tested.

## 2. What each test case checks
| Case | Check |
|---|---|
| fieldset_and_legend_elements_exist | `fieldset` >= 2 and `legend` >= 2 |
| item_checkboxes_exist | `.item-checkbox` >= 5 |
| payment_radio_buttons_exist | exactly 3 `paymentMethod` radios with values cash, card, upi |
| selecting_payment_method_updates_display | `upi` set checked and `change` dispatched; `#paymentDisplay` includes `upi` |
| total_amount_is_correct | checks the first two items, sums their `data-price` itself, clicks calculate; `#totalAmount` equals that sum |
| discount_applied_for_upi | `#discountAmount` equals `total * 0.10` rounded to 2 decimals |
| final_amount_is_correct | `#finalAmount` equals `total - discount` to 2 decimals |
| reset_clears_all_selections | click `#resetBillBtn`; total 0, final 0, no item checked |

## 3. The original submission
Passes 8/8. The test reads `data-price` itself, so the page must have it on the checkboxes. Handler sums with a for loop; `getDiscountRate('upi')` returns 0.10; `toFixed(2)` then `parseFloat` for rounding. Reset sets `.checked = false` for boxes and radios and sets the numbers to `0`.

Fragile points:
- Total, discount and final are parsed with `parseFloat(textContent)`, so no `Rs.` or commas inside those elements.
- The upi radio selection persists from the earlier case, so discount works only because the radio stays checked; the calculate handler must read the checked radio at click time.
- Round with `toFixed(2)` consistently, or the equality compare may differ in float values.

## 4. Common mistakes
- No `data-price` attribute, or price kept in `value` (the test sums `data-price`).
- Discount calculated from the wrong rate, or applied before the total is known.
- Writing `Rs. 215` into the number divs.
- Reset leaves the amounts with the old text or only resets the display.
- Radios without a shared name.
- Missing `DOMContentLoaded`.

## 5. Approach in 5 steps
1. HTML: items fieldset (6 checkboxes with `data-price`), payment fieldset (3 radios), buttons, summary divs.
2. Radio `change` listener writes the value.
3. Calculate: for loop sums checked prices; find the selected radio; rate = 0.10 / 0.05 / 0.
4. discount = round(total * rate, 2); final = round(total - discount, 2); write plain numbers.
5. Reset: uncheck all, show `0` for the three amounts, `None` for payment.
