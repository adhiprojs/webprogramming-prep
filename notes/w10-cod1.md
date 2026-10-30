# w10-cod1: Employee Directory search (class component version)

## 1. What the question asks
Same UI as w8-cod1, in `src/App.js` (default export `App`), now with a class component and lifecycle:
- Heading `Employee Directory`; input placeholder `Search employees...`
- Names include `John Doe`, `Jane Smith`, `Mike Johnson`, `James Brown` (plus more allowed)
- Typing filters the visible list.

## 2. What each test checks
Identical 7 tests to w8-cod1: heading regex; placeholder; four `getByText(/<name>/i)`; search `John` -> `John Doe` present, `Jane Smith` and `James Brown` absent.

## 3. The original submission
Passes 7/7 as submitted. Right: class with `state {query, employees, filteredEmployees}`, controlled input (`value={this.state.query}`, `onChange` -> `setState`), `componentDidUpdate` refilters only when `query` changed (guard prevents an infinite loop), names rendered in `<div key={index}>`.
Fragile:
- Two copies of the list in state (`employees` and `filteredEmployees`); derived data should just be computed in `render`.
- `setState` inside `componentDidUpdate` works only because of the `prevState.query !== query` guard (and a JSON.stringify guard). Remove the guard -> infinite update loop.
- Search "John" also shows `Mike Johnson`; test tolerates it.

## 4. Common mistakes
- `setState` in `componentDidUpdate` with no condition.
- Forgetting `this.` or not binding handlers (use arrow class properties).
- Mutating state instead of new arrays.
- Case-sensitive filter.
- Calling `filter` on the stale `this.state.query` inside the same `setState` call (state not updated yet).

## 5. Approach in 5 steps
1. `class App extends React.Component`, `state = {query:'', employees:[...]}`.
2. `handleSearch = e => this.setState({query: e.target.value})`.
3. In `render`, `const shown = employees.filter(n => n.toLowerCase().includes(query.toLowerCase()))`.
4. Render heading, controlled input, `shown.map` with keys.
5. Only use `componentDidUpdate` if the question demands it, always with a prev/current guard.
