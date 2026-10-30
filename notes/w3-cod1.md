# w3-cod1: Profile card (CSS computed styles + hover)

## 1. What the question asks
Build a profile card. Class names are required:
- element `.profile-card` containing `h2` = `John Doe`, and a `.button` element with text `Contact`
- `.profile-card` background `rgb(255, 255, 255)` and a non-`none` `box-shadow`
- `.profile-card .button` background `rgb(76, 174, 79)` (#4cae4f), hover background `rgb(69, 170, 63)` (#45aa3f)

## 2. Tests (7)
Each test opens a new page and reads computed style: profile_card_is_present (`.profile-card` exists), background_color (`getComputedStyle(...).backgroundColor`), box_shadow (not `none`), heading2_text (`.profile-card h2` trimmed), button_text (`.profile-card .button` trimmed), button_color, button_hover_color (puppeteer `hover()`, waits 500 ms, reads background again).

## 3. The original submission
Original blank (0/7); reference 7/7. The reference puts CSS in a `<style>` block in index.html (style.css and script.js are empty files). Works, but check which file the page really loads: only link style.css if you write there.

## 4. Common mistakes
- Using `#fff` is fine, but `white`-like values must compute to rgb(255, 255, 255) exactly; no opacity/rgba.
- `.button` as an id or on a `button` tag with the wrong class.
- Hover rule written on `.button:hover` without the `.profile-card` prefix is fine only if specificity still wins.
- Forgetting to link style.css.
- Box shadow left out.

## 5. Approach
1. HTML: `div.profile-card` > h2, p, `a.button`.
2. Card CSS: white background, box-shadow.
3. Button CSS: green background #4cae4f.
4. `.profile-card .button:hover` background #45aa3f.
5. Convert hex to rgb to double-check expected values.
