# w9-cod2 results

- Command: `runtime/node14/bin/node runtime/run-test.js tests/w9-cod2/code --test tests/w9-cod2/code/react/tests/App.test.js`
- Node: v14.21.3 (shared runtime: react-scripts 5.0.1, RTL 13, jest 27, react 18)

## Original code/ (0/1)

- FAIL: (test file failed to run)

### Error text (original)
```
ReferenceError: FoodOrders is not defined
```

## solution/ (7/7 run 1, 7/7 run 2)

Edited/added only under solution/reactapp/src/ (see below). All cases PASS in both runs.

Cause (bugs in FoodOrder.jsx, all fixed in solution/): `useStates` -> `useState`; newOrder state keys item/qty/cost -> item/quantity/price; `valuee` -> `value`; `order.ids/idd/items/qnty/idx` -> `id/item/quantity/price`; `quantityy/prices` -> `quantity/price`; stray `{}` appended in setOrders; `onchange/onChnage/onChangee` -> `onChange`; inputs `value={newOrder.food/qty/cost}` -> item/quantity/price; `min="one"`, `step="zero.one"`, `min="-5"` -> `1`, `0.01`, `0`; `onClick={handleAddOrder()}` -> `onClick={handleAddOrder}`; `export default FoodOrders` -> `FoodOrder`. Also App.js had a stray pair of backticks after the closing brace (syntax error), removed.
