# w11-cod1: BookCard component (props + PropTypes)

## 1. What the question asks
- `src/components/BookCard.jsx` (default export `BookCard`) taking props `bookTitle`, `authorName`, `availabilityStatus`.
- Root `<div id="book-card">`; `h2#book-title` with the title; `p#author-name` as `Author: <authorName>`; `p#availability-status` as `Status: <availabilityStatus>`.
- `BookCard.propTypes` defining all three (strings, required).
- `src/App.js` renders `<BookCard>` with title `The Alchemist`, author `Paulo Coelho`, status `Available`.
- Imports `./BookCard.css`, so that CSS file must exist.

## 2. What each test checks
- App: `document.querySelector('#book-card')` in document.
- BookCard rendered directly with props: `getByText("The Alchemist")`, `"Author: Paulo Coelho"`, `"Status: Available"`; second case with other props (`Not Available`).
- `BookCard.propTypes` has own properties `bookTitle`, `authorName`, `availabilityStatus`.

## 3. The original submission
Passes 6/6. Right: destructured props, exact label prefixes, ids as spec, `PropTypes.string.isRequired` for each, `App` passes the props.
Fragile: the CSS import breaks the build if the file is missing; `prop-types` must be in `package.json`.
`getByText("Author: Paulo Coelho")` works although JSX makes two text nodes (`Author: ` and the value) in the same `<p>`.

## 4. Common mistakes
- Prop names different (`title`, `author`).
- Label text spacing/case: `Author:Paulo`, `status:`.
- Splitting label and value into different elements (exact `getByText` then fails).
- Forgetting `propTypes` assignment or putting it on the instance.
- `import PropTypes from 'prop-types'` missing.
- Using a class/ID name other than `book-card`.
- Named export instead of default.

## 5. Approach in 5 steps
1. Create the component with destructured props.
2. Render the three elements with the spec ids and text prefixes.
3. Add `X.propTypes = { ... PropTypes.string.isRequired }`.
4. `export default`; create the CSS file if imported.
5. In `App.js`, render with the sample values.
