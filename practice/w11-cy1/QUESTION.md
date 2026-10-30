# Student Dashboard with Routing (React)

Build a small student dashboard with React Router. A `Navbar` component shows the brand, links to Home and Marks, and a welcome message with the student name. The Home page greets the student, and the Marks page lists subject scores with a total.

## Components

- `src/App.js` - default export `App`, rendered by the test with no wrapper (`render(<App />)`), so `App` must provide its own Router. At the default route it shows the Home content.
- `src/components/Navbar.jsx` - default export `Navbar`. Prop: `studentName` (string); define `Navbar.propTypes` including `studentName`. Uses router `Link`s, so it must not include its own Router.
- `src/components/Marks.jsx` - default export `Marks`. Prop: `marks`, an array of `{ subject, score }`; define `Marks.propTypes` including `marks`. Must not include its own Router.
- Optional styles: `App.css`, `components/Navbar.css`, `components/Marks.css`.

## Requirements

1. Rendering `App` shows the Home title `Welcome to Your Dashboard`. *(renders_home_title)*
2. Rendering `App` shows `Student: Meena Sharma` (the sample student name is part of the spec) in a single element. *(renders_home_student_name)*
3. `Navbar` shows the brand `Student Dashboard`. *(renders_navbar_brand)*
4. `Navbar` shows links with the exact text `Home` and `Marks`. *(renders_navbar_links)*
5. With `studentName="Meena Sharma"`, `Navbar` shows `Welcome, Meena Sharma` in a single element. *(renders_navbar_student_name)*
6. `Navbar.propTypes` has the property `studentName`. *(validates_navbar_proptypes)*
7. `Marks` shows the title `Subject Marks`. *(renders_marks_page_title)*
8. For the 5 given marks (Mathematics 92, Physics 85, Chemistry 78, Computer Science 96, English 88), `Marks` renders exactly 5 elements with class `mark-item`. *(renders_marks_list)*
9. `Marks` shows `Total Score: 439`, computed as the sum of the scores. *(renders_total_score)*
10. `Marks.propTypes` has the property `marks`. *(validates_marks_proptypes)*

## Watch out

- `Navbar` and `Marks` tests wrap them in `MemoryRouter`, while the `App` tests do not. Put the `BrowserRouter` (or equivalent) in `App` only; a Router inside `Navbar` or `Marks` throws "cannot render a Router inside another Router".
- All lookups are exact full-text matches: `Home`, `Marks`, `Student Dashboard`, `Welcome, Meena Sharma`, `Student: Meena Sharma`. Keep prefixes and punctuation in the same element and avoid duplicates.
- The `Marks` link text `Marks` must not clash with another element whose full text is `Marks`; the page title is `Subject Marks`.
- Compute the total from the `marks` prop; do not hard-code `439`.
- The folder is lowercase `components/`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/Marks.jsx`
- `reactapp/src/components/Navbar.jsx`
- `reactapp/src/App.css`
- `reactapp/src/components/Marks.css`
- `reactapp/src/components/Navbar.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
