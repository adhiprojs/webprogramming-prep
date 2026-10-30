# Tech Conference 2025

Build a conference page with a title, a header (main heading and slogan), an introduction, a schedule, a speakers list, an event details section and a footer with a contact email. Some words need bold, italic, strong, emphasis and underline formatting.

## Requirements

1. The page title (`document.title`) is exactly `Tech Conference 2025`. *(verify_title)*
2. The first `h1` has the text exactly `Tech Conference 2025`. *(verify_header_text)*
3. The first `h2` has the text exactly `Conference Introduction`. *(verify_conference_intro_header)*
4. The first `p` placed directly after an `h2` contains the words `exciting`, `innovative` and `technology`, and the page contains a `b` element and an `i` element. *(verify_intro_text_bold_italic)*
5. The second `h2` has the text exactly `Schedule`. *(verify_schedule_header)*
6. The third `h3` on the page has the text exactly `Day 1`, and some `p` on the page contains `Artificial Intelligence in 2025`. *(verify_day1_schedule)*
7. The third `h2` has the text exactly `Speakers`. *(verify_speakers_header)*
8. The first `h5` contains `Dr. John Doe`, and some `span` on the page contains `CEO, Tech Innovations Inc.` *(verify_speaker_details)*
9. The first `p` inside `footer` includes `contact@techconference.com`, and the first `u` inside `footer` contains `contact@techconference.com`. *(verify_footer_contact_info)*
10. There is an `h3` with the text exactly `Event Details`, and the element right after it is a `p` containing `global speakers` and `networking opportunities`. The first `strong` on the page contains `global speakers`, and an `em` contains `networking opportunities`. *(verify_event_details_emphasis)*

## Watch out

- The `h3` order matters: the first `h3` is the slogan in the header, the second is `Event Details`, and the third is `Day 1`. So `Event Details` must appear before `Day 1` in the document.
- The `p` after `Event Details` must be its immediate next sibling, otherwise the check fails.
- `document.querySelector('strong')` takes the first `strong` on the page, so the `global speakers` `strong` must come before any other `strong`.
- The speaker name must be in an `h5`, and the company text in a `span`.
- Heading counts matter: the test indexes `h2` (1st to 3rd) and `h3` by position, so do not add extra headings of those levels earlier in the page.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
