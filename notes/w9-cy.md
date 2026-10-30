# w9-cy: Music Store inventory (controlled form + formatted price)

## 1. What the question asks
`src/components/MusicStore.jsx`, default export `MusicStore` (and `App.js` rendering it). Bootstrap CSS imported.
- `<h1>` `Music Store Inventory`
- Initial rows `Acoustic Guitar` (10, 150), `Electric Keyboard` (5, 400), `Drum Set` (3, 600)
- Placeholders `Instrument / Album Name`, `Quantity`, `Price ($)`
- Button `Add Item` -> alert `Please fill in all fields` when any field is empty
- Price displayed as `$200.00` style (`toFixed(2)`).
- Classes: `container my-4`; table `table table-bordered table-hover shadow-sm`; a `thead` with `table-warning`; button `btn btn-warning w-100 fw-bold`.

## 2. What each test checks
Alert mocked. (1) heading; (2) three instrument names; (3) empty click -> alert; (4) add `Violin`, `8`, `200` -> `getByText('Violin')`, `'8'`, `'$200.00'`; (5) `Add Item` button; (6) `.container` classes, first `.table` classes, `.table-warning` exists, button classes; (7) inputs cleared after add (same element refs).

## 3. The original submission
Submitted `MusicStore.jsx` and `App.js` were **empty** -> all 7 failed ("Element type is invalid ... got: object"). Verified solution: 3 string states, items array, `parseInt/parseFloat`, `$${price.toFixed(2)}` in a `<td>`, clears states. 7/7.

## 4. Common mistakes
- Empty file / missing `export default`.
- Price not formatted: test needs the exact text `$200.00` in one cell.
- Missing `fw-bold`, `shadow-sm`, `table-hover`, or putting `table-warning` on nothing.
- `Quantity` collision: quantity `8` must not equal another cell's exact text (initial 10/5/3 are fine).
- Heading `h2` "Add New Item" vs button "Add Item": fine with exact strings, collides if you use a regex.
- Not controlled inputs, or clearing only some.

## 5. Approach in 5 steps
1. `useState` for `items` and the three inputs; import bootstrap CSS.
2. `handleAdd`: validate with `||`, `alert`, `return`.
3. Append `{id, name, quantity: parseInt, price: parseFloat}`, clear all inputs.
4. Render table with `thead className="table-warning"` and rows; price via `toFixed(2)`.
5. Copy exact placeholders and classes from the spec.
