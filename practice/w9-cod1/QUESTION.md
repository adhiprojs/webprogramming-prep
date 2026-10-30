# Medical Shop Inventory (React)

Build a `MedicalShop` component that shows a medicine inventory table styled with Bootstrap, plus a form to add a new medicine. Adding with empty fields shows an alert; a successful add appends a row and clears the form.

## Components

- `src/components/MedicalShop.jsx` - default export `MedicalShop`, no props. Imported by the test as `../components/MedicalShop`.
- `src/App.js` - should render `<MedicalShop />`.
- Bootstrap classes are checked, so the app needs Bootstrap CSS (for example `import 'bootstrap/dist/css/bootstrap.min.css'`).

## Requirements

1. Show a heading with the exact text `Medical Shop Inventory`. *(renders_Medical_Shop_Inventory_heading_is_present)*
2. The table initially lists the medicines `Paracetamol`, `Aspirin` and `Band-Aid`, each in its own element. *(displays_initial_inventory_items_is_present)*
3. Clicking the `Add Medicine` button with the fields empty calls `window.alert` with `Please fill in all fields`. *(displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_medicine)*
4. Three inputs with placeholders `Name`, `Quantity` and `Price`. Entering `Ibuprofen`, `40` and `1.5` and clicking `Add Medicine` adds a row showing `Ibuprofen`, `40` and `1.5` as separate cell texts (price shown without a `$` or extra decimals). *(adds_a_new_medicine_to_the_inventory_is_working)*
5. A button with the exact text `Add Medicine` is shown. *(renders_Add_Medicine_button_is_working)*
6. The outer wrapper has classes `container` and `my-4`; the table (role `table`) has `table`, `table-striped` and `table-bordered`; the `Add Medicine` button has `btn`, `btn-success` and `w-100`. *(bootstrap_classes_are_applied_correctly)*
7. After a successful add, the `Name`, `Quantity` and `Price` inputs are controlled and become empty strings (they hold the typed values before the click). *(form_inputs_are_cleared_after_adding_medicine)*

## Watch out

- `getByText('40')` and `getByText('1.5')` throw if another cell has exactly that text, so the initial quantities and prices must not equal `40` or `1.5`.
- `getByText('Add Medicine')` is exact; do not use that string for a heading as well (use a different heading text).
- `getByPlaceholderText('Name')` etc. are exact and the `Quantity`/`Price` inputs must be distinct elements.
- `window.alert` is mocked with `jest.fn()`; call `alert(...)` (global) with exactly `Please fill in all fields`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/MedicalShop.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
