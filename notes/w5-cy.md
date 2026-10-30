# w5-cy: Event page (Tech Innovators Summit)

Concept: exact IDs, section backgrounds, flexbox on a list, padding/margin checks.

## 1. What the question asks
Static page with these exact elements:
- `<header>` (tests use `header` and `header h1`), `h1` text exactly `Tech Innovators Summit`.
- `#aboutSection` with `h2` and `p` (both with text).
- `#speakersSection` containing `ul#speakersList` with at least 3 `li`.
- `#agendaSection` containing `ul#agendaList` with at least 3 `li`.
- External `styles.css`.

## 2. What each test case checks
| Case | Check |
|---|---|
| verify_header_title | `header h1` innerText === `Tech Innovators Summit` |
| verify_header_styling | header background not transparent AND `text-align: center` |
| verify_about_section | `#aboutSection` has `h2`, `p` with text; `parseInt(padding) > 0` and `parseInt(margin) > 0` |
| verify_speakers_list | `#speakersList` has >= 3 `li` |
| verify_speakers_list_styling | first `#speakersList li`: padding > 0 and margin > 0 |
| verify_agenda_list | `#agendaList` has >= 3 `li` |
| verify_agenda_list_styling | first `#agendaList li`: padding > 0 and margin > 0 |
| verify_sections_background_colors | `#aboutSection`, `#speakersSection`, `#agendaSection` background not `rgba(0, 0, 0, 0)` |
| verify_flexbox_layout | `#speakersList` computed `display === 'flex'` |
| verify_external_css | `header` padding > 0 and `#aboutSection` padding > 0 |

## 3. The original submission
Passes 10/10. Header has `padding: 40px 20px`, centered, dark background. Sections have `margin: 20px auto` and a background colour. `#speakersList` is `display:flex; flex-wrap:wrap`. li items: `padding 20px`, `margin: 10px 0`.

Fragile points:
- The margin check uses `parseInt` of the first value: `margin: 20px auto` works, `margin: 0 auto` fails.
- The li margin must be non-zero on the first value (top). `margin: 0 10px` would fail.
- The header title text must match exactly, including case.
- Background tests need a colour on `section` ids, not on `body`.

## 4. Common mistakes
- IDs named `about`, `speakers` instead of `aboutSection`, `speakersSection`, `agendaSection`, `speakersList`, `agendaList`.
- Typo in the h1 text.
- Using `float` or grid instead of flex on `#speakersList`.
- `display:flex` set on the section instead of the `ul`.
- Padding/margin only in the media query.
- Leaving a section with default transparent background.

## 5. Approach in 5 steps
1. Write HTML with the 3 sections and exact ids; at least 3 `li` per list.
2. Header: background, `text-align:center`, padding.
3. Each section: padding, `margin: 20px auto`, a background colour.
4. `#speakersList { display:flex; }`; both `li` rules get `padding: 15px; margin: 10px 0;`.
5. Re-read the id list once against the HTML.
