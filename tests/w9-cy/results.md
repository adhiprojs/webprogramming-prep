# w9-cy results

- Command: `runtime/node14/bin/node runtime/run-test.js tests/w9-cy/code --test tests/w9-cy/code/react/tests/App.test.js`
- Node: v14.21.3 (shared runtime: react-scripts 5.0.1, RTL 13, jest 27, react 18)

## Original code/ (0/7)

- FAIL: renders_MusicStore_heading_is_present
- FAIL: displays_initial_inventory_items_are_present
- FAIL: displays_alert_if_fields_are_empty_when_adding_new_item
- FAIL: adds_a_new_item_successfully
- FAIL: renders_Add_Item_button
- FAIL: bootstrap_classes_are_applied_correctly
- FAIL: form_inputs_are_cleared_after_adding_item

### Error text (original)
```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

## solution/ (7/7 run 1, 7/7 run 2)

Edited/added only under solution/reactapp/src/ (see below). All cases PASS in both runs.

Cause: components/MusicStore.jsx and App.js were empty files. Fix: wrote both (price shown as $x.xx via toFixed(2), table-warning thead, btn-warning button).
