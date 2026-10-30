# w6-cod1: Highlight paragraph toggle

Concept: `addEventListener('click')` + `classList.toggle`, DOMContentLoaded, no console errors.

## 1. What the question asks
Page with:
- `<p id="textPara">` with some text.
- `<button id="highlightBtn">Highlight</button>`.
- Clicking the button toggles a yellow background on the paragraph only.
- Files: `public/index.html`, `public/script.js`, `public/style.css`. Bootstrap 5 CDN is linked in the original (not required by tests).

## 2. What each test case checks
Computed `backgroundColor` of `#textPara` unless stated. Cases run in order on the same page.

| Case | Action | Expected |
|---|---|---|
| no_background_on_load | load page | `rgba(0, 0, 0, 0)` or `transparent` |
| highlight_applied_on_click | click `#highlightBtn` | `rgb(255, 255, 0)` |
| highlight_removed_on_second_click | click again | transparent again |
| other_elements_not_affected | read `#highlightBtn` bg | not `rgb(255, 255, 0)` |
| button_toggle_multiple_times | 4 more clicks | yellow, transparent, yellow, transparent |
| no_errors_on_early_click | open a new page, click `#highlightBtn` right after goto | no `console` events of type `error` |

## 3. The original submission
Passes 6/6. `DOMContentLoaded` handler gets both elements and does `textPara.classList.toggle('highlight')`; CSS `.highlight { background-color: yellow; }`.

Fragile points:
- `yellow` equals `rgb(255, 255, 0)`; `#ffeb3b` or `lightyellow` would fail.
- The Bootstrap CDN link: if the network is blocked, the browser logs an error and the last case fails. The tests do not need Bootstrap, so removing the link is safer.
- A paragraph with default `background` is fine; do not set a background on `#textPara` by default.

## 4. Common mistakes
- Setting yellow permanently or via `style.backgroundColor = 'yellow'` without a way to remove it.
- Using `classList.add` (no toggle), so the second click does nothing.
- Script in `<head>` with no `DOMContentLoaded`, so `getElementById` returns null (console error).
- Highlighting `document.body` or the button as well.
- Wrong IDs (`textpara`, `highlightbtn`).

## 5. Approach in 5 steps
1. Add `p#textPara` and `button#highlightBtn`.
2. CSS: `.highlight { background-color: yellow; }` only.
3. Put `<script src="script.js">` at the end of body and wrap code in `DOMContentLoaded`.
4. `getElementById` both, then `highlightBtn.addEventListener('click', () => textPara.classList.toggle('highlight'))`.
5. Click 4 times by hand and watch the colour alternate; open the console and check for errors.
