# w8-cod1: Employee Directory with live search (React, useState)

## 1. What the question asks
Build `src/App.js` (default export `App`) for an "Employee Directory":
- Heading text: `Employee Directory`
- A text input with placeholder exactly `Search employees...`
- Four employees shown as text: `John Doe`, `Jane Smith`, `Mike Johnson`, `James Brown`
- Typing in the input filters the list (case-insensitive substring).

Test file: `react/tests/App.test.js`, imports `App` from `../App`.

## 2. What each test checks
| Test | Query | Expect |
|---|---|---|
| renders_the_heading | `getByText(/Employee Directory/i)` | in document |
| renders_the_input_placeholder_text | `getByPlaceholderText("Search employees...")` | in document |
| renders_the_employee_john_doe / jane_smith / mike_johnson / james_brown | `getByText(/<name>/i)` | each in document |
| renders_the_employee_based_on_search | `fireEvent.change(input, {target:{value:'John'}})` | John Doe present; `queryByText(/Jane Smith/i)` and `/James Brown/i` absent |

## 3. The original submission
Submitted code was the **untouched Create React App template** (still imports `./logo.svg`, shows "Learn React"). Result: 0 tests ran, error `Cannot find module './logo.svg'`. Nothing of the question was solved.
Verified fix (in solution/): `useState('')` for search, an `employees` array of `{id, name}`, `.filter(name.toLowerCase().includes(search.toLowerCase()))`, `<li key={emp.id}>`, controlled `<input value onChange>`. Passes 7/7.

## 4. Common mistakes
- Leaving the CRA template (and the `logo.svg` import) in `App.js`.
- Heading text not matching: `getByText` regex needs the words "Employee Directory" in ONE element.
- Wrong placeholder (missing the three dots, or `Search employee...`).
- Uncontrolled input, or filtering on `onKeyUp` (the test uses `change`).
- Case-sensitive filter. Using `getByText(/John/)` would match both "John Doe" and "Mike Johnson": the test avoids this, you must not render the name twice (e.g. in a title attribute is fine, in text is not).
- Putting the name in a separate element from other text so the regex still matches exactly one element.

## 5. Approach in 5 steps
1. Delete the template body; import `React, { useState }`.
2. Make a constant array of the 4 names (with ids).
3. `const [search, setSearch] = useState('')`.
4. Derive `filtered` from the array on every render (no second state).
5. Render `<h1>`, controlled `<input placeholder=... value onChange>`, and `filtered.map` with `key`.
