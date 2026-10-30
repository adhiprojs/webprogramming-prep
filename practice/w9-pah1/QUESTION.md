# Bookstore Inventory (React)

Build a `Bookstore` component that shows a book inventory inside a Bootstrap card, with a form to add a book. Adding with empty fields shows an alert; a successful add shows the new book with formatted stock and price and clears the form.

## Components

- `src/components/Bookstore.jsx` - default export `Bookstore`, no props. Imported by the test as `../components/Bookstore`.
- `src/App.js` - should render `<Bookstore />`.
- Bootstrap CSS must be available (for example `import 'bootstrap/dist/css/bootstrap.min.css'`).

## Requirements

1. Show a heading `Bookstore Inventory` and a subtitle `Manage your book collection with ease`, each exact text in its own element. *(renders_Bookstore_Inventory_heading_is_present)*
2. Initially list the books `The Great Gatsby`, `1984` and `To Kill a Mockingbird`. *(displays_initial_inventory_items_is_present)*
3. Clicking `Add Book` with empty fields calls `window.alert` with `Please fill in all fields`. *(displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_book)*
4. Inputs have placeholders `Book Title`, `Author`, `Stock` and `Price ($)`. Entering `Clean Code`, `Robert C. Martin`, `20` and `30` and clicking `Add Book` shows `Clean Code`, an element containing `Robert C. Martin`, an element containing `20`, and an element containing `$30.00` (price formatted with two decimals). *(adds_a_new_book_to_the_inventory_is_working)*
5. A button with the exact text `Add Book` is shown. *(renders_Add_Book_button_is_working)*
6. The wrapper has classes `container` and `my-5`; an element with class `card` also has `shadow-sm`; the `Add Book` button has `btn`, `btn-success` and `w-100`. *(bootstrap_classes_are_applied_correctly)*
7. After a successful add, the title, author, stock and price inputs are empty (typed values `Refactoring`, `Martin Fowler`, `10`, `45.50` are held before the click). *(form_inputs_are_cleared_after_adding_book)*

## Watch out

- `getByText(/20/)` and `getByText(/Robert C. Martin/)` are regexes that throw if more than one element matches; no other element (initial books' stock, prices, IDs) may contain `20`, and `$30.00` must appear only once.
- The first `.card` found must have `shadow-sm`; put it on the first card.
- `getByText('1984')` is exact, so only one element may be exactly `1984`.
- `getByText('Add Book')` is exact; do not reuse it for a heading.
- `window.alert` is mocked; the message is exactly `Please fill in all fields`.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/Bookstore.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
