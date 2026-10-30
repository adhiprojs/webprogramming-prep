# Tech Innovators Summit Event Page

Build a styled event page for a conference. It has a header with the event title, an about section, a speakers list and an agenda list, all styled with an external stylesheet.

## Requirements

1. The `header h1` text is exactly `Tech Innovators Summit`. *(verify_header_title)*
2. The `header` has a non-transparent background colour (not `rgba(0, 0, 0, 0)`) and `text-align: center`. *(verify_header_styling)*
3. `#aboutSection` contains an `h2` and a `p`, both with non-empty text, and the section itself has computed `padding` and `margin` both greater than `0`. *(verify_about_section)*
4. `#speakersList` exists and contains at least `3` `li` items. *(verify_speakers_list)*
5. The first `#speakersList li` has computed `padding` and `margin` greater than `0`. *(verify_speakers_list_styling)*
6. `#agendaList` exists and contains at least `3` `li` items. *(verify_agenda_list)*
7. The first `#agendaList li` has computed `padding` and `margin` greater than `0`. *(verify_agenda_list_styling)*
8. `#aboutSection`, `#speakersSection` and `#agendaSection` each have a background colour that is not `rgba(0, 0, 0, 0)`. *(verify_sections_background_colors)*
9. `#speakersList` uses `display: flex`. *(verify_flexbox_layout)*
10. The `header` and `#aboutSection` both have computed `padding` greater than `0` from the external stylesheet. *(verify_external_css)*

## Watch out

- `padding` and `margin` are read with `parseInt` of the shorthand, so set them with px values on all sides (e.g. `padding: 10px`).
- All three section ids (`#aboutSection`, `#speakersSection`, `#agendaSection`) must exist, or the background check throws and fails.
- Missing ids (`#speakersList`, `#agendaList`) cause the case to fail with an error.

## Files

- `public/index.html`
- `public/styles.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
