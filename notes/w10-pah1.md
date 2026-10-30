# w10-pah1: Task Manager (class lifecycle, filters, modal, async loading)

## 1. What the question asks
`src/App.js`, class component `App` with lifecycle methods and Bootstrap class names (CSS not required for tests).
- Navbar (`.navbar`) with brand `Task Manager` and button `Add New Task`
- Filter buttons: `All`, `High`, `Medium`, `Low`, `Completed`
- 4 tasks: `Complete React Assignment` (High), `Review Bootstrap Documentation` (Medium, completed), `Debug Lifecycle Methods` (High), `Setup React Dev Tools` (Low)
- Loading spinner `.spinner-border` shown initially (constructor `isLoading: true`), removed after `setTimeout` in `componentDidMount` (1.5 s; test waits up to 3 s)
- Each task: checkbox with a `<label htmlFor>` containing the title, a `Delete` button, a badge `.badge` with `bg-primary` (High), `bg-warning` (Medium), `bg-secondary` (Low)
- Modal (conditional render) with input placeholder `Enter task title...`, `<label>Priority</label>` + `<select>` (High/Medium/Low), submit button `Add Task`.

## 2. What each test checks
All wrapped in `waitFor` (timeout 3000):
- heading `/Task Manager/i`; `.navbar` exists; four task titles; `getByText('Add New Task')`
- `getByRole('button', {name})` for All, High, Medium, Low, Completed
- click High -> the 2 High tasks shown, others `queryByText` null; Medium -> only Review Bootstrap; `getByText('Completed')` click -> only Review Bootstrap
- `getByLabelText(/Complete React Assignment/i)` checkbox: not checked, click, checked
- spinner exists immediately after render (synchronous), then gone
- open modal, `getByPlaceholderText`, `getByLabelText('Priority')`, change title + select, click button named `Add Task` -> `getByText('New Lifecycle Task')`
- `getAllByText('Delete')` length 4; click first -> 3
- `.badge.bg-primary`, `.badge.bg-warning`, `.badge.bg-secondary` all exist.

## 3. The original submission
Passes 13/13. Right: all state in constructor; `componentDidMount` sets timer and `componentWillUnmount` clears it; derived `getFilteredTasks()`; `setState(prev => ...)` functional updates; label/`id` pairs make `getByLabelText` work; `{showModal && ...}` conditional render; keys on tasks.
Fragile:
- `Add New Task` appears twice once the modal opens (nav button + modal title); the test only uses `getByText` before opening, and `getByRole('button', {name:'Add Task'})` is exact so it doesn't match `Add New Task`. Rename either and you may collide.
- The spinner must be in the very first render (not set in `componentDidMount`).
- Tasks are visible during loading (test does not require them hidden).
- `id: Date.now()` for new tasks could collide on very fast adds.

## 4. Common mistakes
- Spinner state set only after mount (sync check fails).
- Missing `htmlFor`/`id` -> `getByLabelText` fails.
- Filter buttons as `<a>`/`div` (no button role).
- Duplicate text, e.g. rendering a count that also says "Completed", makes `getByText('Completed')` ambiguous.
- Mutating `this.state.tasks` directly.
- Not clearing timers in `componentWillUnmount`.

## 5. Approach in 5 steps
1. Constructor state: tasks, filter, isLoading true, showModal, form fields; bind or use arrows.
2. `componentDidMount` -> `setTimeout` to clear loading; clear on unmount.
3. Handlers: filter change, toggle (map), delete (filter), open/close modal, controlled form, submit.
4. `getFilteredTasks()` handling `All`, `Completed`, else priority match.
5. Render navbar, filter buttons, spinner, task cards (checkbox+label, badge, Delete), modal.
