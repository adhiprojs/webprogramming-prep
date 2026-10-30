# w9-cod1: Medical Shop inventory (controlled form + table + Bootstrap)

## 1. What the question asks
`src/components/MedicalShop.jsx`, default export `MedicalShop` (plus `App.js` using it). Uses `bootstrap/dist/css/bootstrap.min.css`.
- `<h1>` text `Medical Shop Inventory`
- Table with initial rows `Paracetamol` (100, 2.5), `Aspirin` (50, 3), `Band-Aid` (200, 0.75)
- Three inputs, placeholders exactly `Name`, `Quantity`, `Price`
- Button text `Add Medicine`
- Empty field(s) -> `alert('Please fill in all fields')`
- Valid add -> new row appears and the 3 inputs clear.
- Classes: outer `container my-4`; table `table table-striped table-bordered`; button `btn btn-success w-100`.

## 2. What each test checks
`window.alert` is mocked (`jest.fn()`).
1. `getByText('Medical Shop Inventory')`.
2. `getByText` for Paracetamol, Aspirin, Band-Aid.
3. Click `Add Medicine` with empty form -> `alert` called with `'Please fill in all fields'`.
4. `fireEvent.change` on the 3 placeholders (`Ibuprofen`, `40`, `1.5`), click -> `getByText('Ibuprofen')`, `'40'`, `'1.5'` (exact, each must be unique).
5. `getByText('Add Medicine')` exists.
6. `.container` has `container`,`my-4`; `getByRole('table')` has the 3 table classes; button has `btn btn-success w-100`.
7. After add, each `input.value` is `''` (same element refs held from before -> inputs must be controlled and not remounted).

## 3. The original submission
Submitted `MedicalShop.jsx` and `App.js` were **empty files**: all 7 failed with "Element type is invalid ... got: object" (empty module has no default export). Verified solution uses 3 `useState` strings plus a `medicines` array, `Math.max(...ids)+1` for new id, `parseInt/parseFloat`, resets the 3 states after add. 7/7.

## 4. Common mistakes
- Empty/missing default export.
- Placeholder or button text differs from the spec (`Add Medicine` vs `Add New Medicine`; the h2 may say "Add New Medicine", and exact-string `getByText('Add Medicine')` skips it, but a regex would collide).
- Not clearing inputs, or not controlled (`value` + `onChange`).
- Validation using `if (!name && ...)` instead of `||`.
- `onClick={handleAdd()}` (calls immediately).
- Storing quantity/price in table as strings with formatting (`1.50`) when the test looks for `1.5`.
- Duplicate numbers in the table: new row id 4 is fine, but a quantity equal to an existing exact cell breaks `getByText`.

## 5. Approach in 5 steps
1. Import `React, {useState}` and the bootstrap CSS; `export default`.
2. State: `medicines` array, plus `name`, `quantity`, `price` strings.
3. `handleAdd`: if any empty -> `alert(msg)` and `return`; else append, then clear the 3 states.
4. Render container/h1/table (`map` with `key={m.id}`), then the row of 3 inputs + button with exact classes.
5. Make `App.js` render `<MedicalShop />`.
