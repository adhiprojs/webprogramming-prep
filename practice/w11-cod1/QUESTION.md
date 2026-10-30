# Book Card (React props and PropTypes)

Build a reusable `BookCard` component that shows a book's title, its author and its availability status, all supplied through props. `App` renders one `BookCard`.

## Components

- `src/components/BookCard.jsx` - default export `BookCard`. Props: `bookTitle`, `authorName`, `availabilityStatus`. It must define `BookCard.propTypes` containing exactly these three keys (the test checks they exist). Optional styles in `src/components/BookCard.css`.
- `src/App.js` - default export `App`, no props. It renders a `BookCard` so that an element with `id="book-card"` is in the page.

## Requirements

1. Rendering `App` produces an element with id `book-card`. *(renders_book_card_component)*
2. `BookCard` shows the title (for `bookTitle="The Alchemist"` the text `The Alchemist`) in its own element. *(displays_book_title)*
3. `BookCard` shows the author as `Author: ` followed by the name, for example `Author: Paulo Coelho`, in a single element. *(displays_author_name)*
4. `BookCard` shows the status as `Status: ` followed by the value, for example `Status: Available`, in a single element. *(displays_availability_status)*
5. The same component works with other props: `bookTitle="Wings of Fire"`, `authorName="A.P.J Abdul Kalam"`, `availabilityStatus="Not Available"` render `Wings of Fire`, `Author: A.P.J Abdul Kalam` and `Status: Not Available`. *(bookcard_accepts_different_props)*
6. `BookCard.propTypes` has the properties `bookTitle`, `authorName` and `availabilityStatus`. *(validates_proptypes)*

## Watch out

- `getByText("Author: Paulo Coelho")` is an exact full-text match: the prefix, the space after the colon and the name must be in the same element, with no extra text. Same for `Status: `.
- JSX like `Author: {authorName}` produces one element with the combined text, which is what the test needs.
- `getByText("The Alchemist")` must match exactly one element, so do not repeat the title elsewhere.
- Import `PropTypes` from `prop-types` and assign `BookCard.propTypes`; it is read as a static property on the default export.
- The `#book-card` id is queried only when rendering `App`; the BookCard test does not need it, so it is safe to put it on the card's root element.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/BookCard.jsx`
- `reactapp/src/App.css`
- `reactapp/src/components/BookCard.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
