# w11-cod2: PriceTag with discount toggle (props, useState, PropTypes)

## 1. What the question asks
- `src/components/PriceTag.jsx` (default export), props `productName` (string), `originalPrice` (number); `PriceTag.propTypes` set.
- Root `div#price-tag`; `h2#product-name`; `p#displayed-price` text `Price: ₹<price>`; `button#toggle-discount`.
- State `isDiscounted` false: price = original, button `Apply Discount`. True: price = 90% of original (2000 -> `1800`), button `Remove Discount`.
- `App.js` renders `<PriceTag productName="Wireless Headphones" originalPrice={2000} />`.

## 2. What each test checks
- App: `#price-tag` exists.
- Direct render with the props above: `getByText("Wireless Headphones")`; `"Price: ₹2000"`; `"Apply Discount"`.
- Click `#toggle-discount` (via `querySelector`) -> `getByText("Price: ₹1800")`; another test -> `getByText("Remove Discount")`.

## 3. The original submission
Passes 6/6. Right: `useState(false)`, derived `displayedPrice` (no extra state), toggle `setIsDiscounted(!isDiscounted)`, ternary for button text, ids exact, PropTypes `string`/`number`.
Fragile: `originalPrice * 0.9` is a float; 2000 gives exactly `1800` but other prices could print `1349.9999999`. Safer: `Math.round(originalPrice * 0.9)`. Also `PriceTag.css` must exist.

## 4. Common mistakes
- Missing the `₹` symbol or the space after `Price:`.
- Computing discount as 10% (200) instead of 90% of price.
- Button text/ID wrong, or ID on a different element.
- Separate state for displayed price, causing stale values.
- `isRequired` PropTypes number given as string (`originalPrice="2000"`).
- Button text not toggling.

## 5. Approach in 5 steps
1. Props destructuring and `useState(false)`.
2. Compute displayed price from state (ternary).
3. Handler flips the boolean.
4. Render ids/text exactly as spec; ternary for button label.
5. Add propTypes; use it in `App`.
