# w9-pah1 results

- Command: `runtime/node14/bin/node runtime/run-test.js tests/w9-pah1/code --test tests/w9-pah1/code/react/tests/App.test.js`
- Node: v14.21.3 (shared runtime: react-scripts 5.0.1, RTL 13, jest 27, react 18)

## Original code/ (0/7)

- FAIL: renders_Bookstore_Inventory_heading_is_present
- FAIL: displays_initial_inventory_items_is_present
- FAIL: displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_book
- FAIL: adds_a_new_book_to_the_inventory_is_working
- FAIL: renders_Add_Book_button_is_working
- FAIL: bootstrap_classes_are_applied_correctly
- FAIL: form_inputs_are_cleared_after_adding_book

### Error text (original)
```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

## solution/ (7/7 run 1, 7/7 run 2)

Edited/added only under solution/reactapp/src/ (see below). All cases PASS in both runs.

Cause: components/Bookstore.jsx and App.js were empty files. Fix: wrote both (card shadow-sm layout, container my-5, price shown as $x.xx). Initial stock numbers must not contain "20" because the test uses getByText(/20/).
