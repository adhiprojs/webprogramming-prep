# Music Store Inventory (React)

Build a `MusicStore` component that shows a music inventory table styled with Bootstrap (warning theme), plus a form to add an item. Adding with empty fields shows an alert; a successful add appends a row with the price formatted as dollars, and clears the form.

## Components

- `src/components/MusicStore.jsx` - default export `MusicStore`, no props. Imported by the test as `../components/MusicStore`.
- `src/App.js` - should render `<MusicStore />`.
- Bootstrap CSS must be available (for example `import 'bootstrap/dist/css/bootstrap.min.css'`).

## Requirements

1. Show a heading with the exact text `Music Store Inventory`. *(renders_MusicStore_heading_is_present)*
2. The table initially lists `Acoustic Guitar`, `Electric Keyboard` and `Drum Set`. *(displays_initial_inventory_items_are_present)*
3. Clicking `Add Item` with empty fields calls `window.alert` with `Please fill in all fields`. *(displays_alert_if_fields_are_empty_when_adding_new_item)*
4. Inputs have placeholders `Instrument / Album Name`, `Quantity` and `Price ($)`. Entering `Violin`, `8` and `200` and clicking `Add Item` shows `Violin`, `8` and `$200.00` (price shown with a `$` and two decimals). *(adds_a_new_item_successfully)*
5. A button with the exact text `Add Item` is shown. *(renders_Add_Item_button)*
6. Wrapper has classes `container` and `my-4`; the table (first `.table`) has `table`, `table-bordered`, `table-hover` and `shadow-sm`; an element with class `table-warning` exists (the table header); the `Add Item` button has `btn`, `btn-warning`, `w-100` and `fw-bold`. *(bootstrap_classes_are_applied_correctly)*
7. After a successful add, the three inputs are empty (they hold `Flute`, `12`, `50` before the click). *(form_inputs_are_cleared_after_adding_item)*

## Watch out

- `getByText('8')` must match exactly one element, so no initial quantity or other cell may be exactly `8`.
- Initial prices should also be formatted so they cannot equal `$200.00`.
- `getByText('Add Item')` is exact; do not reuse it for a heading.
- Price is displayed formatted (`$200.00`) but the input value after typing `50` is compared as typed, `50`.
- `window.alert` is mocked; the message is exactly `Please fill in all fields`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/MusicStore.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
