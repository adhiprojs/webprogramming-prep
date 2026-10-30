# Employee Directory Search (React)

Build a small React app that shows an "Employee Directory". It lists a few employees by name and has a search box above the list. Typing in the search box filters the list so only matching employees remain visible.

## Components

- `src/App.js` - default export `App`, rendered directly by the test (`render(<App />)`). No props. Put the heading, search input and list here (styles in `src/App.css`).

## Requirements

1. Show a heading containing the text `Employee Directory`. *(renders_the_heading)*
2. Show a text input whose placeholder is exactly `Search employees...` (three dots). *(renders_the_input_placeholder_text)*
3. On first render, show the employee `John Doe`. *(renders_the_employee_john_doe)*
4. On first render, show the employee `Jane Smith`. *(renders_the_employee_jane_smith)*
5. On first render, show the employee `Mike Johnson`. *(renders_the_employee_mike_johnson)*
6. On first render, show the employee `James Brown`. *(renders_the_employee_james_brown)*
7. When the search input changes to `John`, `John Doe` stays visible while `Jane Smith` and `James Brown` are removed from the page entirely (not just hidden). *(renders_the_employee_based_on_search)*

## Watch out

- The test finds text with case-insensitive regexes such as `/John Doe/i` and `/Employee Directory/i`; `getByText` throws if more than one element matches, so each name and the heading must appear in exactly one element.
- Removed employees are checked with `queryByText(...).not.toBeInTheDocument()`, so filter the rendered list instead of using CSS `display: none`.
- `Mike Johnson` also contains "John"; the test does not assert on it after searching, so keep the filter a simple name match.
- The input is found by placeholder, so keep the exact string including the trailing `...`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
