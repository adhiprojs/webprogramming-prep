# Price Tag with Discount Toggle (React)

Build a reusable `PriceTag` component that shows a product name, its price in rupees and a button that toggles a discount on and off. `App` renders one `PriceTag`.

## Components

- `src/components/PriceTag.jsx` - default export `PriceTag`. Props: `productName` (string) and `originalPrice` (number). Optional styles in `src/components/PriceTag.css`.
- `src/App.js` - default export `App`, no props. It renders a `PriceTag` so that an element with `id="price-tag"` is in the page.

## Requirements

1. Rendering `App` produces an element with id `price-tag`. *(renders_price_tag_component)*
2. `PriceTag` shows the product name (for `productName="Wireless Headphones"`, the text `Wireless Headphones`). *(displays_product_name)*
3. With `originalPrice={2000}` it shows `Price: ₹2000` in a single element (no thousands separator or decimals). *(displays_original_price)*
4. It shows a button with the text `Apply Discount`. *(displays_apply_discount_button)*
5. The button has `id="toggle-discount"`. Clicking it changes the price text to `Price: ₹1800` (10% off 2000). *(toggles_price_on_discount_click)*
6. After clicking, the button text changes to `Remove Discount`. *(toggles_button_text_on_click)*

## Watch out

- `getByText("Price: ₹2000")` is exact and includes the `₹` symbol and the space after the colon; keep it all in one element.
- The button is found by `#toggle-discount` for clicks, but by its text for the label checks, so both must be right.
- Use state for the discounted flag; derive the displayed price from `originalPrice` rather than hard-coding `2000`.
- `getByText("Wireless Headphones")` must match one element only.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/PriceTag.jsx`
- `reactapp/src/App.css`
- `reactapp/src/components/PriceTag.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
