# Task Manager (React, class component lifecycle)

Build a Bootstrap-styled "Task Manager" app, written to exercise React lifecycle methods (the test comments mention the constructor, `componentDidMount` and `componentDidUpdate`). The app shows a loading spinner for about 2 seconds, then lists four tasks with priority badges, filter buttons, completion checkboxes, a Delete button per task and an "Add New Task" modal form.

## Components

- `src/App.js` - default export `App`, rendered directly by the test (`render(<App />)`), no props, no Router. All behaviour must be reachable from `App`.

## Requirements

1. After loading, show a heading containing `Task Manager`. *(renders_the_main_heading)*
2. Render a Bootstrap navbar: an element with class `navbar`. *(renders_bootstrap_navigation)*
3. After loading (about 2 seconds, the test waits up to 3 s), list the tasks `Complete React Assignment`, `Review Bootstrap Documentation`, `Debug Lifecycle Methods` and `Setup React Dev Tools`. *(renders_all_tasks_after_loading)*
4. Show a button with the exact text `Add New Task`. *(renders_add_new_task_button)*
5. Show five buttons whose accessible names are exactly `All`, `High`, `Medium`, `Low` and `Completed`. *(renders_filter_buttons)*
6. Clicking `High` shows `Complete React Assignment` and `Debug Lifecycle Methods` only; `Review Bootstrap Documentation` and `Setup React Dev Tools` are removed. *(filters_high_priority_tasks)*
7. Clicking `Medium` shows only `Review Bootstrap Documentation`. *(filters_medium_priority_tasks)*
8. Clicking `Completed` shows only `Review Bootstrap Documentation` (it starts out completed; the other three start not completed). *(filters_completed_tasks)*
9. Each task has a checkbox labelled with the task title (found with `getByLabelText(/Complete React Assignment/i)`). It starts unchecked, and clicking it makes it checked. *(toggles_task_completion)*
10. Immediately after the first render, an element with class `spinner-border` is present; it disappears once loading finishes (set a loading flag in the constructor and clear it in `componentDidMount` after 2 seconds). *(displays_loading_spinner_initially_then_removes)*
11. Clicking `Add New Task` opens a form with a text input (placeholder `Enter task title...`), a select labelled `Priority`, and a button named `Add Task`. Entering `New Lifecycle Task`, choosing priority `High` and clicking `Add Task` shows `New Lifecycle Task` in the list. *(adds_new_task_and_updates_state)*
12. After loading there are exactly four elements with the text `Delete`; clicking the first removes one task, leaving three. *(deletes_task_and_updates_state)*
13. Priority badges use Bootstrap classes: `badge bg-primary` for High, `badge bg-warning` for Medium and `badge bg-secondary` for Low; each must appear at least once, so `Setup React Dev Tools` is the Low task. *(displays_priority_badges)*

## Watch out

- `getByText(/Task Manager/i)` throws if the navbar brand and the heading both contain it; use that text in only one element.
- `getByText('Completed')` and `getByText('Add New Task')` are exact matches that must be unique; do not use those strings in badges, status labels or the modal title while the test queries them. The modal button is `Add Task` and matches by role name exactly.
- `getAllByText('Delete')` must find exactly 4 elements, so do not render other elements with the text `Delete`, and the tasks must not render until loading ends.
- Task titles are found by regex; each should appear once on the page (a checkbox label is fine, but do not repeat the title in a second element).
- The filter tests re-click inside `waitFor`, and the spinner test requires the spinner at the very first render, before any timer fires.

## Files

- `reactapp/src/App.js`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
