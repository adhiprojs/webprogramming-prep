# Employee Directory with Department Filter (React)

Build an employee directory page. `App` shows a title, a department filter dropdown and a list of employee cards built with a reusable `EmployeeCard` component. Choosing a department in the dropdown limits the cards to that department.

## Components

- `src/App.js` - default export `App`, no props. Holds the employee data (5 employees) and the filter.
- `src/components/EmployeeCard.jsx` - default export `EmployeeCard`. Props: `employeeName`, `role`, `department` (strings); define `EmployeeCard.propTypes` with all three. Its root element must have class `employee-card`.
- Optional styles: `App.css`, `components/EmployeeCard.css`.

## Requirements

1. `App` shows the title `Employee Directory`. *(renders_directory_title)*
2. `App` has a dropdown (`select`) with `id="department-filter"`. *(renders_department_filter_dropdown)*
3. On load, `App` renders 5 elements with class `employee-card`. *(renders_all_employees_on_load)*
4. Changing the dropdown value to `Engineering` leaves exactly 2 `.employee-card` elements, so exactly 2 of the 5 employees have department `Engineering` and the dropdown must have an option with value `Engineering`. *(filters_employees_by_department)*
5. With `employeeName="Rajan Kumar"`, `EmployeeCard` shows `Rajan Kumar` in its own element (sample name from the spec). *(renders_employee_name)*
6. With `role="Software Engineer"`, it shows `Role: Software Engineer` in one element. *(renders_employee_role)*
7. With `department="Engineering"`, it shows `Department: Engineering` in one element. *(renders_employee_department)*
8. `EmployeeCard.propTypes` has the properties `employeeName`, `role` and `department`. *(validates_proptypes)*

## Watch out

- `getByText("Employee Directory")` is exact; the title must be a single element and nothing else may have that exact text.
- Counting is done with `querySelectorAll('.employee-card')`, so put the class on exactly one element per employee (not on child elements too).
- The filter is read from `#department-filter` and changed via a `change` event, so use a controlled `select` whose `onChange` updates state; include an "all" option so 5 cards show initially.
- Prefixes `Role: ` and `Department: ` must be in the same element as the value, with the exact spacing.
- The test does not specify the other four employees or departments; only the count of 2 for `Engineering` matters.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/EmployeeCard.jsx`
- `reactapp/src/App.css`
- `reactapp/src/components/EmployeeCard.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
