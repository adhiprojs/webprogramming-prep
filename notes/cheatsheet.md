# Cheatsheet: patterns that repeat across W1-W11

Merged from the 48 notes in this folder. Each section says which weeks it comes from, so you can open `notes/<week>-<task>.md` for detail.

## 0. How you're graded (read this first)
| Weeks | Grader | What it means for you |
|---|---|---|
| W1-W3, W5-W8 (cy/pah) | **Puppeteer** opens `public/index.html` in a real Chrome and prints `TESTCASE:<name>:success/failure` | Real browser: **computed** CSS, `innerText`, real clicks. Console errors and broken CDN links can fail cases. |
| W8 cod, W9-W11 | **Jest + React Testing Library** (`react-scripts test`) on `src/tests/App.test.js` | jsdom, no real CSS. Exact text matters; `getByText` fails on 0 **or 2+** matches. |

**The test file IS the question.** Copy IDs, classes and text from it character by character (case, punctuation, spaces).

---

## 1. Exact text and the right tag (W1, W2)
- The test usually does `document.querySelector('h1').innerText === '...'`, so you need the **right tag** *and* the **exact string**.
- **Positional selectors** are everywhere: `querySelectorAll('p')[0]`, `h2[1]`, `section:nth-of-type(3)`, `h2 + p`, `nextElementSibling`. **Order of elements matters**, and a stray extra `<p>` earlier on the page shifts every index (w1-cod1, w1-cy1, w1-pah1, w2-pah2).
- Nested formatting checks: `footer p i` (italic inside the footer paragraph), `<b>`, `<u>`, `<span>`, `<strong>`/`<em>` (w1-cod1, w1-cod2, w1-pah2).
- `innerText` vs `textContent`: `innerText` is what's visible (collapses whitespace, hides `display:none`). Puppeteer tests mostly use `innerText`; RTL uses `textContent`.
- Debug tasks (`cod`) hide typos: `StramFlix`, `h2` instead of `h1`, unclosed `<span>`/`<td>`, `<body>` instead of `<tbody>`, truncated HTML. **Validate tag pairs first.**

```html
<footer>
  <p><i>2025 My First Webpage. All rights reserved.</i></p>
</footer>
```

## 2. Lists, tables, images (W2)
- `ol > li` with a nested `ul` inside an `li`; tables need `<thead>`/`<tbody>` and sometimes the `border` attribute (`<table border="1">`).
- `img.width` is the **rendered** width. If the image file doesn't exist, `width="300"` alone may render differently, so also set `img { width: 300px; }` in CSS (w2-cod1).
- Count checks like "at least 4 `nav a`" or "exactly 5 rows in `tbody`".

## 3. CSS that's checked through `getComputedStyle` (W3, W5)
- Colours always come back as **`rgb(r, g, b)`** (with spaces), whatever you wrote. `red` gives `rgb(255, 0, 0)`; `#fff` gives `rgb(255, 255, 255)`. Alpha gives `rgba(...)`, which fails an `rgb(...)` compare (w3-cod2).
- Sizes come back in **px** (`1rem` gives `16px`). `margin: 20px auto` reads as left/right px values, not `auto`.
- File name traps: `styles.css` vs `style.css`; `<link rel="stylesheet" href="styles.css">` needs **both** `rel` and `href` (w3-cod2).
- Class names must match exactly: `.loginForm` doesn't style `class="login-form"`.
- `:hover` is tested with `page.hover()`, then the computed colour (w3-cod1). Put the hover rule on the element itself.
- Flexbox (W5): `display: flex`, `flex-wrap: wrap`, `flex-direction: column` inside `@media (max-width: 768px)`, `gap`, `justify-content`, `align-items: center`. The test resizes the viewport (`setViewport`) and re-reads computed styles.
- `parseInt(padding) > 0` checks: `padding: 0 20px` fails if the test reads `padding-top`.
- Card widths like `calc(50% - 1.5rem)` for 2 columns and `calc(100% - 1.5rem)` for 1 (w5-pah2).

## 4. JS DOM basics (W6, W7, W8)
```js
// script.js at the end of <body> (or wrap in DOMContentLoaded)
const btn = document.getElementById('toggleBtn');
btn.addEventListener('click', () => {
  document.getElementById('para').classList.toggle('highlight');
});
```
- Get elements by the **exact id** in the test; `getElementById('x')` returns `null` for a typo and the next line throws, which kills every later case.
- `classList.toggle/add/remove`. Visibility checks are often `!el.classList.contains('d-none')`, so **toggle the class**, not `style.display` (w6-cod2).
- Inline styles: when the test reads `el.style.zIndex`, you must set `el.style.zIndex = '10'` in JS (a CSS class won't show in `.style`). **z-index needs `position`** (relative/absolute) or the computed value is `auto` (w6-pah1, w8-pah1).

## 5. Radios, checkboxes, `change` events (W7)
- Tests often do `radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true }))`, **not** a click. Listen for **`change`**.
- Radios in one group share a `name`; read the chosen one with:
```js
const chosen = document.querySelector('input[name="subject"]:checked');
const value = chosen ? chosen.value : '';
```
- Count checked boxes / sum `data-price`:
```js
const boxes = document.querySelectorAll('.topic-checkbox');
let count = 0;
for (let i = 0; i < boxes.length; i++) {          // for loop
  if (boxes[i].checked) count++;
}
let total = 0, i = 0;
while (i < items.length) {                          // while loop
  if (items[i].checked) total += parseFloat(items[i].dataset.price);
  i++;
}
```
- If the question says "use `for`/`while`/`do...while`", use exactly that. The tests here don't check the loop type, but the human marker may.
- `fieldset` + `legend` counts (at least 3 of each) and `page_load` waits for `fieldset` (w7).

## 6. Score, grade, discount logic (W7)
- Compare against an answers object, then map the score: `3 -> 'A'/'Excellent'`, `0 -> 'F'` (w7-cy).
- Percent discount: `final = total - total * 0.10` for UPI, shown with `toFixed(2)`. The test `parseFloat`s the text, so put **no `Rs.` or commas inside the number element** (w7-pah1).
- Days logic: rest days = `7 - workoutDays` (w7-pah2).

## 7. Reset logic (W6, W7, W8)
Reset must restore **every** visible value to the **exact default** the test expects:
```js
document.getElementById('resetQuizBtn').addEventListener('click', () => {
  document.getElementById('studentName').value = '';
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => { el.checked = false; });
  document.getElementById('quizScore').textContent = '0';
  document.getElementById('quizGrade').textContent = '-';
  document.getElementById('quizRemark').textContent = '-';
});
```
- Common misses: forgetting the text input, leaving a count at the old value, writing `''` where the test wants `0` or `-`, resetting `<select>`s to the wrong option (w6-pah2: font size back to `16px`, colour back to `black`, remove `active` from Bold/Italic).

## 8. Forms and validation (W6)
- `<form novalidate>`: without it the browser blocks submit for a bad email/number and your handler never runs.
- `e.preventDefault()` in the submit handler, show errors by removing `d-none`, add `is-invalid`; on success write into `#successData` then `form.reset()` (w6-cod2).

## 9. Canvas (W6-cy, W8-cy)
- `const ctx = canvas.getContext('2d')`; on load fill white (`ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h)`) so "cleared" pixels read white.
- `ctx.strokeStyle` must be set as **lowercase 6-digit hex** (`'#ff0000'`), because that's how the browser returns it.
- Mouse coords: `e.clientX - rect.left`, `e.clientY - rect.top` (`rect = canvas.getBoundingClientRect()`).

## 10. Console errors fail cases (W6, W8)
`no_console_errors_on_click` style cases fail on **any** console error: a Bootstrap CDN link that doesn't load, `img1.jpg` 404s, a `null.addEventListener` typo. Every `src`/`href` must point to a file that exists. (w8-pah1 showed 7/8 locally only because its `.jpg` images weren't in the dump; the dump command skips images. With the images present it's 8/8.)

---

## 11. React components and props (W11)
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';

function BookCard({ bookTitle, authorName, availabilityStatus }) {
  return (
    <div id="book-card">
      <h2 id="book-title">{bookTitle}</h2>
      <p id="author-name">Author: {authorName}</p>
      <p id="availability-status">Status: {availabilityStatus}</p>
    </div>
  );
}

BookCard.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  availabilityStatus: PropTypes.string.isRequired,
};

export default BookCard;
```
- **Exact file path + default export** as the test imports (`../components/BookCard`). Folder case matters: `Components` vs `components` (w10-cy1).
- Prop names exactly as the test passes them. `validates_proptypes` reads `Component.propTypes`, so set it.
- `getByText('Author: Paulo Coelho')` matches the **whole** text of one element: `Author: {authorName}` in one `<p>` works; splitting across two tags doesn't.

## 12. State and events (W8-W11)
- `useState` + toggle: `setIsDiscounted(!isDiscounted)`; ternary for button text and displayed value (w11-cod2, w11-pah2).
- Controlled inputs: `value={query} onChange={e => setQuery(e.target.value)}`; derive the filtered list, don't store it twice (w8-cod1, w10-cod1).
- Controlled `<select value onChange>` with an `"All"` option (w11-pah1).
- Forms: `window.alert` is mocked (`jest.fn()`) and checked when fields are empty; clear inputs after adding (w9-cod1, w9-cy, w9-pah1).
- Prices: `` `$${price.toFixed(2)}` `` gives `$200.00` (w9-cy). `Price: ₹1800` for 10% off 2000 (w11-cod2).
- Lists: `items.map(item => <tr key={item.id}>...)`, and **always set a `key`**.

## 13. Class components and lifecycle (W8-cod2, W10)
- Stopwatch: start/stop with `setInterval`/`clearInterval`, **store the id** (`this.timer`), clear it in `componentWillUnmount`. Buttons `disabled={isRunning}` (w8-cod2, w10-cod2).
- `setState` inside `componentDidUpdate` **needs a guard** (`if (prevState.query !== this.state.query)`), or you get an infinite loop (w10-cod1).
- A spinner that must show "on first render" belongs in the initial state, not set later in `componentDidMount` (w10-pah1).

## 14. RTL query traps (W9-W11)
- `getByText(/20/)` is a **regex**: it also matches `120`, `2020`, `$20.00`. Make sure only one element matches (w9-pah1).
- `getByText` throws on **duplicates**: the same title in a heading *and* a button, or `Add New Task` twice once a modal opens (w10-pah1).
- `getByLabelText('Priority')` needs `<label htmlFor="priority">` + `id="priority"`.
- `getByPlaceholderText('Search employees...')`: exact placeholder.
- Routing: if the test renders `<App />` bare, **App must contain the Router**; if it wraps a component in `<MemoryRouter>`, that component must **not** have its own Router (w11-cy1).
- Async: `await waitFor(...)` / `findBy...` for things that appear after a timer.

## 15. Debug-task checklist (`cod` tasks)
1. Run tests, read the **first** failure (one crash can fail everything).
2. Imports/exports: `export default FoodOrders` vs `FoodOrder`, missing `./logo.svg` from the CRA template (w8-cod1, w9-cod2).
3. Typos in hooks/props: `useStates`, `onChnage`, `valuee`.
4. `onClick={handleAdd()}` calls it during render, so use `onClick={handleAdd}`.
5. HTML: unclosed tags, wrong tag levels, wrong file names in `<link>`/`<script>`.
