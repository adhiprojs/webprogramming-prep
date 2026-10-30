# w11-pah1: Employee Directory with department filter (props, PropTypes, select)

## 1. What the question asks
- `components/EmployeeCard.jsx`: props `employeeName`, `role`, `department`; root `div.employee-card`; `h2.employee-name` shows the name; `p.employee-role` -> `Role: <role>`; `p.employee-department` -> `Department: <department>`; `EmployeeCard.propTypes` with all three. Imports `./EmployeeCard.css`.
- `App.js`: `div#app-container`, `h1#directory-title` `Employee Directory`, `select#department-filter` with options `All`, `Engineering`, `Product`, `Design`, state `selectedDepartment` (default `All`), 5 employees (2 Engineering, 2 Product, 1 Design) rendered as `EmployeeCard`s in `div#employee-list` with `key`.

## 2. What each test checks
- `getByText("Employee Directory")`
- `#department-filter` exists
- on load `.employee-card` count is 5
- `fireEvent.change(#department-filter, {target:{value:'Engineering'}})` -> 2 cards
- EmployeeCard rendered directly (sample name, `Software Engineer`, `Engineering`): `getByText(name)`, `"Role: Software Engineer"`, `"Department: Engineering"`; `propTypes` has the three keys.

## 3. The original submission
Passes 8/8. Right: controlled `<select value onChange>`, filter with `"All"` check, `key={employee.id}`, exact label prefixes, PropTypes. Option `value`s match the strings the test types.
Fragile: `employees` array is rebuilt on every render (fine, but belongs outside the component); the exact `Engineering` count (2) depends on your data; CSS files must exist.

## 4. Common mistakes
- Option value differing from test value (`engineering`, `Engineering Dept`).
- Missing `All` handling -> filter shows nothing.
- `onChange` on option instead of select; uncontrolled select.
- Label text mismatch (`Role:` spacing).
- Wrong data counts (needs 5 total, 2 Engineering).
- Missing `key`.

## 5. Approach in 5 steps
1. Build `EmployeeCard` with spec classes/text and propTypes.
2. In `App`, hold `selectedDepartment` state.
3. Make the employees array with ids and departments.
4. `filtered = selected === 'All' ? all : all.filter(...)`.
5. Render title, select with `id`, and `filtered.map` of cards.
