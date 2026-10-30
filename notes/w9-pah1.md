# w9-pah1: Bookstore inventory (cards, controlled form, regex query trap)

## 1. What the question asks
`src/components/Bookstore.jsx`, default export `Bookstore` (and `App.js`). Bootstrap CSS.
- `<h1>` `Bookstore Inventory`, plus a subtitle paragraph `Manage your book collection with ease`
- Initial books: `The Great Gatsby`, `1984`, `To Kill a Mockingbird` with author, stock, price
- Placeholders `Book Title`, `Author`, `Stock`, `Price ($)`
- Button `Add Book`; empty -> `alert('Please fill in all fields')`
- Price shown like `$30.00`.
- Classes: outer `container my-5`; first `.card` has `card shadow-sm`; button `btn btn-success w-100`.

## 2. What each test checks
Alert mocked. (1) heading + subtitle (exact); (2) three titles; (3) empty click -> alert; (4) add `Clean Code` / `Robert C. Martin` / `20` / `30` -> `getByText('Clean Code')`, `/Robert C. Martin/`, **`/20/`**, `/\$30.00/`; (5) button; (6) classes; (7) four inputs hold values then are all `''` after Add.

## 3. The original submission
Submitted `Bookstore.jsx` and `App.js` were **empty** -> 7/7 failures. Verified solution has 4 string states and a card layout. Trap handled: `getByText(/20/)` must match exactly ONE element, so no other cell may contain "20" (initial stocks 15, 8, 12; prices 10.99, 12.50, 14.00 are safe; a price like 20.00 or id/year 2020 would break it).

## 4. Common mistakes
- Empty file; missing export.
- Initial data containing "20" (regex `getByText` throws "multiple elements").
- No `$` / `toFixed(2)` on price -> `/\$30.00/` fails.
- Subtitle text altered.
- Only one `.card` with `shadow-sm` is required (first one), but keep both.
- Forgetting to clear the 4th input.

## 5. Approach in 5 steps
1. States: `books` + `title`, `author`, `stock`, `price`.
2. `handleAdd`: all four required, else alert and return.
3. Append, then reset the four states.
4. Render h1, subtitle, `card shadow-sm` with table, second card with form.
5. Scan your seed data for digits that clash with the test regexes.
