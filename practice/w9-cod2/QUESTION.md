# Food Order Management (React) - fix the bugs

The given `FoodOrder` component has bugs. Fix it so that it shows a food order table styled with Bootstrap, lets the user add a new order through a form, alerts when fields are empty, and clears the form after a successful add. `App.js` also has a syntax problem to fix.

## Components

- `src/components/FoodOrder.jsx` - default export `FoodOrder`, no props. Imported by the test as `../components/FoodOrder`.
- `src/App.js` - default export `App`, renders `<FoodOrder />`.
- Bootstrap CSS must be imported (the component already imports `bootstrap/dist/css/bootstrap.min.css`).

## Requirements

1. Show a heading with the exact text `Food Order Management`. *(renders_Food_Order_Management_heading_is_present)*
2. The table initially lists the items `Burger`, `Pizza` and `Pasta`. *(displays_initial_food_order_items_is_present)*
3. Clicking `Add Order` with empty fields calls `window.alert` with `Please fill in all fields`. *(displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_order)*
4. Inputs have placeholders `Food Item`, `Quantity` and `Price ($)`. Entering `Sandwich`, `5` and `120` and clicking `Add Order` adds a row showing `Sandwich`, `5` and `120`. *(adds_a_new_food_order_to_the_list_is_working)*
5. A button with the exact text `Add Order` is shown. *(renders_Add_Order_button_is_working)*
6. The wrapper has classes `container` and `my-4`; the table has `table`, `table-striped` and `table-bordered`; the `Add Order` button has `btn`, `btn-success` and `w-100`. *(bootstrap_classes_are_applied_correctly)*
7. After a successful add, the three inputs are empty (they show typed values such as `Salad`, `1`, `80` before the click). *(form_inputs_are_cleared_after_adding_food_order)*

## Watch out

- Check the hook import and names, handler prop names (`onChange`), the state field names used consistently across the form, table and handler, and the final `export default` name.
- Invalid attribute values on the number inputs (`min`, `step`) and a handler that is called during render instead of passed to `onClick` are among the bugs.
- Rows must render the right fields: `getByText('5')` and `getByText('120')` fail if several cells share that text or a cell is blank, and each row needs a unique `key`.
- Do not append an empty object to the list when adding an order.
- `window.alert` is mocked; the message must be exactly `Please fill in all fields`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/FoodOrder.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
