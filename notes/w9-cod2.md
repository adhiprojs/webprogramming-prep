# w9-cod2: Food Order Management (debug a broken React component)

## 1. What the question asks
Fix `src/components/FoodOrder.jsx` (default export `FoodOrder`) and `App.js`. Same pattern as the Medical Shop form:
- `<h1>` `Food Order Management`; initial rows `Burger` (2, 150), `Pizza` (1, 300), `Pasta` (3, 200)
- Placeholders `Food Item`, `Quantity`, `Price ($)`; input `name` attributes `item`, `quantity`, `price`
- Button `Add Order`; empty -> `alert('Please fill in all fields')`
- Classes: `container my-4`; table `table table-striped table-bordered`; button `btn btn-success w-100`.

## 2. What each test checks
Alert mocked. (1) heading; (2) Burger/Pizza/Pasta; (3) empty click -> alert message; (4) fill `Sandwich`, `5`, `120`, click -> `getByText('Sandwich')`, `'5'`, `'120'`; (5) button exists; (6) bootstrap classes; (7) inputs hold values after `change`, then `''` after Add.

## 3. The original submission
The submission was the seeded-bug file and failed to even load (`ReferenceError: FoodOrders is not defined`). Bugs to fix (all were present):
- `useStates` import -> `useState`
- `newOrder` keys `qty/cost` -> `quantity/price`
- `valuee` -> `value`; `order.ids/idd/items/qnty/idx/cost` -> `id/item/quantity/price`
- `newOrder.quantityy/prices` -> `quantity/price`
- stray `{}` pushed into `setOrders`
- `onchange/onChnage/onChangee` -> `onChange`
- `value={newOrder.food/qty/cost}` -> `item/quantity/price`
- `min="one"`, `step="zero.one"`, `min="-5"` -> `1`, `0.01`, `0`
- `onClick={handleAddOrder()}` -> `onClick={handleAddOrder}`
- `export default FoodOrders` -> `FoodOrder`
- `App.js` had stray backticks after the closing brace (syntax error).
Fixed version: 7/7. Uses one `newOrder` object with `[name]: value` (computed key), so the `name` attributes must equal the state keys.

## 4. Common mistakes (debug questions)
- Fixing only the obvious typo and missing the export name or the `onChange` casing (React ignores `onchange`).
- Handler called in JSX (`handleAdd()`), runs on render.
- Generic handler relies on `name` attribute matching the state key.
- `Math.max(...[])` is `-Infinity` for empty arrays (not hit here).
- Read the whole file once, line by line, comparing every identifier with where it was defined.

## 5. Approach in 5 steps
1. Run tests; read the first error (`FoodOrders is not defined` -> export).
2. Check imports (`useState`) and export name.
3. Match every state key with every read (`newOrder.x`, `order.x`).
4. Check each event prop is camelCase and passed as a reference.
5. Check numeric attributes (`min`, `step`) and that `setOrders` gets only valid objects.
