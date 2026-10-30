# Crop Search (React)

Build a "Crop Management System" page with a search box and a list of crops. Typing in the search box filters the list so only crops whose name matches remain visible.

## Components

- `src/App.js` - default export `App`, rendered directly by the test (`render(<App />)`). No props. It should render the dashboard.
- `src/Components/CropDashboard.jsx` and `src/Components/CropList.jsx` - starter files for the dashboard (heading, search bar) and the crop list. Note the folder is `Components` with a capital C. The test imports only `App`, so how you split the work between these files is up to you.

## Requirements

1. Show a heading containing the text `Crop Management System`. *(renders_the_heading)*
2. Show a label containing the text `Search by Crop Name` for the search bar. *(renders_the_search_bar_label)*
3. The crop list initially shows `Tomato`. *(renders_tomato)*
4. The crop list initially shows `Apple`. *(renders_apple)*
5. A search input whose placeholder contains `Search crops`. Typing `Tomato` keeps `Tomato` visible and removes `Apple` from the page. *(search_works_for_tomato)*
6. Typing `Apple` keeps `Apple` visible and removes `Tomato` from the page. *(search_works_for_apple)*
7. Typing `Carrot` shows `Carrot` (so `Carrot` must be one of the crops) and no `Banana` appears on the page. *(search_works_for_carrot)*

## Watch out

- All lookups use case-insensitive regexes (`/Tomato/i`, `/Apple/i`, ...). `getByText` throws on multiple matches, so each crop name must appear in exactly one element, and no other text (for example `Pineapple`) may contain `Apple` or `Tomato`.
- The heading and the label are matched by regex too: `Crop Management System` and `Search by Crop Name` must each appear in only one element.
- Filtered-out crops must be removed from the DOM (`queryByText(...)` must return nothing), not just hidden.
- Folder casing matters: `src/Components/` (capital C) in this test, unlike the lowercase `components/` used in other tests.

## Files

- `reactapp/src/App.js`
- `reactapp/src/Components/CropDashboard.jsx`
- `reactapp/src/Components/CropList.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
